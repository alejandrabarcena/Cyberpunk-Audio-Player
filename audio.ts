export interface Song {
  id: number;
  title: string;
  artist: string;
  audioSrc: string;
  cover?: string;
  duration: number;
}

export interface AudioPlayerState {
  currentSong: Song | null;
  playlist: Song[];
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  repeat: boolean;
  shuffle: boolean;
}

export type AudioPlayerAction =
  | { type: 'SET_PLAYLIST', payload: Song[] }
  | { type: 'SET_CURRENT_SONG', payload: Song | null }
  | { type: 'SET_IS_PLAYING', payload: boolean }
  | { type: 'SET_VOLUME', payload: number }
  | { type: 'SET_IS_MUTED', payload: boolean }
  | { type: 'SET_CURRENT_TIME', payload: number }
  | { type: 'SET_DURATION', payload: number }
  | { type: 'TOGGLE_REPEAT' }
  | { type: 'TOGGLE_SHUFFLE' }
  | { type: 'PLAY_NEXT_SONG' }
  | { type: 'PLAY_PREV_SONG' };