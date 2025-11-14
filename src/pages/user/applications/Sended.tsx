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
  Send,
  Clock
} from "lucide-react";

const SendedApplications = () => {
  const applications = [
    {
      id: 1,
      jobTitle: "Hostess per Fashion Week Milano",
      company: "Fashion Events SRL",
      city: "Milano",
      date: "15 Dic 2024",
      appliedDate: "2 giorni fa",
      status: "in_attesa",
      statusLabel: "In Attesa",
      compensation: "€150/giorno"
    },
    {
      id: 2,
      jobTitle: "Steward Concerto Arena",
      company: "Live Nation Events",
      city: "Milano",
      date: "18 Dic 2024",
      appliedDate: "3 giorni fa",
      status: "in_attesa",
      statusLabel: "In Attesa",
      compensation: "In descrizione"
    },
    {
      id: 3,
      jobTitle: "Promoter Centro Commerciale",
      company: "Retail Promo",
      city: "Torino",
      date: "22 Dic 2024",
      appliedDate: "5 giorni fa",
      status: "rifiutata",
      statusLabel: "Non Accettata",
      compensation: "€100/giorno"
    },
    {
      id: 4,
      jobTitle: "Hostess Evento Aziendale",
      company: "Corporate Events Pro",
      city: "Milano",
      date: "12 Dic 2024",
      appliedDate: "1 settimana fa",
      status: "scaduta",
      statusLabel: "Scaduta",
      compensation: "€130/giorno"
    },
    {
      id: 5,
      jobTitle: "Promoter Fiera Tecnologia",
      company: "Tech Expo Group",
      city: "Bologna",
      date: "25 Dic 2024",
      appliedDate: "1 settimana fa",
      status: "in_attesa",
      statusLabel: "In Attesa",
      compensation: "€120/giorno"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in_attesa": return "border-warning text-warning";
      case "rifiutata": return "border-destructive text-destructive";
      case "scaduta": return "border-muted-foreground text-muted-foreground";
      default: return "border-muted text-muted-foreground";
    }
  };

  const pendingCount = applications.filter(a => a.status === "in_attesa").length;

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
              <Send className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold">Candidature Inviate</h1>
            </div>
            <p className="text-muted-foreground">
              Hai {applications.length} candidature totali • {pendingCount} in attesa di risposta
            </p>
          </div>

          <div className="space-y-4 max-w-4xl">
            {applications.map((application) => (
              <Card key={application.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-1">{application.jobTitle}</h3>
                      <p className="text-muted-foreground">{application.company}</p>
                    </div>
                    <Badge variant="outline" className={getStatusColor(application.status)}>
                      {application.statusLabel}
                    </Badge>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{application.city}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{application.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>Candidato {application.appliedDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <span>{application.compensation}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/lavoro/${application.id}`}>
                        Vedi Dettagli Lavoro
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {applications.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <Send className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold mb-2">Nessuna candidatura</h3>
                  <p className="text-muted-foreground mb-4">
                    Non hai ancora inviato candidature
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

export default SendedApplications;
