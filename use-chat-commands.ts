import { useState, useCallback } from 'react';
import { ChatMessage } from '@/types/streaming';

interface UseChatCommandsProps {
  onAddSystemMessage: (message: string) => void;
  onClearMessages: () => void;
  messages: ChatMessage[];
}

export const useChatCommands = ({ onAddSystemMessage, onClearMessages, messages }: UseChatCommandsProps) => {
  const [userColor, setUserColor] = useState<string>('#FF00FF');

  const cyberpunkPhrases = [
    "The matrix has you...",
    "Welcome to the future, choom",
    "Neural link established",
    "Connecting to the Net...",
    "ICE detected - be careful",
    "Your data is now encrypted",
    "Cyber ghost in the machine",
    "The neon never sleeps",
    "Digital dreams come true",
    "Hack the planet!"
  ];

  const processCommand = useCallback((command: string, username: string): { message: string; processed: boolean; color?: string } => {
    const parts = command.trim().split(' ');
    const cmd = parts[0].toLowerCase();

    switch (cmd) {
      case '/help':
        onAddSystemMessage(
          'Available commands: /help, /me [action], /clear, /time, /status, /users, /random, /color [hex]'
        );
        return { message: '', processed: true };

      case '/me':
        if (parts.length > 1) {
          const action = parts.slice(1).join(' ');
          return { 
            message: `/me ${action}`, 
            processed: false,
            color: userColor
          };
        }
        onAddSystemMessage('Usage: /me [action] - Example: /me is listening to music');
        return { message: '', processed: true };

      case '/clear':
        onClearMessages();
        onAddSystemMessage('Chat history cleared');
        return { message: '', processed: true };

      case '/time':
        const now = new Date();
        const timeString = now.toLocaleString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        });
        onAddSystemMessage(`Current time: ${timeString}`);
        return { message: '', processed: true };

      case '/status':
        onAddSystemMessage('Connection status: ONLINE - Neural link stable');
        return { message: '', processed: true };

      case '/users':
        const uniqueUsers = new Set(messages.filter(m => !m.isSystem).map(m => m.username));
        onAddSystemMessage(`Active users in chat: ${uniqueUsers.size}`);
        return { message: '', processed: true };

      case '/random':
        const randomPhrase = cyberpunkPhrases[Math.floor(Math.random() * cyberpunkPhrases.length)];
        onAddSystemMessage(`Random cyberpunk phrase: "${randomPhrase}"`);
        return { message: '', processed: true };

      case '/color':
        if (parts.length > 1) {
          const color = parts[1];
          if (/^#[0-9A-F]{6}$/i.test(color)) {
            setUserColor(color);
            localStorage.setItem('cyberpunk_chat_color', color);
            onAddSystemMessage(`Username color changed to ${color}`);
            return { message: '', processed: true, color };
          } else {
            onAddSystemMessage('Invalid color format. Use hex format like #FF00FF');
            return { message: '', processed: true };
          }
        }
        onAddSystemMessage(`Current color: ${userColor}. Usage: /color #FF00FF`);
        return { message: '', processed: true };

      default:
        if (command.startsWith('/')) {
          onAddSystemMessage(`Unknown command: ${cmd}. Type /help for available commands.`);
          return { message: '', processed: true };
        }
        return { message: command, processed: false, color: userColor };
    }
  }, [onAddSystemMessage, onClearMessages, messages, userColor]);

  // Load saved color on initialization
  useState(() => {
    const savedColor = localStorage.getItem('cyberpunk_chat_color');
    if (savedColor && /^#[0-9A-F]{6}$/i.test(savedColor)) {
      setUserColor(savedColor);
    }
  });

  return {
    processCommand,
    userColor
  };
};