import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, CheckCircle, XCircle, FileAudio, Image as ImageIcon } from "lucide-react";

const UrlTestPage = () => {
  const [audioUrl, setAudioUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [audioTestResult, setAudioTestResult] = useState<"none" | "loading" | "success" | "error">("none");
  const [imageTestResult, setImageTestResult] = useState<"none" | "loading" | "success" | "error">("none");
  const { toast } = useToast();
  const navigate = useNavigate();

  const testAudioUrl = async () => {
    if (!audioUrl) {
      toast({
        title: "URL vacía",
        description: "Por favor ingresa una URL de audio para probar",
        variant: "destructive"
      });
      return;
    }

    setAudioTestResult("loading");
    
    try {
      // Crear un elemento de audio para probar la URL
      const audio = new Audio(audioUrl);
      
      // Configurar eventos para saber si la carga fue exitosa
      audio.addEventListener("loadeddata", () => {
        setAudioTestResult("success");
        toast({
          title: "URL de audio válida",
          description: "La URL de audio funciona correctamente",
        });
      });
      
      // Configurar evento para errores
      audio.addEventListener("error", () => {
        setAudioTestResult("error");
        toast({
          title: "Error en URL de audio",
          description: "No se pudo cargar el audio. Verifica el formato y permisos.",
          variant: "destructive"
        });
      });
      
      // Intentar cargar el audio (solo metadata)
      audio.load();
      
    } catch (error) {
      setAudioTestResult("error");
      toast({
        title: "Error",
        description: "Ocurrió un error al probar la URL de audio",
        variant: "destructive"
      });
    }
  };

  const testImageUrl = () => {
    if (!imageUrl) {
      toast({
        title: "URL vacía",
        description: "Por favor ingresa una URL de imagen para probar",
        variant: "destructive"
      });
      return;
    }

    setImageTestResult("loading");
    
    // Crear una imagen para probar la URL
    const img = new Image();
    
    // Configurar evento para carga exitosa
    img.onload = () => {
      setImageTestResult("success");
      toast({
        title: "URL de imagen válida",
        description: `La imagen se cargó correctamente (${img.width}x${img.height})`,
      });
    };
    
    // Configurar evento para errores
    img.onerror = () => {
      setImageTestResult("error");
      toast({
        title: "Error en URL de imagen",
        description: "No se pudo cargar la imagen. Verifica la URL y permisos.",
        variant: "destructive"
      });
    };
    
    // Intentar cargar la imagen
    img.src = imageUrl;
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
      
      <Card className="border-neon-purple border-2 bg-background/50 backdrop-blur-sm mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-orbitron text-neon-cyan">Verificador de URLs</CardTitle>
          <CardDescription className="font-tech-mono">
            Comprueba si tus URLs de audio e imágenes funcionan correctamente
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-8">
          {/* Prueba de URL de audio */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <FileAudio className="h-5 w-5 text-neon-magenta" />
              <h3 className="font-orbitron text-neon-magenta">Probar URL de Audio</h3>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="audioUrl" className="text-sm font-tech-mono">
                URL del archivo de audio
              </Label>
              <div className="flex gap-2">
                <Input
                  id="audioUrl"
                  placeholder="https://ejemplo.com/mi-cancion.mp3"
                  value={audioUrl}
                  onChange={(e) => setAudioUrl(e.target.value)}
                  className="border-muted-foreground/50 bg-background/50 font-tech-mono"
                />
                <Button 
                  onClick={testAudioUrl}
                  className="bg-neon-cyan text-background hover:bg-neon-cyan/80"
                  disabled={audioTestResult === "loading"}
                >
                  Probar
                </Button>
              </div>
            </div>
            
            {audioTestResult !== "none" && (
              <div className={`p-3 border rounded-md flex items-center gap-2 ${
                audioTestResult === "loading" ? "border-yellow-500 bg-yellow-500/10" :
                audioTestResult === "success" ? "border-green-500 bg-green-500/10" :
                "border-red-500 bg-red-500/10"
              }`}>
                {audioTestResult === "loading" ? (
                  <div className="animate-spin h-5 w-5 border-2 border-neon-yellow rounded-full border-t-transparent" />
                ) : audioTestResult === "success" ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
                <span className="font-tech-mono text-sm">
                  {audioTestResult === "loading" ? "Probando URL..." :
                   audioTestResult === "success" ? "¡La URL de audio funciona correctamente!" :
                   "Error: No se pudo cargar el audio"}
                </span>
              </div>
            )}
          </div>
          
          {/* Prueba de URL de imagen */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-neon-yellow" />
              <h3 className="font-orbitron text-neon-yellow">Probar URL de Imagen</h3>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="imageUrl" className="text-sm font-tech-mono">
                URL de la imagen de portada
              </Label>
              <div className="flex gap-2">
                <Input
                  id="imageUrl"
                  placeholder="https://ejemplo.com/mi-imagen.jpg"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="border-muted-foreground/50 bg-background/50 font-tech-mono"
                />
                <Button 
                  onClick={testImageUrl}
                  className="bg-neon-yellow text-background hover:bg-neon-yellow/80"
                  disabled={imageTestResult === "loading"}
                >
                  Probar
                </Button>
              </div>
            </div>
            
            {imageTestResult !== "none" && (
              <div className={`p-3 border rounded-md flex items-center gap-2 ${
                imageTestResult === "loading" ? "border-yellow-500 bg-yellow-500/10" :
                imageTestResult === "success" ? "border-green-500 bg-green-500/10" :
                "border-red-500 bg-red-500/10"
              }`}>
                {imageTestResult === "loading" ? (
                  <div className="animate-spin h-5 w-5 border-2 border-neon-yellow rounded-full border-t-transparent" />
                ) : imageTestResult === "success" ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
                <span className="font-tech-mono text-sm">
                  {imageTestResult === "loading" ? "Probando URL..." :
                   imageTestResult === "success" ? "¡La URL de imagen funciona correctamente!" :
                   "Error: No se pudo cargar la imagen"}
                </span>
              </div>
            )}
            
            {imageTestResult === "success" && imageUrl && (
              <div className="mt-2">
                <p className="text-sm font-tech-mono mb-2">Vista previa:</p>
                <div className="border border-neon-yellow rounded-md overflow-hidden w-32 h-32">
                  <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>
              </div>
            )}
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col gap-4">
          <Button 
            className="w-full bg-neon-purple hover:bg-neon-purple/80 text-background"
            onClick={() => navigate("/config")}
          >
            Ir a Configuración del Reproductor
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UrlTestPage;