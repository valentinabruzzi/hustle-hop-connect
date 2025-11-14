import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, AlertCircle } from "lucide-react";

const ChangeEmail = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    currentEmail: "mario.rossi@email.com",
    newEmail: "",
    confirmEmail: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newEmail !== formData.confirmEmail) {
      toast({
        title: "Errore",
        description: "Le email non coincidono",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Email aggiornata!",
      description: "Controlla la tua nuova email per confermare il cambio.",
    });
    setTimeout(() => navigate("/user/settings"), 1500);
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
              <CardTitle>Cambia Email</CardTitle>
              <CardDescription>Modifica l'indirizzo email del tuo account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-semibold mb-1">Importante</p>
                    <p className="text-muted-foreground">
                      Dopo aver cambiato l'email, dovrai confermare il nuovo indirizzo tramite il link che ti invieremo.
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentEmail">Email Attuale</Label>
                  <Input
                    id="currentEmail"
                    type="email"
                    value={formData.currentEmail}
                    disabled
                    className="bg-muted"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newEmail">Nuova Email</Label>
                  <Input
                    id="newEmail"
                    type="email"
                    placeholder="nuova@email.com"
                    value={formData.newEmail}
                    onChange={(e) => setFormData({ ...formData, newEmail: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmEmail">Conferma Nuova Email</Label>
                  <Input
                    id="confirmEmail"
                    type="email"
                    placeholder="nuova@email.com"
                    value={formData.confirmEmail}
                    onChange={(e) => setFormData({ ...formData, confirmEmail: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password Attuale</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Inserisci la tua password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-gradient-primary">
                  Cambia Email
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

export default ChangeEmail;
