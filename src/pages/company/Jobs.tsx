import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import { 
  Briefcase, 
  MapPin, 
  Calendar,
  Users,
  Edit,
  Plus,
  TrendingUp
} from "lucide-react";

const CompanyJobs = () => {
  const { user } = useAuth();

  const { data: jobs, isLoading } = useQuery({
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

  const activeJobs = jobs?.filter(j => new Date(j.end_date) >= new Date()) || [];
  const expiredJobs = jobs?.filter(j => new Date(j.end_date) < new Date()) || [];

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
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">I Tuoi Lavori</h1>
              <p className="text-muted-foreground">
                Gestisci tutti i tuoi annunci pubblicati
              </p>
            </div>
            <Button asChild>
              <Link to="/company/create-job">
                <Plus className="h-4 w-4 mr-2" />
                Pubblica Nuovo Lavoro
              </Link>
            </Button>
          </div>

          {/* Active Jobs */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Briefcase className="h-6 w-6 text-primary" />
              Lavori Attivi ({activeJobs.length})
            </h2>
            
            {activeJobs.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Nessun lavoro attivo</h3>
                  <p className="text-muted-foreground mb-4">Pubblica il tuo primo annuncio per trovare i professionisti perfetti</p>
                  <Button asChild>
                    <Link to="/company/create-job">
                      <Plus className="h-4 w-4 mr-2" />
                      Pubblica Lavoro
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {activeJobs.map((job) => (
                  <Card key={job.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <CardTitle className="text-xl">{job.title}</CardTitle>
                            {job.urgent && (
                              <Badge variant="destructive">Urgente</Badge>
                            )}
                          </div>
                          <CardDescription className="flex flex-wrap gap-4 mt-2">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {job.city}, {job.province}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {format(new Date(job.start_date), "d MMM", { locale: it })} - {format(new Date(job.end_date), "d MMM yyyy", { locale: it })}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {job.filled_spots || 0} / {job.total_spots} posti
                            </span>
                          </CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/lavoro/${job.id}`}>
                              Vedi Annuncio
                            </Link>
                          </Button>
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/company/applications?job=${job.id}`}>
                              <Users className="h-4 w-4 mr-2" />
                              Candidature
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4" />
                          <span>Tipo: <span className="font-medium text-foreground">{job.type}</span></span>
                        </div>
                        <div>
                          Compenso: <span className="font-medium text-foreground">{job.compensation}</span>
                        </div>
                        <div>
                          Durata: <span className="font-medium text-foreground">{job.duration}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Expired Jobs */}
          {expiredJobs.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                Lavori Conclusi ({expiredJobs.length})
              </h2>
              
              <div className="grid gap-4">
                {expiredJobs.map((job) => (
                  <Card key={job.id} className="opacity-75">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-xl">{job.title}</CardTitle>
                          <CardDescription className="flex flex-wrap gap-4 mt-2">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {job.city}, {job.province}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {format(new Date(job.start_date), "d MMM", { locale: it })} - {format(new Date(job.end_date), "d MMM yyyy", { locale: it })}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {job.filled_spots || 0} / {job.total_spots} posti
                            </span>
                          </CardDescription>
                        </div>
                        <Badge variant="secondary">Concluso</Badge>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CompanyJobs;
