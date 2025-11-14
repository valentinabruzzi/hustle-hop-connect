import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { 
  Briefcase, 
  Mail, 
  CheckCircle, 
  XCircle, 
  Star,
  ArrowLeft,
  Bell
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      type: "job_offer",
      title: "Nuova offerta di lavoro",
      message: "Hostess per Fashion Week Milano - Perfetto per il tuo profilo",
      time: "2 ore fa",
      unread: true,
      link: "/lavoro/1",
      icon: Briefcase,
      color: "text-primary"
    },
    {
      id: 2,
      type: "invitation",
      title: "Invito ricevuto",
      message: "Luxury Events ti ha invitato per Evento Concerto Arena",
      time: "5 ore fa",
      unread: true,
      link: "/user/dashboard/applications/fastbooks",
      icon: Mail,
      color: "text-accent"
    },
    {
      id: 3,
      type: "application_accepted",
      title: "Candidatura accettata",
      message: "La tua candidatura per Promoter Evento Sportivo è stata accettata",
      time: "1 giorno fa",
      unread: true,
      link: "/lavoro/2",
      icon: CheckCircle,
      color: "text-success"
    },
    {
      id: 4,
      type: "feedback",
      title: "Nuovo feedback ricevuto",
      message: "Fashion Events ha lasciato una recensione a 5 stelle per il tuo ultimo lavoro",
      time: "2 giorni fa",
      unread: false,
      link: "/user/dashboard/feedbacks",
      icon: Star,
      color: "text-warning"
    },
    {
      id: 5,
      type: "job_offer",
      title: "Nuova offerta di lavoro",
      message: "Steward per Concerto - 3 posti disponibili a Milano",
      time: "2 giorni fa",
      unread: false,
      link: "/lavoro/3",
      icon: Briefcase,
      color: "text-primary"
    },
    {
      id: 6,
      type: "application_confirmed",
      title: "Lavoro confermato",
      message: "Il lavoro Hostess Fiera del 20 Dic è confermato. Ricordati di presentarti 30 minuti prima.",
      time: "3 giorni fa",
      unread: false,
      link: "/user/dashboard/applications/confirmed",
      icon: CheckCircle,
      color: "text-success"
    },
    {
      id: 7,
      type: "application_rejected",
      title: "Candidatura non accettata",
      message: "Purtroppo la tua candidatura per Promoter Centro Commerciale non è stata accettata",
      time: "4 giorni fa",
      unread: false,
      link: "/lavoro/4",
      icon: XCircle,
      color: "text-destructive"
    },
    {
      id: 8,
      type: "job_offer",
      title: "Nuova offerta urgente",
      message: "URGENTE: Hostess per evento oggi pomeriggio - Ottimo compenso",
      time: "5 giorni fa",
      unread: false,
      link: "/lavoro/5",
      icon: Briefcase,
      color: "text-primary"
    },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-6">
            <Button variant="ghost" asChild className="mb-4">
              <Link to="/user/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Torna alla Dashboard
              </Link>
            </Button>

            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
                  <Bell className="h-8 w-8 text-primary" />
                  Notifiche
                </h1>
                <p className="text-muted-foreground">
                  {unreadCount > 0 
                    ? `Hai ${unreadCount} notifiche non lette` 
                    : "Tutte le notifiche sono state lette"}
                </p>
              </div>
            </div>
          </div>

          {/* Notifications List */}
          <div className="space-y-3 max-w-4xl">
            {notifications.map((notification) => {
              const Icon = notification.icon;
              return (
                <Link key={notification.id} to={notification.link}>
                  <Card 
                    className={`hover:shadow-md transition-all cursor-pointer ${
                      notification.unread 
                        ? 'bg-primary/5 border-primary/20 border-l-4 border-l-primary' 
                        : 'bg-background'
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className={`mt-1 ${notification.color}`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4 mb-1">
                            <h3 className="font-semibold text-base">
                              {notification.title}
                            </h3>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              {notification.unread && (
                                <Badge variant="default" className="bg-primary text-primary-foreground">
                                  Nuova
                                </Badge>
                              )}
                              <span className="text-xs text-muted-foreground whitespace-nowrap">
                                {notification.time}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-foreground">
                            {notification.message}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>

          {/* Empty State (if needed) */}
          {notifications.length === 0 && (
            <Card className="max-w-4xl">
              <CardContent className="p-12 text-center">
                <Bell className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold mb-2">Nessuna notifica</h3>
                <p className="text-muted-foreground">
                  Le tue notifiche appariranno qui
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Notifications;
