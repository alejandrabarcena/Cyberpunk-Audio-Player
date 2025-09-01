import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '@/types/streaming';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, MessageCircle, Users, Settings, Trash2 } from 'lucide-react';
import EmojiPicker from '@/components/chat/EmojiPicker';
import ChatCommands from '@/components/chat/ChatCommands';
import ChatMessageComponent from '@/components/chat/ChatMessage';
import { useChatCommands } from '@/hooks/use-chat-commands';

interface ChatBoxProps {
  messages: ChatMessage[];
  isConnected: boolean;
  onSendMessage: (message: string, username: string, color?: string) => void;
  onClearMessages?: () => void;
}

const ChatBox: React.FC<ChatBoxProps> = ({ messages, isConnected, onSendMessage, onClearMessages }) => {
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState(() => {
    return localStorage.getItem('cyberpunk_chat_username') || 'CYBER_USER';
  });
  const [isSettingUsername, setIsSettingUsername] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [localMessages, setLocalMessages] = useState<ChatMessage[]>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Combine external messages with local system messages
  const allMessages = [...messages, ...localMessages].sort((a, b) => 
    a.timestamp.getTime() - b.timestamp.getTime()
  );

  const addSystemMessage = (msg: string) => {
    const systemMessage: ChatMessage = {
      id: Date.now().toString(),
      username: 'SYSTEM',
      message: msg,
      timestamp: new Date(),
      isSystem: true,
      color: '#00FFFF'
    };
    setLocalMessages(prev => [...prev, systemMessage]);
  };

  const clearLocalMessages = () => {
    setLocalMessages([]);
    if (onClearMessages) {
      onClearMessages();
    }
  };

  const { processCommand, userColor } = useChatCommands({
    onAddSystemMessage: addSystemMessage,
    onClearMessages: clearLocalMessages,
    messages: allMessages
  });

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    const timer = setTimeout(() => {
      if (scrollAreaRef.current) {
        const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
        if (scrollContainer) {
          scrollContainer.scrollTop = scrollContainer.scrollHeight;
        }
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [allMessages]);

  const handleSendMessage = () => {
    if (message.trim() && isConnected) {
      const result = processCommand(message, username);
      
      if (!result.processed) {
        onSendMessage(result.message, username, result.color || userColor);
      }
      
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleUsernameChange = (newUsername: string) => {
    const sanitized = newUsername.replace(/[^a-zA-Z0-9_]/g, '').toUpperCase();
    if (sanitized.length > 0) {
      setUsername(sanitized);
      localStorage.setItem('cyberpunk_chat_username', sanitized);
      addSystemMessage(`Username changed to: ${sanitized}`);
    }
    setIsSettingUsername(false);
  };

  const handleEmojiSelect = (emoji: string) => {
    setMessage(prev => prev + emoji);
  };

  const handleCommandSelect = (command: string) => {
    setMessage(command);
  };

  const handleClearChat = () => {
    clearLocalMessages();
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="bg-black/80 border-neon-magenta/50 backdrop-blur-sm h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-neon-magenta/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-neon-magenta" />
            <h3 className="font-orbitron font-bold text-neon-magenta">
              LIVE CHAT
            </h3>
          </div>
          
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-gray-400" />
            <span className="text-sm font-tech-mono text-gray-400">
              {messages.filter(m => !m.isSystem).length > 0 ? 'Active' : 'Waiting...'}
            </span>
          </div>
        </div>
        
        {/* Username and Controls Section */}
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-tech-mono text-gray-500">USER:</span>
            {isSettingUsername ? (
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value.replace(/[^a-zA-Z0-9_]/g, '').toUpperCase())}
                onBlur={() => handleUsernameChange(username)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleUsernameChange(username);
                  }
                }}
                className="h-6 text-xs bg-black/50 border-neon-magenta/30 text-neon-magenta font-tech-mono"
                maxLength={16}
                autoFocus
              />
            ) : (
              <button
                onClick={() => setIsSettingUsername(true)}
                className="text-xs font-tech-mono hover:text-neon-magenta/80 transition-colors"
                style={{ color: userColor }}
              >
                {username}
              </button>
            )}
          </div>
          
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearChat}
              className="p-1 text-gray-500 hover:text-red-400 hover:bg-red-400/10 transition-colors"
              title="Clear chat"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSettings(!showSettings)}
              className="p-1 text-gray-500 hover:text-gray-300 hover:bg-gray-700/50 transition-colors"
              title="Settings"
            >
              <Settings className="h-3 w-3" />
            </Button>
          </div>
        </div>
        
        {/* Settings Panel */}
        {showSettings && (
          <div className="mt-2 p-2 bg-black/40 rounded border border-gray-700">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-tech-mono text-gray-400">Color:</span>
              <div 
                className="w-4 h-4 rounded border border-gray-600 cursor-pointer"
                style={{ backgroundColor: userColor }}
                title={userColor}
              />
              <span className="font-tech-mono text-gray-500">{userColor}</span>
            </div>
            <p className="text-[10px] font-tech-mono text-gray-600 mt-1">
              Use /color #RRGGBB to change username color
            </p>
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-grow min-h-0 p-2">
        <ScrollArea className="h-full" ref={scrollAreaRef}>
          <div className="space-y-1 p-2">
            {allMessages.length === 0 ? (
              <div className="text-center py-8">
                <MessageCircle className="h-8 w-8 text-gray-600 mx-auto mb-2" />
                <p className="text-sm font-tech-mono text-gray-600">
                  {isConnected ? 'Waiting for messages...' : 'Connect to a channel to chat'}
                </p>
                <p className="text-xs font-tech-mono text-gray-700 mt-2">
                  Type /help for available commands
                </p>
              </div>
            ) : (
              allMessages.map((msg) => (
                <ChatMessageComponent key={msg.id} message={msg} />
              ))
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Input */}
      <div className="p-3 border-t border-neon-magenta/20">
        {/* Input Controls */}
        <div className="flex items-center gap-1 mb-2">
          <EmojiPicker onEmojiSelect={handleEmojiSelect} />
          <ChatCommands onCommandSelect={handleCommandSelect} />
          <div className="flex-grow" />
          <span className="text-[10px] font-tech-mono text-gray-600">
            {message.length}/200
          </span>
        </div>
        
        <div className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={isConnected ? "Type your message or /help for commands..." : "Connect to chat..."}
            disabled={!isConnected}
            className={`
              flex-grow font-tech-mono text-sm
              bg-black/50 border-gray-600 text-gray-200
              placeholder:text-gray-500
              focus:border-neon-magenta focus:ring-neon-magenta/20
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
            maxLength={200}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!message.trim() || !isConnected}
            size="sm"
            className={`
              px-3 transition-all duration-300
              ${message.trim() && isConnected
                ? 'bg-neon-magenta/20 border border-neon-magenta text-neon-magenta hover:bg-neon-magenta/30'
                : 'bg-gray-800 border border-gray-700 text-gray-500'
              }
            `}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="mt-2 flex justify-between text-xs font-tech-mono text-gray-600">
          <span className="flex items-center gap-1">
            <div className={`w-2 h-2 rounded-full ${
              isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'
            }`} />
            {isConnected ? 'Neural Link Active' : 'Connection Lost'}
          </span>
          <span>
            {allMessages.filter(m => !m.isSystem).length} msgs
          </span>
        </div>
      </div>
    </Card>
  );
};

export default ChatBox;