import { Track, PlaylistConfig } from '../types';

// Arturo's playlist tracks
export const DEFAULT_TRACKS: Track[] = [
  {
    id: 'track-1',
    title: "Look What You've Done",
    artist: 'Drake',
    spotifyId: '2j1PjS8z7s8n61B011E6aK',
    spotifyUrl: 'https://open.spotify.com/track/2j1PjS8z7s8n61B011E6aK',
    duration: '5:02',
  },
  {
    id: 'track-2',
    title: 'Dead Man Walking',
    artist: 'Brent Faiyaz',
    spotifyId: '2c2tlXfEmLgUNvxngIi1qL',
    spotifyUrl: 'https://open.spotify.com/track/2c2tlXfEmLgUNvxngIi1qL',
    duration: '4:07',
  },
  {
    id: 'track-3',
    title: '9',
    artist: 'Drake',
    spotifyId: '1zi7xx7UVEIR53Hj1dwWYb',
    spotifyUrl: 'https://open.spotify.com/track/1zi7xx7UVEIR53Hj1dwWYb',
    duration: '4:15',
  },
  {
    id: 'track-4',
    title: 'Rolling Stone',
    artist: 'Brent Faiyaz',
    spotifyId: '6e6Vd259n5yqfH3cW1T53C',
    spotifyUrl: 'https://open.spotify.com/track/6e6Vd259n5yqfH3cW1T53C',
    duration: '2:42',
  },
  {
    id: 'track-5',
    title: 'Pink + White',
    artist: 'Frank Ocean',
    spotifyId: '3xKsf9qvl1xSTKiShUdLby',
    spotifyUrl: 'https://open.spotify.com/track/3xKsf9qvl1xSTKiShUdLby',
    duration: '3:04',
  },
];

export const DEFAULT_PLAYLIST: PlaylistConfig = {
  id: '37i9dQZF1DXcBWIGoYBM5M',
  title: "Arturo's Selection",
  url: 'https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M',
  embedUrl: 'https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?utm_source=generator&theme=0',
  tracks: DEFAULT_TRACKS,
};

/**
 * Parses user-pasted Spotify URL into an embeddable link
 * Supports:
 * - https://open.spotify.com/playlist/{id}
 * - https://open.spotify.com/track/{id}
 * - https://open.spotify.com/album/{id}
 * - spotify:playlist:{id}
 */
export function parseSpotifyUrlToEmbed(inputUrl: string): { embedUrl: string; type: 'playlist' | 'track' | 'album'; id: string } | null {
  if (!inputUrl) return null;
  const clean = inputUrl.trim();

  // URI format: spotify:playlist:xxx
  const uriMatch = clean.match(/^spotify:(playlist|track|album):([a-zA-Z0-9]+)/);
  if (uriMatch) {
    const type = uriMatch[1] as 'playlist' | 'track' | 'album';
    const id = uriMatch[2];
    return {
      type,
      id,
      embedUrl: `https://open.spotify.com/embed/${type}/${id}?utm_source=generator&theme=0`,
    };
  }

  // Web URL format: open.spotify.com/(playlist|track|album)/xxx
  const webMatch = clean.match(/open\.spotify\.com\/(playlist|track|album)\/([a-zA-Z0-9]+)/);
  if (webMatch) {
    const type = webMatch[1] as 'playlist' | 'track' | 'album';
    const id = webMatch[2];
    return {
      type,
      id,
      embedUrl: `https://open.spotify.com/embed/${type}/${id}?utm_source=generator&theme=0`,
    };
  }

  return null;
}
