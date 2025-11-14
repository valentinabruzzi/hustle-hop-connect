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
import { useNotifications } from "@/hooks/useNotifications";
import { formatDistanceToNow } from "date-fns";
import { it } from "date-fns/locale";

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "job_offer":
      return { icon: Briefcase, color: "text-primary" };
    case "invitation":
      return { icon: Mail, color: "text-accent" };
    case "application_accepted":
    case "application_confirmed":
      return { icon: CheckCircle, color: "text-success" };
    case "application_rejected":
      return { icon: XCircle, color: "text-destructive" };
    case "feedback":
      return { icon: Star, color: "text-warning" };
    default:
      return { icon: Bell, color: "text-muted-foreground" };
  }
};

const Notifications = () => {
  const { notifications, isLoading, unreadCount, markAsRead } = useNotifications();

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
            {isLoading ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-muted-foreground">Caricamento notifiche...</p>
                </CardContent>
              </Card>
            ) : notifications.length > 0 ? (
              notifications.map((notification: any) => {
                const { icon: Icon, color } = getNotificationIcon(notification.type);
                const timeAgo = formatDistanceToNow(new Date(notification.created_at), {
                  addSuffix: true,
                  locale: it
                });
                
                return (
                  <div
                    key={notification.id}
                    onClick={() => {
                      if (!notification.read) {
                        markAsRead.mutate(notification.id);
                      }
                    }}
                  >
                    <Card 
                      className={`hover:shadow-md transition-all cursor-pointer ${
                        !notification.read 
                          ? 'bg-primary/5 border-primary/20 border-l-4 border-l-primary' 
                          : 'bg-background'
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className={`mt-1 ${color}`}>
                            <Icon className="h-6 w-6" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4 mb-1">
                              <h3 className="font-semibold text-base">
                                {notification.title}
                              </h3>
                              <div className="flex items-center gap-2 flex-shrink-0">
                                {!notification.read && (
                                  <Badge variant="default" className="bg-primary text-primary-foreground">
                                    Nuova
                                  </Badge>
                                )}
                                <span className="text-xs text-muted-foreground whitespace-nowrap">
                                  {timeAgo}
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
                  </div>
                );
              })
            ) : (
              <Card>
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
      </div>

      <Footer />
    </div>
  );
};

export default Notifications;
