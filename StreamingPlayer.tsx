import React from 'react';
import { StreamingChannel } from '@/types/streaming';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { 
  Play, 
  Pause, 
  VolumeX, 
  Volume2, 
  Radio, 
  Users,
  X,
  Headphones
} from 'lucide-react';

interface StreamingPlayerProps {
  channel: StreamingChannel;
  isStreaming: boolean;
  volume: number;
  isMuted: boolean;
  onPlay: () => void;
  onPause: () => void;
  onVolumeChange: (volume: number) => void;
  onToggleMute: () => void;
  onDisconnect: () => void;
}

const StreamingPlayer: React.FC<StreamingPlayerProps> = ({
  channel,
  isStreaming,
  volume,
  isMuted,
  onPlay,
  onPause,
  onVolumeChange,
  onToggleMute,
  onDisconnect
}) => {
  return (
    <Card className="bg-black/80 border-neon-cyan neon-border backdrop-blur-sm">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-neon-cyan">
                <img 
                  src={channel.thumbnailUrl} 
                  alt={channel.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {channel.isLive && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-black animate-pulse" />
              )}
            </div>
            
            <div>
              <h3 className="font-orbitron font-bold text-neon-cyan neon-text-cyan text-lg">
                {channel.name}
              </h3>
              <p className="text-gray-400 text-sm font-tech-mono">
                {channel.description}
              </p>
            </div>
          </div>
          
          <Button
            size="sm"
            variant="outline"
            onClick={onDisconnect}
            className="border-gray-600 text-gray-400 hover:border-red-500 hover:text-red-500"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Status */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Radio className="h-4 w-4 text-neon-cyan" />
            <span className="text-sm font-tech-mono text-neon-cyan">
              {channel.isLive ? 'LIVE' : 'OFFLINE'}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-gray-400" />
            <span className="text-sm font-tech-mono text-gray-400">
              {channel.currentListeners.toLocaleString()} listeners
            </span>
          </div>
          
          {isStreaming && (
            <div className="flex items-center gap-2">
              <Headphones className="h-4 w-4 text-neon-magenta animate-pulse" />
              <span className="text-sm font-tech-mono text-neon-magenta">
                STREAMING
              </span>
            </div>
          )}
        </div>
        
        {/* Controls */}
        <div className="flex items-center gap-4">
          {/* Play/Pause Button */}
          <Button
            size="lg"
            onClick={isStreaming ? onPause : onPlay}
            className={`
              rounded-full w-14 h-14 p-0 transition-all duration-300
              ${isStreaming 
                ? 'bg-neon-magenta/20 border-2 border-neon-magenta text-neon-magenta hover:bg-neon-magenta/30' 
                : 'bg-neon-cyan/20 border-2 border-neon-cyan text-neon-cyan hover:bg-neon-cyan/30'
              }
              backdrop-blur-sm hover:scale-105
            `}
          >
            {isStreaming ? (
              <Pause className="h-6 w-6" />
            ) : (
              <Play className="h-6 w-6 ml-1" />
            )}
          </Button>
          
          {/* Volume Control */}
          <div className="flex items-center gap-3 flex-grow">
            <Button
              size="sm"
              variant="ghost"
              onClick={onToggleMute}
              className="text-gray-400 hover:text-neon-yellow p-2"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </Button>
            
            <div className="flex-grow max-w-32">
              <Slider
                value={[isMuted ? 0 : volume]}
                onValueChange={(values) => onVolumeChange(values[0])}
                max={100}
                step={1}
                className="cyber-slider"
              />
            </div>
            
            <span className="text-sm font-tech-mono text-gray-400 w-8 text-right">
              {isMuted ? 0 : volume}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default StreamingPlayer;