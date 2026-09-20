import React from 'react';
import { useTheme } from '../context/ThemeContext';

export const Footer: React.FC = () => {
  const { isLight } = useTheme();

  return (
    <footer className={`w-full pt-10 pb-12 flex flex-col items-center justify-center text-center mt-auto border-t transition-colors duration-300 ${
      isLight ? 'border-neutral-200/90' : 'border-neutral-900/80'
    }`}>
      <p className={`text-xs font-medium tracking-wider transition-colors duration-300 ${
        isLight ? 'text-neutral-500' : 'text-neutral-400'
      }`}>
        © Arturo
      </p>
      <p className={`text-[11px] tracking-wide mt-1 font-sans transition-colors duration-300 ${
        isLight ? 'text-neutral-400' : 'text-neutral-600'
      }`}>
        made for the internet.
      </p>
    </footer>
  );
};
