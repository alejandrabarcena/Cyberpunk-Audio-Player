import { useRef, useReducer, useEffect, useCallback, useState } from 'react';
import { Song, AudioPlayerState, AudioPlayerAction } from '@/types/audio';
import { loadSongList } from '@/api/audio-service';
import { useToast } from '@/hooks/use-toast';

const initialState: AudioPlayerState = {
  currentSong: null,
  playlist: [],
  isPlaying: false,
  isMuted: false,
  volume: 0.7,
  currentTime: 0,
  duration: 0,
  repeat: false,
  shuffle: false,
};

const audioReducer = (state: AudioPlayerState, action: AudioPlayerAction): AudioPlayerState => {
  switch (action.type) {
    case 'SET_PLAYLIST':
      return { ...state, playlist: action.payload };
    case 'SET_CURRENT_SONG':
      return { ...state, currentSong: action.payload };
    case 'SET_IS_PLAYING':
      return { ...state, isPlaying: action.payload };
    case 'SET_VOLUME':
      return { ...state, volume: action.payload };
    case 'SET_IS_MUTED':
      return { ...state, isMuted: action.payload };
    case 'SET_CURRENT_TIME':
      return { ...state, currentTime: action.payload };
    case 'SET_DURATION':
      return { ...state, duration: action.payload };
    case 'TOGGLE_REPEAT':
      return { ...state, repeat: !state.repeat };
    case 'TOGGLE_SHUFFLE':
      return { ...state, shuffle: !state.shuffle };
    case 'PLAY_NEXT_SONG':
      if (!state.currentSong || state.playlist.length === 0) return state;
      
      if (state.shuffle) {
        const availableSongs = state.playlist.filter(song => song.id !== state.currentSong?.id);
        if (availableSongs.length === 0) return state;
        
        const randomIndex = Math.floor(Math.random() * availableSongs.length);
        return { ...state, currentSong: availableSongs[randomIndex] };
      } else {
        const currentIndex = state.playlist.findIndex(song => song.id === state.currentSong?.id);
        const nextIndex = (currentIndex + 1) % state.playlist.length;
        return { ...state, currentSong: state.playlist[nextIndex] };
      }
    case 'PLAY_PREV_SONG':
      if (!state.currentSong || state.playlist.length === 0) return state;
      
      if (state.shuffle) {
        const availableSongs = state.playlist.filter(song => song.id !== state.currentSong?.id);
        if (availableSongs.length === 0) return state;
        
        const randomIndex = Math.floor(Math.random() * availableSongs.length);
        return { ...state, currentSong: availableSongs[randomIndex] };
      } else {
        const currentIndex = state.playlist.findIndex(song => song.id === state.currentSong?.id);
        const prevIndex = (currentIndex - 1 + state.playlist.length) % state.playlist.length;
        return { ...state, currentSong: state.playlist[prevIndex] };
      }
    default:
      return state;
  }
};

export const useAudioPlayer = (customPlaylistUrl?: string) => {
  const [state, dispatch] = useReducer(audioReducer, initialState);
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();
  
  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio();
    
    // Cleanup function
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);
  
  // Update audio src when current song changes
  useEffect(() => {
    if (!audioRef.current || !state.currentSong) return;
    
    audioRef.current.src = state.currentSong.audioSrc;
    audioRef.current.load();
    
    if (state.isPlaying) {
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          // Auto-play was prevented
          console.error("Error playing audio:", error);
          toast({
            title: "Error de reproducción",
            description: "No se pudo reproducir la pista de audio. Verifica la URL del audio.",
            variant: "destructive"
          });
          dispatch({ type: 'SET_IS_PLAYING', payload: false });
        });
      }
    }
    
    // Reset current time
    dispatch({ type: 'SET_CURRENT_TIME', payload: 0 });
  }, [state.currentSong, toast]);
  
  // Handle play/pause
  useEffect(() => {
    if (!audioRef.current || !state.currentSong) return;
    
    if (state.isPlaying) {
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          // Auto-play was prevented
          console.error("Error playing audio:", error);
          toast({
            title: "Error de reproducción",
            description: "No se pudo reproducir el audio. Intenta de nuevo más tarde.",
            variant: "destructive"
          });
          dispatch({ type: 'SET_IS_PLAYING', payload: false });
        });
      }
    } else {
      audioRef.current.pause();
    }
  }, [state.isPlaying, state.currentSong, toast]);
  
  // Handle volume changes
  useEffect(() => {
    if (!audioRef.current) return;
    
    audioRef.current.volume = state.isMuted ? 0 : state.volume;
  }, [state.volume, state.isMuted]);
  
  // Set up audio event listeners
  useEffect(() => {
    if (!audioRef.current) return;
    
    const audio = audioRef.current;
    
    const handleTimeUpdate = () => {
      dispatch({ type: 'SET_CURRENT_TIME', payload: audio.currentTime });
    };
    
    const handleDurationChange = () => {
      dispatch({ type: 'SET_DURATION', payload: audio.duration || 0 });
    };
    
    const handleEnded = () => {
      if (state.repeat) {
        // Restart the current song
        audio.currentTime = 0;
        audio.play().catch(() => {});
      } else {
        // Play next song
        dispatch({ type: 'PLAY_NEXT_SONG' });
      }
    };
    
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('ended', handleEnded);
    
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [state.repeat]);
  
  // Load song data
  useEffect(() => {
    const fetchSongs = async () => {
      setIsLoading(true);
      try {
        // Carga canciones desde la URL personalizada o usa la lista predeterminada
        const songs = await loadSongList(customPlaylistUrl);
        
        dispatch({ type: 'SET_PLAYLIST', payload: songs });
        
        // Si no hay canción actual seleccionada y hay canciones disponibles,
        // selecciona la primera canción (pero no la reproduzcas automáticamente)
        if (!state.currentSong && songs.length > 0) {
          dispatch({ type: 'SET_CURRENT_SONG', payload: songs[0] });
        }
        
        if (songs.length > 0) {
          toast({
            title: "Playlist cargada",
            description: `${songs.length} canciones cargadas correctamente.`,
          });
        }
      } catch (error) {
        console.error("Error loading song list:", error);
        toast({
          title: "Error al cargar canciones",
          description: "No se pudieron cargar las canciones. Se usará la lista predeterminada.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSongs();
  }, [customPlaylistUrl, toast, state.currentSong]);
  
  // Player control functions
  const playSong = useCallback((song: Song) => {
    dispatch({ type: 'SET_CURRENT_SONG', payload: song });
    dispatch({ type: 'SET_IS_PLAYING', payload: true });
  }, []);
  
  const togglePlay = useCallback(() => {
    dispatch({ type: 'SET_IS_PLAYING', payload: !state.isPlaying });
  }, [state.isPlaying]);
  
  const nextSong = useCallback(() => {
    dispatch({ type: 'PLAY_NEXT_SONG' });
  }, []);
  
  const prevSong = useCallback(() => {
    dispatch({ type: 'PLAY_PREV_SONG' });
  }, []);
  
  const setVolume = useCallback((value: number) => {
    dispatch({ type: 'SET_VOLUME', payload: Math.max(0, Math.min(1, value)) });
    if (state.isMuted && value > 0) {
      dispatch({ type: 'SET_IS_MUTED', payload: false });
    }
  }, [state.isMuted]);
  
  const toggleMute = useCallback(() => {
    dispatch({ type: 'SET_IS_MUTED', payload: !state.isMuted });
  }, [state.isMuted]);
  
  const toggleRepeat = useCallback(() => {
    dispatch({ type: 'TOGGLE_REPEAT' });
  }, []);
  
  const toggleShuffle = useCallback(() => {
    dispatch({ type: 'TOGGLE_SHUFFLE' });
  }, []);
  
  const seekTo = useCallback((time: number) => {
    if (!audioRef.current) return;
    
    audioRef.current.currentTime = time;
    dispatch({ type: 'SET_CURRENT_TIME', payload: time });
  }, []);
  
  return {
    ...state,
    isLoading,
    audioElement: audioRef.current,
    playSong,
    togglePlay,
    nextSong,
    prevSong,
    setVolume,
    toggleMute,
    toggleRepeat,
    toggleShuffle,
    seekTo
  };
};