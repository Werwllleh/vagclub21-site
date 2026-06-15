'use client';
import { useEffect, useRef } from 'react';
import styled from "styled-components";


const Canvas = styled.canvas`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: block;
`;

function randomColor() {
  return `hsl(${Math.floor(Math.random() * 360)}, 90%, 60%)`;
}

const AnimateCursor = () => {
  const canvasRef = useRef(null);
  const pointsRef = useRef([]);
  const lastPointRef = useRef(null);
  const lastMoveTimeRef = useRef(0);
  const colorRef = useRef(randomColor());

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;

      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const addPoint = point => {
      const lastPoint = lastPointRef.current;

      if (!lastPoint) {
        pointsRef.current.push({
          ...point,
          life: 1,
          color: colorRef.current,
        });

        lastPointRef.current = point;
        return;
      }

      const dx = point.x - lastPoint.x;
      const dy = point.y - lastPoint.y;
      const distance = Math.hypot(dx, dy);
      const steps = Math.max(1, Math.ceil(distance / 4));

      for (let i = 1; i <= steps; i++) {
        pointsRef.current.push({
          x: lastPoint.x + (dx * i) / steps,
          y: lastPoint.y + (dy * i) / steps,
          life: 1,
          color: colorRef.current,
        });
      }

      lastPointRef.current = point;
    };

    const handleMouseMove = event => {
      const now = performance.now();

      if (now - lastMoveTimeRef.current > 220) {
        colorRef.current = randomColor();
        lastPointRef.current = null;
      }

      addPoint({
        x: event.clientX,
        y: event.clientY,
      });

      lastMoveTimeRef.current = now;
    };

    const draw = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const points = pointsRef.current;

      for (let i = 1; i < points.length - 1; i++) {
        const p0 = points[i - 1];
        const p1 = points[i];
        const p2 = points[i + 1];

        if (p0.color !== p1.color || p1.color !== p2.color) continue;

        const alpha = Math.min(p0.life, p1.life, p2.life);

        if (alpha <= 0) continue;

        const xc = (p1.x + p2.x) / 2;
        const yc = (p1.y + p2.y) / 2;

        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.quadraticCurveTo(p1.x, p1.y, xc, yc);

        ctx.strokeStyle = p1.color;
        ctx.globalAlpha = alpha * 0.35;
        ctx.lineWidth = 0.25;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.shadowBlur = 1;
        ctx.shadowColor = p1.color;

        ctx.stroke();
      }

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      pointsRef.current = points
        .map(point => ({
          ...point,
          life: point.life - 0.01,
        }))
        .filter(point => point.life > 0);

      requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <Canvas ref={canvasRef} />;
};

export default AnimateCursor;