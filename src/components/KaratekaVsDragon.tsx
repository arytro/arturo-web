import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface KaratekaVsDragonProps {
  onComplete?: () => void;
}

export const KaratekaVsDragon: React.FC<KaratekaVsDragonProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'charging' | 'clash' | 'dragon_falling' | 'finish'>('charging');

  useEffect(() => {
    // 0s - 1.4s: Both charge towards center
    const clashTimer = setTimeout(() => {
      setPhase('clash');
    }, 1400);

    // 1.4s - 2.8s: Impact hits, Dragon falls down defeated
    const fallTimer = setTimeout(() => {
      setPhase('dragon_falling');
    }, 2000);

    // 3.8s: Complete sequence
    const endTimer = setTimeout(() => {
      setPhase('finish');
      onComplete?.();
    }, 4200);

    return () => {
      clearTimeout(clashTimer);
      clearTimeout(fallTimer);
      clearTimeout(endTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden select-none flex items-center justify-center">
      {/* Screen flash on hit */}
      <AnimatePresence>
        {phase === 'clash' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.7, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-amber-400/20 pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* KARATEKA ANIMATION */}
      <motion.div
        initial={{ x: '-45vw', y: 0 }}
        animate={
          phase === 'charging'
            ? { x: '-6vw', y: [0, -10, 0, -8, 0] }
            : phase === 'clash'
            ? { x: '-2vw', y: -22, scale: 1.25 }
            : { x: ['-2vw', '25vw'], y: [ -22, 0, 0] }
        }
        transition={{
          duration: phase === 'charging' ? 1.4 : phase === 'clash' ? 0.4 : 1.6,
          ease: 'easeOut',
        }}
        className="absolute top-1/2 -translate-y-1/2 z-30 flex flex-col items-center filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
      >
        <svg width="68" height="64" viewBox="0 0 74 70" fill="none">
          {/* Action lines */}
          <path d="M2 34L22 34" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
          {/* Headband */}
          <path d="M20 22C14 20 8 23 2 20" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
          {/* Head */}
          <circle cx="28" cy="22" r="8" fill="#FDE047" />
          <rect x="20" y="17" width="16" height="4" rx="1.5" fill="#EF4444" />
          {/* Determined Face */}
          <path d="M25 21L29 23" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M34 23L31 22" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" />
          <ellipse cx="30" cy="26" rx="2.5" ry="2" fill="#991B1B" />
          {/* White Gi & Body */}
          <path d="M22 30L36 30L34 46L22 46Z" fill="#FFFFFF" />
          <path d="M24 30L30 38M34 30L26 38" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" />
          {/* Black Belt */}
          <rect x="21" y="42" width="15" height="4.5" rx="1" fill="#111827" />
          <path d="M27 46L25 54M29 46L31 53" stroke="#111827" strokeWidth="2.5" strokeLinecap="round" />
          {/* Left Fist */}
          <path d="M22 32L17 38L22 40" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
          <circle cx="22" cy="40" r="2.5" fill="#FDE047" />
          {/* Flying Kick Leg (Outstretched) */}
          <path d="M33 42L48 40L62 38" stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" />
          <path d="M62 38L69 36" stroke="#FDE047" strokeWidth="5.5" strokeLinecap="round" />
          {/* Back Leg */}
          <path d="M26 44L16 48L12 55" stroke="#F3F4F6" strokeWidth="6" strokeLinecap="round" />
          <path d="M12 55L8 56" stroke="#FDE047" strokeWidth="4.5" strokeLinecap="round" />
        </svg>

        {/* Comic Shout Text */}
        <span className="text-[11px] font-black font-mono tracking-wider text-yellow-300 bg-black/85 px-2 py-0.5 rounded border border-yellow-500/50 mt-1 shadow-md">
          {phase === 'clash' || phase === 'dragon_falling' ? '¡¡K.O.!! 🥋💥' : '¡¡KIAI!! 🥋'}
        </span>
      </motion.div>

      {/* CLASH HIT BURST (Comic explosion on impact) */}
      <AnimatePresence>
        {(phase === 'clash' || phase === 'dragon_falling') && (
          <motion.div
            initial={{ scale: 0.2, rotate: -20, opacity: 1 }}
            animate={{ scale: [0.2, 1.4, 1.2], rotate: [0, 15, 0], opacity: [1, 1, 0] }}
            transition={{ duration: 0.7 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 flex items-center justify-center pointer-events-none"
          >
            <svg width="110" height="110" viewBox="0 0 100 100" fill="none">
              <path
                d="M50 0L58 35L95 20L72 50L100 70L65 72L68 100L45 78L20 95L32 62L0 55L30 38L10 12L42 28Z"
                fill="#FBBF24"
                stroke="#DC2626"
                strokeWidth="3"
              />
            </svg>
            <span className="absolute font-black text-rose-950 text-base tracking-tighter drop-shadow-sm font-sans">
              POW!
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DRAGON ANIMATION (Enters from right, faces left, gets hit and falls spiraling down) */}
      <motion.div
        initial={{ x: '45vw', y: -20, scaleX: -1 }} // scaleX: -1 makes it face left towards Karateka
        animate={
          phase === 'charging'
            ? { x: '8vw', y: [-10, 5, -10] }
            : phase === 'clash'
            ? { x: '12vw', y: -5, rotate: 35 }
            : { x: '24vw', y: '60vh', rotate: 220, opacity: [1, 0.9, 0] } // dragon defeated plunges down and disappears
        }
        transition={{
          duration: phase === 'charging' ? 1.4 : phase === 'clash' ? 0.4 : 1.6,
          ease: phase === 'dragon_falling' ? 'easeIn' : 'easeOut',
        }}
        className="absolute top-1/2 -translate-y-1/2 z-20 flex flex-col items-center filter drop-shadow-[0_4px_16px_rgba(239,68,68,0.6)]"
      >
        <div className="relative w-28 h-28 flex items-center justify-center">
          {/* Dragon Dizzy / Knockout Stars */}
          {phase === 'dragon_falling' && (
            <div className="absolute -top-3 flex items-center gap-1">
              <span className="text-yellow-300 animate-spin text-sm">💫</span>
              <span className="text-amber-400 animate-bounce text-xs">✨</span>
              <span className="text-yellow-200 animate-spin text-sm">💫</span>
            </div>
          )}

          <svg viewBox="0 0 120 120" width="100%" height="100%" fill="none">
            {/* Dragon Body */}
            <path
              d="M38 58C38 48 48 42 62 44C72 45 78 50 82 58C80 66 70 72 58 72C46 72 38 66 38 58Z"
              fill="#1E293B"
              stroke="#0F172A"
              strokeWidth="2"
            />
            {/* Belly scales */}
            <path d="M48 64C54 68 62 68 70 65C68 68 62 70 56 70C52 70 49 68 48 64Z" fill="#DC2626" />
            {/* Head & Neck */}
            <path
              d="M74 48C78 42 85 36 94 36C98 36 104 38 106 42C104 46 98 48 94 48C88 48 84 54 80 58Z"
              fill="#1E293B"
            />
            {/* Snout */}
            <path d="M94 36C98 34 106 35 110 38C112 40 108 43 104 44L94 45Z" fill="#0F172A" />
            {/* Horns */}
            <path d="M90 36C92 26 88 18 84 14C88 18 94 24 94 34Z" fill="#DC2626" />

            {/* Dragon Eye: Spirals/X when knocked out */}
            {phase === 'dragon_falling' ? (
              <g stroke="#EF4444" strokeWidth="2">
                <path d="M96 37L100 41M100 37L96 41" />
              </g>
            ) : (
              <ellipse cx="98" cy="39" rx="2.5" ry="3.5" fill="#FBBF24" />
            )}

            {/* Limp / Flapping Wings */}
            <path
              d="M62 50L75 10C88 16 102 24 108 36C96 40 88 46 76 48L62 50Z"
              fill="#475569"
              stroke="#1E293B"
              strokeWidth="2"
            />
          </svg>
        </div>

        {/* Dragon subtitle */}
        <span className="text-[10px] font-mono font-bold text-red-400 bg-black/80 px-2 py-0.5 rounded border border-red-500/30">
          {phase === 'dragon_falling' ? '¡El dragón cayó derrotado!' : '🐲 Dragón enfurecido'}
        </span>
      </motion.div>
    </div>
  );
};
