"use client";
import { useEffect, useRef } from 'react';

const Helper = {
  createShader: (gl: WebGLRenderingContext, type: number, source: string) => {
    const shader = gl.createShader(type)!;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return shader;
  },
  createProgram: (gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) => {
    const program = gl.createProgram()!;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    return program;
  },
  pixel2DVertexVaryingShader: `
    attribute vec2 a_position;
    uniform vec2 u_resolution;
    attribute vec2 a_color;
    varying vec2 v_color;
    void main(){
      gl_Position = vec4( vec2( 1, -1 ) * ( ( a_position / u_resolution ) * 2.0 - 1.0 ), 0, 1 );
      v_color = a_color;
    }
  `,
  uniform2DFragmentVaryingShader: `
    precision mediump float;
    varying vec2 v_color;
    uniform float u_tick;
    void main(){
      float t = abs(sin(v_color.x * 3.14159 + u_tick));
      vec3 pink = vec3(0.918, 0.502, 0.690);
      vec3 lavender = vec3(0.690, 0.557, 0.918);
      vec3 color = mix(pink, lavender, t) * v_color.y;
      gl_FragColor = vec4(color, v_color.y * 0.85);
    }
  `
};

function getCircleTriangles(sides: number) {
  const verts: number[] = [];
  for (let i = 0; i < sides; i++) {
    const angle0 = (i / sides) * Math.PI * 2;
    const angle1 = ((i + 1) / sides) * Math.PI * 2;
    verts.push(0, 0);
    verts.push(Math.cos(angle0), Math.sin(angle0));
    verts.push(Math.cos(angle1), Math.sin(angle1));
  }
  return verts;
}

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  size: number;
  life: number;
}

function createParticle(cx: number, cy: number, speedScale: number, sizeMin: number, sizeMax: number): Particle {
  const angle = Math.random() * Math.PI * 2;
  const speed = (0.3 + Math.random() * 0.7) * speedScale * 0.5;
  return {
    x: cx + (Math.random() - 0.5) * 60,
    y: cy + (Math.random() - 0.5) * 60,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    size: sizeMin + Math.random() * (sizeMax - sizeMin),
    life: 0,
  };
}

interface ParticleCanvasProps {
  maxParticles?: number;
  particleSizeMin?: number;
  particleSizeMax?: number;
  speedScale?: number;
  originX?: number | null;
  originY?: number | null;
}

export const ParticleCanvas = ({
  maxParticles = 800,
  particleSizeMin = 2,
  particleSizeMax = 5,
  speedScale = 1.5,
  originX = null,
  originY = null,
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
    let cx = originX ?? w / 2;
    let cy = originY ?? h / 2;

    const vShader = Helper.createShader(gl, gl.VERTEX_SHADER, Helper.pixel2DVertexVaryingShader);
    const fShader = Helper.createShader(gl, gl.FRAGMENT_SHADER, Helper.uniform2DFragmentVaryingShader);
    const program = Helper.createProgram(gl, vShader, fShader);
    gl.useProgram(program);

    const positionLoc = gl.getAttribLocation(program, 'a_position');
    const colorLoc = gl.getAttribLocation(program, 'a_color');
    const resolutionLoc = gl.getUniformLocation(program, 'u_resolution');
    const tickLoc = gl.getUniformLocation(program, 'u_tick');

    const sides = 8;
    const circleVerts = getCircleTriangles(sides);
    const VERT_FLOATS = 2;
    const COLOR_FLOATS = 2;
    const vertsPerParticle = circleVerts.length / VERT_FLOATS;

    const maxVertexCount = maxParticles * vertsPerParticle;
    const posData = new Float32Array(maxVertexCount * VERT_FLOATS);
    const colData = new Float32Array(maxVertexCount * COLOR_FLOATS);
    const posBuf = gl.createBuffer();
    const colBuf = gl.createBuffer();

    gl.enableVertexAttribArray(positionLoc);
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
    gl.bufferData(gl.ARRAY_BUFFER, posData, gl.DYNAMIC_DRAW);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    gl.enableVertexAttribArray(colorLoc);
    gl.bindBuffer(gl.ARRAY_BUFFER, colBuf);
    gl.bufferData(gl.ARRAY_BUFFER, colData, gl.DYNAMIC_DRAW);
    gl.vertexAttribPointer(colorLoc, 2, gl.FLOAT, false, 0, 0);

    const particles: Particle[] = [];
    let tick = 0;
    let animId: number;

    function addParticle() {
      particles.push(createParticle(cx, cy, speedScale, particleSizeMin, particleSizeMax));
    }

    for (let i = 0; i < 200; i++) addParticle();

    function animate() {
      const g = gl;
      if (!g) return;
      tick += 0.02;
      const lifeLimit = 180;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        if (p.life > lifeLimit) {
          particles.splice(i, 1);
          continue;
        }
        const drag = 0.98;
        p.vx *= drag;
        p.vy *= drag;
        p.x += p.vx;
        p.y += p.vy;
        p.vx += (Math.random() - 0.5) * 0.05;
        p.vy += (Math.random() - 0.5) * 0.05;
      }

      while (particles.length < maxParticles) addParticle();

      const active = particles.length;
      const vertCount = active * vertsPerParticle;
      const posArr: number[] = [];
      const colArr: number[] = [];

      for (const p of particles) {
        const progress = p.life / lifeLimit;
        const alpha = Math.max(0, 1 - progress);
        const sz = p.size * (1 - progress * 0.5);
        const hueOffset = (p.x * 0.001 + p.y * 0.001) % 1;

        for (let j = 0; j < vertsPerParticle; j++) {
          const vi = j * VERT_FLOATS;
          posArr.push(p.x + circleVerts[vi] * sz, p.y + circleVerts[vi + 1] * sz);
          colArr.push(hueOffset, alpha);
        }
      }

      posData.set(posArr);
      colData.set(colArr);

      g.uniform2f(resolutionLoc, w, h);
      g.uniform1f(tickLoc, tick);

      g.bindBuffer(g.ARRAY_BUFFER, posBuf);
      g.bufferSubData(g.ARRAY_BUFFER, 0, posData.subarray(0, vertCount * VERT_FLOATS));
      g.bindBuffer(g.ARRAY_BUFFER, colBuf);
      g.bufferSubData(g.ARRAY_BUFFER, 0, colData.subarray(0, vertCount * COLOR_FLOATS));

      g.clear(g.COLOR_BUFFER_BIT);
      g.drawArrays(g.TRIANGLES, 0, vertCount);

      animId = requestAnimationFrame(animate);
    }

    animate();

    const handleMouseMove = (e: MouseEvent) => {
      if (originX === null) cx = e.clientX;
      if (originY === null) cy = e.clientY;
    };
    const handleResize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas!.width = w;
      canvas!.height = h;
      gl.viewport(0, 0, w, h);
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
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
