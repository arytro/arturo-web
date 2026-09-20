import React, { useEffect, useState, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  symbol: string;
  color: string;
}

const SYMBOLS = ['✦', '✧', '•', '⋆'];
const DARK_COLORS = ['#FDE047', '#E0E7FF', '#A7F3D0', '#F472B6', '#67E8F9'];
const LIGHT_COLORS = ['#D97706', '#4F46E5', '#059669', '#DB2777', '#0284C7'];

export const TouchSparkles: React.FC = () => {
  const { isLight } = useTheme();
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  const addSparkle = useCallback((x: number, y: number) => {
    const id = Date.now() + Math.random();
    const colors = isLight ? LIGHT_COLORS : DARK_COLORS;
    const newSparkle: Sparkle = {
      id,
      x: x + (Math.random() * 12 - 6),
      y: y + (Math.random() * 12 - 6),
      size: Math.random() * 6 + 10,
      symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
    };

    setSparkles((prev) => [...prev.slice(-14), newSparkle]);

    setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => s.id !== id));
    }, 650);
  }, [isLight]);

  useEffect(() => {
    let lastTime = 0;

    const handlePointerMove = (e: PointerEvent) => {
      const now = Date.now();
      if (now - lastTime > 65) {
        // Throttle to keep high performance
        lastTime = now;
        addSparkle(e.clientX, e.clientY);
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      addSparkle(e.clientX, e.clientY);
      addSparkle(e.clientX + 8, e.clientY - 8);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [addSparkle]);

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden select-none" aria-hidden="true">
      {sparkles.map((sparkle) => (
        <span
          key={sparkle.id}
          className="absolute animate-sparkle-fade font-serif"
          style={{
            left: `${sparkle.x}px`,
            top: `${sparkle.y}px`,
            fontSize: `${sparkle.size}px`,
            color: sparkle.color,
            transform: 'translate(-50%, -50%)',
            textShadow: `0 0 8px ${sparkle.color}`,
          }}
        >
          {sparkle.symbol}
        </span>
      ))}
    </div>
  );
};
