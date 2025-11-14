import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useFeedbacks } from "@/hooks/useFeedbacks";
import { format } from 'date-fns';
import { it } from 'date-fns/locale';
import { 
  ArrowLeft,
  Star,
  Briefcase,
  Loader2,
  Building2
} from "lucide-react";

const Feedbacks = () => {
  const { feedbacks = [], isLoading, averageRating, ratingDistribution, totalReviews } = useFeedbacks();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
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
            <div className="flex items-center gap-3 mb-2">
              <Star className="h-8 w-8 text-warning fill-warning" />
              <h1 className="text-3xl font-bold">Feedback Ricevuti</h1>
            </div>
            <p className="text-muted-foreground">
              {totalReviews > 0 ? `Le tue ${totalReviews} recensioni dalle aziende` : 'Nessuna recensione ricevuta ancora'}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Stats Sidebar */}
            <aside className="lg:col-span-1">
              <Card className="sticky top-20">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-5xl font-bold mb-2">{averageRating}</div>
                    <div className="flex justify-center gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-5 w-5 ${
                            star <= Math.round(parseFloat(averageRating))
                              ? "fill-warning text-warning"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {totalReviews} {totalReviews === 1 ? 'recensione' : 'recensioni'}
                    </p>
                  </div>

                  <div className="space-y-2">
                    {ratingDistribution.map((item) => (
                      <div key={item.rating} className="flex items-center gap-2">
                        <span className="text-sm w-8">{item.rating}★</span>
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-warning transition-all"
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground w-12 text-right">
                          {item.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </aside>

            {/* Feedbacks List */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {feedbacks.length === 0 ? (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <Star className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground mb-4">
                        Non hai ancora ricevuto recensioni. Completa il tuo primo lavoro per ricevere feedback!
                      </p>
                      <Button asChild>
                        <Link to="/esplora-lavori">
                          Esplora Lavori
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  feedbacks.map((feedback: any) => (
                    <Card key={feedback.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Building2 className="w-4 h-4 text-muted-foreground" />
                              <span className="font-semibold">
                                {feedback.company?.first_name} {feedback.company?.last_name}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Briefcase className="w-4 h-4" />
                              <span>{feedback.jobs?.title}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-4 h-4 ${
                                  star <= feedback.rating
                                    ? 'fill-warning text-warning'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {feedback.comment && (
                          <p className="text-sm text-muted-foreground mb-4">{feedback.comment}</p>
                        )}
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>Da: {feedback.company?.first_name} {feedback.company?.last_name}</span>
                          <span>{format(new Date(feedback.created_at), 'dd MMMM yyyy', { locale: it })}</span>
                        </div>
                      </CardContent>
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

export default Feedbacks;
