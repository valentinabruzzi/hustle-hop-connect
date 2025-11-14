import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { 
  ArrowLeft,
  Calendar,
  MapPin,
  Clock,
  Star,
  Euro
} from "lucide-react";

const ClosedJobs = () => {
  const closedJobs = [
    {
      id: 1,
      jobTitle: "Hostess Fashion Week Milano 2024",
      company: "Fashion Events SRL",
      city: "Milano",
      date: "10 Nov 2024",
      compensation: "€150/giorno",
      completedDate: "3 settimane fa",
      rating: 5,
      feedback: "Eccellente professionalità. Raccomandata!"
    },
    {
      id: 2,
      jobTitle: "Promoter Centro Commerciale",
      company: "Retail Marketing",
      city: "Milano",
      date: "25 Ott 2024",
      compensation: "€100/giorno",
      completedDate: "1 mese fa",
      rating: 4,
      feedback: "Ottimo lavoro, puntuale e professionale."
    },
    {
      id: 3,
      jobTitle: "Steward Concerto San Siro",
      company: "Live Events Italia",
      city: "Milano",
      date: "15 Ott 2024",
      compensation: "€130/giorno",
      completedDate: "1 mese fa",
      rating: 5,
      feedback: "Perfetta gestione del pubblico. Grazie!"
    },
    {
      id: 4,
      jobTitle: "Hostess Fiera Artigianato",
      company: "Expo Management",
      city: "Roma",
      date: "5 Ott 2024",
      compensation: "€120/giorno",
      completedDate: "2 mesi fa",
      rating: 4,
      feedback: null
    },
    {
      id: 5,
      jobTitle: "Promoter Evento Sportivo",
      company: "Sport Marketing",
      city: "Milano",
      date: "20 Set 2024",
      compensation: "€110/giorno",
      completedDate: "2 mesi fa",
      rating: 5,
      feedback: "Sempre affidabile e professionale."
    },
    {
      id: 6,
      jobTitle: "Steward Manifestazione Culturale",
      company: "Culture Events",
      city: "Torino",
      date: "10 Set 2024",
      compensation: "€100/giorno",
      completedDate: "3 mesi fa",
      rating: 3,
      feedback: null
    }
  ];

  const totalEarnings = closedJobs.reduce((sum, job) => {
    const amount = parseInt(job.compensation.replace(/[^0-9]/g, ''));
    return sum + amount;
  }, 0);

  const averageRating = (
    closedJobs.reduce((sum, job) => sum + job.rating, 0) / closedJobs.length
  ).toFixed(1);

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
            <div className="flex items-center gap-3 mb-2">
              <Clock className="h-8 w-8 text-muted-foreground" />
              <h1 className="text-3xl font-bold">Lavori Conclusi</h1>
            </div>
            <p className="text-muted-foreground">
              Hai completato {closedJobs.length} lavori
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-4 mb-8 max-w-4xl">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                    <Clock className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Lavori Completati</p>
                    <p className="text-2xl font-bold">{closedJobs.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                    <Star className="h-5 w-5 text-warning" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Valutazione Media</p>
                    <p className="text-2xl font-bold">{averageRating} / 5</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Euro className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Guadagno Totale</p>
                    <p className="text-2xl font-bold">€{totalEarnings}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Jobs List */}
          <div className="space-y-4 max-w-4xl">
            {closedJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-1">{job.jobTitle}</h3>
                      <p className="text-muted-foreground">{job.company}</p>
                    </div>
                    <Badge variant="outline" className="border-muted-foreground text-muted-foreground">
                      Concluso
                    </Badge>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{job.city}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{job.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>Completato {job.completedDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-semibold">
                      <Euro className="h-4 w-4 text-muted-foreground" />
                      <span>{job.compensation}</span>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="p-3 bg-muted/50 rounded-lg mb-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium">Valutazione:</span>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            className={`h-4 w-4 ${
                              star <= job.rating 
                                ? "fill-warning text-warning" 
                                : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    {job.feedback && (
                      <p className="text-sm text-muted-foreground italic">
                        "{job.feedback}"
                      </p>
                    )}
                  </div>

                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/lavoro/${job.id}`}>
                      Vedi Dettagli
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}

            {closedJobs.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <Clock className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold mb-2">Nessun lavoro concluso</h3>
                  <p className="text-muted-foreground mb-4">
                    Non hai ancora completato lavori
                  </p>
                  <Button asChild className="bg-gradient-primary">
                    <Link to="/esplora-lavori">Esplora Lavori</Link>
                  </Button>
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

export default ClosedJobs;
