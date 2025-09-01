import React from 'react';
import { StreamingChannel } from '@/types/streaming';
import ChannelCard from './ChannelCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Radio, Zap } from 'lucide-react';

interface ChannelListProps {
  channels: StreamingChannel[];
  currentChannel: StreamingChannel | null;
  onChannelSelect: (channel: StreamingChannel) => void;
}

const ChannelList: React.FC<ChannelListProps> = ({ 
  channels, 
  currentChannel, 
  onChannelSelect 
}) => {
  const liveChannels = channels.filter(channel => channel.isLive);
  const offlineChannels = channels.filter(channel => !channel.isLive);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 flex-shrink-0">
        <Radio className="h-6 w-6 text-neon-yellow" />
        <h2 className="font-orbitron font-bold text-xl text-neon-yellow neon-text-yellow">
          STREAMING CHANNELS
        </h2>
      </div>

      <ScrollArea className="flex-grow">
        <div className="space-y-6 pr-2">
          {/* Live Channels */}
          {liveChannels.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Zap className="h-4 w-4 text-red-500 animate-pulse" />
                <h3 className="font-orbitron font-bold text-red-500 text-sm tracking-wider">
                  LIVE NOW ({liveChannels.length})
                </h3>
              </div>
              
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {liveChannels.map((channel) => (
                  <ChannelCard
                    key={channel.id}
                    channel={channel}
                    isActive={currentChannel?.id === channel.id}
                    onConnect={onChannelSelect}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Offline Channels */}
          {offlineChannels.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="h-4 w-4 rounded-full bg-gray-600" />
                <h3 className="font-orbitron font-bold text-gray-500 text-sm tracking-wider">
                  OFFLINE ({offlineChannels.length})
                </h3>
              </div>
              
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {offlineChannels.map((channel) => (
                  <ChannelCard
                    key={channel.id}
                    channel={channel}
                    isActive={currentChannel?.id === channel.id}
                    onConnect={onChannelSelect}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {channels.length === 0 && (
            <div className="text-center py-12">
              <Radio className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <h3 className="font-orbitron font-bold text-gray-500 text-lg mb-2">
                NO CHANNELS AVAILABLE
              </h3>
              <p className="text-gray-600 font-tech-mono text-sm">
                Check back later for live streams
              </p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ChannelList;