import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { 
  ArrowLeft,
  Calendar,
  MapPin,
  CheckCircle,
  Clock,
  AlertCircle,
  Navigation
} from "lucide-react";

const ConfirmedJobs = () => {
  const confirmedJobs = [
    {
      id: 1,
      jobTitle: "Promoter Evento Sportivo",
      company: "Sport Marketing Italia",
      city: "Roma",
      address: "Stadio Olimpico, Via dei Gladiatori",
      date: "20 Dic 2024",
      startTime: "14:00",
      endTime: "22:00",
      compensation: "€120/giorno",
      daysUntil: 5,
      contactPerson: "Marco Bianchi",
      contactPhone: "+39 345 678 9012",
      notes: "Presentarsi 30 minuti prima. Abbigliamento: divisa fornita all'ingresso."
    },
    {
      id: 2,
      jobTitle: "Hostess Fiera Tecnologia",
      company: "Tech Expo Group",
      city: "Milano",
      address: "Fiera Milano, Pad. 3",
      date: "22 Dic 2024",
      startTime: "09:00",
      endTime: "18:00",
      compensation: "€140/giorno",
      daysUntil: 7,
      contactPerson: "Laura Rossi",
      contactPhone: "+39 334 567 8901",
      notes: "Richiesto abbigliamento formale. Badge disponibile all'ingresso principale."
    },
    {
      id: 3,
      jobTitle: "Steward Concerto VIP",
      company: "Live Nation Events",
      city: "Milano",
      address: "Mediolanum Forum",
      date: "28 Dic 2024",
      startTime: "18:00",
      endTime: "01:00",
      compensation: "€150/giorno",
      daysUntil: 13,
      contactPerson: "Giovanni Verdi",
      contactPhone: "+39 320 123 4567",
      notes: "Gestione area VIP. Dress code elegante richiesto."
    }
  ];

  const getUrgencyColor = (days: number) => {
    if (days <= 3) return "border-destructive text-destructive";
    if (days <= 7) return "border-warning text-warning";
    return "border-success text-success";
  };

  const getUrgencyLabel = (days: number) => {
    if (days === 0) return "Oggi";
    if (days === 1) return "Domani";
    return `Tra ${days} giorni`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <Button variant="ghost" asChild className="mb-6">
            <Link to="/user/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Torna alla Dashboard
            </Link>
          </Button>

          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="h-8 w-8 text-success" />
              <h1 className="text-3xl font-bold">Lavori Confermati</h1>
            </div>
            <p className="text-muted-foreground">
              Hai {confirmedJobs.length} lavori confermati in programma
            </p>
          </div>

          <div className="space-y-4 max-w-4xl">
            {confirmedJobs.map((job) => (
              <Card 
                key={job.id} 
                className="hover:shadow-md transition-shadow border-l-4 border-l-success"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <h3 className="text-xl font-semibold">{job.jobTitle}</h3>
                        <Badge 
                          variant="outline" 
                          className={getUrgencyColor(job.daysUntil)}
                        >
                          {getUrgencyLabel(job.daysUntil)}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground">{job.company}</p>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3 mb-4">
                    <div className="flex items-start gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">{job.city}</p>
                        <p className="text-muted-foreground text-xs">{job.address}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{job.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{job.startTime} - {job.endTime}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-semibold text-success">{job.compensation}</span>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="p-3 bg-muted/50 rounded-lg mb-3">
                    <p className="text-sm font-medium mb-1">Contatto di riferimento:</p>
                    <p className="text-sm text-muted-foreground">
                      {job.contactPerson} • {job.contactPhone}
                    </p>
                  </div>

                  {/* Notes */}
                  {job.notes && (
                    <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg mb-3">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-foreground">{job.notes}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/lavoro/${job.id}`}>
                        Vedi Dettagli
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm">
                      <Navigation className="h-4 w-4 mr-2" />
                      Navigatore
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {confirmedJobs.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <CheckCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold mb-2">Nessun lavoro confermato</h3>
                  <p className="text-muted-foreground mb-4">
                    Non hai ancora lavori confermati in programma
                  </p>
                  <Button asChild className="bg-gradient-primary">
                    <Link to="/esplora-lavori">Esplora Lavori</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ConfirmedJobs;
