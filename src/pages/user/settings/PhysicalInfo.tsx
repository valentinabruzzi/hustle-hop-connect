import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";

const PhysicalInfo = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    height: "178",
    weight: "75",
    size: "M",
    shoeSize: "42",
    eyeColor: "Castani",
    hairColor: "Castano scuro",
    hairLength: "Corto",
    tattoos: "no",
    piercings: "no",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Modifiche salvate!",
      description: "I tuoi dati fisici sono stati aggiornati.",
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
              <CardTitle>Dati Fisici</CardTitle>
              <CardDescription>Inserisci le tue caratteristiche fisiche</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="height">Altezza (cm)</Label>
                    <Input
                      id="height"
                      type="number"
                      value={formData.height}
                      onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight">Peso (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="size">Taglia</Label>
                    <Select value={formData.size} onValueChange={(value) => setFormData({ ...formData, size: value })}>
                      <SelectTrigger id="size">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="XS">XS</SelectItem>
                        <SelectItem value="S">S</SelectItem>
                        <SelectItem value="M">M</SelectItem>
                        <SelectItem value="L">L</SelectItem>
                        <SelectItem value="XL">XL</SelectItem>
                        <SelectItem value="XXL">XXL</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="shoeSize">Numero Scarpe</Label>
                    <Input
                      id="shoeSize"
                      value={formData.shoeSize}
                      onChange={(e) => setFormData({ ...formData, shoeSize: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="eyeColor">Colore Occhi</Label>
                    <Select value={formData.eyeColor} onValueChange={(value) => setFormData({ ...formData, eyeColor: value })}>
                      <SelectTrigger id="eyeColor">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Azzurri">Azzurri</SelectItem>
                        <SelectItem value="Verdi">Verdi</SelectItem>
                        <SelectItem value="Castani">Castani</SelectItem>
                        <SelectItem value="Nocciola">Nocciola</SelectItem>
                        <SelectItem value="Neri">Neri</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hairColor">Colore Capelli</Label>
                    <Select value={formData.hairColor} onValueChange={(value) => setFormData({ ...formData, hairColor: value })}>
                      <SelectTrigger id="hairColor">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Biondo">Biondo</SelectItem>
                        <SelectItem value="Castano chiaro">Castano chiaro</SelectItem>
                        <SelectItem value="Castano scuro">Castano scuro</SelectItem>
                        <SelectItem value="Nero">Nero</SelectItem>
                        <SelectItem value="Rosso">Rosso</SelectItem>
                        <SelectItem value="Grigio">Grigio</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hairLength">Lunghezza Capelli</Label>
                  <Select value={formData.hairLength} onValueChange={(value) => setFormData({ ...formData, hairLength: value })}>
                    <SelectTrigger id="hairLength">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Corti">Corti</SelectItem>
                      <SelectItem value="Medi">Medi</SelectItem>
                      <SelectItem value="Lunghi">Lunghi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tattoos">Tatuaggi</Label>
                    <Select value={formData.tattoos} onValueChange={(value) => setFormData({ ...formData, tattoos: value })}>
                      <SelectTrigger id="tattoos">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="no">No</SelectItem>
                        <SelectItem value="si_nascosti">Sì (nascosti)</SelectItem>
                        <SelectItem value="si_visibili">Sì (visibili)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="piercings">Piercing</Label>
                    <Select value={formData.piercings} onValueChange={(value) => setFormData({ ...formData, piercings: value })}>
                      <SelectTrigger id="piercings">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="no">No</SelectItem>
                        <SelectItem value="si_rimuovibili">Sì (rimuovibili)</SelectItem>
                        <SelectItem value="si_fissi">Sì (fissi)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
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

export default PhysicalInfo;
