import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Briefcase, Users, TrendingUp, Shield, Clock, Star } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Trova Opportunità di Lavoro Last Minute
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Connetti il tuo talento con le migliori aziende. Lavori flessibili, pagamenti rapidi, crescita professionale.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-white text-primary hover:bg-white/90 text-lg px-8">
                <Link to="/register">Registrati Ora</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="bg-white/10 border-white text-white hover:bg-white/20 text-lg px-8 backdrop-blur-sm">
                <Link to="/esplora-lavori">Esplora Lavori</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Perché Scegliere LastMinute.it</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              La piattaforma più affidabile per hostess, steward e promoter
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Flessibilità Totale</h3>
                <p className="text-muted-foreground">
                  Scegli quando lavorare. Candidati solo per i lavori che ti interessano e che si adattano ai tuoi orari.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Pagamenti Rapidi</h3>
                <p className="text-muted-foreground">
                  Ricevi i tuoi compensi in modo veloce e sicuro. Sistema di pagamento trasparente e puntuale.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-success" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Ambiente Sicuro</h3>
                <p className="text-muted-foreground">
                  Lavora con aziende verificate. Sistema di feedback e recensioni per garantire qualità e sicurezza.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Sections */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-border overflow-hidden">
              <CardContent className="p-8">
                <Users className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-4">Sei un Dipendente?</h3>
                <p className="text-muted-foreground mb-6">
                  Unisciti a migliaia di professionisti che hanno trovato opportunità di lavoro flessibili e ben retribuite.
                </p>
                <Button asChild className="w-full bg-gradient-primary">
                  <Link to="/dipendenti">Scopri di Più</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border overflow-hidden">
              <CardContent className="p-8">
                <Briefcase className="h-12 w-12 text-accent mb-4" />
                <h3 className="text-2xl font-bold mb-4">Sei un'Azienda?</h3>
                <p className="text-muted-foreground mb-6">
                  Trova rapidamente personale qualificato per i tuoi eventi. Risparmia tempo e ottimizza i costi.
                </p>
                <Button asChild variant="outline" className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                  <Link to="/aziende">Richiedi Preventivo</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">5000+</div>
              <div className="text-muted-foreground">Dipendenti Attivi</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2">1200+</div>
              <div className="text-muted-foreground">Aziende Partner</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-success mb-2">15000+</div>
              <div className="text-muted-foreground">Lavori Completati</div>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1 mb-2">
                <Star className="h-6 w-6 text-warning fill-warning" />
                <span className="text-4xl md:text-5xl font-bold">4.8</span>
              </div>
              <div className="text-muted-foreground">Valutazione Media</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
