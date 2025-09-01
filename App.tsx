import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import ConfigPage from "@/pages/ConfigPage";
import UrlTestPage from "@/pages/UrlTestPage";
import StreamingPage from "@/pages/StreamingPage";
import ChatPage from "@/pages/ChatPage";
import NotFoundPage from "@/pages/NotFoundPage";
import Navigation from "@/components/navigation/Navigation";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

function App() {
  return (
    <TooltipProvider>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/config" element={<ConfigPage />} />
          <Route path="/test-urls" element={<UrlTestPage />} />
          <Route path="/streaming" element={<StreamingPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </TooltipProvider>
  );
}

export default App;