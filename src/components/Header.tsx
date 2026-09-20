import React from 'react';
import { motion } from 'motion/react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  stargazeActive: boolean;
  onToggleStargaze: () => void;
}

export const Header: React.FC<HeaderProps> = ({ stargazeActive, onToggleStargaze }) => {
  const { isLight, toggleTheme } = useTheme();

  return (
    <header className="flex flex-col items-center text-center pt-5 pb-5 px-4 relative">
      {/* Top quick utility bar: Theme toggle & stargaze toggle */}
      <div className="w-full flex items-center justify-between mb-3">
        {/* Theme mode toggle: Claro / Oscuro */}
        <motion.button
          onClick={toggleTheme}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-all backdrop-blur-md shadow-sm select-none touch-manipulation cursor-pointer ${
            isLight
              ? 'bg-white/90 hover:bg-white border-neutral-300/80 text-neutral-800 shadow-neutral-200/50'
              : 'bg-neutral-900/80 hover:bg-neutral-800 border-neutral-800/80 text-neutral-300 hover:text-white'
          }`}
          id="theme-mode-button"
          title={isLight ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
        >
          {isLight ? (
            <>
              <Sun className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
              <span className="text-[11px] tracking-tight font-medium">Claro</span>
            </>
          ) : (
            <>
              <Moon className="w-3.5 h-3.5 text-blue-400 fill-blue-400" />
              <span className="text-[11px] tracking-tight font-medium">Oscuro</span>
            </>
          )}
        </motion.button>

        {/* Stargaze toggle */}
        <motion.button
          onClick={onToggleStargaze}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-all backdrop-blur-md shadow-sm select-none touch-manipulation cursor-pointer ${
            stargazeActive
              ? isLight
                ? 'bg-indigo-100 border-indigo-300 text-indigo-800'
                : 'bg-indigo-950/60 border-indigo-500/40 text-indigo-200'
              : isLight
                ? 'bg-white/90 hover:bg-white border-neutral-300/80 text-neutral-600 hover:text-neutral-900'
                : 'bg-neutral-900/80 hover:bg-neutral-800 border-neutral-800/80 text-neutral-400 hover:text-neutral-200'
          }`}
          id="stargaze-mode-button"
          title="Modo cielo estrellado"
        >
          <Moon className={`w-3.5 h-3.5 ${stargazeActive ? 'text-indigo-600 fill-indigo-600' : isLight ? 'text-neutral-400' : 'text-neutral-500'}`} />
          <span className="text-[11px] tracking-tight">{stargazeActive ? 'Stars: On' : 'Stars'}</span>
        </motion.button>
      </div>

      {/* Minimalist avatar / status halo with click feedback */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.92 }}
        onClick={onToggleStargaze}
        className="relative mb-4 cursor-pointer select-none group"
        title="Toca para activar el cielo estrellado ✦"
      >
        <div className={`w-16 h-16 rounded-full border flex items-center justify-center shadow-lg transition-all duration-300 ${
          isLight
            ? stargazeActive
              ? 'bg-gradient-to-b from-indigo-100 to-indigo-200 border-indigo-400 shadow-indigo-200/50'
              : 'bg-gradient-to-b from-white to-neutral-100 border-neutral-300/90 shadow-neutral-200/60 group-hover:border-neutral-400'
            : stargazeActive
              ? 'bg-gradient-to-b from-neutral-800 to-neutral-900 border-indigo-500/80 shadow-indigo-500/20'
              : 'bg-gradient-to-b from-neutral-800 to-neutral-900 border-neutral-700/60 group-hover:border-neutral-500 shadow-black/40'
        }`}>
          <span className={`text-xl font-medium tracking-tight transition-colors ${
            isLight ? 'text-neutral-800 group-hover:text-black' : 'text-neutral-200 group-hover:text-white'
          }`}>
            A
          </span>
        </div>
        {/* Subtle glowing presence dot */}
        <span className="absolute bottom-0 right-0 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
          <span className={`relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 ${
            isLight ? 'border-[#f4f5f7]' : 'border-[#0c0d10]'
          }`}></span>
        </span>
      </motion.div>

      {/* Primary Name */}
      <motion.h1
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.08 }}
        className={`text-2xl sm:text-3xl font-bold tracking-[0.2em] uppercase font-sans transition-colors duration-300 ${
          isLight ? 'text-neutral-900' : 'text-white'
        }`}
      >
        ARTURO
      </motion.h1>

      {/* Social Handle */}
      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.16 }}
        className={`text-sm font-mono mt-1.5 tracking-wide select-all transition-colors duration-300 ${
          isLight ? 'text-neutral-500' : 'text-neutral-400'
        }`}
      >
        @arturo.anonimo_k
      </motion.p>

      {/* Subtle tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.55, delay: 0.24 }}
        className={`text-xs sm:text-sm font-normal italic mt-2.5 tracking-normal transition-colors duration-300 ${
          isLight ? 'text-neutral-600' : 'text-neutral-400/90'
        }`}
      >
        just a little corner of the internet.
      </motion.p>
    </header>
  );
};
