import { useRef } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { useGallery } from "@/hooks/useGallery";
import { ArrowLeft, Upload, X, Star, Loader2 } from "lucide-react";

const Gallery = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { photos, isLoading, uploadPhoto, deletePhoto, setProfilePicture } = useGallery();

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Errore",
        description: "Il file deve essere un'immagine",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "Errore",
        description: "Il file non può superare i 10MB",
        variant: "destructive",
      });
      return;
    }

    try {
      await uploadPhoto.mutateAsync(file);
      toast({
        title: "Foto caricata",
        description: "La foto è stata aggiunta alla gallery.",
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      toast({
        title: "Errore",
        description: "Impossibile caricare la foto",
        variant: "destructive",
      });
    }
  };

  const handleRemove = async (id: string) => {
    try {
      await deletePhoto.mutateAsync(id);
      toast({
        title: "Foto rimossa",
        description: "La foto è stata eliminata dalla gallery.",
      });
    } catch (error) {
      toast({
        title: "Errore",
        description: "Impossibile eliminare la foto",
        variant: "destructive",
      });
    }
  };

  const handleSetProfile = async (id: string) => {
    try {
      await setProfilePicture.mutateAsync(id);
      toast({
        title: "Foto profilo aggiornata",
        description: "La nuova foto profilo è stata impostata.",
      });
    } catch (error) {
      toast({
        title: "Errore",
        description: "Impossibile impostare la foto profilo",
        variant: "destructive",
      });
    }
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
              <div 
                className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileSelect}
                  disabled={uploadPhoto.isPending}
                />
                {uploadPhoto.isPending ? (
                  <Loader2 className="h-12 w-12 text-muted-foreground mx-auto mb-4 animate-spin" />
                ) : (
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                )}
                <p className="text-sm font-medium mb-2">Carica nuove foto</p>
                <p className="text-xs text-muted-foreground mb-4">
                  PNG, JPG fino a 10MB
                </p>
                <Button 
                  variant="outline" 
                  type="button"
                  disabled={uploadPhoto.isPending}
                >
                  {uploadPhoto.isPending ? 'Caricamento...' : 'Seleziona File'}
                </Button>
              </div>

              {isLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : photos.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Nessuna foto caricata</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {photos.map((photo) => (
                    <div key={photo.id} className="relative group">
                      <img 
                        src={photo.photo_url} 
                        alt={`Foto ${photo.id}`}
                        className="w-full aspect-square object-cover rounded-lg"
                      />
                      {photo.is_profile_picture && (
                        <div className="absolute top-2 left-2">
                          <div className="bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1">
                            <Star className="h-3 w-3 fill-current" />
                            Profilo
                          </div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                        {!photo.is_profile_picture && (
                          <Button 
                            size="sm" 
                            variant="secondary"
                            onClick={() => handleSetProfile(photo.id)}
                            disabled={setProfilePicture.isPending}
                          >
                            <Star className="h-4 w-4" />
                          </Button>
                        )}
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleRemove(photo.id)}
                          disabled={deletePhoto.isPending}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Gallery;
