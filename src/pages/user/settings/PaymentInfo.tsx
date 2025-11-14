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

const PaymentInfo = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    iban: "IT60 X054 2811 1010 0000 0123 456",
    accountHolder: "Mario Rossi",
    bankName: "Intesa Sanpaolo",
    swiftBic: "BCITITMM",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Dati salvati!",
      description: "Le tue coordinate bancarie sono state aggiornate.",
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
              <CardTitle>Metodo di Pagamento</CardTitle>
              <CardDescription>Inserisci le tue coordinate bancarie per ricevere i compensi</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-semibold mb-1">Sicurezza dei dati</p>
                    <p className="text-muted-foreground">
                      Le tue coordinate bancarie sono protette e utilizzate esclusivamente per i bonifici dei compensi.
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="iban">IBAN</Label>
                  <Input
                    id="iban"
                    placeholder="IT00 X000 0000 0000 0000 0000 000"
                    value={formData.iban}
                    onChange={(e) => setFormData({ ...formData, iban: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountHolder">Intestatario Conto</Label>
                  <Input
                    id="accountHolder"
                    placeholder="Nome e Cognome"
                    value={formData.accountHolder}
                    onChange={(e) => setFormData({ ...formData, accountHolder: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bankName">Nome Banca</Label>
                  <Input
                    id="bankName"
                    placeholder="Es. Intesa Sanpaolo"
                    value={formData.bankName}
                    onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="swiftBic">SWIFT/BIC (opzionale)</Label>
                  <Input
                    id="swiftBic"
                    placeholder="Es. BCITITMM"
                    value={formData.swiftBic}
                    onChange={(e) => setFormData({ ...formData, swiftBic: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground">
                    Necessario solo per bonifici internazionali
                  </p>
                </div>
                <Button type="submit" className="w-full bg-gradient-primary">
                  Salva Coordinate Bancarie
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

export default PaymentInfo;
