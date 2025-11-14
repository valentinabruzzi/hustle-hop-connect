import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Plus, X } from "lucide-react";

const MoreInfo = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    drivingLicense: true,
    ownCar: true,
    availableForTravel: true,
  });
  const [languages, setLanguages] = useState([
    { id: 1, name: "Inglese", level: "C1" },
  ]);
  const [certifications, setCertifications] = useState([
    { id: 1, name: "HACCP" },
  ]);

  const handleAddLanguage = () => {
    setLanguages([...languages, { id: Date.now(), name: "", level: "A1" }]);
  };

  const handleAddCertification = () => {
    setCertifications([...certifications, { id: Date.now(), name: "" }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Modifiche salvate!",
      description: "Le tue informazioni aggiuntive sono state aggiornate.",
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
              <CardTitle>Altre Informazioni</CardTitle>
              <CardDescription>Dettagli aggiuntivi sul tuo profilo</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="drivingLicense">Patente B</Label>
                      <p className="text-sm text-muted-foreground">Possiedo la patente di guida</p>
                    </div>
                    <Switch
                      id="drivingLicense"
                      checked={formData.drivingLicense}
                      onCheckedChange={(checked) => setFormData({ ...formData, drivingLicense: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="ownCar">Auto Propria</Label>
                      <p className="text-sm text-muted-foreground">Possiedo un'auto</p>
                    </div>
                    <Switch
                      id="ownCar"
                      checked={formData.ownCar}
                      onCheckedChange={(checked) => setFormData({ ...formData, ownCar: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="availableForTravel">Disponibile per Trasferte</Label>
                      <p className="text-sm text-muted-foreground">Accetto lavori fuori città</p>
                    </div>
                    <Switch
                      id="availableForTravel"
                      checked={formData.availableForTravel}
                      onCheckedChange={(checked) => setFormData({ ...formData, availableForTravel: checked })}
                    />
                  </div>
                </div>

                <div className="border-t pt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Lingue</Label>
                    <Button type="button" variant="outline" size="sm" onClick={handleAddLanguage}>
                      <Plus className="h-4 w-4 mr-2" />
                      Aggiungi
                    </Button>
                  </div>
                  {languages.map((lang) => (
                    <div key={lang.id} className="flex gap-2">
                      <Input
                        placeholder="Lingua"
                        value={lang.name}
                        onChange={(e) => {
                          const updated = languages.map(item =>
                            item.id === lang.id ? { ...item, name: e.target.value } : item
                          );
                          setLanguages(updated);
                        }}
                        className="flex-1"
                      />
                      <Select
                        value={lang.level}
                        onValueChange={(value) => {
                          const updated = languages.map(item =>
                            item.id === lang.id ? { ...item, level: value } : item
                          );
                          setLanguages(updated);
                        }}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A1">A1</SelectItem>
                          <SelectItem value="A2">A2</SelectItem>
                          <SelectItem value="B1">B1</SelectItem>
                          <SelectItem value="B2">B2</SelectItem>
                          <SelectItem value="C1">C1</SelectItem>
                          <SelectItem value="C2">C2</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setLanguages(languages.filter(l => l.id !== lang.id))}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Certificazioni</Label>
                    <Button type="button" variant="outline" size="sm" onClick={handleAddCertification}>
                      <Plus className="h-4 w-4 mr-2" />
                      Aggiungi
                    </Button>
                  </div>
                  {certifications.map((cert) => (
                    <div key={cert.id} className="flex gap-2">
                      <Input
                        placeholder="Nome certificazione"
                        value={cert.name}
                        onChange={(e) => {
                          const updated = certifications.map(item =>
                            item.id === cert.id ? { ...item, name: e.target.value } : item
                          );
                          setCertifications(updated);
                        }}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setCertifications(certifications.filter(c => c.id !== cert.id))}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
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

export default MoreInfo;
