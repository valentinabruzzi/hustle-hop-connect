import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Megaphone, TrendingUp, Users, Target, ArrowLeft } from "lucide-react";

const Promoter = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="relative py-20 bg-gradient-accent overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Diventa Promoter con LastMinute.it
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Promuovi brand di successo, guadagna bene e costruisci la tua carriera nel marketing
            </p>
            <Button size="lg" asChild className="bg-white text-accent hover:bg-white/90 text-lg px-8">
              <Link to="/register">Inizia Subito</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <Button variant="ghost" asChild className="mb-6">
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Torna alla Home
            </Link>
          </Button>
          <h2 className="text-3xl font-bold text-center mb-12">Opportunità per Promoter</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <Card>
              <CardContent className="pt-6 text-center">
                <Megaphone className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Eventi Brand</h3>
                <p className="text-sm text-muted-foreground">
                  Promuovi brand famosi durante eventi e manifestazioni
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Users className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Centri Commerciali</h3>
                <p className="text-sm text-muted-foreground">
                  Sampling e promozioni nei principali shopping center
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Target className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Street Marketing</h3>
                <p className="text-sm text-muted-foreground">
                  Attività promozionali in strada e location strategiche
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <TrendingUp className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Eventi Sportivi</h3>
                <p className="text-sm text-muted-foreground">
                  Promozioni durante manifestazioni sportive
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Cosa Aspetti?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Inizia la tua carriera come promoter e lavora con i migliori brand
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild className="bg-gradient-accent">
              <Link to="/register">Registrati Gratis</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/esplora-lavori">Vedi Opportunità</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Promoter;
