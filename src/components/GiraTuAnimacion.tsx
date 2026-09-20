import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Dices, Flame } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { WalkingDwarf } from './WalkingDwarf';
import { Karateka } from './Karateka';
import { KaratekaVsDragon } from './KaratekaVsDragon';
import { DwarfVsDragon } from './DwarfVsDragon';
import { KaratekaVsDwarf } from './KaratekaVsDwarf';
import { KaratekaAndDwarfAlliance } from './KaratekaAndDwarfAlliance';

type AnimationType =
  | 'none'
  | 'enano'                      // 30%
  | 'karateka'                   // 30%
  | 'karateka_vs_dragon'         // 30%
  | 'karateka_vs_enano'          // 3%
  | 'enano_vs_dragon'            // 3%
  | 'enano_karateka_vs_dragon';  // 4%

interface RollResult {
  type: AnimationType;
  title: string;
  description: string;
  chance: string;
  badgeColor: string;
  isRare: boolean;
}

const ANIMATION_INFO: Record<AnimationType, RollResult> = {
  none: {
    type: 'none',
    title: '¿Qué animación te tocará?',
    description: 'Presiona el botón para girar la ruleta de animaciones con probabilidad pura.',
    chance: '',
    badgeColor: 'border-neutral-700 bg-neutral-900/60 text-neutral-400',
    isRare: false,
  },
  enano: {
    type: 'enano',
    title: 'El Enano Caminante 🍄',
    description: 'El enano cruza la pantalla con su pipa y paso alegre.',
    chance: '30%',
    badgeColor: 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300',
    isRare: false,
  },
  karateka: {
    type: 'karateka',
    title: 'El Karateka Marcial 🥋',
    description: 'El maestro de artes marciales realiza su recorrido y patada.',
    chance: '30%',
    badgeColor: 'border-yellow-500/40 bg-yellow-950/40 text-yellow-300',
    isRare: false,
  },
  karateka_vs_dragon: {
    type: 'karateka_vs_dragon',
    title: 'Karateka vs Dragón 🥋🐲',
    description: '¡El karateka intercepta al dragón en pleno vuelo y lo noquea!',
    chance: '30%',
    badgeColor: 'border-orange-500/40 bg-orange-950/40 text-orange-300',
    isRare: false,
  },
  karateka_vs_enano: {
    type: 'karateka_vs_enano',
    title: 'Karateka vs Enano 🥋🍄',
    description: '¡Duelo de artes marciales y reflejos entre dos grandes luchadores!',
    chance: '3%',
    badgeColor: 'border-cyan-500/50 bg-cyan-950/50 text-cyan-200',
    isRare: true,
  },
  enano_vs_dragon: {
    type: 'enano_vs_dragon',
    title: 'Enano vs Dragón 🔥🐲',
    description: 'El dragón desciende del cielo, calcina al enano y huye volando.',
    chance: '3%',
    badgeColor: 'border-red-500/50 bg-red-950/50 text-red-200',
    isRare: true,
  },
  enano_karateka_vs_dragon: {
    type: 'enano_karateka_vs_dragon',
    title: 'Alianza Épica: Súper Salto Mario ⭐🍄🥋',
    description: 'Pelean, se hacen amigos, el karateka impulsa al enano y con un pisotón estilo Mario vencen al dragón.',
    chance: '4%',
    badgeColor: 'border-purple-500/60 bg-purple-950/60 text-purple-200',
    isRare: true,
  },
};

export const GiraTuAnimacion: React.FC = () => {
  const { isLight } = useTheme();
  const [activeAnimation, setActiveAnimation] = useState<AnimationType>('none');
  const [lastResult, setLastResult] = useState<RollResult>(ANIMATION_INFO.none);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [spinCount, setSpinCount] = useState<number>(0);

  // Pure probability roll handler (100% total)
  // 30% Enano (0.00 to 0.30)
  // 30% Karateka (0.30 to 0.60)
  // 30% Karateka vs Dragón (0.60 to 0.90)
  // 3% Karateka vs Enano (0.90 to 0.93)
  // 3% Enano vs Dragón (0.93 to 0.96)
  // 4% Enano y Karateka vs Dragón (0.96 to 1.00)
  const handleSpin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setActiveAnimation('none');

    setTimeout(() => {
      setIsSpinning(false);
      const roll = Math.random();
      let chosenType: AnimationType;

      if (roll < 0.30) {
        chosenType = 'enano';
      } else if (roll < 0.60) {
        chosenType = 'karateka';
      } else if (roll < 0.90) {
        chosenType = 'karateka_vs_dragon';
      } else if (roll < 0.93) {
        chosenType = 'karateka_vs_enano';
      } else if (roll < 0.96) {
        chosenType = 'enano_vs_dragon';
      } else {
        chosenType = 'enano_karateka_vs_dragon';
      }

      setLastResult(ANIMATION_INFO[chosenType]);
      setActiveAnimation(chosenType);
      setSpinCount((prev) => prev + 1);
    }, 700);
  };

  const handleAnimationComplete = () => {
    setActiveAnimation('none');
  };

  return (
    <section className="w-full my-5 flex flex-col items-center select-none" id="gira-tu-animacion">
      {/* ACTIVE FULL-SCREEN ANIMATIONS */}
      <AnimatePresence>
        {activeAnimation === 'enano' && (
          <WalkingDwarf
            onComplete={handleAnimationComplete}
          />
        )}
        {activeAnimation === 'karateka' && (
          <Karateka
            onComplete={handleAnimationComplete}
          />
        )}
        {activeAnimation === 'karateka_vs_dragon' && (
          <KaratekaVsDragon
            onComplete={handleAnimationComplete}
          />
        )}
        {activeAnimation === 'karateka_vs_enano' && (
          <KaratekaVsDwarf
            onComplete={handleAnimationComplete}
          />
        )}
        {activeAnimation === 'enano_vs_dragon' && (
          <DwarfVsDragon
            onComplete={handleAnimationComplete}
          />
        )}
        {activeAnimation === 'enano_karateka_vs_dragon' && (
          <KaratekaAndDwarfAlliance
            onComplete={handleAnimationComplete}
          />
        )}
      </AnimatePresence>

      {/* MAIN CARD CONTAINER */}
      <motion.div
        layout
        className={`w-full relative rounded-2xl border p-5 shadow-xl backdrop-blur-md overflow-hidden flex flex-col items-center text-center transition-all duration-300 ${
          isLight
            ? 'bg-white/90 border-neutral-200/90 shadow-neutral-200/50'
            : 'bg-neutral-900/60 border-neutral-800/80 shadow-black/40'
        }`}
      >
        {/* Subtle decorative glow */}
        <div
          className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-20 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"
          aria-hidden="true"
        />

        {/* Header with Title */}
        <div className="w-full flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-lg border flex items-center justify-center ${
              isLight
                ? 'bg-amber-100/70 border-amber-300/80 text-amber-700'
                : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
            }`}>
              <Dices className="w-4 h-4" />
            </div>
            <h2 className={`text-sm sm:text-base font-semibold tracking-tight transition-colors ${
              isLight ? 'text-neutral-900' : 'text-neutral-100'
            }`}>
              Gira tu animación
            </h2>
          </div>

          {spinCount > 0 && (
            <span className={`text-[11px] font-mono px-2 py-0.5 rounded-md border ${
              isLight
                ? 'bg-neutral-100 border-neutral-200 text-neutral-600'
                : 'bg-neutral-800/50 border-neutral-700/40 text-neutral-400'
            }`}>
              Tirada #{spinCount}
            </span>
          )}
        </div>

        {/* Display / Outcome Area */}
        <div className={`w-full min-h-[110px] my-2 p-3.5 rounded-xl border flex flex-col items-center justify-center relative overflow-hidden transition-colors ${
          isLight
            ? 'bg-neutral-50/90 border-neutral-200/90'
            : 'bg-neutral-950/60 border-neutral-800/60'
        }`}>
          <AnimatePresence mode="wait">
            {isSpinning ? (
              <motion.div
                key="spinning"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex flex-col items-center gap-2 py-3"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.7, ease: 'linear', repeat: Infinity }}
                >
                  <Dices className={`w-7 h-7 ${isLight ? 'text-amber-600' : 'text-amber-400'}`} />
                </motion.div>
                <span className={`text-xs font-mono font-medium animate-pulse ${
                  isLight ? 'text-amber-700' : 'text-amber-300'
                }`}>
                  GIRANDO RULETA...
                </span>
              </motion.div>
            ) : (
              <motion.div
                key={lastResult.title}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col items-center text-center gap-1.5 w-full"
              >
                {lastResult.chance && (
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${lastResult.badgeColor}`}
                    >
                      {lastResult.chance} PROBABILIDAD
                    </span>
                    {lastResult.isRare && (
                      <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full border flex items-center gap-0.5 ${
                        isLight
                          ? 'bg-amber-100 text-amber-800 border-amber-300'
                          : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      }`}>
                        <Flame className="w-2.5 h-2.5" />
                        ÉPICO
                      </span>
                    )}
                  </div>
                )}

                <h3 className={`text-sm sm:text-base font-bold transition-colors ${
                  isLight ? 'text-neutral-900' : 'text-neutral-100'
                }`}>
                  {lastResult.title}
                </h3>
                <p className={`text-xs leading-relaxed max-w-[340px] transition-colors ${
                  isLight ? 'text-neutral-600' : 'text-neutral-400'
                }`}>
                  {lastResult.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Spin Button */}
        <button
          onClick={handleSpin}
          disabled={isSpinning}
          id="btn-girar-animacion"
          className="w-full mt-3 py-3 px-4 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer touch-manipulation shadow-md bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 text-neutral-950 font-semibold hover:brightness-110 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Sparkles className={`w-4 h-4 ${isSpinning ? 'animate-spin' : ''}`} />
          <span>{isSpinning ? 'Girando...' : '✦ Girar animación'}</span>
        </button>

        {/* Probabilities Guide Table */}
        <div className={`w-full mt-4 pt-3 border-t flex flex-col items-center ${
          isLight ? 'border-neutral-200' : 'border-neutral-800/60'
        }`}>
          <span className={`text-[10px] font-mono uppercase tracking-wider mb-2 ${
            isLight ? 'text-neutral-500' : 'text-neutral-500'
          }`}>
            Probabilidades de aparición
          </span>
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-left text-[11px] font-mono">
            <div className={`px-2 py-1 rounded border flex items-center justify-between ${
              isLight
                ? 'bg-neutral-50 border-neutral-200 text-neutral-700'
                : 'bg-neutral-950/40 border-neutral-800/50 text-neutral-400'
            }`}>
              <span className="truncate">🍄 Enano</span>
              <span className={`font-bold ml-1 ${isLight ? 'text-neutral-900' : 'text-neutral-200'}`}>30%</span>
            </div>
            <div className={`px-2 py-1 rounded border flex items-center justify-between ${
              isLight
                ? 'bg-neutral-50 border-neutral-200 text-neutral-700'
                : 'bg-neutral-950/40 border-neutral-800/50 text-neutral-400'
            }`}>
              <span className="truncate">🥋 Karateka</span>
              <span className={`font-bold ml-1 ${isLight ? 'text-neutral-900' : 'text-neutral-200'}`}>30%</span>
            </div>
            <div className={`px-2 py-1 rounded border flex items-center justify-between ${
              isLight
                ? 'bg-neutral-50 border-neutral-200 text-neutral-700'
                : 'bg-neutral-950/40 border-neutral-800/50 text-neutral-400'
            }`}>
              <span className="truncate">🥋🐲 Kar. vs Drg</span>
              <span className={`font-bold ml-1 ${isLight ? 'text-neutral-900' : 'text-neutral-200'}`}>30%</span>
            </div>
            <div className={`px-2 py-1 rounded border flex items-center justify-between ${
              isLight
                ? 'bg-cyan-50/80 border-cyan-200 text-cyan-800'
                : 'bg-neutral-950/40 border-cyan-500/20 text-cyan-300'
            }`}>
              <span className="truncate">🥋🍄 Kar. vs Enano</span>
              <span className="font-bold ml-1">3%</span>
            </div>
            <div className={`px-2 py-1 rounded border flex items-center justify-between ${
              isLight
                ? 'bg-red-50/80 border-red-200 text-red-800'
                : 'bg-neutral-950/40 border-red-500/20 text-red-300'
            }`}>
              <span className="truncate">🍄🐲 Enano vs Drg</span>
              <span className="font-bold ml-1">3%</span>
            </div>
            <div className={`px-2 py-1 rounded border flex items-center justify-between ${
              isLight
                ? 'bg-purple-50/80 border-purple-200 text-purple-800'
                : 'bg-neutral-950/40 border-purple-500/20 text-purple-300'
            }`}>
              <span className="truncate">⭐ Alianza Mario</span>
              <span className="font-bold ml-1">4%</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
