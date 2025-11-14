import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { AskAI } from "@/components/AskAI";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useProfile } from "@/hooks/useProfile";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useNotifications } from "@/hooks/useNotifications";
import { parseISO } from "date-fns";
import { it } from "date-fns/locale";
import { 
  Briefcase, 
  Users, 
  Settings,
  Plus,
  TrendingUp,
  Calendar as CalendarIcon,
  Bell,
  MapPin,
  Euro
} from "lucide-react";

const CompanyDashboard = () => {
  const navigate = useNavigate();
  const { profile, isLoading: profileLoading } = useProfile();
  const { user } = useAuth();
  const { notifications } = useNotifications();

  // Fetch jobs created by company
  const { data: jobs } = useQuery({
    queryKey: ['company-jobs', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('created_by', user?.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  // Separate active and expired jobs
  const activeJobs = jobs?.filter(j => new Date(j.end_date) >= new Date()) || [];
  const expiredJobs = jobs?.filter(j => new Date(j.end_date) < new Date()) || [];

  const recentNotifications = notifications.slice(0, 3);

  // Get dates with events for mini calendar
  const datesWithEvents = jobs?.map(job => ({
    start: parseISO(job.start_date),
    end: parseISO(job.end_date),
  })) || [];

  const hasEvent = (date: Date) => {
    return datesWithEvents.some(event => {
      const start = event.start;
      const end = event.end;
      return date >= start && date <= end;
    });
  };

  if (profileLoading) {
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
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
                <p className="text-muted-foreground">
                  Benvenuto, {profile?.first_name} {profile?.last_name}
                </p>
                <p className="text-sm text-muted-foreground">
                  Azienda {profile?.city ? `- ${profile.city}` : ''}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" asChild size="sm">
                  <Link to="/company/calendar">
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
              </div>
            </div>

            {/* Main CTA */}
            <Card className="bg-gradient-hero text-white border-0 overflow-hidden relative">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
              <CardContent className="p-6 relative z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Cerchi professionisti?</h3>
                    <p className="text-white/90 mb-4">Esplora i profili e trova i candidati ideali per la tua azienda</p>
                  </div>
                  <Button size="lg" asChild className="bg-white text-primary hover:bg-white/90">
                    <Link to="/esplora-profili">
                      <Users className="h-5 w-5 mr-2" />
                      Trova Lavoratori
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Ask AI Section */}
          <div className="mb-8">
            <AskAI userType="azienda" />
          </div>

          {/* Main Content Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Left Column - Main Content */}
            <div className="md:col-span-2 space-y-6">
              {/* Lavori Pubblicati Attivi */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Lavori Attivi</CardTitle>
                      <CardDescription>I tuoi annunci correnti</CardDescription>
                    </div>
                    <Button asChild size="sm">
                      <Link to="/company/create-job">
                        <Plus className="h-4 w-4 mr-2" />
                        Pubblica Lavoro
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {activeJobs.length === 0 ? (
                    <div className="text-center py-8">
                      <Briefcase className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-20" />
                      <p className="text-muted-foreground mb-4">Nessun lavoro attivo</p>
                      <Button asChild size="sm">
                        <Link to="/company/create-job">
                          <Plus className="h-4 w-4 mr-2" />
                          Pubblica il tuo primo lavoro
                        </Link>
                      </Button>
                    </div>
                  ) : (
                    activeJobs.slice(0, 5).map((job) => (
                      <div key={job.id} className="flex items-start justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium">{job.title}</h4>
                            <div className="flex gap-2">
                              {job.urgent && (
                                <Badge variant="destructive" className="text-xs">Urgente</Badge>
                              )}
                              <Badge variant="outline">{job.type}</Badge>
                            </div>
                          </div>
                          <div className="space-y-1 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-3 w-3" />
                              <span>{job.city}, {job.province}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CalendarIcon className="h-3 w-3" />
                              <span>
                                {new Date(job.start_date).toLocaleDateString('it-IT')} - {new Date(job.end_date).toLocaleDateString('it-IT')}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <TrendingUp className="h-3 w-3" />
                              <span>{job.filled_spots || 0} / {job.total_spots} posti occupati</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Euro className="h-3 w-3" />
                              <span>{job.compensation}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 ml-4">
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/lavoro/${job.id}`}>
                              Vedi Annuncio
                            </Link>
                          </Button>
                          <Button variant="outline" size="sm" asChild>
                            <Link to="/company/applications">
                              Candidature
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                  {activeJobs.length > 5 && (
                    <Button variant="outline" size="sm" asChild className="w-full">
                      <Link to="/company/jobs">
                        Vedi tutti i lavori attivi
                      </Link>
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Status Lavori */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Status Lavori</CardTitle>
                      <CardDescription>Panoramica dei tuoi lavori</CardDescription>
                    </div>
                    <Link to="/company/jobs" className="text-sm text-primary hover:underline">
                      Vedi tutti
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 border border-border rounded-lg bg-primary/5">
                      <div className="flex items-center gap-2 mb-2">
                        <Briefcase className="h-5 w-5 text-primary" />
                        <span className="text-sm font-medium">Lavori Attivi</span>
                      </div>
                      <p className="text-3xl font-bold">{activeJobs.length}</p>
                      <Link to="/company/jobs" className="text-xs text-primary hover:underline mt-2 inline-block">
                        Gestisci →
                      </Link>
                    </div>

                    <div className="p-4 border border-border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Briefcase className="h-5 w-5 text-muted-foreground" />
                        <span className="text-sm font-medium">Lavori Conclusi</span>
                      </div>
                      <p className="text-3xl font-bold text-muted-foreground">{expiredJobs.length}</p>
                      <Link to="/company/jobs" className="text-xs text-primary hover:underline mt-2 inline-block">
                        Vedi storico →
                      </Link>
                    </div>
                  </div>

                  {/* Recent Expired Jobs */}
                  {expiredJobs.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-sm font-medium mb-3">Ultimi lavori conclusi</h4>
                      <div className="space-y-3">
                        {expiredJobs.slice(0, 3).map((job) => (
                          <div key={job.id} className="p-3 border border-border rounded-lg bg-muted/30">
                            <div className="flex items-start justify-between">
                              <div>
                                <p className="font-medium text-sm">{job.title}</p>
                                <p className="text-xs text-muted-foreground">
                                  {job.city} • Concluso il {new Date(job.end_date).toLocaleDateString('it-IT')}
                                </p>
                              </div>
                              <Badge variant="secondary" className="text-xs">Concluso</Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Notifications */}
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
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/company/calendar')}>
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

export default CompanyDashboard;
