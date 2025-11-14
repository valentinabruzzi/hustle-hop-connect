import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useJobs } from "@/hooks/useJobs";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import { 
  MapPin, 
  Calendar, 
  Euro, 
  Clock,
  Briefcase,
  Filter
} from "lucide-react";

const ExploreJobs = () => {
  const [filters, setFilters] = useState({
    city: "",
    dateFrom: "",
    dateTo: "",
    role: ""
  });

  const { data: jobs = [], isLoading } = useJobs(filters);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Esplora Opportunità</h1>
            <p className="text-muted-foreground">
              {isLoading ? 'Caricamento...' : `${jobs.length} ${jobs.length === 1 ? 'lavoro disponibile' : 'lavori disponibili'}`}
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Filters Sidebar */}
            <aside className="lg:col-span-1">
              <Card className="sticky top-20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <Filter className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-lg">Filtri</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">Città</Label>
                      <Input
                        id="city"
                        placeholder="Es. Milano"
                        value={filters.city}
                        onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="role">Ruolo</Label>
                      <Select value={filters.role} onValueChange={(value) => setFilters({...filters, role: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Tutti i ruoli" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Tutti i ruoli</SelectItem>
                          <SelectItem value="hostess">Hostess</SelectItem>
                          <SelectItem value="steward">Steward</SelectItem>
                          <SelectItem value="promoter">Promoter</SelectItem>
                          <SelectItem value="modella">Modella</SelectItem>
                          <SelectItem value="modello">Modello</SelectItem>
                          <SelectItem value="attore">Attore/Attrice</SelectItem>
                          <SelectItem value="cantante">Cantante</SelectItem>
                          <SelectItem value="musicista">Musicista</SelectItem>
                          <SelectItem value="ballerino">Ballerino/a</SelectItem>
                          <SelectItem value="fotografo">Fotografo</SelectItem>
                          <SelectItem value="videomaker">Videomaker</SelectItem>
                          <SelectItem value="grafico">Grafico</SelectItem>
                          <SelectItem value="programmatore">Programmatore</SelectItem>
                          <SelectItem value="cameriere">Cameriere</SelectItem>
                          <SelectItem value="altro">Altro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dateFrom">Data da</Label>
                      <Input
                        id="dateFrom"
                        type="date"
                        value={filters.dateFrom}
                        onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dateTo">Data a</Label>
                      <Input
                        id="dateTo"
                        type="date"
                        value={filters.dateTo}
                        onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
                      />
                    </div>

                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setFilters({ city: "", dateFrom: "", dateTo: "", role: "" })}
                    >
                      Reset Filtri
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Jobs Grid */}
              <div className="space-y-4">
                {isLoading ? (
                  <Card className="p-12 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="text-muted-foreground mt-4">Caricamento lavori...</p>
                  </Card>
                ) : jobs.length === 0 ? (
                  <Card className="p-12 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <Briefcase className="h-12 w-12 text-muted-foreground" />
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Nessun lavoro trovato</h3>
                        <p className="text-muted-foreground mb-4">
                          Prova a modificare i filtri di ricerca
                        </p>
                        <Button 
                          variant="outline"
                          onClick={() => setFilters({ city: "", dateFrom: "", dateTo: "", role: "" })}
                        >
                          Reset Filtri
                        </Button>
                      </div>
                    </div>
                  </Card>
                ) : (
                  jobs.map((job) => (
                    <Card key={job.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-xl font-semibold">{job.title}</h3>
                              {job.urgent && (
                                <Badge variant="destructive" className="animate-pulse">
                                  URGENTE
                                </Badge>
                              )}
                            </div>
                            <p className="text-muted-foreground">{job.company_name}</p>
                          </div>
                          <Badge variant="secondary">{job.type}</Badge>
                        </div>

                        <p className="text-sm text-muted-foreground mb-4">{job.description}</p>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{job.city}, {job.province}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{format(new Date(job.start_date), 'd MMM yyyy', { locale: it })} - {format(new Date(job.end_date), 'd MMM yyyy', { locale: it })}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{job.duration}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Euro className="h-4 w-4 text-muted-foreground" />
                            <span>{job.compensation}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>{job.total_spots - (job.filled_spots || 0)} {job.total_spots - (job.filled_spots || 0) === 1 ? 'posto disponibile' : 'posti disponibili'}</span>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button asChild className="w-full">
                          <Link to={`/jobs/${job.id}`}>Vedi Dettagli</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ExploreJobs;
