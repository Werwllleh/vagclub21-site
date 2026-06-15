'use client';
import {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import {customTheme} from "@/styles/theme";


const Canvas = styled.canvas`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: none;

    @media (min-width: ${({ theme }) => customTheme.breakpoint.tablet}) {
        display: block;
    }
`;

function randomColor() {
  return `hsl(${Math.floor(Math.random() * 360)}, 90%, 60%)`;
}

const AnimateCursor = () => {
  const canvasRef = useRef(null);
  const pointsRef = useRef([]);
  const mouseRef = useRef(null);
  const smoothRef = useRef(null);
  const lastDrawPointRef = useRef(null);
  const lastMoveTimeRef = useRef(0);
  const colorRef = useRef(randomColor());
  const animationRef = useRef(null);

  useEffect(() => {
    if (window.innerWidth <= customTheme.breakpoint.tablet) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;

      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const pushPoint = point => {
      pointsRef.current.push({
        x: point.x,
        y: point.y,
        life: 1,
        color: colorRef.current,
      });

      lastDrawPointRef.current = {
        x: point.x,
        y: point.y,
      };
    };

    const addInterpolatedPoint = point => {
      const last = lastDrawPointRef.current;

      if (!last) {
        pushPoint(point);
        return;
      }

      const dx = point.x - last.x;
      const dy = point.y - last.y;
      const distance = Math.hypot(dx, dy);

      if (distance < 1) return;

      const steps = Math.max(1, Math.ceil(distance / 3));

      for (let i = 1; i <= steps; i++) {
        pushPoint({
          x: last.x + (dx * i) / steps,
          y: last.y + (dy * i) / steps,
        });
      }
    };

    const handleMouseMove = event => {
      const now = performance.now();

      if (now - lastMoveTimeRef.current > 220) {
        colorRef.current = randomColor();
        smoothRef.current = null;
        lastDrawPointRef.current = null;
      }

      mouseRef.current = {
        x: event.clientX,
        y: event.clientY,
      };

      if (!smoothRef.current) {
        smoothRef.current = {
          x: event.clientX,
          y: event.clientY,
        };

        addInterpolatedPoint(smoothRef.current);
      }

      lastMoveTimeRef.current = now;
    };

    const updateSmoothPoint = () => {
      const mouse = mouseRef.current;
      const smooth = smoothRef.current;

      if (!mouse || !smooth) return;

      const easing = 0.1;

      smooth.x += (mouse.x - smooth.x) * easing;
      smooth.y += (mouse.y - smooth.y) * easing;

      addInterpolatedPoint(smooth);
    };

    const drawGlowLine = points => {
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
        ctx.globalAlpha = alpha * 0.22;
        ctx.lineWidth = 1.5;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.shadowBlur = 10;
        ctx.shadowColor = p1.color;

        ctx.stroke();
      }
    };

    const draw = () => {
      updateSmoothPoint();

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      drawGlowLine(pointsRef.current);

      pointsRef.current = pointsRef.current
        .map(point => ({
          ...point,
          life: point.life - 0.008,
        }))
        .filter(point => point.life > 0);

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      animationRef.current = requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resize);

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return <Canvas ref={canvasRef} />;
};

export default AnimateCursor;