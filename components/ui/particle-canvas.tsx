"use client";
import { useEffect, useRef } from 'react';

const vertexShaderSrc = `
  attribute vec2 a_position;
  uniform vec2 u_resolution;
  attribute vec2 a_color;
  varying vec2 v_color;
  void main(){
    gl_Position = vec4(vec2(1,-1)*((a_position/u_resolution)*2.0-1.0),0,1);
    v_color = a_color;
  }
`;

const fragmentShaderSrc = `
  precision mediump float;
  varying vec2 v_color;
  uniform float u_tick;
  void main(){
    float t = abs(sin(v_color.x * 6.28318 + u_tick * 0.8));
    vec3 crimson  = vec3(0.545, 0.0,   0.0);
    vec3 magenta  = vec3(0.914, 0.118, 0.549);
    vec3 hotpink  = vec3(1.0,   0.078, 0.576);
    vec3 col = mix(mix(crimson, magenta, t), hotpink, t * t);
    col *= v_color.y * 1.3;
    gl_FragColor = vec4(col, v_color.y * 0.9);
  }
`;

function compileShader(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return s;
}

function linkProgram(gl: WebGLRenderingContext, vs: WebGLShader, fs: WebGLShader) {
  const p = gl.createProgram()!;
  gl.attachShader(p, vs);
  gl.attachShader(p, fs);
  gl.linkProgram(p);
  return p;
}

function circleVerts(sides: number) {
  const v: number[] = [];
  for (let i = 0; i < sides; i++) {
    const a0 = (i / sides) * Math.PI * 2;
    const a1 = ((i + 1) / sides) * Math.PI * 2;
    v.push(0, 0, Math.cos(a0), Math.sin(a0), Math.cos(a1), Math.sin(a1));
  }
  return v;
}

function makeParticle(cx: number, cy: number, spd: number, szMin: number, szMax: number) {
  const a = Math.random() * Math.PI * 2;
  const s = (0.3 + Math.random() * 0.7) * spd * 0.5;
  return {
    x: cx + (Math.random() - 0.5) * 40,
    y: cy + (Math.random() - 0.5) * 40,
    vx: Math.cos(a) * s,
    vy: Math.sin(a) * s,
    size: szMin + Math.random() * (szMax - szMin),
    life: 0,
  };
}

interface ParticleCanvasProps {
  maxParticles?: number;
  particleSizeMin?: number;
  particleSizeMax?: number;
  speedScale?: number;
  followMouse?: boolean;
}

export const ParticleCanvas = ({
  maxParticles = 800,
  particleSizeMin = 2,
  particleSizeMax = 5,
  speedScale = 1.5,
  followMouse = true,
}: ParticleCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { alpha: true });
    if (!gl) return;

    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
    let cx = w / 2;
    let cy = h / 2;

    const vs = compileShader(gl, gl.VERTEX_SHADER, vertexShaderSrc);
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSrc);
    const prog = linkProgram(gl, vs, fs);
    gl.useProgram(prog);

    const posLoc = gl.getAttribLocation(prog, 'a_position');
    const colLoc = gl.getAttribLocation(prog, 'a_color');
    const resLoc = gl.getUniformLocation(prog, 'u_resolution');
    const tickLoc = gl.getUniformLocation(prog, 'u_tick');

    const sides = 8;
    const cVerts = circleVerts(sides);
    const vpf = 2;
    const cpf = 2;
    const vpp = cVerts.length / vpf;

    const maxV = maxParticles * vpp;
    const posD = new Float32Array(maxV * vpf);
    const colD = new Float32Array(maxV * cpf);
    const posB = gl.createBuffer();
    const colB = gl.createBuffer();

    gl.enableVertexAttribArray(posLoc);
    gl.bindBuffer(gl.ARRAY_BUFFER, posB);
    gl.bufferData(gl.ARRAY_BUFFER, posD, gl.DYNAMIC_DRAW);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    gl.enableVertexAttribArray(colLoc);
    gl.bindBuffer(gl.ARRAY_BUFFER, colB);
    gl.bufferData(gl.ARRAY_BUFFER, colD, gl.DYNAMIC_DRAW);
    gl.vertexAttribPointer(colLoc, 2, gl.FLOAT, false, 0, 0);

    const particles: any[] = [];
    let tick = 0;
    let animId: number;

    function addP() {
      particles.push(makeParticle(cx, cy, speedScale, particleSizeMin, particleSizeMax));
    }
    for (let i = 0; i < 200; i++) addP();

    function animate() {
      const g = gl;
      if (!g) return;
      tick += 0.02;
      const ll = 180;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        if (p.life > ll) { particles.splice(i, 1); continue; }
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.x += p.vx;
        p.y += p.vy;
        p.vx += (Math.random() - 0.5) * 0.05;
        p.vy += (Math.random() - 0.5) * 0.05;
      }
      while (particles.length < maxParticles) addP();

      const active = particles.length;
      const vc = active * vpp;
      const pa: number[] = [];
      const ca: number[] = [];

      for (const p of particles) {
        const pr = p.life / ll;
        const al = Math.max(0, 1 - pr);
        const sz = p.size * (1 - pr * 0.5);
        const hOff = (p.x * 0.001 + p.y * 0.001) % 1;
        for (let j = 0; j < vpp; j++) {
          const vi = j * vpf;
          pa.push(p.x + cVerts[vi] * sz, p.y + cVerts[vi + 1] * sz);
          ca.push(hOff, al);
        }
      }

      posD.set(pa);
      colD.set(ca);

      g.uniform2f(resLoc, w, h);
      g.uniform1f(tickLoc, tick);

      g.bindBuffer(g.ARRAY_BUFFER, posB);
      g.bufferSubData(g.ARRAY_BUFFER, 0, posD.subarray(0, vc * vpf));
      g.bindBuffer(g.ARRAY_BUFFER, colB);
      g.bufferSubData(g.ARRAY_BUFFER, 0, colD.subarray(0, vc * cpf));

      g.clear(g.COLOR_BUFFER_BIT);
      g.drawArrays(g.TRIANGLES, 0, vc);

      animId = requestAnimationFrame(animate);
    }

    animate();

    const handleMouse = (e: MouseEvent) => {
      if (followMouse) { cx = e.clientX; cy = e.clientY; }
    };
    const handleResize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas!.width = w;
      canvas!.height = h;
      gl.viewport(0, 0, w, h);
    };
    window.addEventListener('mousemove', handleMouse);
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  );
};
