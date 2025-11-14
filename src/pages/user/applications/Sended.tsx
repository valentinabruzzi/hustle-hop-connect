import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useApplications } from "@/hooks/useApplications";
import { 
  ArrowLeft,
  Calendar,
  MapPin,
  Send,
  Clock
} from "lucide-react";

const SendedApplications = () => {
  const { applications = [], isLoading } = useApplications('sended');

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "border-warning text-warning";
      case "rejected": return "border-destructive text-destructive";
      case "accepted": return "border-success text-success";
      case "confirmed": return "border-success text-success";
      default: return "border-muted text-muted-foreground";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending": return "In Attesa";
      case "rejected": return "Rifiutata";
      case "accepted": return "Accettata";
      case "confirmed": return "Confermata";
      case "completed": return "Completata";
      default: return status;
    }
  };

  const pendingCount = applications.filter((a: any) => a.status === "pending").length;

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
              <Send className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold">Candidature Inviate</h1>
            </div>
            <p className="text-muted-foreground">
              Hai {applications.length} candidature totali • {pendingCount} in attesa di risposta
            </p>
          </div>

          <div className="space-y-4 max-w-4xl">
            {applications.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Send className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Nessuna candidatura inviata</h3>
                  <p className="text-muted-foreground mb-4">
                    Non hai ancora inviato candidature. Inizia a cercare lavori che ti interessano!
                  </p>
                  <Button asChild>
                    <Link to="/esplora-lavori">Cerca Lavori</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              applications.map((application: any) => (
                <Card key={application.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-1">{application.jobs?.title}</h3>
                        <p className="text-muted-foreground">{application.jobs?.company_name}</p>
                      </div>
                      <Badge variant="outline" className={getStatusColor(application.status)}>
                        {getStatusLabel(application.status)}
                      </Badge>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{application.jobs?.city}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{new Date(application.jobs?.start_date).toLocaleDateString('it-IT')}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>Candidato {new Date(application.applied_at).toLocaleDateString('it-IT')}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <span>{application.jobs?.compensation}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/lavoro/${application.job_id}`}>
                          Vedi Dettagli Lavoro
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}

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
