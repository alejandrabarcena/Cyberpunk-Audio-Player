# Reproductor de Audio Cyberpunk - Estructura del Proyecto

**Proyecto:** Reproductor de audio con estética cyberpunk, sistema de streaming, chat interactivo y diseño completamente responsivo
**Última actualización:** Implementación completa del sistema de chat avanzado

## Características Implementadas:
- ✅ Reproductor de audio completo con estética cyberpunk
- ✅ Sistema de streaming con canales de radio en vivo
- ✅ Chat interactivo con comandos, emojis y personalización
- ✅ Diseño responsivo mobile-first con breakpoints optimizados
- ✅ Sistema de personalización de playlist vía JSON externo
- ✅ Interfaz adaptativa para móviles, tablets y desktop
- ✅ Controles táctiles optimizados con área mínima de 44px
- ✅ Efectos visuales cyberpunk avanzados (partículas, matriz, visualización de audio)
- ✅ Sistema de partículas en tiempo real con Canvas HTML5
- ✅ Visualización de audio con Web Audio API
- ✅ Efectos CSS avanzados (glitch, neón pulsante, holográfico)
- ✅ Controles de efectos visuales por usuario
- ✅ Scrollbars personalizados y animaciones fluidas
- ✅ Accesibilidad completa (ARIA, navegación por teclado)
- ✅ Sistema de utilidades CSS responsivas personalizadas

## Estructura de Archivos:

/src
├── assets/          # Static resources directory, storing static files like images and fonts
│
├── api/             # API services directory
│   └── audio-service.ts # Service for loading audio playlists from JSON sources
│
├── components/      # Components directory
│   ├── ui/         # Pre-installed shadcn/ui components, avoid modifying or rewriting unless necessary
│   │
│   ├── audio/      # Audio player components
│   │   ├── AudioPlayer.tsx     # Main audio player component with advanced visual effects
│   │   ├── AudioWaveform.tsx   # Enhanced audio waveform with multiple visualization modes
│   │   ├── Header.tsx          # Audio player header component
│   │   ├── NowPlaying.tsx      # Currently playing song info with visual effects
│   │   ├── PlayerButton.tsx    # Reusable player control button component
│   │   ├── PlayerControls.tsx  # Player controls component (play, pause, next, prev, etc.)
│   │   ├── ProgressBar.tsx     # Audio progress bar component with seek functionality
│   │   ├── SongItem.tsx        # Individual song item component in playlist
│   │   └── SongList.tsx        # Song list/playlist component
│   │
│   ├── effects/    # Visual effects components
│   │   ├── ParticleSystem.tsx  # Advanced particle system with multiple styles
│   │   ├── AudioVisualizer.tsx # Real-time audio frequency visualization
│   │   └── CyberMatrix.tsx     # Matrix-style digital rain effect
│   │
│   ├── streaming/  # Streaming and live radio components
│   │   ├── ChannelList.tsx     # List of available streaming channels
│   │   ├── ChatBox.tsx         # Enhanced chat component for streaming
│   │   └── StreamingPlayer.tsx # Streaming player controls
│   │
│   ├── chat/       # Standalone chat system components
│   │   ├── ChatCommands.tsx    # Chat commands picker and helper
│   │   ├── ChatMessage.tsx     # Individual chat message component with roles and styling
│   │   ├── EmojiPicker.tsx     # Emoji selector with cyberpunk categories
│   │   └── StandaloneChat.tsx  # Independent chat component
│   │
│   └── navigation/ # Navigation components
│       └── Navigation.tsx      # Main navigation bar with responsive design
│
├── docs/           # Documentation directory
│   ├── GUIA_AUDIO_PLAYER.md    # Main guide for audio player usage and GitHub deployment
│   ├── GUIA_ARCHIVOS_MUSICA.md # Detailed guide for music file management and hosting
│   ├── GUIA_CHAT.md            # Complete chat system guide with commands and features
│   ├── RESPONSIVE_DESIGN.md    # Comprehensive responsive design implementation guide
│   └── EFECTOS_VISUALES.md     # Complete guide for visual effects and particle systems
│
├── hooks/          # Custom Hooks directory
│   ├── use-audio-player.ts     # Audio player state management hook
│   ├── use-chat-commands.ts    # Chat commands processing and management hook
│   ├── use-streaming.ts        # Streaming and live radio functionality hook
│   ├── use-mobile.ts           # Pre-installed mobile detection Hook from shadcn
│   └── use-toast.ts            # Toast notification system hook for displaying toast messages
│
├── lib/            # Utility library directory
│   └── utils.ts    # Utility functions, including the cn function for merging Tailwind class names
│
├── pages/          # Page components directory, based on React Router structure
│   ├── ChatPage.tsx        # Standalone chat page with global cyberpunk chat
│   ├── ConfigPage.tsx      # Configuration page for playlist customization
│   ├── HomePage.tsx        # Home page component with the audio player
│   ├── NotFoundPage.tsx    # 404 error page component, displays when users access non-existent routes
│   ├── StreamingPage.tsx   # Live streaming page with channels and integrated chat
│   └── UrlTestPage.tsx     # Tool for testing audio and image URLs before adding to playlist
│
├── types/          # TypeScript type definitions
│   ├── audio.ts    # Audio player related type definitions
│   └── streaming.ts # Streaming, chat, and live radio type definitions
│
├── App.tsx         # Root component, with React Router routing system configured
│
├── main.tsx        # Entry file, rendering the root component and mounting to the DOM
│
├── index.css       # Global styles file, containing Tailwind configuration and cyberpunk theme styles
│
└── tailwind.config.js  # Tailwind CSS v3 configuration file with cyberpunk animation extensions

/public
├── index.html           # Main HTML file
├── vite.svg             # Default Vite icon
└── playlist-example.json # Example JSON file showing the format for custom playlists

## Funcionalidades Principales:

### 1. Reproductor de Audio (`/`)
- Reproductor completo con controles de play/pause, siguiente/anterior
- Barra de progreso interactiva con seek
- Control de volumen
- Modos especiales: repetición y aleatorio
- Visualización de ondas de audio
- Lista de reproducción personalizable

### 2. Streaming en Vivo (`/streaming`)
- Canales de radio en vivo simulados
- Chat integrado en tiempo real
- Estadísticas de oyentes
- Diseño responsive con tabs en móvil

### 3. Chat Global (`/chat`)
- Chat independiente con red cyberpunk simulada
- Sistema completo de comandos (/help, /me, /color, etc.)
- Selector de emojis por categorías
- Personalización de usuario (nombre y color)
- Estadísticas de usuarios por región
- Reglas de la comunidad

### 4. Configuración (`/config`)
- Personalización de playlist vía URL JSON
- Instrucciones de uso
- Ejemplos de formato

### 5. Test de URLs (`/test-urls`)
- Herramienta para verificar URLs de audio e imágenes
- Vista previa de archivos antes de añadir a playlist

## Tecnologías Utilizadas:

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **Icons**: Lucide React
- **State Management**: Zustand (para estado global)
- **Routing**: React Router v6
- **Audio**: HTML5 Audio API
- **Responsive**: Mobile-first design con breakpoints personalizados

## Características Técnicas del Chat:

### Comandos Disponibles:
- `/help` - Lista de comandos
- `/me [acción]` - Mensaje de acción
- `/clear` - Limpiar chat
- `/time` - Hora actual
- `/status` - Estado de conexión
- `/users` - Usuarios activos
- `/random` - Frase cyberpunk aleatoria
- `/color #RRGGBB` - Cambiar color de usuario

### Roles de Usuario:
- **SYSTEM** - Mensajes del sistema (cian)
- **ADMIN** - Administrador (rojo, badge especial)
- **MOD** - Moderador (amarillo, badge especial)
- **VIP** - Usuario VIP (púrpura, badge especial)
- **Usuario normal** - Color personalizable

### Persistencia:
- Nombre de usuario: localStorage
- Color de usuario: localStorage
- Configuración de playlist: localStorage

## Navegación:

El proyecto incluye navegación completa entre todas las secciones:
- **MUSIC PLAYER** (/) - Reproductor principal
- **LIVE STREAMING** (/streaming) - Streaming y chat
- **CYBER CHAT** (/chat) - Chat global independiente
- **CONFIG** (/config) - Configuración
- **TEST** (/test-urls) - Herramientas de prueba

## Notas de Implementación:

- Todos los componentes siguen la estética cyberpunk establecida
- Sistema de efectos visuales avanzado con Canvas HTML5 y Web Audio API
- Partículas dinámicas que reaccionan al estado de reproducción
- Visualización de audio en tiempo real con múltiples modos
- Efectos CSS avanzados (glitch, neón pulsante, matriz digital)
- Controles de usuario para activar/desactivar efectos visuales
- Optimización automática para dispositivos móviles
- El chat simula mensajes automáticos para dar sensación de actividad
- La aplicación es completamente funcional sin backend
- Los archivos de audio deben estar alojados externamente
- El diseño es completamente responsive y accesible
- Soporte completo para pantallas táctiles y navegación por teclado