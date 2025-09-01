import React from 'react';
import { useStreaming } from '@/hooks/use-streaming';
import { useIsMobile } from '@/hooks/use-mobile';
import ChannelList from '@/components/streaming/ChannelList';
import StreamingPlayer from '@/components/streaming/StreamingPlayer';
import ChatBox from '@/components/streaming/ChatBox';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Radio, MessageCircle, Zap } from 'lucide-react';
import { ParticleSystem } from '@/components/effects/ParticleSystem';
import { HexGridEffect, DataHex } from '@/components/effects/HexGridEffect';
import { HologramEffect } from '@/components/effects/HologramEffect';

const StreamingPage: React.FC = () => {
  const {
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
  } = useStreaming();

  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="min-h-screen bg-cyber-bg p-4 relative overflow-hidden">
        {/* Background Effects */}
        <div className="fixed inset-0 z-0">
          <ParticleSystem 
            count={25} 
            speed={streamingState.isStreaming ? 2 : 0.8}
            style="data-flow"
            colors={['#00ffff', '#ff00ff', '#ffff00']}
          />
          <HexGridEffect 
            rows={8} 
            cols={12}
            color="#00ffff"
            activeColor="#ff00ff"
            animationSpeed={streamingState.isStreaming ? 4 : 2}
          />
        </div>
        
        {/* Content */}
        <div className="relative z-10">
          {/* Mobile Header */}
          <HologramEffect intensity="medium" color="#00ffff" glitchIntensity={0.3}>
            <div className="flex items-center gap-2 mb-4 cyber-terminal p-3 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-neon-magenta to-neon-cyan flex items-center justify-center cyber-portal">
                <Radio className="h-4 w-4 text-black" />
              </div>
              <h1 className="font-orbitron font-bold text-xl text-white neon-text-cyan text-glitch-advanced" data-text="CYBER STREAMING">
                CYBER STREAMING
              </h1>
              <div className="ml-auto">
                <DataHex data={['LIVE', 'ON', 'AIR']} speed={1.5} color="#ff00ff" />
              </div>
            </div>
          </HologramEffect>

          {/* Current Stream (if connected) */}
          {streamingState.currentChannel && (
            <div className="mb-4">
              <HologramEffect intensity="high" color="#ff00ff" glitchIntensity={0.4}>
                <div className="particle-enhanced">
                  <StreamingPlayer
                    channel={streamingState.currentChannel}
                    isStreaming={streamingState.isStreaming}
                    volume={streamingState.volume}
                    isMuted={streamingState.isMuted}
                    onPlay={startStreaming}
                    onPause={stopStreaming}
                    onVolumeChange={setVolume}
                    onToggleMute={toggleMute}
                    onDisconnect={disconnectFromChannel}
                  />
                </div>
              </HologramEffect>
            </div>
          )}

          {/* Mobile Tabs */}
          <Tabs defaultValue="channels" className="flex-grow">
            <HologramEffect intensity="low" color="#00ffff" glitchIntensity={0.2}>
              <TabsList className="grid w-full grid-cols-2 bg-black/60 border border-gray-800 cyber-terminal">
                <TabsTrigger 
                  value="channels" 
                  className="data-[state=active]:bg-neon-cyan/20 data-[state=active]:text-neon-cyan font-tech-mono cyber-btn-animated"
                >
                  <Radio className="h-4 w-4 mr-2" />
                  Channels
                </TabsTrigger>
                <TabsTrigger 
                  value="chat"
                  className="data-[state=active]:bg-neon-magenta/20 data-[state=active]:text-neon-magenta font-tech-mono cyber-btn-animated"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Chat
                </TabsTrigger>
              </TabsList>
            </HologramEffect>

            <TabsContent value="channels" className="mt-4 h-[calc(100vh-200px)]">
              <HologramEffect intensity="medium" color="#00ffff" glitchIntensity={0.3}>
                <Card className="bg-black/60 border-gray-800 backdrop-blur-sm h-full p-4 cyber-terminal particle-enhanced">
                  <ChannelList
                    channels={channels}
                    currentChannel={streamingState.currentChannel}
                    onChannelSelect={connectToChannel}
                  />
                </Card>
              </HologramEffect>
            </TabsContent>

            <TabsContent value="chat" className="mt-4 h-[calc(100vh-200px)]">
              <HologramEffect intensity="medium" color="#ff00ff" glitchIntensity={0.3}>
                <div className="particle-enhanced">
                  <ChatBox
                    messages={streamingState.chatMessages}
                    isConnected={streamingState.isConnected}
                    onSendMessage={sendChatMessage}
                    onClearMessages={clearChatMessages}
                  />
                </div>
              </HologramEffect>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  }

  // Desktop Layout
  return (
    <div className="min-h-screen bg-cyber-bg p-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0">
        <ParticleSystem 
          count={80} 
          speed={streamingState.isStreaming ? 2.5 : 1}
          style="circuit"
          colors={['#00ffff', '#ff00ff', '#ffff00', '#00ff00']}
          size={3}
        />
        <HexGridEffect 
          rows={15} 
          cols={25}
          color="#00ffff"
          activeColor="#ff00ff"
          animationSpeed={streamingState.isStreaming ? 5 : 3}
          glowIntensity={1.2}
        />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Desktop Header */}
        <HologramEffect intensity="high" color="#00ffff" glitchIntensity={0.4}>
          <div className="flex items-center gap-3 mb-6 cyber-terminal p-6 rounded-lg">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-neon-magenta to-neon-cyan flex items-center justify-center cyber-portal neon-pulse">
              <Radio className="h-6 w-6 text-black" />
            </div>
            <div className="flex-grow">
              <h1 className="font-orbitron font-bold text-3xl text-white mb-1 neon-text-cyan text-glitch-advanced" data-text="CYBER STREAMING">
                CYBER STREAMING
              </h1>
              <p className="font-tech-mono text-gray-400 text-sm data-stream">
                Live audio streams with real-time chat
              </p>
            </div>
            <div className="flex items-center gap-4">
              <DataHex data={['LIVE', 'HD', 'CHAT', 'ON']} speed={2} color="#ff00ff" />
              <div className="text-right">
                <div className="text-neon-cyan font-tech-mono text-sm">STATUS:</div>
                <div className={`font-orbitron font-bold ${streamingState.isStreaming ? 'text-green-400 neon-pulse' : 'text-gray-400'}`}>
                  {streamingState.isStreaming ? 'STREAMING' : 'STANDBY'}
                </div>
              </div>
            </div>
          </div>
        </HologramEffect>

        {/* Current Stream (if connected) */}
        {streamingState.currentChannel && (
          <div className="mb-6">
            <HologramEffect intensity="high" color="#ff00ff" glitchIntensity={0.5}>
              <div className="particle-enhanced cyber-distortion">
                <StreamingPlayer
                  channel={streamingState.currentChannel}
                  isStreaming={streamingState.isStreaming}
                  volume={streamingState.volume}
                  isMuted={streamingState.isMuted}
                  onPlay={startStreaming}
                  onPause={stopStreaming}
                  onVolumeChange={setVolume}
                  onToggleMute={toggleMute}
                  onDisconnect={disconnectFromChannel}
                />
              </div>
            </HologramEffect>
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-300px)]">
          {/* Channels List */}
          <div className="lg:col-span-2">
            <HologramEffect intensity="medium" color="#00ffff" glitchIntensity={0.3}>
              <Card className="bg-black/60 border-gray-800 backdrop-blur-sm h-full p-6 cyber-terminal particle-enhanced">
                <ChannelList
                  channels={channels}
                  currentChannel={streamingState.currentChannel}
                  onChannelSelect={connectToChannel}
                />
              </Card>
            </HologramEffect>
          </div>

          {/* Chat */}
          <div className="lg:col-span-1">
            <HologramEffect intensity="medium" color="#ff00ff" glitchIntensity={0.3}>
              <div className="particle-enhanced">
                <ChatBox
                  messages={streamingState.chatMessages}
                  isConnected={streamingState.isConnected}
                  onSendMessage={sendChatMessage}
                  onClearMessages={clearChatMessages}
                />
              </div>
            </HologramEffect>
          </div>
        </div>

        {/* Stats Footer */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <HologramEffect intensity="low" color="#ff0000" glitchIntensity={0.2}>
            <Card className="bg-black/40 border-gray-800 backdrop-blur-sm p-4 text-center cyber-terminal particle-enhanced">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Zap className="h-5 w-5 text-red-500 neon-pulse" />
                <span className="font-orbitron font-bold text-red-500 text-glitch-advanced" data-text="LIVE">
                  LIVE
                </span>
              </div>
              <p className="text-2xl font-bold text-white neon-text cyber-float">
                {channels.filter(c => c.isLive).length}
              </p>
              <p className="text-sm text-gray-400 font-tech-mono data-stream">Active Streams</p>
            </Card>
          </HologramEffect>

          <HologramEffect intensity="low" color="#00ffff" glitchIntensity={0.2}>
            <Card className="bg-black/40 border-gray-800 backdrop-blur-sm p-4 text-center cyber-terminal particle-enhanced">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Radio className="h-5 w-5 text-neon-cyan neon-pulse" />
                <span className="font-orbitron font-bold text-neon-cyan text-glitch-advanced" data-text="TOTAL">
                  TOTAL
                </span>
              </div>
              <p className="text-2xl font-bold text-white neon-text-cyan cyber-float">
                {channels.reduce((sum, channel) => sum + channel.currentListeners, 0).toLocaleString()}
              </p>
              <p className="text-sm text-gray-400 font-tech-mono data-stream">Total Listeners</p>
            </Card>
          </HologramEffect>

          <HologramEffect intensity="low" color="#ff00ff" glitchIntensity={0.2}>
            <Card className="bg-black/40 border-gray-800 backdrop-blur-sm p-4 text-center cyber-terminal particle-enhanced">
              <div className="flex items-center justify-center gap-2 mb-2">
                <MessageCircle className="h-5 w-5 text-neon-magenta neon-pulse" />
                <span className="font-orbitron font-bold text-neon-magenta text-glitch-advanced" data-text="CHAT">
                  CHAT
                </span>
              </div>
              <p className="text-2xl font-bold text-white neon-text cyber-float">
                {streamingState.chatMessages.filter(m => !m.isSystem).length}
              </p>
              <p className="text-sm text-gray-400 font-tech-mono data-stream">Messages Today</p>
            </Card>
          </HologramEffect>
        </div>
      </div>
    </div>
  );
};

export default StreamingPage;