import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { useApplications } from "@/hooks/useApplications";
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
  const { applications: invitations = [], isLoading } = useApplications('fastbooks');

  const handleAccept = (id: string) => {
    // TODO: Implementa l'accettazione dell'invito
    toast({
      title: "Invito accettato!",
      description: "L'azienda ti contatterà a breve con i dettagli.",
    });
  };

  const handleDecline = (id: string) => {
    // TODO: Implementa il rifiuto dell'invito
    toast({
      title: "Invito rifiutato",
      description: "Hai rifiutato l'invito.",
      variant: "destructive"
    });
  };

  const pendingInvitations = invitations.filter((i: any) => i.status === "pending");

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

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
            {invitations.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Nessun invito ricevuto</h3>
                  <p className="text-muted-foreground">
                    Non hai ancora ricevuto inviti dalle aziende.
                  </p>
                </CardContent>
              </Card>
            ) : (
              invitations.map((invitation: any) => (
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
                        <h3 className="text-xl font-semibold">{invitation.jobs?.title}</h3>
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
                      <span>{invitation.jobs?.city}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{new Date(invitation.jobs?.start_date).toLocaleDateString('it-IT')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>Ricevuto {new Date(invitation.applied_at).toLocaleDateString('it-IT')}</span>
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
              ))
            )}

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
