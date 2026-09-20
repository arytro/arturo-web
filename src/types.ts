export interface Track {
  id: string;
  title: string;
  artist: string;
  spotifyId: string;
  spotifyUrl: string;
  duration?: string;
  albumArt?: string;
}

export interface PlaylistConfig {
  id: string;
  title: string;
  url: string;
  embedUrl: string;
  tracks: Track[];
}
