import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { 
  ArrowLeft,
  Star,
  Calendar,
  Briefcase
} from "lucide-react";

const Feedbacks = () => {
  const feedbacks = [
    {
      id: 1,
      company: "Fashion Events SRL",
      jobTitle: "Hostess Fashion Week Milano 2024",
      date: "10 Nov 2024",
      rating: 5,
      comment: "Eccellente professionalità e presenza scenica. Ha gestito con eleganza tutti gli ospiti VIP. Comunicazione perfetta in italiano e inglese. Altamente raccomandata per eventi di alto livello!",
      reviewer: "Laura Bianchi"
    },
    {
      id: 2,
      company: "Live Events Italia",
      jobTitle: "Steward Concerto San Siro",
      date: "15 Ott 2024",
      rating: 5,
      comment: "Perfetta gestione del pubblico durante l'evento. Professionale, puntuale e con ottime capacità di problem solving. Grazie per l'ottimo lavoro!",
      reviewer: "Marco Rossi"
    },
    {
      id: 3,
      company: "Retail Marketing",
      jobTitle: "Promoter Centro Commerciale",
      date: "25 Ott 2024",
      rating: 4,
      comment: "Ottimo lavoro nel complesso. Puntuale, sorridente e con buone capacità comunicative. Consigliato.",
      reviewer: "Anna Verdi"
    },
    {
      id: 4,
      company: "Sport Marketing",
      jobTitle: "Promoter Evento Sportivo",
      date: "20 Set 2024",
      rating: 5,
      comment: "Sempre affidabile e professionale. Grande energia e capacità di coinvolgere il pubblico. Perfetto per eventi sportivi!",
      reviewer: "Giuseppe Ferrari"
    },
    {
      id: 5,
      company: "Expo Management",
      jobTitle: "Hostess Fiera Artigianato",
      date: "5 Ott 2024",
      rating: 4,
      comment: "Buona professionalità. Ha saputo gestire bene lo stand aziendale durante tutta la durata della fiera.",
      reviewer: "Silvia Conti"
    },
    {
      id: 6,
      company: "Culture Events",
      jobTitle: "Steward Manifestazione Culturale",
      date: "10 Set 2024",
      rating: 3,
      comment: "Prestazione nella norma. Rispettato gli orari e le consegne.",
      reviewer: "Roberto Marino"
    }
  ];

  const averageRating = (
    feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length
  ).toFixed(1);

  const ratingDistribution = {
    5: feedbacks.filter(f => f.rating === 5).length,
    4: feedbacks.filter(f => f.rating === 4).length,
    3: feedbacks.filter(f => f.rating === 3).length,
    2: feedbacks.filter(f => f.rating === 2).length,
    1: feedbacks.filter(f => f.rating === 1).length,
  };

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
              <Star className="h-8 w-8 text-warning fill-warning" />
              <h1 className="text-3xl font-bold">Feedback Ricevuti</h1>
            </div>
            <p className="text-muted-foreground">
              Le tue {feedbacks.length} recensioni dalle aziende
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Stats Sidebar */}
            <aside className="lg:col-span-1">
              <Card className="sticky top-20">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-5xl font-bold mb-2">{averageRating}</div>
                    <div className="flex items-center justify-center gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className="h-5 w-5 fill-warning text-warning"
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Basato su {feedbacks.length} recensioni
                    </p>
                  </div>

                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center gap-2">
                        <span className="text-sm w-4">{rating}</span>
                        <Star className="h-3 w-3 fill-warning text-warning" />
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-warning"
                            style={{ 
                              width: `${(ratingDistribution[rating as keyof typeof ratingDistribution] / feedbacks.length) * 100}%` 
                            }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground w-8 text-right">
                          {ratingDistribution[rating as keyof typeof ratingDistribution]}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </aside>

            {/* Feedbacks List */}
            <div className="lg:col-span-2 space-y-4">
              {feedbacks.map((feedback) => (
                <Card key={feedback.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star 
                                key={star} 
                                className={`h-5 w-5 ${
                                  star <= feedback.rating 
                                    ? "fill-warning text-warning" 
                                    : "text-muted-foreground"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm font-semibold">
                            {feedback.rating}/5
                          </span>
                        </div>
                        <h3 className="font-semibold text-lg mb-1">{feedback.company}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                          <Briefcase className="h-3 w-3" />
                          <span>{feedback.jobTitle}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-foreground mb-4 leading-relaxed">
                      "{feedback.comment}"
                    </p>

                    <div className="flex items-center justify-between text-sm text-muted-foreground pt-3 border-t border-border">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3" />
                        <span>{feedback.date}</span>
                      </div>
                      <span className="font-medium">— {feedback.reviewer}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {feedbacks.length === 0 && (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Star className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <h3 className="text-xl font-semibold mb-2">Nessun feedback</h3>
                    <p className="text-muted-foreground mb-4">
                      Non hai ancora ricevuto recensioni dalle aziende
                    </p>
                    <Button asChild className="bg-gradient-primary">
                      <Link to="/esplora-lavori">Inizia a Lavorare</Link>
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

export default Feedbacks;
