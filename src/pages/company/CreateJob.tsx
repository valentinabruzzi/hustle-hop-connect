import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Briefcase } from "lucide-react";

const CreateJob = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    company_name: "",
    type: "" as any,
    city: "",
    province: "",
    start_date: "",
    end_date: "",
    duration: "",
    compensation: "",
    total_spots: 1,
    description: "",
    requirements: "",
    dress_code: "",
    benefits: "",
    urgent: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("jobs").insert([formData]);

    if (error) {
      toast({
        title: "Errore",
        description: error.message,
        variant: "destructive",
      });
      setLoading(false);
    } else {
      toast({
        title: "Lavoro pubblicato!",
        description: "Il tuo annuncio è ora visibile a tutti",
      });
      navigate("/explore-jobs");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 bg-muted/30 py-12">
        <div className="container max-w-3xl mx-auto px-4">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Briefcase className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold">Pubblica un Lavoro</h1>
            </div>
            <p className="text-muted-foreground">
              Trova i professionisti perfetti per il tuo evento
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Dettagli dell'annuncio</CardTitle>
              <CardDescription>
                Compila tutti i campi per pubblicare la tua offerta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Info */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Informazioni Base</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="title">Titolo Annuncio *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Es: Hostess per Fashion Week Milano"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company_name">Nome Azienda *</Label>
                    <Input
                      id="company_name"
                      value={formData.company_name}
                      onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type">Tipo di Lavoro *</Label>
                    <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleziona tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hostess">Hostess</SelectItem>
                        <SelectItem value="steward">Steward</SelectItem>
                        <SelectItem value="promoter">Promoter</SelectItem>
                        <SelectItem value="modella">Modella</SelectItem>
                        <SelectItem value="modello">Modello</SelectItem>
                        <SelectItem value="attore">Attore</SelectItem>
                        <SelectItem value="attrice">Attrice</SelectItem>
                        <SelectItem value="cantante">Cantante</SelectItem>
                        <SelectItem value="musicista">Musicista</SelectItem>
                        <SelectItem value="ballerino">Ballerino</SelectItem>
                        <SelectItem value="ballerina">Ballerina</SelectItem>
                        <SelectItem value="fotografo">Fotografo</SelectItem>
                        <SelectItem value="videomaker">Videomaker</SelectItem>
                        <SelectItem value="grafico">Grafico</SelectItem>
                        <SelectItem value="web_designer">Web Designer</SelectItem>
                        <SelectItem value="programmatore">Programmatore</SelectItem>
                        <SelectItem value="social_media_manager">Social Media Manager</SelectItem>
                        <SelectItem value="copywriter">Copywriter</SelectItem>
                        <SelectItem value="traduttore">Traduttore</SelectItem>
                        <SelectItem value="cameriere">Cameriere</SelectItem>
                        <SelectItem value="barista">Barista</SelectItem>
                        <SelectItem value="cuoco">Cuoco</SelectItem>
                        <SelectItem value="receptionist">Receptionist</SelectItem>
                        <SelectItem value="addetto_vendite">Addetto Vendite</SelectItem>
                        <SelectItem value="magazziniere">Magazziniere</SelectItem>
                        <SelectItem value="autista">Autista</SelectItem>
                        <SelectItem value="rider">Rider</SelectItem>
                        <SelectItem value="baby_sitter">Baby Sitter</SelectItem>
                        <SelectItem value="dog_sitter">Dog Sitter</SelectItem>
                        <SelectItem value="personal_trainer">Personal Trainer</SelectItem>
                        <SelectItem value="estetista">Estetista</SelectItem>
                        <SelectItem value="parrucchiere">Parrucchiere</SelectItem>
                        <SelectItem value="make_up_artist">Make Up Artist</SelectItem>
                        <SelectItem value="interprete">Interprete</SelectItem>
                        <SelectItem value="guida_turistica">Guida Turistica</SelectItem>
                        <SelectItem value="animatore">Animatore</SelectItem>
                        <SelectItem value="dj">DJ</SelectItem>
                        <SelectItem value="altro">Altro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">Città *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="province">Provincia *</Label>
                      <Input
                        id="province"
                        value={formData.province}
                        onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                        maxLength={2}
                        placeholder="MI"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Dates and Compensation */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Date e Compenso</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="start_date">Data Inizio *</Label>
                      <Input
                        id="start_date"
                        type="date"
                        value={formData.start_date}
                        onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="end_date">Data Fine *</Label>
                      <Input
                        id="end_date"
                        type="date"
                        value={formData.end_date}
                        onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="duration">Durata *</Label>
                      <Input
                        id="duration"
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        placeholder="Es: 3 giorni, Serale"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="compensation">Compenso *</Label>
                      <Input
                        id="compensation"
                        value={formData.compensation}
                        onChange={(e) => setFormData({ ...formData, compensation: e.target.value })}
                        placeholder="Es: €150/giorno"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="total_spots">Posti Disponibili *</Label>
                    <Input
                      id="total_spots"
                      type="number"
                      min="1"
                      value={formData.total_spots}
                      onChange={(e) => setFormData({ ...formData, total_spots: parseInt(e.target.value) })}
                      required
                    />
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Dettagli</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Descrizione *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Descrivi l'evento e le mansioni richieste"
                      rows={4}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="requirements">Requisiti</Label>
                    <Textarea
                      id="requirements"
                      value={formData.requirements}
                      onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                      placeholder="Es: Inglese fluente, esperienza in eventi"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dress_code">Dress Code</Label>
                    <Input
                      id="dress_code"
                      value={formData.dress_code}
                      onChange={(e) => setFormData({ ...formData, dress_code: e.target.value })}
                      placeholder="Es: Elegante, Casual"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="benefits">Benefit</Label>
                    <Textarea
                      id="benefits"
                      value={formData.benefits}
                      onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                      placeholder="Es: Pranzo incluso, rimborso trasporti"
                      rows={2}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="urgent"
                      checked={formData.urgent}
                      onCheckedChange={(checked) => setFormData({ ...formData, urgent: checked })}
                    />
                    <Label htmlFor="urgent" className="cursor-pointer">
                      Annuncio Urgente (verrà mostrato in evidenza)
                    </Label>
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Pubblicazione..." : "Pubblica Lavoro"}
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

export default CreateJob;
