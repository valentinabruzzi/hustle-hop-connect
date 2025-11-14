import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const NotificationsSettings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    newJobOffers: true,
    applicationUpdates: true,
    invitations: true,
    feedback: true,
    jobRadius: "20",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Preferenze salvate!",
      description: "Le tue impostazioni notifiche sono state aggiornate.",
    });
    setTimeout(() => navigate("/user/settings"), 1000);
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

          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Notifiche</CardTitle>
              <CardDescription>Gestisci le tue preferenze di notifica</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="emailNotifications">Notifiche Email</Label>
                      <p className="text-sm text-muted-foreground">
                        Ricevi aggiornamenti via email
                      </p>
                    </div>
                    <Switch
                      id="emailNotifications"
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) => 
                        setSettings({ ...settings, emailNotifications: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="pushNotifications">Notifiche Push</Label>
                      <p className="text-sm text-muted-foreground">
                        Ricevi notifiche push sul dispositivo
                      </p>
                    </div>
                    <Switch
                      id="pushNotifications"
                      checked={settings.pushNotifications}
                      onCheckedChange={(checked) => 
                        setSettings({ ...settings, pushNotifications: checked })
                      }
                    />
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-semibold mb-4">Tipologie di Notifiche</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="newJobOffers">Nuove Offerte di Lavoro</Label>
                      <Switch
                        id="newJobOffers"
                        checked={settings.newJobOffers}
                        onCheckedChange={(checked) => 
                          setSettings({ ...settings, newJobOffers: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="applicationUpdates">Aggiornamenti Candidature</Label>
                      <Switch
                        id="applicationUpdates"
                        checked={settings.applicationUpdates}
                        onCheckedChange={(checked) => 
                          setSettings({ ...settings, applicationUpdates: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="invitations">Inviti da Aziende</Label>
                      <Switch
                        id="invitations"
                        checked={settings.invitations}
                        onCheckedChange={(checked) => 
                          setSettings({ ...settings, invitations: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="feedback">Feedback Ricevuti</Label>
                      <Switch
                        id="feedback"
                        checked={settings.feedback}
                        onCheckedChange={(checked) => 
                          setSettings({ ...settings, feedback: checked })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-semibold mb-4">Preferenze Geografiche</h3>
                  <div className="space-y-2">
                    <Label htmlFor="jobRadius">Raggio di Ricerca Lavori</Label>
                    <Select value={settings.jobRadius} onValueChange={(value) => setSettings({ ...settings, jobRadius: value })}>
                      <SelectTrigger id="jobRadius">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">Entro 10 km</SelectItem>
                        <SelectItem value="20">Entro 20 km</SelectItem>
                        <SelectItem value="50">Entro 50 km</SelectItem>
                        <SelectItem value="100">Entro 100 km</SelectItem>
                        <SelectItem value="999">Tutto il territorio</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">
                      Ricevi notifiche per lavori entro questa distanza
                    </p>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-gradient-primary">
                  Salva Preferenze
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

export default NotificationsSettings;
