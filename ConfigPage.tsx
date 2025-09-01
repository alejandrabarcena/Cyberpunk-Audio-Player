import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, FileJson, GithubIcon, HelpCircle } from "lucide-react";
import { loadSongList } from "@/api/audio-service";

const ConfigPage = () => {
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSaveConfig = async () => {
    setIsLoading(true);
    try {
      // Intenta cargar la lista para validar
      await loadSongList(playlistUrl);
      
      // Guarda la URL en localStorage para que persista
      localStorage.setItem("cyberpunk_player_playlist_url", playlistUrl);
      
      toast({
        title: "Configuración guardada",
        description: "La playlist se ha configurado correctamente",
      });
      
      // Regresa a la página principal
      navigate("/");
    } catch (error) {
      console.error("Error validating playlist URL:", error);
      toast({
        title: "Error",
        description: "No se pudo cargar la playlist desde la URL proporcionada. Verifica el formato y la accesibilidad.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewExample = () => {
    // Abre el archivo de ejemplo en una nueva pestaña
    window.open("/playlist-example.json", "_blank");
  };

  return (
    <div className="container max-w-3xl py-8 px-4 md:py-12">
      <Button 
        variant="ghost" 
        className="mb-6 text-muted-foreground" 
        onClick={() => navigate("/")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Volver al reproductor
      </Button>
      
      <Card className="border-neon-purple border-2 bg-background/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-orbitron text-neon-cyan">Configuración del Reproductor</CardTitle>
          <CardDescription className="font-tech-mono">
            Personaliza tu reproductor de audio cyberpunk
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="playlistUrl" className="text-lg font-orbitron text-neon-magenta">
              URL de la Playlist JSON
            </Label>
            <Input
              id="playlistUrl"
              placeholder="https://ejemplo.com/mi-playlist.json"
              value={playlistUrl}
              onChange={(e) => setPlaylistUrl(e.target.value)}
              className="border-muted-foreground/50 bg-background/50 font-tech-mono"
            />
            <p className="text-sm text-muted-foreground font-tech-mono">
              Ingresa la URL de un archivo JSON que contenga tu lista de reproducción personalizada
            </p>
          </div>

          <div className="flex flex-col gap-4 p-4 border border-dashed border-muted-foreground/50 rounded-md bg-background/30">
            <div className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-neon-yellow" />
              <h3 className="font-orbitron text-neon-yellow text-sm">¿Cómo funciona?</h3>
            </div>
            <p className="text-sm text-muted-foreground font-tech-mono">
              El archivo JSON debe tener un formato específico con un array de canciones que incluya título, 
              artista, URL del archivo de audio, URL de la portada y duración.
            </p>
            <Button 
              variant="outline" 
              className="w-full text-neon-cyan border-neon-cyan hover:bg-neon-cyan/10" 
              onClick={handleViewExample}
            >
              <FileJson className="mr-2 h-4 w-4" /> Ver ejemplo de formato JSON
            </Button>
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col gap-4">
          <Button 
            className="w-full bg-neon-magenta hover:bg-neon-magenta/80 text-background"
            onClick={handleSaveConfig}
            disabled={isLoading}
          >
            {isLoading ? "Guardando..." : "Guardar configuración"}
          </Button>
          
          <div className="w-full text-center">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-neon-cyan flex items-center justify-center"
            >
              <GithubIcon className="mr-2 h-4 w-4" />
              Ver en GitHub
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ConfigPage;