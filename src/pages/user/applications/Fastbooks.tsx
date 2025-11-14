import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft,
  Calendar,
  MapPin,
  Mail,
  Clock,
  CheckCircle,
  X
} from "lucide-react";

const Fastbooks = () => {
  const { toast } = useToast();
  const [invitations, setInvitations] = useState([
    {
      id: 1,
      jobTitle: "Hostess Evento Corporate",
      company: "Luxury Events Milano",
      city: "Milano",
      date: "20 Dic 2024",
      receivedDate: "1 giorno fa",
      compensation: "€180/giorno",
      message: "Abbiamo visto il tuo profilo e pensiamo tu sia perfetta per questo evento di alto livello. Ti aspettiamo!",
      status: "pending"
    },
    {
      id: 2,
      jobTitle: "Steward Concerto VIP",
      company: "Premium Events",
      city: "Roma",
      date: "22 Dic 2024",
      receivedDate: "2 giorni fa",
      compensation: "€160/giorno",
      message: "Il tuo profilo professionale ci ha colpito. Evento esclusivo con area VIP.",
      status: "pending"
    },
    {
      id: 3,
      jobTitle: "Promoter Fashion Store",
      company: "Luxury Retail Group",
      city: "Milano",
      date: "18 Dic 2024",
      receivedDate: "3 giorni fa",
      compensation: "€140/giorno",
      message: "Inaugurazione nuovo store di lusso. Cerchiamo profili con la tua esperienza.",
      status: "accepted"
    }
  ]);

  const handleAccept = (id: number) => {
    setInvitations(invitations.map(inv => 
      inv.id === id ? { ...inv, status: "accepted" } : inv
    ));
    toast({
      title: "Invito accettato!",
      description: "L'azienda ti contatterà a breve con i dettagli.",
    });
  };

  const handleDecline = (id: number) => {
    setInvitations(invitations.map(inv => 
      inv.id === id ? { ...inv, status: "declined" } : inv
    ));
    toast({
      title: "Invito rifiutato",
      description: "Hai rifiutato l'invito.",
      variant: "destructive"
    });
  };

  const pendingInvitations = invitations.filter(i => i.status === "pending");

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
              <Mail className="h-8 w-8 text-accent" />
              <h1 className="text-3xl font-bold">Inviti Ricevuti</h1>
            </div>
            <p className="text-muted-foreground">
              Hai {invitations.length} inviti totali • {pendingInvitations.length} in attesa di risposta
            </p>
          </div>

          <div className="space-y-4 max-w-4xl">
            {invitations.map((invitation) => (
              <Card 
                key={invitation.id} 
                className={`hover:shadow-md transition-shadow ${
                  invitation.status === "pending" 
                    ? "border-l-4 border-l-accent" 
                    : ""
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-semibold">{invitation.jobTitle}</h3>
                        {invitation.status === "pending" && (
                          <Badge className="bg-accent text-accent-foreground">Nuovo Invito</Badge>
                        )}
                        {invitation.status === "accepted" && (
                          <Badge className="bg-success text-success-foreground">Accettato</Badge>
                        )}
                        {invitation.status === "declined" && (
                          <Badge variant="outline" className="border-destructive text-destructive">
                            Rifiutato
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground mb-2">{invitation.company}</p>
                      <div className="p-3 bg-muted/50 rounded-lg mb-3">
                        <p className="text-sm italic">"{invitation.message}"</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{invitation.city}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{invitation.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>Ricevuto {invitation.receivedDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-semibold">
                      <span className="text-accent">{invitation.compensation}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {invitation.status === "pending" && (
                      <>
                        <Button 
                          size="sm" 
                          className="bg-success hover:bg-success/90"
                          onClick={() => handleAccept(invitation.id)}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Accetta
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                          onClick={() => handleDecline(invitation.id)}
                        >
                          <X className="h-4 w-4 mr-2" />
                          Rifiuta
                        </Button>
                      </>
                    )}
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/lavoro/${invitation.id}`}>
                        Vedi Dettagli
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {invitations.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <Mail className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold mb-2">Nessun invito</h3>
                  <p className="text-muted-foreground mb-4">
                    Non hai ancora ricevuto inviti diretti dalle aziende
                  </p>
                  <Button asChild variant="outline">
                    <Link to="/user/settings">Completa il tuo profilo</Link>
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

export default Fastbooks;
