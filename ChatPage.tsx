import React from 'react';
import StandaloneChat from '@/components/chat/StandaloneChat';
import { useIsMobile } from '@/hooks/use-mobile';
import { MessageCircle, Zap, Users, Globe } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { ParticleSystem } from '@/components/effects/ParticleSystem';
import { HexGridEffect, DataHex } from '@/components/effects/HexGridEffect';
import { HologramEffect } from '@/components/effects/HologramEffect';

const ChatPage: React.FC = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="min-h-screen bg-cyber-bg p-4 relative overflow-hidden">
        {/* Background Effects */}
        <div className="fixed inset-0 z-0">
          <ParticleSystem 
            count={30} 
            speed={1.5}
            style="matrix"
            colors={['#00ffff', '#ff00ff', '#00ff00']}
            size={2}
          />
          <HexGridEffect 
            rows={10} 
            cols={15}
            color="#00ffff"
            activeColor="#ff00ff"
            animationSpeed={3}
          />
        </div>
        
        {/* Content */}
        <div className="relative z-10">
          {/* Mobile Header */}
          <HologramEffect intensity="medium" color="#ff00ff" glitchIntensity={0.3}>
            <div className="flex items-center gap-2 mb-4 cyber-terminal p-3 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-neon-magenta to-neon-cyan flex items-center justify-center cyber-portal neon-pulse">
                <MessageCircle className="h-4 w-4 text-black" />
              </div>
              <h1 className="font-orbitron font-bold text-xl text-white neon-text-cyan text-glitch-advanced" data-text="CYBER CHAT">
                CYBER CHAT
              </h1>
              <div className="ml-auto">
                <DataHex data={['MSG', 'NET', 'AI']} speed={1.8} color="#00ffff" />
              </div>
            </div>
          </HologramEffect>

          {/* Chat Component */}
          <div className="h-[calc(100vh-100px)]">
            <HologramEffect intensity="high" color="#00ffff" glitchIntensity={0.4}>
              <div className="particle-enhanced cyber-distortion">
                <StandaloneChat 
                  title="GLOBAL CHAT" 
                  autoConnect={true}
                  className="h-full"
                />
              </div>
            </HologramEffect>
          </div>
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
          count={100} 
          speed={2}
          style="cyber-rain"
          colors={['#00ffff', '#ff00ff', '#00ff00', '#ffff00']}
          size={3}
        />
        <HexGridEffect 
          rows={20} 
          cols={30}
          color="#00ffff"
          activeColor="#ff00ff"
          animationSpeed={4}
          glowIntensity={1.5}
        />
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Desktop Header */}
        <HologramEffect intensity="high" color="#ff00ff" glitchIntensity={0.4}>
          <div className="flex items-center gap-3 mb-6 cyber-terminal p-6 rounded-lg">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-neon-magenta to-neon-cyan flex items-center justify-center cyber-portal neon-pulse">
              <MessageCircle className="h-6 w-6 text-black" />
            </div>
            <div className="flex-grow">
              <h1 className="font-orbitron font-bold text-3xl text-white mb-1 neon-text-cyan text-glitch-advanced" data-text="CYBERPUNK CHAT NETWORK">
                CYBERPUNK CHAT NETWORK
              </h1>
              <p className="font-tech-mono text-gray-400 text-sm data-stream">
                Connect with cyberpunks around the globe
              </p>
            </div>
            <div className="flex items-center gap-4">
              <DataHex data={['NET', 'MSG', 'AI', 'CHAT']} speed={2.5} color="#00ffff" />
              <div className="text-right">
                <div className="text-neon-magenta font-tech-mono text-sm">STATUS:</div>
                <div className="font-orbitron font-bold text-green-400 neon-pulse">ONLINE</div>
              </div>
            </div>
          </div>
        </HologramEffect>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
          {/* Chat Component */}
          <div className="lg:col-span-3">
            <StandaloneChat 
              title="GLOBAL CYBERPUNK CHAT" 
              autoConnect={true}
              maxMessages={150}
              className="h-full"
            />
          </div>

          {/* Info Panel */}
          <div className="lg:col-span-1 space-y-4">
            {/* Network Status */}
            <Card className="bg-black/60 border-neon-cyan/50 backdrop-blur-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="h-5 w-5 text-neon-cyan" />
                <h3 className="font-orbitron font-bold text-neon-cyan">
                  NETWORK STATUS
                </h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-tech-mono text-gray-400">Connection:</span>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm font-tech-mono text-green-400">ACTIVE</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-tech-mono text-gray-400">Latency:</span>
                  <span className="text-sm font-tech-mono text-neon-cyan">12ms</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-tech-mono text-gray-400">Server:</span>
                  <span className="text-sm font-tech-mono text-neon-magenta">NEO-TOKYO-01</span>
                </div>
              </div>
            </Card>

            {/* Online Users */}
            <Card className="bg-black/60 border-neon-magenta/50 backdrop-blur-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <Users className="h-5 w-5 text-neon-magenta" />
                <h3 className="font-orbitron font-bold text-neon-magenta">
                  ONLINE USERS
                </h3>
              </div>
              
              <div className="text-center">
                <p className="text-2xl font-bold text-white mb-1">
                  {Math.floor(Math.random() * 500) + 100}
                </p>
                <p className="text-sm text-gray-400 font-tech-mono">Active Connections</p>
              </div>
              
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-xs font-tech-mono">
                  <span className="text-gray-500">Americas:</span>
                  <span className="text-neon-cyan">{Math.floor(Math.random() * 150) + 50}</span>
                </div>
                <div className="flex justify-between text-xs font-tech-mono">
                  <span className="text-gray-500">Asia-Pacific:</span>
                  <span className="text-neon-cyan">{Math.floor(Math.random() * 200) + 100}</span>
                </div>
                <div className="flex justify-between text-xs font-tech-mono">
                  <span className="text-gray-500">Europe:</span>
                  <span className="text-neon-cyan">{Math.floor(Math.random() * 120) + 80}</span>
                </div>
              </div>
            </Card>

            {/* Chat Rules */}
            <Card className="bg-black/60 border-gray-700 backdrop-blur-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <Globe className="h-5 w-5 text-gray-400" />
                <h3 className="font-orbitron font-bold text-gray-400">
                  NETWORK RULES
                </h3>
              </div>
              
              <div className="space-y-2 text-xs font-tech-mono text-gray-500">
                <p>• Be respectful to fellow cyberpunks</p>
                <p>• No spam or excessive advertising</p>
                <p>• Keep discussions cyberpunk-related</p>
                <p>• Use /help for available commands</p>
                <p>• Enjoy the neon-lit experience!</p>
              </div>
              
              <div className="mt-4 pt-3 border-t border-gray-700">
                <p className="text-[10px] font-tech-mono text-gray-600">
                  Powered by CyberNet Protocol v2.0.77
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;