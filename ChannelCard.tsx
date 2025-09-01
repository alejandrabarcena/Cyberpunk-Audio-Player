import React from 'react';
import { StreamingChannel } from '@/types/streaming';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Play, Users, Radio } from 'lucide-react';

interface ChannelCardProps {
  channel: StreamingChannel;
  isActive: boolean;
  onConnect: (channel: StreamingChannel) => void;
}

const ChannelCard: React.FC<ChannelCardProps> = ({ channel, isActive, onConnect }) => {
  return (
    <Card className={`
      group relative overflow-hidden transition-all duration-300
      bg-black/60 border backdrop-blur-sm
      ${isActive 
        ? 'border-neon-cyan shadow-lg shadow-neon-cyan/20 neon-border' 
        : 'border-gray-800 hover:border-neon-magenta/50'
      }
      hover:shadow-lg hover:shadow-neon-magenta/10
    `}>
      {/* Thumbnail Background */}
      <div className="relative h-32 overflow-hidden">
        <img 
          src={channel.thumbnailUrl} 
          alt={channel.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        {/* Live Indicator */}
        {channel.isLive && (
          <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-1 rounded-full bg-red-500/90 backdrop-blur-sm">
            <Radio className="h-3 w-3 text-white animate-pulse" />
            <span className="text-xs font-tech-mono text-white font-bold">LIVE</span>
          </div>
        )}
        
        {/* Listeners Count */}
        <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-full bg-black/70 backdrop-blur-sm">
          <Users className="h-3 w-3 text-neon-cyan" />
          <span className="text-xs font-tech-mono text-neon-cyan font-bold">
            {channel.currentListeners.toLocaleString()}
          </span>
        </div>
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            size="lg"
            onClick={() => onConnect(channel)}
            className={`
              rounded-full w-16 h-16 p-0 transition-all duration-300
              ${isActive 
                ? 'bg-neon-cyan/20 border-2 border-neon-cyan text-neon-cyan' 
                : 'bg-neon-magenta/20 border-2 border-neon-magenta text-neon-magenta hover:bg-neon-magenta/30'
              }
              backdrop-blur-sm hover:scale-110
            `}
          >
            <Play className="h-6 w-6 ml-1" />
          </Button>
        </div>
      </div>
      
      {/* Channel Info */}
      <div className="p-4">
        <h3 className={`
          font-orbitron font-bold text-lg mb-1 transition-colors
          ${isActive ? 'text-neon-cyan neon-text-cyan' : 'text-white group-hover:text-neon-magenta'}
        `}>
          {channel.name}
        </h3>
        
        <p className="text-gray-400 text-sm mb-2 font-tech-mono">
          {channel.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className={`
            text-xs px-2 py-1 rounded-full font-tech-mono font-bold
            ${isActive 
              ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30' 
              : 'bg-gray-800 text-gray-300 border border-gray-700'
            }
          `}>
            {channel.category.toUpperCase()}
          </span>
          
          <span className="text-xs text-gray-500 font-tech-mono">
            BY {channel.createdBy}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default ChannelCard;