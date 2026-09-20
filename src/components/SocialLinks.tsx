import React from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

export const SocialLinks: React.FC = () => {
  const { isLight } = useTheme();

  return (
    <section className="w-full flex flex-col gap-3.5 my-4">
      {/* TikTok Button */}
      <motion.a
        href="https://www.tiktok.com/@arturo.anonimo_k"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        whileHover={{ scale: 1.015, y: -1 }}
        whileTap={{ scale: 0.98 }}
        className={`group relative flex items-center justify-between px-5 py-4 rounded-xl border transition-all duration-300 shadow-sm backdrop-blur-sm touch-manipulation ${
          isLight
            ? 'bg-white/90 hover:bg-white active:bg-neutral-50 border-neutral-200/90 hover:border-neutral-300 shadow-neutral-200/50'
            : 'bg-neutral-900/75 hover:bg-neutral-800/80 active:bg-neutral-800 border-neutral-800/80 hover:border-neutral-700/80'
        }`}
        id="tiktok-link-button"
      >
        <div className="flex items-center gap-3.5">
          <div className={`w-9 h-9 rounded-lg border flex items-center justify-center transition-colors ${
            isLight
              ? 'bg-neutral-100/90 border-neutral-200 text-neutral-800 group-hover:text-black group-hover:bg-neutral-200/70'
              : 'bg-neutral-800/90 border-neutral-700/50 text-neutral-200 group-hover:text-white'
          }`}>
            {/* Recognizable TikTok SVG */}
            <svg
              className="w-4 h-4 fill-current transition-transform duration-300 group-hover:scale-110"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-2.891 2.89 2.894 2.894 0 0 1-2.892-2.89 2.896 2.896 0 0 1 2.892-2.892c.307 0 .603.045.882.13V9.458a6.34 6.34 0 0 0-.882-.062C5.94 9.396 3 12.336 3 15.672 3 19.008 5.94 22 9.481 22c3.543 0 6.42-2.877 6.42-6.42V8.918a8.217 8.217 0 0 0 3.688 1.13v-3.362z" />
            </svg>
          </div>
          <div className="flex flex-col text-left">
            <span className={`text-xs uppercase tracking-wider font-semibold transition-colors ${
              isLight ? 'text-neutral-500 group-hover:text-neutral-700' : 'text-neutral-400 group-hover:text-neutral-300'
            }`}>
              TikTok
            </span>
            <span className={`text-sm font-medium tracking-tight transition-colors ${
              isLight ? 'text-neutral-900 group-hover:text-black' : 'text-white'
            }`}>
              Watch my videos <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
            </span>
          </div>
        </div>
        <span className={`text-xs font-mono transition-colors hidden xs:inline ${
          isLight ? 'text-neutral-400 group-hover:text-neutral-600' : 'text-neutral-500 group-hover:text-neutral-400'
        }`}>
          @arturo.anonimo_k
        </span>
      </motion.a>

      {/* Instagram Button */}
      <motion.a
        href="https://www.instagram.com/arturo.anonimo_k"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.38 }}
        whileHover={{ scale: 1.015, y: -1 }}
        whileTap={{ scale: 0.98 }}
        className={`group relative flex items-center justify-between px-5 py-4 rounded-xl border transition-all duration-300 shadow-sm backdrop-blur-sm touch-manipulation ${
          isLight
            ? 'bg-white/90 hover:bg-white active:bg-neutral-50 border-neutral-200/90 hover:border-neutral-300 shadow-neutral-200/50'
            : 'bg-neutral-900/75 hover:bg-neutral-800/80 active:bg-neutral-800 border-neutral-800/80 hover:border-neutral-700/80'
        }`}
        id="instagram-link-button"
      >
        <div className="flex items-center gap-3.5">
          <div className={`w-9 h-9 rounded-lg border flex items-center justify-center transition-colors ${
            isLight
              ? 'bg-neutral-100/90 border-neutral-200 text-neutral-800 group-hover:text-black group-hover:bg-neutral-200/70'
              : 'bg-neutral-800/90 border-neutral-700/50 text-neutral-200 group-hover:text-white'
          }`}>
            {/* Recognizable Instagram SVG */}
            <svg
              className="w-4 h-4 fill-none stroke-current stroke-2 transition-transform duration-300 group-hover:scale-110"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </div>
          <div className="flex flex-col text-left">
            <span className={`text-xs uppercase tracking-wider font-semibold transition-colors ${
              isLight ? 'text-neutral-500 group-hover:text-neutral-700' : 'text-neutral-400 group-hover:text-neutral-300'
            }`}>
              Instagram
            </span>
            <span className={`text-sm font-medium tracking-tight transition-colors ${
              isLight ? 'text-neutral-900 group-hover:text-black' : 'text-white'
            }`}>
              Find me on Instagram <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
            </span>
          </div>
        </div>
        <span className={`text-xs font-mono transition-colors hidden xs:inline ${
          isLight ? 'text-neutral-400 group-hover:text-neutral-600' : 'text-neutral-500 group-hover:text-neutral-400'
        }`}>
          @arturo.anonimo_k
        </span>
      </motion.a>
    </section>
  );
};
