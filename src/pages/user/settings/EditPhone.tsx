import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";

const EditPhone = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [phone, setPhone] = useState("+39 345 678 9012");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Numero aggiornato!",
      description: "Il tuo numero di telefono è stato modificato.",
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
              <CardTitle>Numero di Telefono</CardTitle>
              <CardDescription>Modifica il tuo numero di telefono</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Numero di Telefono</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+39 123 456 7890"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    Inserisci il numero con prefisso internazionale
                  </p>
                </div>
                <Button type="submit" className="w-full bg-gradient-primary">
                  Salva Numero
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

export default EditPhone;
