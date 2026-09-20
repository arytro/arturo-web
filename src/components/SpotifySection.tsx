import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Music2, Disc3 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const SpotifySection: React.FC = () => {
  const { isLight } = useTheme();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const playlistUrl = "https://open.spotify.com/playlist/0di31ZOSeSFU0Ie7FCtJur?si=6ad47dd382b04d0c";
  const embedUrl = "https://open.spotify.com/embed/playlist/0di31ZOSeSFU0Ie7FCtJur?utm_source=generator&theme=0";

  return (
    <section className="w-full my-4 flex flex-col items-center" id="spotify-section">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`w-full relative rounded-2xl border p-4 sm:p-5 shadow-xl backdrop-blur-md overflow-hidden flex flex-col transition-all duration-300 ${
          isLight
            ? 'bg-white/90 border-neutral-200/90 shadow-neutral-200/50'
            : 'bg-neutral-900/75 border-neutral-800/80 shadow-black/40'
        }`}
      >
        {/* Subtle green ambient glow */}
        <div
          className="absolute -top-10 -right-10 w-40 h-40 bg-[#1DB954]/10 rounded-full blur-2xl pointer-events-none"
          aria-hidden="true"
        />

        {/* Header */}
        <div className="w-full flex items-center justify-between mb-3.5 relative z-10">
          <div className="flex items-center gap-2.5">
            {/* Spotify Brand Icon */}
            <div className={`w-8 h-8 rounded-lg border flex items-center justify-center ${
              isLight
                ? 'bg-[#1DB954]/10 border-[#1DB954]/30 text-[#15803d]'
                : 'bg-[#1DB954]/15 border-[#1DB954]/30 text-[#1DB954]'
            }`}>
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.503 17.309c-.216.354-.675.467-1.03.25-2.822-1.724-6.375-2.115-10.559-1.159-.404.093-.811-.16-.904-.564-.093-.404.16-.811.564-.904 4.582-1.047 8.514-.602 11.679 1.347.354.217.467.676.25 1.03zm1.47-3.262c-.272.443-.854.584-1.297.312-3.23-1.986-8.156-2.56-11.977-1.4-1.498.153-.984-.19-.831-.688.153-.498.688-.984 1.186-.831 4.375 1.328 9.805.808 13.507-1.469.443-.272 1.025-.131 1.297.312-.272.443-.854.584-1.297.312zm.126-3.41c-3.873-2.3-10.264-2.512-13.978-1.385-.595.18-1.229-.155-1.409-.75-.18-.595.155-1.229.75-1.409 4.264-1.295 11.319-1.048 15.786 1.604.536.318.712 1.012.394 1.548-.318.536-1.012.712-1.548.394z" />
              </svg>
            </div>
            <div className="flex flex-col text-left">
              <span className={`text-[11px] font-mono uppercase tracking-wider font-semibold flex items-center gap-1.5 ${
                isLight ? 'text-[#15803d]' : 'text-[#1DB954]'
              }`}>
                <span>Spotify Playlist</span>
                <span className={`inline-block w-1.5 h-1.5 rounded-full animate-ping ${
                  isLight ? 'bg-[#15803d]' : 'bg-[#1DB954]'
                }`} />
              </span>
              <span className={`text-sm font-semibold transition-colors ${
                isLight ? 'text-neutral-900' : 'text-neutral-100'
              }`}>
                Mi Música Favorita
              </span>
            </div>
          </div>

          {/* Toggle compact / full list button */}
          <button
            onClick={() => setIsExpanded((prev) => !prev)}
            className={`text-[11px] font-mono px-2 py-1 rounded-md border transition-colors flex items-center gap-1 cursor-pointer touch-manipulation ${
              isLight
                ? 'bg-neutral-100 hover:bg-neutral-200/80 border-neutral-200 text-neutral-700'
                : 'bg-neutral-800/60 hover:bg-neutral-800 border-neutral-700/50 text-neutral-400 hover:text-neutral-200'
            }`}
            id="toggle-spotify-size"
          >
            <Disc3 className={`w-3 h-3 ${isLight ? 'text-[#15803d]' : 'text-[#1DB954]'} ${isExpanded ? 'animate-spin' : ''}`} />
            <span>{isExpanded ? 'Compacto' : 'Ver lista'}</span>
          </button>
        </div>

        {/* Official Spotify Embed Player */}
        <div className={`w-full relative z-10 rounded-xl overflow-hidden border shadow-inner ${
          isLight
            ? 'bg-neutral-100/90 border-neutral-200'
            : 'bg-neutral-950/80 border-neutral-800/60'
        }`}>
          <iframe
            src={embedUrl}
            width="100%"
            height={isExpanded ? "352" : "152"}
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Spotify Playlist"
            className="w-full transition-all duration-300 block"
          />
        </div>

        {/* Action button to open in Spotify App */}
        <div className={`w-full mt-3 flex items-center justify-between gap-2 pt-2.5 border-t text-xs ${
          isLight ? 'border-neutral-200' : 'border-neutral-800/60'
        }`}>
          <span className={`text-[11px] font-mono flex items-center gap-1 ${
            isLight ? 'text-neutral-500' : 'text-neutral-400'
          }`}>
            <Music2 className={`w-3 h-3 ${isLight ? 'text-neutral-400' : 'text-neutral-500'}`} />
            Playlist de Arturo
          </span>
          <a
            href={playlistUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border font-medium text-[11px] transition-all touch-manipulation ${
              isLight
                ? 'bg-[#1DB954]/10 hover:bg-[#1DB954]/20 text-[#15803d] border-[#1DB954]/30 hover:border-[#1DB954]/50'
                : 'bg-[#1DB954]/15 hover:bg-[#1DB954]/25 text-[#1DB954] border-[#1DB954]/30 hover:border-[#1DB954]/50'
            }`}
            id="open-spotify-direct-link"
          >
            <span>Abrir en Spotify</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </motion.div>
    </section>
  );
};
