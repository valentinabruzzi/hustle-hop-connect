import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import { 
  Users, 
  MapPin, 
  Calendar,
  Check,
  X,
  User,
  Briefcase,
  ArrowLeft
} from "lucide-react";

const CompanyApplications = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const jobFilter = searchParams.get('job');

  // Fetch jobs
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

  // Fetch applications
  const { data: applications, isLoading } = useQuery({
    queryKey: ['company-applications', user?.id, jobFilter],
    queryFn: async () => {
      const jobIds = jobs?.map(j => j.id) || [];
      if (jobIds.length === 0) return [];
      
      let query = supabase
        .from('applications')
        .select('*, jobs!inner(*), profiles!inner(*)')
        .in('job_id', jobIds)
        .order('applied_at', { ascending: false });

      if (jobFilter) {
        query = query.eq('job_id', jobFilter);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data;
    },
    enabled: !!jobs && jobs.length > 0,
  });

  // Update application status
  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: 'pending' | 'accepted' | 'rejected' | 'confirmed' | 'completed' }) => {
      const { error } = await supabase
        .from('applications')
        .update({ status })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['company-applications'] });
      toast({
        title: "Stato aggiornato",
        description: "Lo stato della candidatura è stato aggiornato con successo",
      });
    },
    onError: () => {
      toast({
        title: "Errore",
        description: "Non è stato possibile aggiornare lo stato",
        variant: "destructive",
      });
    },
  });

  const pendingApplications = applications?.filter(a => a.status === 'pending') || [];
  const acceptedApplications = applications?.filter(a => a.status === 'accepted') || [];
  const confirmedApplications = applications?.filter(a => a.status === 'confirmed') || [];
  const rejectedApplications = applications?.filter(a => a.status === 'rejected') || [];

  const ApplicationCard = ({ application, showActions = true }: any) => (
    <Card key={application.id} className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div>
                <CardTitle className="text-lg">
                  {application.profiles.first_name} {application.profiles.last_name}
                </CardTitle>
                <CardDescription className="flex flex-wrap gap-3 mt-1">
                  <span className="flex items-center gap-1">
                    <Briefcase className="h-3 w-3" />
                    {application.jobs.title}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {application.jobs.city}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Candidato il {format(new Date(application.applied_at), "d MMM yyyy", { locale: it })}
                  </span>
                </CardDescription>
              </div>
            </div>
            {application.message && (
              <p className="text-sm text-muted-foreground mt-2 italic">
                "{application.message}"
              </p>
            )}
          </div>
          <Badge variant={
            application.status === 'pending' ? 'default' :
            application.status === 'accepted' || application.status === 'confirmed' ? 'default' :
            'secondary'
          } className={
            application.status === 'pending' ? 'bg-orange-100 text-orange-700' :
            application.status === 'accepted' || application.status === 'confirmed' ? 'bg-green-100 text-green-700' :
            ''
          }>
            {application.status === 'pending' ? 'In Attesa' :
             application.status === 'accepted' ? 'Accettata' :
             application.status === 'confirmed' ? 'Confermata' :
             application.status === 'rejected' ? 'Rifiutata' :
             'Completata'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link to={`/dipendente-milano/${application.user_id}`}>
              <User className="h-4 w-4 mr-2" />
              Vedi Profilo
            </Link>
          </Button>
          {showActions && application.status === 'pending' && (
            <>
              <Button 
                size="sm" 
                onClick={() => updateStatus.mutate({ id: application.id, status: 'accepted' })}
                disabled={updateStatus.isPending}
              >
                <Check className="h-4 w-4 mr-2" />
                Accetta
              </Button>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => updateStatus.mutate({ id: application.id, status: 'rejected' })}
                disabled={updateStatus.isPending}
              >
                <X className="h-4 w-4 mr-2" />
                Rifiuta
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );

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
            <h1 className="text-3xl font-bold mb-2">Candidature Ricevute</h1>
            <p className="text-muted-foreground">
              Gestisci tutte le candidature ai tuoi annunci
            </p>
          </div>

          <Tabs defaultValue="pending" className="space-y-6">
            <TabsList>
              <TabsTrigger value="pending" className="relative">
                In Attesa
                {pendingApplications.length > 0 && (
                  <Badge className="ml-2 bg-orange-500">{pendingApplications.length}</Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="accepted">
                Accettate ({acceptedApplications.length})
              </TabsTrigger>
              <TabsTrigger value="confirmed">
                Confermate ({confirmedApplications.length})
              </TabsTrigger>
              <TabsTrigger value="rejected">
                Rifiutate ({rejectedApplications.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pending">
              {pendingApplications.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Nessuna candidatura in attesa</h3>
                    <p className="text-muted-foreground">Non ci sono candidature da valutare al momento</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {pendingApplications.map((app) => (
                    <ApplicationCard key={app.id} application={app} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="accepted">
              {acceptedApplications.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="text-muted-foreground">Nessuna candidatura accettata</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {acceptedApplications.map((app) => (
                    <ApplicationCard key={app.id} application={app} showActions={false} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="confirmed">
              {confirmedApplications.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="text-muted-foreground">Nessuna candidatura confermata</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {confirmedApplications.map((app) => (
                    <ApplicationCard key={app.id} application={app} showActions={false} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="rejected">
              {rejectedApplications.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="text-muted-foreground">Nessuna candidatura rifiutata</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {rejectedApplications.map((app) => (
                    <ApplicationCard key={app.id} application={app} showActions={false} />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CompanyApplications;
