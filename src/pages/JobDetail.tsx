import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { useJob } from "@/hooks/useJobs";
import { useApplications } from "@/hooks/useApplications";
import { useAuth } from "@/contexts/AuthContext";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import { 
  MapPin, 
  Calendar, 
  Euro, 
  Clock,
  ArrowLeft,
  Building2,
  Users,
  Shirt,
  FileText,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const { data: job, isLoading } = useJob(id);
  const { applications, applyToJob } = useApplications();
  const [applying, setApplying] = useState(false);

  const hasApplied = applications?.some(app => app.job_id === id);
  
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleApply = async () => {
    if (!id) return;
    
    setApplying(true);
    
    try {
      await applyToJob.mutateAsync(id);
      toast({
        title: "Candidatura inviata!",
        description: "Riceverai una notifica quando l'azienda avrà esaminato il tuo profilo.",
      });
      
      setTimeout(() => {
        navigate("/user/dashboard/applications/sended");
      }, 1500);
    } catch (error: any) {
      toast({
        title: "Errore",
        description: error.message || "Non è stato possibile inviare la candidatura",
        variant: "destructive",
      });
      setApplying(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Card className="max-w-md">
            <CardContent className="pt-6 text-center">
              <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Lavoro non trovato</h3>
              <p className="text-muted-foreground mb-4">Il lavoro che stai cercando non esiste o è stato rimosso.</p>
              <Button asChild>
                <Link to="/esplora-lavori">Torna ai Lavori</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <Button variant="ghost" asChild className="mb-6">
            <Link to="/esplora-lavori">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Torna ai Lavori
            </Link>
          </Button>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <Badge variant="outline" className="text-sm">{job.type}</Badge>
                        {job.urgent && (
                          <Badge variant="destructive">URGENTE</Badge>
                        )}
                      </div>
                      <CardTitle className="text-2xl mb-2">{job.title}</CardTitle>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Building2 className="h-4 w-4" />
                        <span>{job.company_name}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Location and Time */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Luogo</p>
                        <p className="text-sm text-muted-foreground">{job.city}, {job.province}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Date</p>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(job.start_date), 'd MMM yyyy', { locale: it })} - {format(new Date(job.end_date), 'd MMM yyyy', { locale: it })}
                        </p>
                        <p className="text-xs text-muted-foreground">{job.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Euro className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Compenso</p>
                        <p className="text-sm text-muted-foreground">{job.compensation}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Posti disponibili</p>
                        <p className="text-sm text-muted-foreground">{job.total_spots - (job.filled_spots || 0)} su {job.total_spots}</p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Description */}
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      Descrizione
                    </h3>
                    <p className="text-sm text-muted-foreground whitespace-pre-line">{job.description}</p>
                  </div>

                  {job.requirements && (
                    <>
                      <Separator />
                      <div>
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary" />
                          Requisiti
                        </h3>
                        <p className="text-sm text-muted-foreground whitespace-pre-line">{job.requirements}</p>
                      </div>
                    </>
                  )}

                  {job.dress_code && (
                    <>
                      <Separator />
                      <div>
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                          <Shirt className="h-5 w-5 text-primary" />
                          Dress Code
                        </h3>
                        <p className="text-sm text-muted-foreground">{job.dress_code}</p>
                      </div>
                    </>
                  )}

                  {job.benefits && (
                    <div>
                      <h3 className="font-semibold mb-3">Benefit</h3>
                      <p className="text-sm text-muted-foreground whitespace-pre-line">{job.benefits}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>Candidati Ora</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Posti totali</span>
                      <span className="font-medium">{job.total_spots}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Posti disponibili</span>
                      <span className="font-medium text-green-600">{job.total_spots - (job.filled_spots || 0)}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="text-sm text-muted-foreground">
                    {hasApplied ? (
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle2 className="h-5 w-5" />
                        <span>Hai già inviato la candidatura</span>
                      </div>
                    ) : job.total_spots - (job.filled_spots || 0) === 0 ? (
                      <div className="flex items-center gap-2 text-orange-600">
                        <AlertCircle className="h-5 w-5" />
                        <span>Posti esauriti</span>
                      </div>
                    ) : (
                      <>
                        <p className="mb-3">Candidati subito per questa opportunità!</p>
                        <ul className="space-y-1 text-xs">
                          <li>✓ Risposta in 24-48 ore</li>
                          <li>✓ Conferma immediata del compenso</li>
                          <li>✓ Supporto pre e post evento</li>
                        </ul>
                      </>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    size="lg"
                    disabled={hasApplied || applying || (job.total_spots - (job.filled_spots || 0)) === 0}
                    onClick={handleApply}
                  >
                    {applying ? "Invio in corso..." : hasApplied ? "Candidatura Inviata" : "Invia Candidatura"}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default JobDetail;
