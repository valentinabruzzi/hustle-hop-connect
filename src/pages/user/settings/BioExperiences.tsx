import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { useProfile } from "@/hooks/useProfile";
import { useExperiences } from "@/hooks/useExperiences";
import { ArrowLeft, Plus, X, Loader2 } from "lucide-react";

const BioExperiences = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { profile, updateProfile } = useProfile();
  const { experiences, addExperience, updateExperience, deleteExperience } = useExperiences();
  
  const [bio, setBio] = useState("");
  const [localExperiences, setLocalExperiences] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setBio(profile.bio || "");
    }
  }, [profile]);

  useEffect(() => {
    if (experiences) {
      setLocalExperiences(experiences);
    }
  }, [experiences]);

  const handleAddExperience = () => {
    setLocalExperiences([...localExperiences, { 
      id: `temp-${Date.now()}`, 
      title: "", 
      company: "", 
      period: "", 
      description: "",
      isNew: true 
    }]);
  };

  const handleRemoveExperience = async (exp: any) => {
    if (exp.isNew) {
      setLocalExperiences(localExperiences.filter(e => e.id !== exp.id));
    } else {
      try {
        await deleteExperience.mutateAsync(exp.id);
        toast({
          title: "Esperienza eliminata",
          description: "L'esperienza è stata rimossa definitivamente.",
        });
      } catch (error) {
        toast({
          title: "Errore",
          description: "Impossibile eliminare l'esperienza",
          variant: "destructive",
        });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await updateProfile.mutateAsync({ bio });

      for (const exp of localExperiences) {
        if (exp.isNew && exp.title && exp.company) {
          await addExperience.mutateAsync({
            title: exp.title,
            company: exp.company,
            period: exp.period,
            description: exp.description,
          });
        } else if (!exp.isNew && exp.title && exp.company) {
          await updateExperience.mutateAsync({
            id: exp.id,
            title: exp.title,
            company: exp.company,
            period: exp.period,
            description: exp.description,
          });
        }
      }

      toast({
        title: "Modifiche salvate!",
        description: "Bio ed esperienze aggiornate con successo.",
      });
      
      setTimeout(() => navigate("/user/settings"), 1000);
    } catch (error) {
      toast({
        title: "Errore",
        description: "Impossibile salvare le modifiche",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const updateLocalExperience = (id: string, field: string, value: string) => {
    setLocalExperiences(localExperiences.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
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

          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle>Bio & Esperienze</CardTitle>
              <CardDescription>Racconta la tua storia professionale</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="bio">Biografia</Label>
                  <Textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={4}
                    placeholder="Raccontaci di te..."
                  />
                  <p className="text-xs text-muted-foreground">
                    {bio.length}/500 caratteri
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Esperienze Lavorative</Label>
                    <Button type="button" variant="outline" size="sm" onClick={handleAddExperience}>
                      <Plus className="h-4 w-4 mr-2" />
                      Aggiungi
                    </Button>
                  </div>

                  {experiences.map((exp, index) => (
                    <Card key={exp.id}>
                      <CardContent className="p-4 space-y-3">
                        <div className="flex justify-between items-start">
                          <Label>Esperienza #{index + 1}</Label>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveExperience(exp.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <Input
                          placeholder="Titolo ruolo"
                          value={exp.title}
                          onChange={(e) => {
                            const updated = localExperiences.map(item =>
                              item.id === exp.id ? { ...item, title: e.target.value } : item
                            );
                            setLocalExperiences(updated);
                          }}
                        />
                        <Input
                          placeholder="Nome azienda"
                          value={exp.company}
                          onChange={(e) => {
                            const updated = localExperiences.map(item =>
                              item.id === exp.id ? { ...item, company: e.target.value } : item
                            );
                            setLocalExperiences(updated);
                          }}
                        />
                        <Input
                          placeholder="Periodo (es. 2023-2024)"
                          value={exp.period}
                          onChange={(e) => {
                            const updated = localExperiences.map(item =>
                              item.id === exp.id ? { ...item, period: e.target.value } : item
                            );
                            setLocalExperiences(updated);
                          }}
                        />
                        <Textarea
                          placeholder="Breve descrizione"
                          value={exp.description}
                          rows={2}
                          onChange={(e) => {
                            const updated = localExperiences.map(item =>
                              item.id === exp.id ? { ...item, description: e.target.value } : item
                            );
                            setLocalExperiences(updated);
                          }}
                        />
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Button type="submit" className="w-full bg-gradient-primary">
                  Salva Modifiche
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BioExperiences;
