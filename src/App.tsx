import React, { useState } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { Header } from './components/Header';
import { SocialLinks } from './components/SocialLinks';
import { SpotifySection } from './components/SpotifySection';
import { GiraTuAnimacion } from './components/GiraTuAnimacion';
import { Footer } from './components/Footer';
import { TouchSparkles } from './components/TouchSparkles';
import { StargazeSky } from './components/StargazeSky';

function AppContent() {
  const { isLight } = useTheme();
  const [stargazeActive, setStargazeActive] = useState<boolean>(false);

  const toggleStargaze = () => {
    setStargazeActive((prev) => !prev);
  };

  return (
    <div className={`relative min-h-screen w-full flex flex-col items-center justify-start overflow-x-hidden transition-colors duration-300 ${
      isLight ? 'bg-[#f4f5f7] text-[#18181b]' : 'bg-[#0c0d10] text-[#eaeaea]'
    }`}>
      {/* Interactive touch/cursor stardust trail */}
      <TouchSparkles />

      {/* Interactive night sky / stargaze mode */}
      <StargazeSky active={stargazeActive} />

      {/* Ambient background glow - adapted to light and dark modes */}
      <div 
        className={`fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[420px] blur-3xl pointer-events-none -z-10 transition-colors duration-500 ${
          isLight
            ? 'bg-gradient-to-b from-amber-200/25 via-indigo-100/30 to-transparent'
            : 'bg-gradient-to-b from-indigo-950/15 via-neutral-900/10 to-transparent'
        }`}
        aria-hidden="true"
      />

      {/* Atmospheric grain texture */}
      <div 
        className="fixed inset-0 bg-grain pointer-events-none -z-10" 
        aria-hidden="true" 
      />

      {/* Main Single-column Container - optimized for mobile, elegant on desktop */}
      <main className="w-full max-w-[430px] px-5 sm:px-6 py-4 flex flex-col items-stretch flex-1 relative z-10">
        {/* Header with theme toggle & quick stargaze control */}
        <Header 
          stargazeActive={stargazeActive} 
          onToggleStargaze={toggleStargaze} 
        />

        {/* Social Links */}
        <SocialLinks />

        {/* Divider */}
        <div className="w-full my-2 flex items-center justify-center">
          <div className={`w-full h-px transition-colors duration-300 ${
            isLight
              ? 'bg-gradient-to-r from-transparent via-neutral-300 to-transparent'
              : 'bg-gradient-to-r from-transparent via-neutral-800 to-transparent'
          }`} />
        </div>

        {/* Spotify Playlist Section */}
        <SpotifySection />

        {/* Divider */}
        <div className="w-full my-2 flex items-center justify-center">
          <div className={`w-full h-px transition-colors duration-300 ${
            isLight
              ? 'bg-gradient-to-r from-transparent via-neutral-300 to-transparent'
              : 'bg-gradient-to-r from-transparent via-neutral-800 to-transparent'
          }`} />
        </div>

        {/* Sección: Gira tu animación (con probabilidades exactas) */}
        <GiraTuAnimacion />

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
