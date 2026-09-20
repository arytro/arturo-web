import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

interface StargazeSkyProps {
  active: boolean;
}

export const StargazeSky: React.FC<StargazeSkyProps> = ({ active }) => {
  const { isLight } = useTheme();
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    // Generate 45 subtle stars spread across the screen
    const generated: Star[] = Array.from({ length: 45 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }));
    setStars(generated);
  }, []);

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none transition-opacity duration-700">
      {/* Subtle night nebula tint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className={`absolute inset-0 transition-colors duration-500 ${
          isLight
            ? 'bg-slate-950/45 backdrop-blur-[1px]'
            : 'bg-gradient-to-b from-indigo-950/25 via-purple-950/10 to-transparent'
        }`}
      />

      {/* Twinkling stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.2, 0.9, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            repeat: Infinity,
            duration: star.duration,
            delay: star.delay,
            ease: 'easeInOut',
          }}
          className="absolute rounded-full bg-white shadow-[0_0_6px_#fff]"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
        />
      ))}

      {/* Occasional shooting star */}
      <motion.div
        animate={{
          x: ['-20vw', '120vw'],
          y: ['10vh', '45vh'],
          opacity: [0, 1, 0],
        }}
        transition={{
          repeat: Infinity,
          repeatDelay: 4,
          duration: 1.8,
          ease: 'easeOut',
        }}
        className="absolute w-24 h-[1px] bg-gradient-to-r from-transparent via-cyan-200 to-white -rotate-12 blur-[0.5px]"
      />
    </div>
  );
};
