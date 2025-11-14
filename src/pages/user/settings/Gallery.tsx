import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Upload, X, Star } from "lucide-react";

const Gallery = () => {
  const { toast } = useToast();
  const [photos, setPhotos] = useState([
    { id: 1, url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop", isProfile: true },
    { id: 2, url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop", isProfile: false },
    { id: 3, url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop", isProfile: false },
  ]);

  const handleRemove = (id: number) => {
    setPhotos(photos.filter(p => p.id !== id));
    toast({
      title: "Foto rimossa",
      description: "La foto è stata eliminata dalla gallery.",
    });
  };

  const handleSetProfile = (id: number) => {
    setPhotos(photos.map(p => ({ ...p, isProfile: p.id === id })));
    toast({
      title: "Foto profilo aggiornata",
      description: "La nuova foto profilo è stata impostata.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <Button variant="ghost" asChild className="mb-6">
            <Link to="/user/settings">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Torna alle Impostazioni
            </Link>
          </Button>

          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle>Foto e Gallery</CardTitle>
              <CardDescription>Gestisci le foto del tuo profilo pubblico</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm font-medium mb-2">Carica nuove foto</p>
                <p className="text-xs text-muted-foreground mb-4">
                  PNG, JPG fino a 10MB
                </p>
                <Button variant="outline">Seleziona File</Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {photos.map((photo) => (
                  <div key={photo.id} className="relative group">
                    <img 
                      src={photo.url} 
                      alt={`Foto ${photo.id}`}
                      className="w-full aspect-square object-cover rounded-lg"
                    />
                    {photo.isProfile && (
                      <div className="absolute top-2 left-2">
                        <div className="bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1">
                          <Star className="h-3 w-3 fill-current" />
                          Profilo
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                      {!photo.isProfile && (
                        <Button 
                          size="sm" 
                          variant="secondary"
                          onClick={() => handleSetProfile(photo.id)}
                        >
                          <Star className="h-4 w-4" />
                        </Button>
                      )}
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleRemove(photo.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Gallery;
