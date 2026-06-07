"use client";
import { useEffect, useRef } from "react";

export function ShaderAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) return;

    const vertexSrc = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fragmentSrc = `
      precision mediump float;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec2 u_mouse;

      vec3 palette(float t) {
        vec3 a = vec3(0.5, 0.5, 0.5);
        vec3 b = vec3(0.5, 0.5, 0.5);
        vec3 c = vec3(1.0, 1.0, 1.0);
        vec3 d = vec3(0.263, 0.416, 0.557);
        return a + b * cos(6.28318 * (c * t + d));
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        vec2 uv0 = uv;
        uv = uv * 2.0 - 1.0;
        uv.x *= u_resolution.x / u_resolution.y;

        float d = length(uv);
        vec3 col = vec3(0.0);

        for(float i = 0.0; i < 4.0; i++) {
          uv = fract(uv * 1.5) - 0.5;
          d = length(uv) * exp(-length(uv0));
          vec3 color = palette(length(uv0) + i * 0.4 + u_time * 0.01);
          d = sin(d * 4.0 + u_time) / 36.0;
          d = pow(0.005 / d, 1.5);
          vec2 mouseEffect = u_mouse - uv0;
          float mouseDist = length(mouseEffect);
          d *= 1.0 + sin(mouseDist * 10.0 - u_time * 2.0) * 0.1;
          col += color * d;
        }

        float wave = sin(uv0.x * 2.0 + u_time) * 0.01;
        col += vec3(wave);

        vec3 gradient1 = vec3(0.545, 0.0, 0.0);
        vec3 gradient2 = vec3(0.914, 0.118, 0.549);
        vec3 gradientMix = mix(gradient1, gradient2, uv0.y + sin(u_time) * 0.2);
        col = mix(col, gradientMix, 0.3);

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, source);
      gl.compileShader(s);
      return s;
    }

    const vs = compileShader(gl, gl.VERTEX_SHADER, vertexSrc);
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSrc);
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);

    const pos = new Float32Array([-1,-1, 1,-1, -1,1, 1,1]);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, pos, gl.STATIC_DRAW);

    const posLoc = gl.getAttribLocation(prog, 'a_position');
    const resLoc = gl.getUniformLocation(prog, 'u_resolution');
    const timeLoc = gl.getUniformLocation(prog, 'u_time');
    const mouseLoc = gl.getUniformLocation(prog, 'u_mouse');

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const mouse = { x: 0.5, y: 0.5 };
    const handleMouse = (e: MouseEvent) => {
      mouse.x = e.clientX / window.innerWidth;
      mouse.y = 1.0 - (e.clientY / window.innerHeight);
    };
    window.addEventListener('mousemove', handleMouse);

    let startTime = Date.now();
    let animId: number;

    function render() {
      const g = gl;
      const c = canvas;
      if (!g || !c) return;
      const t = (Date.now() - startTime) * 0.001;
      g.clearColor(0, 0, 0, 1);
      g.clear(g.COLOR_BUFFER_BIT);
      g.useProgram(prog);
      g.bindBuffer(g.ARRAY_BUFFER, buf);
      g.enableVertexAttribArray(posLoc);
      g.vertexAttribPointer(posLoc, 2, g.FLOAT, false, 0, 0);
      g.uniform2f(resLoc, c.width, c.height);
      g.uniform1f(timeLoc, t);
      g.uniform2f(mouseLoc, mouse.x, mouse.y);
      g.drawArrays(g.TRIANGLE_STRIP, 0, 4);
      animId = requestAnimationFrame(render);
    }

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  );
}
