import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { 
  MapPin, 
  Calendar, 
  Euro, 
  Clock,
  ArrowLeft,
  Building2,
  Users,
  Shirt,
  FileText,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [hasApplied, setHasApplied] = useState(false);
  const [applying, setApplying] = useState(false);

  // Mock job data - in real app, fetch by ID
  const job = {
    id: parseInt(id || "1"),
    title: "Hostess per Fashion Week Milano",
    company: "Fashion Events SRL",
    type: "Hostess",
    city: "Milano",
    province: "MI",
    address: "Fiera Milano, Rho",
    date: "15 Dic 2024",
    dateEnd: "18 Dic 2024",
    startTime: "09:00",
    endTime: "18:00",
    duration: "4 giorni",
    compensation: "€150",
    compensationType: "al giorno",
    urgent: true,
    spots: 3,
    spotsLeft: 1,
    description: `Cerchiamo hostess professionali per un importante evento fashion di livello internazionale.

L'evento si svolgerà presso la Fiera Milano e richiederà la massima professionalità e presenza scenica.

Le hostess selezionate si occuperanno di:
• Accoglienza ospiti VIP
• Assistenza durante le sfilate
• Gestione registrazioni e badge
• Supporto agli organizzatori

Ambiente dinamico e stimolante con possibilità di networking nel settore fashion.`,
    requirements: [
      "Esperienza pregressa come hostess (almeno 1 anno)",
      "Ottima presenza e cura della persona",
      "Inglese fluente (livello B2 minimo)",
      "Disponibilità per tutti i 4 giorni dell'evento",
      "Puntualità e serietà",
    ],
    dresscode: "Abito elegante nero (fornito dall'azienda), scarpe con tacco",
    benefits: [
      "Compenso competitivo",
      "Rimborso trasporti",
      "Pasto incluso",
      "Esperienza in contesto internazionale",
    ]
  };

  const handleApply = () => {
    setApplying(true);
    
    // Simulate API call
    setTimeout(() => {
      setHasApplied(true);
      setApplying(false);
      toast({
        title: "Candidatura inviata!",
        description: "Riceverai una notifica quando l'azienda avrà esaminato il tuo profilo.",
      });
      
      // Redirect after short delay
      setTimeout(() => {
        navigate("/user/dashboard/applications/sended");
      }, 2000);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <Button variant="ghost" asChild className="mb-6">
            <Link to="/esplora-lavori">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Torna ai Lavori
            </Link>
          </Button>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <Badge variant="outline" className="text-sm">{job.type}</Badge>
                        {job.urgent && (
                          <Badge variant="destructive">URGENTE</Badge>
                        )}
                      </div>
                      <CardTitle className="text-3xl mb-2">{job.title}</CardTitle>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Building2 className="h-4 w-4" />
                        <span>{job.company}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-border">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium">Luogo</p>
                        <p className="text-sm text-muted-foreground">{job.city}, {job.province}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium">Date</p>
                        <p className="text-sm text-muted-foreground">{job.date} - {job.dateEnd}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium">Orario</p>
                        <p className="text-sm text-muted-foreground">{job.startTime} - {job.endTime}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Euro className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium">Compenso</p>
                        <p className="text-sm text-muted-foreground font-semibold">
                          {job.compensation} {job.compensationType}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      Descrizione
                    </h3>
                    <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                      {job.description}
                    </p>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      Requisiti
                    </h3>
                    <ul className="space-y-2">
                      {job.requirements.map((req, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="mt-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                          </div>
                          <span className="text-muted-foreground">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <Shirt className="h-5 w-5 text-primary" />
                      Abbigliamento Richiesto
                    </h3>
                    <p className="text-muted-foreground">{job.dresscode}</p>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-semibold text-lg mb-3">Cosa Offriamo</h3>
                    <ul className="space-y-2">
                      {job.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
                          <span className="text-muted-foreground">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-20">
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {/* Spots Available */}
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Users className="h-5 w-5 text-primary" />
                        <p className="font-semibold">Posti Disponibili</p>
                      </div>
                      <p className="text-3xl font-bold text-primary">
                        {job.spotsLeft}/{job.spots}
                      </p>
                    </div>

                    {/* Application Status */}
                    {hasApplied ? (
                      <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle2 className="h-5 w-5 text-success" />
                          <p className="font-semibold text-success">Candidatura Inviata</p>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Riceverai una notifica quando l'azienda avrà esaminato il tuo profilo.
                        </p>
                      </div>
                    ) : (
                      <Button 
                        size="lg" 
                        className="w-full bg-gradient-primary text-lg h-12"
                        onClick={handleApply}
                        disabled={applying}
                      >
                        {applying ? "Invio in corso..." : "Candidati Ora"}
                      </Button>
                    )}

                    {/* Warning if few spots */}
                    {job.spotsLeft <= 2 && !hasApplied && (
                      <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="h-5 w-5 text-warning mt-0.5" />
                          <div>
                            <p className="font-semibold text-warning mb-1">
                              Ultimi posti disponibili!
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Candidati subito per non perdere questa opportunità
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    <Separator />

                    {/* Company Info */}
                    <div>
                      <h4 className="font-semibold mb-3">Info Azienda</h4>
                      <div className="space-y-2 text-sm">
                        <p className="text-muted-foreground">
                          <span className="font-medium text-foreground">Azienda:</span> {job.company}
                        </p>
                        <p className="text-muted-foreground">
                          <span className="font-medium text-foreground">Indirizzo:</span> {job.address}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default JobDetail;
