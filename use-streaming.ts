import { useState, useEffect, useRef, useCallback } from 'react';
import { StreamingChannel, ChatMessage, StreamingState } from '@/types/streaming';

// Canales de ejemplo (en una app real vendrían de una API)
const EXAMPLE_CHANNELS: StreamingChannel[] = [
  {
    id: 'cyber-radio-1',
    name: 'CYBER RADIO ONE',
    description: 'Electronic · Synthwave · Cyberpunk',
    isLive: true,
    streamUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=400&fit=crop',
    currentListeners: 2847,
    category: 'Electronic',
    createdBy: 'CYBER_DJ'
  },
  {
    id: 'neon-beats',
    name: 'NEON BEATS',
    description: 'House · Techno · Future Bass',
    isLive: true,
    streamUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    thumbnailUrl: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400&h=400&fit=crop',
    currentListeners: 1523,
    category: 'House',
    createdBy: 'NEON_MASTER'
  },
  {
    id: 'future-lounge',
    name: 'FUTURE LOUNGE',
    description: 'Chillwave · Ambient · Lo-fi',
    isLive: false,
    streamUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    thumbnailUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
    currentListeners: 892,
    category: 'Ambient',
    createdBy: 'CHILL_VIBES'
  }
];

const CHAT_COLORS = [
  '#FF00FF', // Neon magenta
  '#00FFFF', // Neon cyan
  '#FFFF00', // Neon yellow
  '#39FF14', // Neon green
  '#FF073A', // Neon red
  '#BF00FF', // Neon purple
];

export const useStreaming = () => {
  const [streamingState, setStreamingState] = useState<StreamingState>({
    currentChannel: null,
    isStreaming: false,
    volume: 50,
    isMuted: false,
    chatMessages: [],
    isConnected: false
  });

  const [channels] = useState<StreamingChannel[]>(EXAMPLE_CHANNELS);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const chatIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Inicializar el elemento de audio
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.crossOrigin = 'anonymous';
      audioRef.current.volume = streamingState.volume / 100;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (chatIntervalRef.current) {
        clearInterval(chatIntervalRef.current);
      }
    };
  }, []);

  // Simular mensajes de chat aleatorios
  const simulateChatMessages = useCallback(() => {
    const usernames = ['CYBER_USER', 'NEON_GHOST', 'SYNTH_RIDER', 'DIGITAL_SOUL', 'MATRIX_WALKER'];
    const messages = [
      'This beat is sick! 🔥',
      'Love this cyberpunk vibe',
      'Anyone know the track name?',
      'The bass is incredible',
      'Best cyber radio station!',
      'This is my coding soundtrack',
      'Perfect for late night sessions',
      'More synthwave please!'
    ];

    if (streamingState.currentChannel && streamingState.isConnected) {
      const randomUser = usernames[Math.floor(Math.random() * usernames.length)];
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      const randomColor = CHAT_COLORS[Math.floor(Math.random() * CHAT_COLORS.length)];

      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        username: randomUser,
        message: randomMessage,
        timestamp: new Date(),
        color: randomColor
      };

      setStreamingState(prev => ({
        ...prev,
        chatMessages: [...prev.chatMessages.slice(-49), newMessage] // Mantener últimos 50 mensajes
      }));
    }
  }, [streamingState.currentChannel, streamingState.isConnected]);

  // Iniciar simulación de chat
  useEffect(() => {
    if (streamingState.isConnected && streamingState.currentChannel) {
      chatIntervalRef.current = setInterval(simulateChatMessages, 3000 + Math.random() * 7000);
    } else {
      if (chatIntervalRef.current) {
        clearInterval(chatIntervalRef.current);
        chatIntervalRef.current = null;
      }
    }

    return () => {
      if (chatIntervalRef.current) {
        clearInterval(chatIntervalRef.current);
      }
    };
  }, [streamingState.isConnected, streamingState.currentChannel, simulateChatMessages]);

  const connectToChannel = async (channel: StreamingChannel) => {
    try {
      if (audioRef.current) {
        audioRef.current.src = channel.streamUrl;
        
        setStreamingState(prev => ({
          ...prev,
          currentChannel: channel,
          isConnected: true,
          chatMessages: [{
            id: 'welcome',
            username: 'SYSTEM',
            message: `Connected to ${channel.name}`,
            timestamp: new Date(),
            isSystem: true,
            color: '#00FFFF'
          }]
        }));
      }
    } catch (error) {
      console.error('Error connecting to channel:', error);
    }
  };

  const startStreaming = async () => {
    if (audioRef.current && streamingState.currentChannel) {
      try {
        await audioRef.current.play();
        setStreamingState(prev => ({
          ...prev,
          isStreaming: true
        }));
      } catch (error) {
        console.error('Error starting stream:', error);
      }
    }
  };

  const stopStreaming = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setStreamingState(prev => ({
        ...prev,
        isStreaming: false
      }));
    }
  };

  const setVolume = (volume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = streamingState.isMuted ? 0 : volume / 100;
    }
    setStreamingState(prev => ({
      ...prev,
      volume
    }));
  };

  const toggleMute = () => {
    const newMuted = !streamingState.isMuted;
    if (audioRef.current) {
      audioRef.current.volume = newMuted ? 0 : streamingState.volume / 100;
    }
    setStreamingState(prev => ({
      ...prev,
      isMuted: newMuted
    }));
  };

  const sendChatMessage = (message: string, username: string = 'ANONYMOUS', color: string = '#FF00FF') => {
    if (message.trim() && streamingState.isConnected) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        username: username.toUpperCase(),
        message: message.trim(),
        timestamp: new Date(),
        color: color
      };

      setStreamingState(prev => ({
        ...prev,
        chatMessages: [...prev.chatMessages.slice(-49), newMessage]
      }));
    }
  };

  const clearChatMessages = () => {
    setStreamingState(prev => ({
      ...prev,
      chatMessages: []
    }));
  };

  const disconnectFromChannel = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
    }
    
    if (chatIntervalRef.current) {
      clearInterval(chatIntervalRef.current);
      chatIntervalRef.current = null;
    }

    setStreamingState({
      currentChannel: null,
      isStreaming: false,
      volume: streamingState.volume,
      isMuted: streamingState.isMuted,
      chatMessages: [],
      isConnected: false
    });
  };

  return {
    channels,
    streamingState,
    connectToChannel,
    startStreaming,
    stopStreaming,
    setVolume,
    toggleMute,
    sendChatMessage,
    clearChatMessages,
    disconnectFromChannel
  };
};