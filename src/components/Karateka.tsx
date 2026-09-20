import React from 'react';
import { motion } from 'motion/react';

interface KaratekaProps {
  onComplete?: () => void;
}

export const Karateka: React.FC<KaratekaProps> = ({ onComplete }) => {
  return (
    <motion.div
      initial={{ x: '-40%' }}
      animate={{ x: '135%' }}
      transition={{
        duration: 3.4,
        ease: [0.22, 1, 0.36, 1], // dynamic martial sprint and leap
      }}
      onAnimationComplete={onComplete}
      className="absolute top-1/2 -translate-y-1/2 z-20 flex flex-col items-center pointer-events-none select-none"
    >
      {/* Karateka character with flying side kick / punch action */}
      <motion.div
        animate={{
          y: [4, -12, -8, 2, -6, 0],
          rotate: [-4, 6, -3, 5, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 0.8,
          ease: 'easeInOut',
        }}
        className="relative flex items-center justify-center filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]"
      >
        <svg
          width="62"
          height="58"
          viewBox="0 0 74 70"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Action speed lines behind */}
          <path d="M4 28L18 28" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          <path d="M2 34L22 34" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
          <path d="M6 40L16 40" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" opacity="0.6" />

          {/* Fluttering Red Headband Tails */}
          <motion.path
            animate={{
              d: [
                'M20 22C14 20 8 23 2 20',
                'M20 22C13 24 7 21 2 25',
                'M20 22C14 20 8 23 2 20',
              ],
            }}
            transition={{ repeat: Infinity, duration: 0.4 }}
            stroke="#DC2626"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <motion.path
            animate={{
              d: [
                'M20 25C13 25 7 28 3 26',
                'M20 25C14 28 8 26 3 30',
                'M20 25C13 25 7 28 3 26',
              ],
            }}
            transition={{ repeat: Infinity, duration: 0.35, delay: 0.05 }}
            stroke="#B91C1C"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Head */}
          <circle cx="28" cy="22" r="8" fill="#FDE047" />

          {/* Red Headband (Hachimaki) on forehead */}
          <rect x="20" y="17" width="16" height="4" rx="1.5" fill="#EF4444" />
          <circle cx="28" cy="19" r="1.5" fill="#FFFFFF" />

          {/* Determined Karateka Face */}
          {/* Eyebrows */}
          <path d="M25 21L29 23" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M34 23L31 22" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" />
          {/* Open shout mouth "KIAI!" */}
          <ellipse cx="30" cy="26" rx="2.5" ry="2" fill="#991B1B" />

          {/* Back Leg (coiled for kick) */}
          <path
            d="M26 44L16 48L12 55"
            stroke="#F3F4F6"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Back Foot (barefoot) */}
          <path d="M12 55L8 56" stroke="#FDE047" strokeWidth="4.5" strokeLinecap="round" />

          {/* White Karate Gi (Torso) */}
          <path
            d="M22 30L36 30L34 46L22 46Z"
            fill="#FFFFFF"
          />
          {/* V-neck lapel crossover */}
          <path d="M24 30L30 38" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" />
          <path d="M34 30L26 38" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" />

          {/* Black Belt (Obi) */}
          <rect x="21" y="42" width="15" height="4.5" rx="1" fill="#111827" />
          {/* Hanging belt knot ends */}
          <path d="M27 46L25 54" stroke="#111827" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M29 46L31 53" stroke="#111827" strokeWidth="2.5" strokeLinecap="round" />

          {/* Left Fist (Chambered guard punch) */}
          <path
            d="M22 32L17 38L22 40"
            stroke="#FFFFFF"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="22" cy="40" r="2.5" fill="#FDE047" />

          {/* Flying Kick Leg (extended forward with force!) */}
          <path
            d="M33 42L48 40L62 38"
            stroke="#FFFFFF"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Karate Kicking Foot (Yoko-geri / Side Kick) */}
          <path d="M62 38L69 36" stroke="#FDE047" strokeWidth="5.5" strokeLinecap="round" />

          {/* Extended Punch / Guard Hand */}
          <path
            d="M34 33L48 30"
            stroke="#FFFFFF"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <circle cx="49" cy="30" r="3" fill="#FDE047" />

          {/* Impact Spark at the foot tip */}
          <circle cx="68" cy="36" r="3.5" fill="#EF4444" opacity="0.9" />
          <path d="M68 31L68 41M63 36L73 36" stroke="#FDE047" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </motion.div>

      {/* Tiny comic shout bubble & badge */}
      <div className="flex items-center gap-1 mt-0.5">
        <span className="text-[10px] font-bold font-mono tracking-wider text-rose-400 bg-black/75 px-1.5 py-0.5 rounded border border-rose-500/40 backdrop-blur-sm shadow-sm animate-pulse">
          ¡KIAI! 🥋 10% karateka
        </span>
      </div>
    </motion.div>
  );
};
