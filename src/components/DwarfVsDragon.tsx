import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface DwarfVsDragonProps {
  onComplete?: () => void;
}

export const DwarfVsDragon: React.FC<DwarfVsDragonProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'dwarf_walk' | 'dragon_approach' | 'dragon_burn' | 'dragon_flies_away'>('dwarf_walk');

  useEffect(() => {
    // 0 - 1.2s: Dwarf walks to center
    const t1 = setTimeout(() => {
      setPhase('dragon_approach');
    }, 1200);

    // 1.2s - 2.4s: Dragon hovers close and breathes fire!
    const t2 = setTimeout(() => {
      setPhase('dragon_burn');
    }, 2200);

    // 2.4s - 3.8s: Dwarf is burnt away, Dragon ascends and flies off
    const t3 = setTimeout(() => {
      setPhase('dragon_flies_away');
    }, 3400);

    // 4.6s: Complete sequence
    const t4 = setTimeout(() => {
      onComplete?.();
    }, 4600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden select-none flex items-center justify-center">
      {/* SCREEN FIRE GLOW DURING BURN */}
      <AnimatePresence>
        {phase === 'dragon_burn' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0.4, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-gradient-to-t from-red-600/30 via-orange-500/20 to-transparent pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* ENANO / DWARF (Walks to center, pauses, gets burned into ashes/disappears) */}
      <motion.div
        initial={{ x: '-40vw', y: 15 }}
        animate={
          phase === 'dwarf_walk'
            ? { x: '-4vw', y: 15 }
            : phase === 'dragon_approach'
            ? { x: '-4vw', y: 15, scale: [1, 1.1, 1] } // nervous shivering
            : phase === 'dragon_burn'
            ? { x: '-4vw', y: 15, filter: ['brightness(1)', 'brightness(2.5)', 'brightness(0.2)'] }
            : { x: '-4vw', y: 15, opacity: 0, scale: 0.2 } // disappeared in smoke!
        }
        transition={{
          duration: phase === 'dwarf_walk' ? 1.2 : 0.8,
          ease: 'easeOut',
        }}
        className="absolute top-1/2 -translate-y-1/2 z-20 flex flex-col items-center filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]"
      >
        <div className="relative flex items-center justify-center">
          {/* Burnt smoke puffs when incinerated */}
          {phase === 'dragon_burn' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: [0, 1, 0], scale: [0.8, 1.6, 2], y: -30 }}
              transition={{ duration: 0.8 }}
              className="absolute -top-6 flex items-center gap-1 z-30"
            >
              <span className="text-xl">💨</span>
              <span className="text-lg">🔥</span>
              <span className="text-xl">💨</span>
            </motion.div>
          )}

          {/* Dwarf SVG Character */}
          <svg width="60" height="60" viewBox="0 0 68 68" fill="none">
            {/* Pointy Dwarf Hat */}
            <path
              d="M18 24L32 4L44 24Z"
              fill={phase === 'dragon_burn' ? '#1F2937' : '#DC2626'}
            />
            {/* Face */}
            <circle
              cx="31"
              cy="28"
              r="8"
              fill={phase === 'dragon_burn' ? '#4B5563' : '#FBBF24'}
            />
            {/* Big Dwarf Beard */}
            <path
              d="M23 29C23 38 27 46 31 48C35 46 39 38 39 29Z"
              fill={phase === 'dragon_burn' ? '#374151' : '#F3F4F6'}
            />
            {/* Round Nose */}
            <circle
              cx="31"
              cy="31"
              r="2.5"
              fill={phase === 'dragon_burn' ? '#1F2937' : '#F59E0B'}
            />
            {/* Surprised Eyes */}
            {phase === 'dragon_approach' || phase === 'dragon_burn' ? (
              <g fill="#1F2937">
                <circle cx="28" cy="27" r="1.8" />
                <circle cx="34" cy="27" r="1.8" />
              </g>
            ) : (
              <g stroke="#1F2937" strokeWidth="1.5">
                <path d="M28 27L30 27" />
                <path d="M32 27L34 27" />
              </g>
            )}
            {/* Torso / Tunic */}
            <rect
              x="22"
              y="40"
              width="18"
              height="16"
              rx="4"
              fill={phase === 'dragon_burn' ? '#111827' : '#059669'}
            />
            {/* Feet */}
            <ellipse cx="26" cy="57" rx="3.5" ry="2" fill="#78350F" />
            <ellipse cx="36" cy="57" rx="3.5" ry="2" fill="#78350F" />
          </svg>
        </div>

        {/* Comic Status Bubble */}
        <span className="text-[10px] font-mono font-bold text-amber-200 bg-black/85 px-2 py-0.5 rounded border border-amber-500/40 mt-1 shadow-md">
          {phase === 'dwarf_walk'
            ? '♪ Enano paseando...'
            : phase === 'dragon_approach'
            ? '¡¿Qué es eso arriba?! 😨'
            : phase === 'dragon_burn'
            ? '¡¡Aaaaaah!! 🔥'
            : '🪦 Enano calcinado'}
        </span>
      </motion.div>

      {/* DRAGON ANIMATION (Swoops in, hovers over enano, incinerates him with fire, then flies away into sky) */}
      <motion.div
        initial={{ x: '50vw', y: '-35vh', scaleX: -1 }} // scaleX: -1 faces left towards enano
        animate={
          phase === 'dwarf_walk'
            ? { x: '50vw', y: '-35vh', scaleX: -1 }
            : phase === 'dragon_approach'
            ? { x: '12vw', y: 0, scaleX: -1 } // hovers right in front of enano
            : phase === 'dragon_burn'
            ? { x: '10vw', y: 0, scaleX: -1, scale: 1.15 } // breathing inferno
            : { x: '-60vw', y: '-45vh', scaleX: -1, scale: 0.7 } // flies away into the sky and disappears!
        }
        transition={{
          duration:
            phase === 'dragon_approach'
              ? 1.0
              : phase === 'dragon_burn'
              ? 0.4
              : 1.6,
          ease: 'easeInOut',
        }}
        className="absolute top-1/2 -translate-y-1/2 z-30 flex flex-col items-center filter drop-shadow-[0_6px_20px_rgba(239,68,68,0.7)]"
      >
        <div className="relative w-32 h-32 flex items-center justify-center">
          {/* FIRE BREATH BLAST (Aimed directly at the Enano) */}
          <AnimatePresence>
            {phase === 'dragon_burn' && (
              <motion.div
                initial={{ opacity: 0, scaleX: 0.2 }}
                animate={{ opacity: 1, scaleX: [0.5, 1.4, 1.2], scaleY: [0.8, 1.3, 1] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.1 }}
                style={{ transformOrigin: 'right center' }}
                className="absolute right-[80%] top-[40%] pointer-events-none z-40 flex items-center"
              >
                <svg width="120" height="50" viewBox="0 0 120 50" fill="none">
                  {/* Outer Wild Fire */}
                  <path
                    d="M120 25C90 10 50 0 0 6C30 20 15 32 0 44C50 42 90 40 120 25Z"
                    fill="url(#dwarfBurnFireOuter)"
                  />
                  {/* Core Yellow Blast */}
                  <path
                    d="M120 25C95 16 65 8 20 14C45 22 35 28 20 36C65 34 95 32 120 25Z"
                    fill="url(#dwarfBurnFireInner)"
                  />
                  <defs>
                    <linearGradient id="dwarfBurnFireOuter" x1="120" y1="25" x2="0" y2="25" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#F97316" />
                      <stop offset="0.6" stopColor="#EF4444" />
                      <stop offset="1" stopColor="#B91C1C" stopOpacity="0.8" />
                    </linearGradient>
                    <linearGradient id="dwarfBurnFireInner" x1="120" y1="25" x2="20" y2="25" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#FFFBEB" />
                      <stop offset="0.5" stopColor="#FDE047" />
                      <stop offset="1" stopColor="#F97316" />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Dragon Body */}
          <svg viewBox="0 0 120 120" width="100%" height="100%" fill="none">
            {/* Tail */}
            <path
              d="M42 66C30 72 16 78 6 72C2 70 4 64 8 62C14 60 22 64 36 62Z"
              fill="#1E293B"
              stroke="#0F172A"
              strokeWidth="1.5"
            />
            {/* Torso */}
            <path
              d="M38 58C38 48 48 42 62 44C72 45 78 50 82 58C80 66 70 72 58 72C46 72 38 66 38 58Z"
              fill="#1E293B"
              stroke="#0F172A"
              strokeWidth="2"
            />
            {/* Belly scales */}
            <path d="M48 64C54 68 62 68 70 65C68 68 62 70 56 70C52 70 49 68 48 64Z" fill="#DC2626" />
            {/* Neck & Head */}
            <path
              d="M74 48C78 42 85 36 94 36C98 36 104 38 106 42C104 46 98 48 94 48C88 48 84 54 80 58Z"
              fill="#1E293B"
              stroke="#0F172A"
              strokeWidth="1.5"
            />
            {/* Jaw Open Wide for Fire */}
            <path d="M94 36C98 34 106 35 110 38C112 40 108 43 104 44L94 45Z" fill="#0F172A" />
            <path d="M96 46L108 50C106 53 101 54 97 51Z" fill="#0F172A" />
            {/* Horns */}
            <path d="M90 36C92 26 88 18 84 14C88 18 94 24 94 34Z" fill="#DC2626" />
            {/* Eye */}
            <ellipse cx="98" cy="39" rx="2.5" ry="3.5" fill="#FBBF24" />
            {/* Flapping Wings */}
            <motion.path
              animate={{
                transform: ['rotate(0deg)', 'rotate(30deg)', 'rotate(0deg)'],
              }}
              transition={{ repeat: Infinity, duration: 0.4 }}
              style={{ transformOrigin: '62px 50px' }}
              d="M62 50L75 10C88 16 102 24 108 36C96 40 88 46 76 48L62 50Z"
              fill="#475569"
              stroke="#1E293B"
              strokeWidth="2"
            />
          </svg>
        </div>

        {/* Dragon Comic Subtitle */}
        <span className="text-[10px] font-mono font-bold text-rose-300 bg-black/85 px-2 py-0.5 rounded border border-rose-500/40">
          {phase === 'dragon_burn'
            ? '¡DRACARYS! 🔥'
            : phase === 'dragon_flies_away'
            ? '¡El dragón se va volando!'
            : '🐲 Dragón acechando'}
        </span>
      </motion.div>
    </div>
  );
};
