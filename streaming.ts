export interface StreamingChannel {
  id: string;
  name: string;
  description: string;
  isLive: boolean;
  streamUrl: string;
  thumbnailUrl: string;
  currentListeners: number;
  category: string;
  createdBy: string;
}

export interface ChatMessage {
  id: string;
  username: string;
  message: string;
  timestamp: Date;
  isSystem?: boolean;
  color?: string;
}

export interface StreamingState {
  currentChannel: StreamingChannel | null;
  isStreaming: boolean;
  volume: number;
  isMuted: boolean;
  chatMessages: ChatMessage[];
  isConnected: boolean;
}