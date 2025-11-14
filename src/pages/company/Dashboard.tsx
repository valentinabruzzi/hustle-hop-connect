import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useProfile } from "@/hooks/useProfile";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Briefcase, 
  Users, 
  CheckCircle, 
  Clock, 
  Settings,
  Plus,
  TrendingUp
} from "lucide-react";

const CompanyDashboard = () => {
  const { profile, isLoading: profileLoading } = useProfile();
  const { user } = useAuth();

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

  // Fetch applications for company jobs
  const { data: applications } = useQuery({
    queryKey: ['company-applications', user?.id],
    queryFn: async () => {
      const jobIds = jobs?.map(j => j.id) || [];
      if (jobIds.length === 0) return [];
      
      const { data, error } = await supabase
        .from('applications')
        .select('*, jobs!inner(*), profiles!inner(*)')
        .in('job_id', jobIds)
        .order('applied_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !!jobs && jobs.length > 0,
  });

  const stats = {
    activeJobs: jobs?.filter(j => new Date(j.end_date) >= new Date()).length || 0,
    totalApplications: applications?.length || 0,
    pendingApplications: applications?.filter(a => a.status === 'pending').length || 0,
    confirmedApplications: applications?.filter(a => a.status === 'confirmed').length || 0,
  };

  const recentApplications = applications?.slice(0, 5) || [];
  const recentJobs = jobs?.slice(0, 3) || [];

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

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Lavori Attivi
                </CardTitle>
                <Briefcase className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.activeJobs}</div>
                <Link to="/company/jobs" className="text-sm text-primary hover:underline flex items-center mt-2">
                  Vedi tutti →
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Candidature Ricevute
                </CardTitle>
                <Users className="h-5 w-5 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.totalApplications}</div>
                <Link to="/company/applications" className="text-sm text-primary hover:underline flex items-center mt-2">
                  Vedi tutte →
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Da Valutare
                </CardTitle>
                <Clock className="h-5 w-5 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.pendingApplications}</div>
                <Link to="/company/applications?status=pending" className="text-sm text-primary hover:underline flex items-center mt-2">
                  Vedi tutte →
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Confermate
                </CardTitle>
                <CheckCircle className="h-5 w-5 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.confirmedApplications}</div>
                <Link to="/company/applications?status=confirmed" className="text-sm text-primary hover:underline flex items-center mt-2">
                  Vedi tutte →
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Applications */}
            <Card className="lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Candidature Recenti
                  </CardTitle>
                  <CardDescription>Ultime candidature ricevute</CardDescription>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/company/applications" className="text-primary">
                    Tutte
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                {recentApplications.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    Nessuna candidatura ricevuta
                  </p>
                ) : (
                  <div className="space-y-4">
                    {recentApplications.map((app: any) => (
                      <div key={app.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium">{app.profiles.first_name} {app.profiles.last_name}</p>
                            <Badge variant={
                              app.status === 'pending' ? 'default' :
                              app.status === 'accepted' || app.status === 'confirmed' ? 'default' :
                              'secondary'
                            } className={
                              app.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                              app.status === 'accepted' || app.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                              ''
                            }>
                              {app.status === 'pending' ? 'In Attesa' :
                               app.status === 'accepted' ? 'Accettata' :
                               app.status === 'confirmed' ? 'Confermata' :
                               app.status === 'rejected' ? 'Rifiutata' :
                               'Completata'}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{app.jobs.title}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(app.applied_at).toLocaleDateString('it-IT')}
                          </p>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/dipendente-milano/${app.user_id}`}>
                            Vedi Profilo
                          </Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Jobs */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Lavori Pubblicati
                </CardTitle>
                <CardDescription>I tuoi ultimi annunci</CardDescription>
              </CardHeader>
              <CardContent>
                {recentJobs.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">Nessun lavoro pubblicato</p>
                    <Button asChild size="sm">
                      <Link to="/company/create-job">
                        <Plus className="h-4 w-4 mr-2" />
                        Pubblica Lavoro
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentJobs.map((job) => (
                      <div key={job.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium">{job.title}</h4>
                          {job.urgent && (
                            <Badge variant="destructive" className="text-xs">Urgente</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {job.city} • {new Date(job.start_date).toLocaleDateString('it-IT')}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <TrendingUp className="h-3 w-3" />
                          <span>{job.filled_spots || 0} / {job.total_spots} posti</span>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" asChild className="w-full">
                      <Link to="/company/jobs">
                        Vedi tutti i lavori
                      </Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CompanyDashboard;
