import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface KaratekaVsDwarfProps {
  onComplete?: () => void;
}

export const KaratekaVsDwarf: React.FC<KaratekaVsDwarfProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'intro' | 'sparring' | 'clash' | 'respect'>('intro');
  const [sparTick, setSparTick] = useState<number>(0);

  useEffect(() => {
    // 0s - 1.5s: Intro walk-in
    const t1 = setTimeout(() => setPhase('sparring'), 1500);

    // 1.5s - 6.5s: Rapid sparring (5 seconds of action)
    const t2 = setTimeout(() => setPhase('clash'), 6500);

    // 6.5s - 8.5s: Midair clash bounce back & bow
    const t3 = setTimeout(() => setPhase('respect'), 7800);

    // 9.5s: Done
    const t4 = setTimeout(() => onComplete?.(), 9800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  // Tick for sparring animations
  useEffect(() => {
    if (phase !== 'sparring') return;
    const interval = setInterval(() => {
      setSparTick((prev) => prev + 1);
    }, 350);
    return () => clearInterval(interval);
  }, [phase]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden select-none flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
      {/* Skip button */}
      <button
        onClick={() => onComplete?.()}
        className="pointer-events-auto absolute top-4 right-4 z-50 flex items-center gap-1 px-3 py-1.5 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-700/60 text-xs font-mono backdrop-blur-md cursor-pointer touch-manipulation transition-all"
        title="Saltar animación"
      >
        <span>Saltar</span>
        <X className="w-3.5 h-3.5" />
      </button>

      {/* Top Banner */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 z-40">
        <motion.div
          key={phase}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 py-1.5 rounded-full bg-black/85 border border-yellow-500/40 text-yellow-200 text-xs font-mono font-medium shadow-lg backdrop-blur-md"
        >
          {phase === 'intro' && '🥋 VS 🍄 ¡Duelo: Karateka contra Enano!'}
          {phase === 'sparring' && '💥 ¡Intercambio feroz de golpes y esquivas!'}
          {phase === 'clash' && '⚡ ¡CHOQUE DIRECTO!'}
          {phase === 'respect' && '🤝 ¡Empate técnico! Honor y respeto marcial'}
        </motion.div>
      </div>

      {/* STAGE CONTAINER */}
      <div className="relative w-full max-w-md h-64 flex items-center justify-center">
        {/* Floor shadow */}
        <div className="absolute bottom-6 w-3/4 h-3 bg-neutral-950/40 rounded-full blur-sm" />

        {/* -------------------- KARATEKA -------------------- */}
        <motion.div
          initial={{ x: '-45vw', y: 0 }}
          animate={
            phase === 'intro'
              ? { x: -60, y: [0, -4, 0, -4, 0] }
              : phase === 'sparring'
              ? {
                  x: sparTick % 2 === 0 ? -25 : -48,
                  y: sparTick % 2 === 0 ? -14 : 0,
                  rotate: sparTick % 2 === 0 ? -12 : 6,
                }
              : phase === 'clash'
              ? { x: -10, y: -16, scale: 1.15 }
              : { x: -55, y: 0, rotate: 10 } // respectful bow
          }
          transition={{
            duration: phase === 'intro' ? 1.5 : phase === 'clash' ? 0.3 : 0.35,
            ease: 'easeOut',
          }}
          className="absolute bottom-8 z-30 flex flex-col items-center filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
        >
          {/* Action callout */}
          <div className="h-6 flex items-center justify-center mb-1">
            {phase === 'sparring' && (
              <span className="text-[10px] font-mono font-black bg-red-950 border border-red-500/60 px-1.5 py-0.5 rounded text-yellow-300">
                {sparTick % 2 === 0 ? '¡HAI! 👊' : '¡KIAI! 🦶'}
              </span>
            )}
            {phase === 'respect' && (
              <span className="text-[10px] font-mono font-bold bg-neutral-900 border border-neutral-700 px-1.5 py-0.5 rounded text-neutral-200">
                ¡Bien jugado! 🥋
              </span>
            )}
          </div>

          {/* Karateka SVG */}
          <svg width="60" height="60" viewBox="0 0 74 70" fill="none">
            <path d="M20 22C14 20 8 23 2 20" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
            <circle cx="28" cy="22" r="8" fill="#FDE047" />
            <rect x="20" y="17" width="16" height="4" rx="1.5" fill="#EF4444" />
            <path d="M25 21L29 23" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M34 23L31 22" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" />
            <ellipse cx="30" cy="26" rx="2" ry="1.8" fill="#991B1B" />
            <path d="M22 30L36 30L34 46L22 46Z" fill="#FFFFFF" />
            <path d="M24 30L30 38M34 30L26 38" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" />
            <rect x="21" y="42" width="15" height="4.5" rx="1" fill="#111827" />
            <path d="M27 46L25 54M29 46L31 53" stroke="#111827" strokeWidth="2.5" strokeLinecap="round" />
            {phase === 'sparring' && sparTick % 2 === 0 ? (
              <>
                <path d="M33 42L48 40L62 38" stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" />
                <path d="M62 38L69 36" stroke="#FDE047" strokeWidth="5.5" strokeLinecap="round" />
              </>
            ) : (
              <>
                <path d="M22 32L17 38L22 40" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
                <circle cx="22" cy="40" r="2.5" fill="#FDE047" />
                <path d="M26 44L20 56M32 44L36 56" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
              </>
            )}
          </svg>
        </motion.div>

        {/* -------------------- DWARF -------------------- */}
        <motion.div
          initial={{ x: '45vw', y: 0, scaleX: -1 }}
          animate={
            phase === 'intro'
              ? { x: 60, y: [0, -3, 0, -3, 0], scaleX: -1 }
              : phase === 'sparring'
              ? {
                  x: sparTick % 2 === 0 ? 45 : 20,
                  y: sparTick % 2 === 0 ? -18 : 0,
                  scaleX: -1,
                  rotate: sparTick % 2 === 0 ? 18 : -8,
                }
              : phase === 'clash'
              ? { x: 10, y: -16, scaleX: -1.15 }
              : { x: 55, y: 0, scaleX: -1, rotate: -10 } // respectful tip of hat
          }
          transition={{
            duration: phase === 'intro' ? 1.5 : phase === 'clash' ? 0.3 : 0.35,
            ease: 'easeOut',
          }}
          className="absolute bottom-8 z-30 flex flex-col items-center filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
        >
          {/* Action callout */}
          <div className="h-6 flex items-center justify-center mb-1">
            {phase === 'sparring' && (
              <span className="text-[10px] font-mono font-bold bg-amber-950 border border-amber-500/60 px-1.5 py-0.5 rounded text-amber-200">
                {sparTick % 2 === 0 ? '¡BONK! 🔨' : '¡Esquiva! ⚡'}
              </span>
            )}
            {phase === 'respect' && (
              <span className="text-[10px] font-mono font-bold bg-neutral-900 border border-neutral-700 px-1.5 py-0.5 rounded text-neutral-200">
                ¡Gran pelea! 🎩
              </span>
            )}
          </div>

          {/* Dwarf SVG */}
          <svg width="54" height="54" viewBox="0 0 68 68" fill="none">
            <path d="M18 24L32 4L44 24Z" fill="#DC2626" />
            <circle cx="31" cy="28" r="8" fill="#FBBF24" />
            <path d="M23 29C23 38 27 46 31 48C35 46 39 38 39 29Z" fill="#F3F4F6" />
            <circle cx="31" cy="31" r="2.5" fill="#F59E0B" />
            <circle cx="28" cy="27" r="1.5" fill="#1F2937" />
            <circle cx="34" cy="27" r="1.5" fill="#1F2937" />
            <rect x="22" y="40" width="18" height="16" rx="4" fill="#059669" />
            <ellipse cx="26" cy="57" rx="4.5" ry="2.5" fill="#78350F" />
            <ellipse cx="36" cy="57" rx="4.5" ry="2.5" fill="#78350F" />
          </svg>
        </motion.div>

        {/* Clash impact burst */}
        <AnimatePresence>
          {phase === 'clash' && (
            <motion.div
              initial={{ scale: 0.2, opacity: 1 }}
              animate={{ scale: [0.2, 1.4, 1.1], opacity: [1, 1, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute z-40 flex items-center justify-center pointer-events-none"
            >
              <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                <path
                  d="M50 0L58 35L95 20L72 50L100 70L65 72L68 100L45 78L20 95L32 62L0 55L30 38L10 12L42 28Z"
                  fill="#F59E0B"
                  stroke="#DC2626"
                  strokeWidth="3"
                />
              </svg>
              <span className="absolute font-black text-white text-sm tracking-tighter drop-shadow-md">
                CLASH!
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
