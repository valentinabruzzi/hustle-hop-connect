import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, AlertCircle } from "lucide-react";

const DisableProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isActive, setIsActive] = useState(true);

  const handleToggle = () => {
    const newState = !isActive;
    setIsActive(newState);
    toast({
      title: newState ? "Profilo attivato!" : "Profilo disattivato",
      description: newState 
        ? "Il tuo profilo è ora visibile alle aziende." 
        : "Il tuo profilo non è più visibile alle aziende.",
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

          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Stato Profilo</CardTitle>
              <CardDescription>Gestisci la visibilità del tuo profilo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-semibold mb-1">Cosa succede quando disattivi il profilo?</p>
                    <ul className="text-muted-foreground space-y-1 ml-4 list-disc">
                      <li>Il tuo profilo non sarà visibile alle aziende</li>
                      <li>Non riceverai nuovi inviti a lavori</li>
                      <li>Non apparirai nei risultati di ricerca</li>
                      <li>I lavori già confermati non saranno influenzati</li>
                      <li>Potrai riattivare il profilo in qualsiasi momento</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="space-y-0.5">
                  <Label htmlFor="profileStatus" className="text-base">
                    Profilo {isActive ? "Attivo" : "Disattivato"}
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {isActive 
                      ? "Il tuo profilo è visibile alle aziende" 
                      : "Il tuo profilo è nascosto alle aziende"}
                  </p>
                </div>
                <Switch
                  id="profileStatus"
                  checked={isActive}
                  onCheckedChange={handleToggle}
                />
              </div>

              {!isActive && (
                <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                  <p className="text-sm text-foreground">
                    <strong>Attenzione:</strong> Il tuo profilo è attualmente disattivato. 
                    Riattivalo per ricevere nuove opportunità di lavoro.
                  </p>
                </div>
              )}

              <Button 
                onClick={() => navigate("/user/settings")} 
                variant="outline" 
                className="w-full"
              >
                Torna alle Impostazioni
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DisableProfile;
