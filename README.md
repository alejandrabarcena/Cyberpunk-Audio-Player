# 🎧 Reproductor de Audio Cyberpunk

Un reproductor de audio web con diseño cyberpunk que presenta una interfaz futurista y neón. Esta aplicación permite escuchar música con controles avanzados y visualizaciones únicas, todo con una estética cyberpunk distintiva.

![Reproductor de Audio Cyberpunk](https://images.unsplash.com/photo-1614149162883-504ce4d13909?w=800&h=400&fit=crop)

## ✨ Características

- 🎵 **Reproductor de audio completo** con controles de reproducción, pausa, anterior y siguiente
- 🔄 **Modos especiales** como repetición y reproducción aleatoria
- 🎚️ **Control de volumen** con indicadores visuales de nivel
- 📊 **Visualizador de ondas** con estilo neón que reacciona a la música
- 📱 **Diseño responsive** para escritorio y dispositivos móviles
- 🎨 **Estética cyberpunk** con colores neón y efectos visuales futuristas
- 🛠️ **Configuración personalizada** para cargar tus propias listas de reproducción

## 🚀 Tecnologías

- **React** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Utilidades de estilo
- **shadcn/ui** - Componentes de UI
- **React Router** - Navegación
- **Vite** - Empaquetado y desarrollo

## 🏁 Cómo empezar

### Requisitos previos

- Node.js (versión 18 o superior)
- npm o yarn

### Instalación

1. Clona este repositorio
   ```bash
   git clone https://github.com/tu-usuario/cyberpunk-audio-player.git
   cd cyberpunk-audio-player
   ```

2. Instala las dependencias
   ```bash
   npm install
   # o
   yarn install
   ```

3. Inicia el servidor de desarrollo
   ```bash
   npm run dev
   # o
   yarn dev
   ```

4. Abre tu navegador en `http://localhost:5173`

## 🎵 Personalización

### Añadir tus propias canciones

1. Crea un archivo JSON con este formato:
   ```json
   {
     "songs": [
       {
         "id": 1,
         "title": "Nombre de la canción",
         "artist": "Nombre del artista",
         "audioSrc": "URL_DEL_AUDIO",
         "cover": "URL_DE_LA_PORTADA",
         "duration": 180
       }
     ]
   }
   ```

2. Sube este archivo a un servidor o servicio como GitHub Gist

3. En la aplicación, ve a la página de configuración haciendo clic en el botón "Config"

4. Ingresa la URL de tu archivo JSON y guarda la configuración

### Opciones de alojamiento de archivos

- **Audio:** Puedes usar servicios como Archive.org, Soundcloud, GitHub Pages
- **Imágenes:** Unsplash, Imgur, ImgBB

Consulta la [Guía completa](./src/docs/GUIA_AUDIO_PLAYER.md) para más detalles.

## 📋 Documentación

Para más información sobre cómo personalizar el reproductor, agregar nuevas canciones o subir el proyecto a GitHub, consulta el archivo [GUIA_AUDIO_PLAYER.md](./src/docs/GUIA_AUDIO_PLAYER.md).

## 📱 Vistas de la aplicación

### Vista de escritorio
![Vista de escritorio](https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop)

### Vista móvil
![Vista móvil](https://images.unsplash.com/photo-1515405295579-ba7b45403062?w=400&h=600&fit=crop)
