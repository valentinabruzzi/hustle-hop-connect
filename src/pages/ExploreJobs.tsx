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
    role: "all"
  });

  const jobs = [
    {
      id: 1,
      title: "Hostess per Fashion Week Milano",
      company: "Fashion Events SRL",
      type: "Hostess",
      city: "Milano",
      province: "MI",
      date: "15 Dic 2024",
      dateEnd: "18 Dic 2024",
      duration: "4 giorni",
      compensation: "€150/giorno",
      urgent: true,
      spots: 3,
      description: "Cerchiamo hostess professionali per evento fashion di alto livello"
    },
    {
      id: 2,
      title: "Promoter Evento Sportivo",
      company: "Sport Marketing Italia",
      type: "Promoter",
      city: "Roma",
      province: "RM",
      date: "20 Dic 2024",
      dateEnd: "20 Dic 2024",
      duration: "1 giorno",
      compensation: "€120/giorno",
      urgent: false,
      spots: 5,
      description: "Promozione brand sportivo durante evento calcistico"
    },
    {
      id: 3,
      title: "Steward per Concerto Arena",
      company: "Live Nation Events",
      type: "Steward",
      city: "Milano",
      province: "MI",
      date: "18 Dic 2024",
      dateEnd: "18 Dic 2024",
      duration: "Serale",
      compensation: "In descrizione",
      urgent: false,
      spots: 10,
      description: "Assistenza e gestione flussi pubblico per concerto"
    },
    {
      id: 4,
      title: "URGENTE: Hostess Fiera Tecnologia",
      company: "Tech Expo Group",
      type: "Hostess",
      city: "Milano",
      province: "MI",
      date: "14 Dic 2024",
      dateEnd: "16 Dic 2024",
      duration: "3 giorni",
      compensation: "€140/giorno",
      urgent: true,
      spots: 2,
      description: "Stand aziendale presso fiera tecnologia - serve inglese fluente"
    },
    {
      id: 5,
      title: "Promoter Centro Commerciale",
      company: "Retail Promo",
      type: "Promoter",
      city: "Torino",
      province: "TO",
      date: "22 Dic 2024",
      dateEnd: "24 Dic 2024",
      duration: "3 giorni",
      compensation: "€100/giorno",
      urgent: false,
      spots: 4,
      description: "Promozione prodotti natalizi in centro commerciale"
    },
    {
      id: 6,
      title: "Steward Evento Aziendale",
      company: "Corporate Events Pro",
      type: "Steward",
      city: "Milano",
      province: "MI",
      date: "19 Dic 2024",
      dateEnd: "19 Dic 2024",
      duration: "Serale",
      compensation: "€130/giorno",
      urgent: false,
      spots: 6,
      description: "Cena di gala aziendale - richiesta eleganza"
    },
  ];

  const filteredJobs = jobs.filter(job => {
    if (filters.city && !job.city.toLowerCase().includes(filters.city.toLowerCase())) return false;
    if (filters.role !== "all" && job.type !== filters.role) return false;
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Esplora Lavori</h1>
            <p className="text-muted-foreground">
              Trova l'opportunità perfetta per te • {filteredJobs.length} lavori disponibili
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
                      <Select value={filters.role} onValueChange={(value) => setFilters({ ...filters, role: value })}>
                        <SelectTrigger id="role">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Tutti i ruoli</SelectItem>
                          <SelectItem value="Hostess">Hostess</SelectItem>
                          <SelectItem value="Steward">Steward</SelectItem>
                          <SelectItem value="Promoter">Promoter</SelectItem>
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
                      onClick={() => setFilters({ city: "", dateFrom: "", dateTo: "", role: "all" })}
                    >
                      Resetta Filtri
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </aside>

            {/* Jobs Grid */}
            <div className="lg:col-span-3 space-y-4">
              {filteredJobs.map((job) => (
                <Card key={job.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-3 mb-2">
                          <div className="mt-1">
                            <Briefcase className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <h3 className="text-xl font-semibold">{job.title}</h3>
                              {job.urgent && (
                                <Badge variant="destructive" className="text-xs">URGENTE</Badge>
                              )}
                            </div>
                            <p className="text-muted-foreground">{job.company}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4">
                      {job.description}
                    </p>

                    <div className="grid sm:grid-cols-2 gap-3 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{job.city}, {job.province}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{job.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{job.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Euro className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{job.compensation}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Badge variant="outline">{job.type}</Badge>
                        <span className="text-sm text-muted-foreground">
                          {job.spots} {job.spots === 1 ? 'posto' : 'posti'}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-muted/50 p-4">
                    <Button asChild className="w-full bg-gradient-primary">
                      <Link to={`/lavoro/${job.id}`}>
                        Vedi Dettagli e Candidati
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}

              {filteredJobs.length === 0 && (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Briefcase className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <h3 className="text-xl font-semibold mb-2">Nessun lavoro trovato</h3>
                    <p className="text-muted-foreground mb-4">
                      Prova a modificare i filtri di ricerca
                    </p>
                    <Button 
                      variant="outline"
                      onClick={() => setFilters({ city: "", dateFrom: "", dateTo: "", role: "all" })}
                    >
                      Resetta Filtri
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ExploreJobs;
