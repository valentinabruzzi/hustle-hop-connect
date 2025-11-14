import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useProfile } from "@/hooks/useProfile";
import { useApplications } from "@/hooks/useApplications";
import { useNotifications } from "@/hooks/useNotifications";
import { useFeedbacks } from "@/hooks/useFeedbacks";
import { useUserRole } from "@/hooks/useUserRole";
import CompanyDashboard from "@/pages/company/Dashboard";
import { parseISO } from "date-fns";
import { it } from "date-fns/locale";
import { 
  Briefcase, 
  Send, 
  Mail, 
  CheckCircle, 
  Clock, 
  Star,
  Bell,
  User,
  Settings,
  Calendar as CalendarIcon
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const { profile, isLoading: profileLoading } = useProfile();
  const { data: userRole, isLoading: roleLoading } = useUserRole();
  const { applications: sendedApps } = useApplications('sended');
  const { applications: fastbookApps } = useApplications('fastbooks');
  const { applications: confirmedApps } = useApplications('confirmed');
  const { applications: closedApps } = useApplications('closed');
  const { notifications, unreadCount } = useNotifications();
  const { feedbacks } = useFeedbacks();

  const stats = {
    sended: sendedApps?.length || 0,
    fastbooks: fastbookApps?.length || 0,
    confirmed: confirmedApps?.length || 0,
    closed: closedApps?.length || 0,
  };

  const recentNotifications = notifications.slice(0, 3);
  const recentFeedbacks = feedbacks.slice(0, 3);

  // Get dates with events for mini calendar
  const jobs = confirmedApps?.map(app => ({
    ...app.jobs,
    applicationId: app.id,
  })) || [];

  const datesWithEvents = jobs.map(job => ({
    start: parseISO(job.start_date),
    end: parseISO(job.end_date),
  }));

  const hasEvent = (date: Date) => {
    return datesWithEvents.some(event => {
      const start = event.start;
      const end = event.end;
      return date >= start && date <= end;
    });
  };

  if (profileLoading || roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Render company dashboard if user is a company
  if (userRole === 'azienda') {
    return <CompanyDashboard />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
                <p className="text-muted-foreground">
                  Benvenuto, {profile?.first_name} {profile?.last_name}
                </p>
                <p className="text-sm text-muted-foreground">
                  Dipendente {profile?.city ? `- ${profile.city}` : ''}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" asChild size="sm">
                  <Link to="/user/calendar">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    Calendario
                  </Link>
                </Button>
                <Button variant="outline" asChild size="sm">
                  <Link to="/user/settings">
                    <Settings className="h-4 w-4 mr-2" />
                    Impostazioni
                  </Link>
                </Button>
                <Button variant="outline" asChild size="sm">
                  <Link to={`/dipendente-milano/${profile?.id}`}>
                    <User className="h-4 w-4 mr-2" />
                    Profilo Pubblico
                  </Link>
                </Button>
              </div>
            </div>

            {/* Main CTA */}
            <Card className="bg-gradient-hero text-white border-0 overflow-hidden relative">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
              <CardContent className="p-6 relative z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Pronto per nuove opportunità?</h3>
                    <p className="text-white/90 mb-4">Esplora centinaia di lavori disponibili nella tua zona</p>
                  </div>
                  <Button size="lg" asChild className="bg-white text-primary hover:bg-white/90">
                    <Link to="/esplora-lavori">
                      <Briefcase className="mr-2 h-5 w-5" />
                      Trova Lavoro
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Candidature Inviate
                  </CardTitle>
                  <Send className="h-4 w-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-1">{stats.sended}</div>
                <Link to="/user/dashboard/applications/sended" className="text-sm text-primary hover:underline">
                  Vedi tutte →
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Inviti Ricevuti
                  </CardTitle>
                  <Mail className="h-4 w-4 text-accent" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-1">{stats.fastbooks}</div>
                <Link to="/user/dashboard/applications/fastbooks" className="text-sm text-accent hover:underline">
                  Vedi tutti →
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Lavori Confermati
                  </CardTitle>
                  <CheckCircle className="h-4 w-4 text-success" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-1">{stats.confirmed}</div>
                <Link to="/user/dashboard/applications/confirmed" className="text-sm text-success hover:underline">
                  Vedi tutti →
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Lavori Conclusi
                  </CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-1">{stats.closed}</div>
                <Link to="/user/dashboard/applications/closed" className="text-sm text-muted-foreground hover:underline">
                  Vedi tutti →
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Two Column Layout */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Stato Candidature</CardTitle>
                  <CardDescription>Panoramica delle tue candidature recenti</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {sendedApps && sendedApps.length > 0 ? (
                    sendedApps.slice(0, 3).map((application: any) => {
                      const statusColor = 
                        application.status === 'accepted' ? 'bg-success' :
                        application.status === 'rejected' ? 'bg-destructive' :
                        application.status === 'confirmed' ? 'bg-success' :
                        application.status === 'completed' ? 'bg-muted-foreground' :
                        'bg-warning';
                      
                      const statusLabel = 
                        application.status === 'pending' ? 'In Attesa' :
                        application.status === 'accepted' ? 'Accettato' :
                        application.status === 'rejected' ? 'Rifiutato' :
                        application.status === 'confirmed' ? 'Confermato' :
                        application.status === 'completed' ? 'Completato' :
                        'In Attesa';

                      return (
                        <div key={application.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 ${statusColor} rounded-full`}></div>
                            <div>
                              <p className="font-medium">{application.jobs?.title || 'Lavoro'}</p>
                              <p className="text-sm text-muted-foreground">
                                {application.jobs?.city} • {new Date(application.jobs?.start_date).toLocaleDateString('it-IT')}
                              </p>
                            </div>
                          </div>
                          <Badge variant={application.status === 'confirmed' || application.status === 'accepted' ? 'default' : 'outline'} 
                                 className={application.status === 'pending' ? 'border-warning text-warning' : ''}>
                            {statusLabel}
                          </Badge>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-8">
                      Nessuna candidatura recente
                    </p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Feedback Ricevuti</CardTitle>
                      <CardDescription>Le tue valutazioni più recenti</CardDescription>
                    </div>
                    <Link to="/user/dashboard/feedbacks" className="text-sm text-primary hover:underline">
                      Vedi tutti
                    </Link>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentFeedbacks.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      Nessun feedback ricevuto ancora
                    </p>
                  ) : (
                    recentFeedbacks.map((feedback: any) => (
                      <div key={feedback.id} className="p-4 border border-border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-medium">{feedback.jobs?.title}</p>
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star 
                                key={star} 
                                className={`h-4 w-4 ${star <= feedback.rating ? 'fill-warning text-warning' : 'text-muted-foreground'}`} 
                              />
                            ))}
                          </div>
                        </div>
                        {feedback.comment && (
                          <p className="text-sm text-muted-foreground">"{feedback.comment}"</p>
                        )}
                        <p className="text-xs text-muted-foreground mt-2">
                          {new Date(feedback.created_at).toLocaleDateString('it-IT')}
                        </p>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Notifications Sidebar */}
            <div>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      Notifiche
                    </CardTitle>
                    <Link to="/user/dashboard/notifications" className="text-sm text-primary hover:underline">
                      Tutte
                    </Link>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentNotifications.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      Nessuna notifica
                    </p>
                  ) : (
                    recentNotifications.map((notification: any) => (
                      <div 
                        key={notification.id}
                        className={`p-3 rounded-lg border ${
                          !notification.read 
                            ? 'bg-primary/5 border-primary/20' 
                            : 'bg-background border-border'
                        }`}
                      >
                        <p className="text-sm font-medium mb-1">{notification.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(notification.created_at).toLocaleDateString('it-IT')}
                        </p>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>

              {/* Mini Calendar */}
              <Card className="mt-6 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/user/calendar')}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5" />
                    Calendario
                  </CardTitle>
                  <CardDescription>Clicca per vedere tutti i tuoi lavori</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <Calendar
                    mode="single"
                    locale={it}
                    className="rounded-md border scale-90"
                    modifiers={{
                      hasEvent: (date) => hasEvent(date),
                    }}
                    modifiersStyles={{
                      hasEvent: {
                        fontWeight: 'bold',
                        backgroundColor: 'hsl(var(--primary) / 0.2)',
                        color: 'hsl(var(--primary))',
                      },
                    }}
                  />
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

export default Dashboard;
