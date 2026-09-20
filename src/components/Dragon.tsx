import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface DragonProps {
  onComplete?: () => void;
}

interface Waypoint {
  x: number; // in vw or px
  y: number; // in vh or px
  facing: number; // 1 = right, -1 = left
  angle: number; // rotation in deg
  breathingFire: boolean;
}

export const Dragon: React.FC<DragonProps> = ({ onComplete }) => {
  // Generate random flight path across the screen on mount
  const [waypoints, setWaypoints] = useState<Waypoint[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);

  useEffect(() => {
    // Generate a dramatic random flight trajectory across the viewport
    // Decide whether starting from left or right
    const startFromLeft = Math.random() > 0.5;

    const p0 = {
      x: startFromLeft ? -20 : 120,
      y: 15 + Math.random() * 40,
    };

    const p1 = {
      x: startFromLeft ? 25 + Math.random() * 20 : 75 - Math.random() * 20,
      y: 20 + Math.random() * 50,
    };

    const p2 = {
      x: startFromLeft ? 60 + Math.random() * 25 : 40 - Math.random() * 25,
      y: 10 + Math.random() * 65,
    };

    const p3 = {
      x: startFromLeft ? 30 + Math.random() * 40 : 70 - Math.random() * 40,
      y: 35 + Math.random() * 45,
    };

    const p4 = {
      x: startFromLeft ? 125 : -25,
      y: 10 + Math.random() * 70,
    };

    const rawPoints = [p0, p1, p2, p3, p4];

    const computedWaypoints: Waypoint[] = rawPoints.map((pt, idx) => {
      const next = rawPoints[Math.min(idx + 1, rawPoints.length - 1)];
      const dx = next.x - pt.x;
      const dy = next.y - pt.y;
      const facing = dx >= 0 ? 1 : -1;
      // Calculate pitch angle in degrees (clamped to natural flying tilt)
      const rawAngle = Math.atan2(dy, Math.abs(dx) || 1) * (180 / Math.PI);
      const angle = Math.max(-35, Math.min(35, rawAngle));

      return {
        x: pt.x,
        y: pt.y,
        facing,
        angle,
        breathingFire: idx >= 1 && idx <= 3, // breathes fire mid-flight
      };
    });

    setWaypoints(computedWaypoints);
  }, []);

  if (waypoints.length < 5) return null;

  // Keyframes for the flight path
  const xKeyframes = waypoints.map((w) => `${w.x}vw`);
  const yKeyframes = waypoints.map((w) => `${w.y}vh`);
  const scaleXKeyframes = waypoints.map((w) => w.facing);
  const rotateKeyframes = waypoints.map((w) => w.angle);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden select-none">
      {/* Flight tracking container */}
      <motion.div
        initial={{
          x: xKeyframes[0],
          y: yKeyframes[0],
          scaleX: scaleXKeyframes[0],
          rotate: rotateKeyframes[0],
        }}
        animate={{
          x: xKeyframes,
          y: yKeyframes,
          scaleX: scaleXKeyframes,
          rotate: rotateKeyframes,
        }}
        transition={{
          duration: 6.5,
          ease: 'easeInOut',
          times: [0, 0.25, 0.5, 0.75, 1],
        }}
        onAnimationComplete={onComplete}
        className="absolute top-0 left-0 w-36 h-36 -ml-18 -mt-18 flex items-center justify-center filter drop-shadow-[0_8px_20px_rgba(239,68,68,0.5)]"
      >
        {/* Breathing fire animation & dragon graphics */}
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Fire blast coming out from the mouth (facing forward to the right when scaleX is 1) */}
          <motion.div
            animate={{
              opacity: [0, 0.95, 1, 0.8, 1, 0.3, 1, 0],
              scale: [0.3, 1.1, 1.35, 1.2, 1.4, 0.8, 1.25, 0.2],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.1,
              ease: 'easeInOut',
            }}
            className="absolute left-[72%] top-[34%] pointer-events-none z-30 origin-left flex items-center"
          >
            {/* Core bright flame cone */}
            <div className="relative flex items-center">
              <svg width="90" height="42" viewBox="0 0 90 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Outer Red/Orange Flare */}
                <path
                  d="M0 21C18 12 36 2 86 6C74 18 84 26 88 36C56 34 34 40 0 21Z"
                  fill="url(#dragonFireOuter)"
                  opacity="0.85"
                />
                {/* Inner Yellow Core Flame */}
                <path
                  d="M0 21C14 15 28 8 66 12C58 20 64 24 68 30C44 28 26 31 0 21Z"
                  fill="url(#dragonFireCore)"
                />
                {/* White Hot Flame Center */}
                <path
                  d="M0 21C8 17 18 13 42 16C36 21 40 23 44 26C28 25 16 27 0 21Z"
                  fill="#FFFBEB"
                />
                <defs>
                  <linearGradient id="dragonFireOuter" x1="0" y1="21" x2="88" y2="21" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#F97316" />
                    <stop offset="0.6" stopColor="#EF4444" />
                    <stop offset="1" stopColor="#7F1D1D" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="dragonFireCore" x1="0" y1="21" x2="68" y2="21" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FEF08A" />
                    <stop offset="0.5" stopColor="#FBBF24" />
                    <stop offset="1" stopColor="#F97316" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Glowing fire sparks / embers */}
              <span className="absolute left-10 top-1 w-2 h-2 rounded-full bg-yellow-300 animate-ping" />
              <span className="absolute left-16 bottom-1 w-2.5 h-2.5 rounded-full bg-orange-400 animate-pulse" />
              <span className="absolute left-22 top-4 w-1.5 h-1.5 rounded-full bg-red-400" />
            </div>
          </motion.div>

          {/* Dragon Body & Wings SVG */}
          <div className="relative w-28 h-28">
            <svg
              viewBox="0 0 120 120"
              width="100%"
              height="100%"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="filter drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
            >
              {/* Animated Tail with spikes */}
              <motion.path
                animate={{
                  d: [
                    'M42 66C30 72 16 78 6 72C2 70 4 64 8 62C14 60 22 64 36 62Z',
                    'M42 66C28 78 12 85 4 82C0 80 2 74 6 70C12 66 22 66 36 62Z',
                    'M42 66C30 72 16 78 6 72C2 70 4 64 8 62C14 60 22 64 36 62Z',
                  ],
                }}
                transition={{ repeat: Infinity, duration: 0.9, ease: 'easeInOut' }}
                fill="#1E293B"
                stroke="#0F172A"
                strokeWidth="1.5"
              />
              {/* Tail spade */}
              <path d="M6 72L0 68L2 76L6 72Z" fill="#DC2626" />

              {/* Back Wing (flapping) */}
              <motion.path
                animate={{
                  transform: ['rotate(0deg)', 'rotate(-25deg)', 'rotate(0deg)'],
                }}
                transition={{ repeat: Infinity, duration: 0.5, ease: 'easeInOut' }}
                style={{ transformOrigin: '55px 45px' }}
                d="M55 45L45 15C55 18 68 22 75 32C68 36 62 42 55 45Z"
                fill="#334155"
                stroke="#1E293B"
                strokeWidth="1.5"
              />

              {/* Dragon Main Torso */}
              <path
                d="M38 58C38 48 48 42 62 44C72 45 78 50 82 58C80 66 70 72 58 72C46 72 38 66 38 58Z"
                fill="#1E293B"
                stroke="#0F172A"
                strokeWidth="2"
              />

              {/* Underbelly scales (crimson/amber glow) */}
              <path
                d="M48 64C54 68 62 68 70 65C68 68 62 70 56 70C52 70 49 68 48 64Z"
                fill="#DC2626"
                opacity="0.9"
              />
              <path d="M54 66L58 66" stroke="#FEF08A" strokeWidth="1" strokeLinecap="round" />
              <path d="M60 65L64 65" stroke="#FEF08A" strokeWidth="1" strokeLinecap="round" />

              {/* Dragon Neck and Head */}
              <path
                d="M74 48C78 42 85 36 94 36C98 36 104 38 106 42C104 46 98 48 94 48C88 48 84 54 80 58Z"
                fill="#1E293B"
                stroke="#0F172A"
                strokeWidth="1.5"
              />

              {/* Dragon Snout / Jaw */}
              <path
                d="M94 36C98 34 106 35 110 38C112 40 108 43 104 44L94 45Z"
                fill="#0F172A"
              />
              {/* Lower Jaw (Open for breathing fire) */}
              <path
                d="M96 46L106 47C105 49 101 51 98 50Z"
                fill="#0F172A"
              />
              {/* Sharp Fangs */}
              <path d="M102 44L103 46L104 44" stroke="#FFFFFF" strokeWidth="1.5" fill="#FFFFFF" />
              <path d="M99 49L100 47L101 49" stroke="#FFFFFF" strokeWidth="1" fill="#FFFFFF" />

              {/* Dragon Horns (Majestic red/gold) */}
              <path
                d="M90 36C92 26 88 18 84 14C88 18 94 24 94 34Z"
                fill="#DC2626"
              />
              <path
                d="M86 38C88 30 85 24 81 20C85 24 90 28 90 36Z"
                fill="#B91C1C"
              />

              {/* Glowing Dragon Eye */}
              <ellipse cx="98" cy="39" rx="2.5" ry="3.5" fill="#FBBF24" />
              <ellipse cx="98.5" cy="39" rx="1" ry="3" fill="#18181B" />
              <circle cx="97.5" cy="37.5" r="0.8" fill="#FFFFFF" />

              {/* Front Wing (flapping powerfully) */}
              <motion.path
                animate={{
                  transform: ['rotate(0deg)', 'rotate(32deg)', 'rotate(0deg)'],
                }}
                transition={{ repeat: Infinity, duration: 0.5, ease: 'easeInOut' }}
                style={{ transformOrigin: '62px 50px' }}
                d="M62 50L75 10C88 16 102 24 108 36C96 40 88 46 76 48L62 50Z"
                fill="#475569"
                stroke="#1E293B"
                strokeWidth="2"
              />

              {/* Wing web ribs */}
              <motion.path
                animate={{
                  transform: ['rotate(0deg)', 'rotate(32deg)', 'rotate(0deg)'],
                }}
                transition={{ repeat: Infinity, duration: 0.5, ease: 'easeInOut' }}
                style={{ transformOrigin: '62px 50px' }}
                d="M75 10L76 48M88 20L84 48M100 30L90 47"
                stroke="#EF4444"
                strokeWidth="1.2"
                strokeLinecap="round"
              />

              {/* Back spines */}
              <path d="M48 46L49 42L52 45" fill="#DC2626" />
              <path d="M58 43L60 38L63 44" fill="#DC2626" />
              <path d="M68 45L70 40L73 46" fill="#DC2626" />
            </svg>
          </div>
        </div>

        {/* Dragon label badge */}
        <div className="absolute -bottom-2 flex items-center justify-center">
          <span className="text-[10px] font-mono font-bold tracking-tight text-amber-300 bg-black/85 px-2 py-0.5 rounded-full border border-amber-500/40 backdrop-blur-md shadow-lg whitespace-nowrap">
            🔥 5% dragón
          </span>
        </div>
      </motion.div>
    </div>
  );
};
