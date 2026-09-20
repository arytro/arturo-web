import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface KaratekaAndDwarfAllianceProps {
  onComplete?: () => void;
}

type Phase =
  | 'approach'          // 0s - 1.8s
  | 'greeting'          // 1.8s - 3.4s
  | 'fight'             // 3.4s - 8.8s (approx 5.4s of sparring!)
  | 'dragon_arrival'    // 8.8s - 11.0s
  | 'super_launch'      // 11.0s - 12.5s
  | 'mario_stomp'       // 12.5s - 14.5s
  | 'hug_and_leave';    // 14.5s - 18.5s

export const KaratekaAndDwarfAlliance: React.FC<KaratekaAndDwarfAllianceProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<Phase>('approach');
  const [fightTick, setFightTick] = useState<number>(0);

  useEffect(() => {
    // Phase 1: Greeting
    const t1 = setTimeout(() => setPhase('greeting'), 1800);

    // Phase 2: Fight / Sparring
    const t2 = setTimeout(() => setPhase('fight'), 3400);

    // Phase 3: Dragon Arrival
    const t3 = setTimeout(() => setPhase('dragon_arrival'), 8800);

    // Phase 4: Super launch
    const t4 = setTimeout(() => setPhase('super_launch'), 11000);

    // Phase 5: Mario Stomp
    const t5 = setTimeout(() => setPhase('mario_stomp'), 12500);

    // Phase 6: Hug and Leave
    const t6 = setTimeout(() => setPhase('hug_and_leave'), 14500);

    // End sequence
    const t7 = setTimeout(() => {
      onComplete?.();
    }, 18500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
      clearTimeout(t7);
    };
  }, [onComplete]);

  // Sparring punch/kick animation tick during 'fight' phase
  useEffect(() => {
    if (phase !== 'fight') return;
    const interval = setInterval(() => {
      setFightTick((prev) => prev + 1);
    }, 380);
    return () => clearInterval(interval);
  }, [phase]);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
      {/* Skip button in corner */}
      <button
        onClick={() => onComplete?.()}
        className="absolute top-4 right-4 z-50 flex items-center gap-1 px-3 py-1.5 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-700/60 text-xs font-mono backdrop-blur-md cursor-pointer touch-manipulation transition-all"
        title="Saltar animación"
      >
        <span>Saltar</span>
        <X className="w-3.5 h-3.5" />
      </button>

      {/* Cinematic Flash effects */}
      <AnimatePresence>
        {phase === 'mario_stomp' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-amber-400/25 pointer-events-none z-10"
          />
        )}
      </AnimatePresence>

      {/* Status banner on top */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 z-40">
        <motion.div
          key={phase}
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10 }}
          className="px-4 py-1.5 rounded-full bg-black/85 border border-amber-500/40 text-amber-200 text-xs font-mono font-medium shadow-lg backdrop-blur-md tracking-wide"
        >
          {phase === 'approach' && '✦ Encuentro en el camino...'}
          {phase === 'greeting' && '🥋 Saludo de respeto mutuo 🤝'}
          {phase === 'fight' && '💥 ¡Duelo de entrenamiento amistoso!'}
          {phase === 'dragon_arrival' && '🐲 ¡CUIDADO! Aparece un dragón salvaje'}
          {phase === 'super_launch' && '⚡ "¡Sube, yo te impulso!" — Super Salto'}
          {phase === 'mario_stomp' && '🍄 ¡¡SUPER PISOTÓN ESTILO MARIO!! 💥'}
          {phase === 'hug_and_leave' && '🫂 Victoria en equipo: Amigos para siempre ✨'}
        </motion.div>
      </div>

      {/* STAGE CONTAINER (Centered relative to viewport) */}
      <div className="relative w-full max-w-lg h-72 flex items-center justify-center pointer-events-none">
        {/* FLOOR SHADOW / GROUND LINE */}
        <div className="absolute bottom-6 w-3/4 h-3 bg-neutral-950/40 rounded-full blur-sm" />

        {/* -------------------- KARATEKA -------------------- */}
        <motion.div
          initial={{ x: '-45vw', y: 0 }}
          animate={
            phase === 'approach'
              ? { x: -65, y: [0, -4, 0, -4, 0] }
              : phase === 'greeting'
              ? { x: -50, y: 0, rotate: 12 } // bowing
              : phase === 'fight'
              ? {
                  x: fightTick % 2 === 0 ? -38 : -60,
                  y: fightTick % 2 === 0 ? -12 : 0,
                  rotate: fightTick % 2 === 0 ? -10 : 5,
                }
              : phase === 'dragon_arrival'
              ? { x: -45, y: 0, rotate: 0 }
              : phase === 'super_launch'
              ? { x: -30, y: 10, rotate: 18 } // crouched down launching
              : phase === 'mario_stomp'
              ? { x: -35, y: -6, rotate: -5 } // cheering upward
              : { x: ['-20px', '45vw'], y: [0, -3, 0, -3, 0], opacity: [1, 1, 0] } // walking off together
          }
          transition={{
            duration: phase === 'approach' ? 1.8 : phase === 'hug_and_leave' ? 3.8 : 0.4,
            ease: 'easeOut',
          }}
          className="absolute bottom-8 z-30 flex flex-col items-center filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
        >
          {/* Action Callout */}
          <div className="h-6 flex items-center justify-center mb-1">
            {phase === 'greeting' && (
              <span className="text-[10px] font-mono font-bold bg-neutral-900 border border-neutral-700 px-1.5 py-0.5 rounded text-neutral-200">
                Oss! 🥋
              </span>
            )}
            {phase === 'fight' && (
              <span className="text-[10px] font-mono font-black bg-red-950 border border-red-500/60 px-1.5 py-0.5 rounded text-yellow-300">
                {fightTick % 2 === 0 ? '¡HAI! 👊' : '¡KIAI! 🦶'}
              </span>
            )}
            {phase === 'dragon_arrival' && (
              <span className="text-[10px] font-mono font-bold bg-amber-950 border border-amber-500 px-1.5 py-0.5 rounded text-amber-200">
                ¡El dragón! 🐲
              </span>
            )}
            {phase === 'super_launch' && (
              <span className="text-[10px] font-mono font-bold bg-blue-950 border border-blue-400 px-1.5 py-0.5 rounded text-blue-200">
                ¡¡SALTA!! 🚀
              </span>
            )}
            {phase === 'hug_and_leave' && (
              <span className="text-[10px] font-mono font-bold bg-emerald-950 border border-emerald-500 px-1.5 py-0.5 rounded text-emerald-200">
                Hermano 🫂
              </span>
            )}
          </div>

          {/* Karateka SVG */}
          <svg width="60" height="60" viewBox="0 0 74 70" fill="none">
            {/* Red Headband */}
            <path d="M20 22C14 20 8 23 2 20" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
            {/* Head */}
            <circle cx="28" cy="22" r="8" fill="#FDE047" />
            <rect x="20" y="17" width="16" height="4" rx="1.5" fill="#EF4444" />
            {/* Determined Face */}
            <path d="M25 21L29 23" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M34 23L31 22" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" />
            <ellipse cx="30" cy="26" rx="2" ry="1.8" fill="#991B1B" />
            {/* White Gi & Body */}
            <path d="M22 30L36 30L34 46L22 46Z" fill="#FFFFFF" />
            <path d="M24 30L30 38M34 30L26 38" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" />
            {/* Black Belt */}
            <rect x="21" y="42" width="15" height="4.5" rx="1" fill="#111827" />
            <path d="M27 46L25 54M29 46L31 53" stroke="#111827" strokeWidth="2.5" strokeLinecap="round" />
            {/* Arms / Pose */}
            {phase === 'super_launch' ? (
              // Hands cupped upward
              <path d="M22 32L34 38L42 34" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
            ) : phase === 'fight' && fightTick % 2 === 0 ? (
              // Flying kick pose
              <>
                <path d="M33 42L48 40L62 38" stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" />
                <path d="M62 38L69 36" stroke="#FDE047" strokeWidth="5.5" strokeLinecap="round" />
              </>
            ) : (
              // Normal stance
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
          initial={{ x: '45vw', y: 0, scaleX: -1 }} // scaleX: -1 faces left towards Karateka
          animate={
            phase === 'approach'
              ? { x: 65, y: [0, -3, 0, -3, 0], scaleX: -1 }
              : phase === 'greeting'
              ? { x: 50, y: 0, scaleX: -1, rotate: -10 } // tipping hat / bowing
              : phase === 'fight'
              ? {
                  x: fightTick % 2 === 0 ? 45 : 25,
                  y: fightTick % 2 === 0 ? -18 : 0, // jumping / dodging
                  scaleX: -1,
                  rotate: fightTick % 2 === 0 ? 20 : -10,
                }
              : phase === 'dragon_arrival'
              ? { x: 30, y: 0, scaleX: -1 }
              : phase === 'super_launch'
              ? { x: -15, y: -20, scaleX: 1, rotate: 15 } // stepping on Karateka's hands
              : phase === 'mario_stomp'
              ? {
                  // Super Mario Arc Jump: Rockets up to the sky, then stomps down on dragon
                  x: [ -15, 20, 60, 60 ],
                  y: [ -20, -160, -90, -40 ],
                  scale: [1, 1.4, 1.3, 1],
                  scaleX: 1,
                  rotate: [0, -25, 10, 0],
                }
              : {
                  // Lands, hugs karateka, and walks off together
                  x: [0, '48vw'],
                  y: [0, -3, 0, -3, 0],
                  scaleX: 1,
                  opacity: [1, 1, 0],
                }
          }
          transition={{
            duration:
              phase === 'approach'
                ? 1.8
                : phase === 'mario_stomp'
                ? 1.8
                : phase === 'hug_and_leave'
                ? 3.8
                : 0.4,
            ease: phase === 'mario_stomp' ? 'easeInOut' : 'easeOut',
          }}
          className="absolute bottom-8 z-30 flex flex-col items-center filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
        >
          {/* Dwarf Callout */}
          <div className="h-6 flex items-center justify-center mb-1">
            {phase === 'greeting' && (
              <span className="text-[10px] font-mono font-bold bg-neutral-900 border border-neutral-700 px-1.5 py-0.5 rounded text-neutral-200">
                ¡Hola! 🎩
              </span>
            )}
            {phase === 'fight' && (
              <span className="text-[10px] font-mono font-bold bg-amber-950 border border-amber-500/60 px-1.5 py-0.5 rounded text-amber-200">
                {fightTick % 2 === 0 ? '¡Hop! 💨' : '¡Dodge! ⚡'}
              </span>
            )}
            {phase === 'mario_stomp' && (
              <span className="text-[10px] font-mono font-black bg-rose-600 border border-white px-2 py-0.5 rounded text-white shadow-lg animate-bounce">
                ¡¡YA-HOO!! 🍄⭐
              </span>
            )}
            {phase === 'hug_and_leave' && (
              <span className="text-base animate-pulse">❤️</span>
            )}
          </div>

          {/* Dwarf Character SVG */}
          <svg width="54" height="54" viewBox="0 0 68 68" fill="none">
            {/* Red Dwarf Hat */}
            <path d="M18 24L32 4L44 24Z" fill="#DC2626" />
            {/* Face */}
            <circle cx="31" cy="28" r="8" fill="#FBBF24" />
            {/* White Beard */}
            <path d="M23 29C23 38 27 46 31 48C35 46 39 38 39 29Z" fill="#F3F4F6" />
            {/* Nose */}
            <circle cx="31" cy="31" r="2.5" fill="#F59E0B" />
            {/* Eyes */}
            <circle cx="28" cy="27" r="1.5" fill="#1F2937" />
            <circle cx="34" cy="27" r="1.5" fill="#1F2937" />
            {/* Green Tunic */}
            <rect x="22" y="40" width="18" height="16" rx="4" fill="#059669" />
            {/* Boots (feet ready to stomp) */}
            <ellipse cx="26" cy="57" rx="4.5" ry="2.5" fill="#78350F" />
            <ellipse cx="36" cy="57" rx="4.5" ry="2.5" fill="#78350F" />
          </svg>
        </motion.div>

        {/* -------------------- DRAGON -------------------- */}
        <AnimatePresence>
          {(phase === 'dragon_arrival' ||
            phase === 'super_launch' ||
            phase === 'mario_stomp') && (
            <motion.div
              initial={{ x: '50vw', y: -120, scaleX: -1 }} // Enters from top right
              animate={
                phase === 'dragon_arrival'
                  ? { x: 75, y: -40, scaleX: -1 } // hovers menacingly
                  : phase === 'super_launch'
                  ? { x: 65, y: -30, scaleX: -1 } // roaring
                  : {
                      // Mario stomps on it: dragon flattens, eyes roll, plunges down and vanishes!
                      x: [60, 65, 80],
                      y: [-25, 40, 260], // plunges down off screen
                      rotate: [0, 45, 240],
                      scaleY: [1, 0.45, 0.3], // squished by stomp
                      opacity: [1, 0.9, 0],
                    }
              }
              transition={{
                duration: phase === 'mario_stomp' ? 1.6 : 1.2,
                ease: phase === 'mario_stomp' ? 'easeIn' : 'easeOut',
              }}
              className="absolute z-25 flex flex-col items-center filter drop-shadow-[0_6px_20px_rgba(239,68,68,0.7)]"
            >
              {/* Dragon Dizzy Stars when stomped */}
              {phase === 'mario_stomp' && (
                <div className="flex items-center gap-1 -mb-2">
                  <span className="text-yellow-300 animate-spin text-sm">💫</span>
                  <span className="text-amber-400 text-sm">💥</span>
                  <span className="text-yellow-200 animate-spin text-sm">💫</span>
                </div>
              )}

              <div className="w-28 h-28 flex items-center justify-center">
                <svg viewBox="0 0 120 120" width="100%" height="100%" fill="none">
                  {/* Body */}
                  <path
                    d="M38 58C38 48 48 42 62 44C72 45 78 50 82 58C80 66 70 72 58 72C46 72 38 66 38 58Z"
                    fill="#1E293B"
                    stroke="#0F172A"
                    strokeWidth="2"
                  />
                  {/* Belly */}
                  <path d="M48 64C54 68 62 68 70 65C68 68 62 70 56 70C52 70 49 68 48 64Z" fill="#DC2626" />
                  {/* Head */}
                  <path
                    d="M74 48C78 42 85 36 94 36C98 36 104 38 106 42C104 46 98 48 94 48C88 48 84 54 80 58Z"
                    fill="#1E293B"
                  />
                  <path d="M94 36C98 34 106 35 110 38C112 40 108 43 104 44L94 45Z" fill="#0F172A" />
                  <path d="M90 36C92 26 88 18 84 14C88 18 94 24 94 34Z" fill="#DC2626" />

                  {/* Eye: X when stomped */}
                  {phase === 'mario_stomp' ? (
                    <g stroke="#EF4444" strokeWidth="2.5">
                      <path d="M95 36L101 42M101 36L95 42" />
                    </g>
                  ) : (
                    <ellipse cx="98" cy="39" rx="2.5" ry="3.5" fill="#FBBF24" />
                  )}

                  {/* Wings */}
                  <path
                    d="M62 50L75 10C88 16 102 24 108 36C96 40 88 46 76 48L62 50Z"
                    fill="#475569"
                    stroke="#1E293B"
                    strokeWidth="2"
                  />
                </svg>
              </div>

              <span className="text-[10px] font-mono font-bold text-red-300 bg-black/80 px-2 py-0.5 rounded border border-red-500/40">
                {phase === 'mario_stomp' ? '¡APLASTADO! 💥' : '🐲 ¡Dragón amenazante!'}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* IMPACT COMIC BURST ON STOMP */}
        <AnimatePresence>
          {phase === 'mario_stomp' && (
            <motion.div
              initial={{ scale: 0.2, opacity: 1 }}
              animate={{ scale: [0.2, 1.5, 1.2], opacity: [1, 1, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute z-40 top-20 right-28 flex items-center justify-center pointer-events-none"
            >
              <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
                <path
                  d="M50 0L58 35L95 20L72 50L100 70L65 72L68 100L45 78L20 95L32 62L0 55L30 38L10 12L42 28Z"
                  fill="#F59E0B"
                  stroke="#DC2626"
                  strokeWidth="3"
                />
              </svg>
              <span className="absolute font-black text-white text-base tracking-tighter drop-shadow-md font-sans">
                STOMP!
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* HUG HEARTS PARTICLES */}
        <AnimatePresence>
          {phase === 'hug_and_leave' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: [0, 1, 0], y: -50 }}
              transition={{ duration: 1.6, repeat: 2 }}
              className="absolute bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-2 z-40"
            >
              <span className="text-xl">✨</span>
              <span className="text-2xl">❤️</span>
              <span className="text-xl">✨</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
