import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Clock, TrendingUp, Users, Shield, Star, CheckCircle, ArrowLeft } from "lucide-react";

const Dipendenti = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Lavora come Hostess e Steward
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Unisciti a migliaia di professionisti. Scegli quando lavorare, accetta solo i lavori che ti interessano.
            </p>
            <Button size="lg" asChild className="bg-white text-primary hover:bg-white/90 text-lg px-8">
              <Link to="/register">Registrati Gratuitamente</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <Button variant="ghost" asChild className="mb-6">
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Torna alla Home
            </Link>
          </Button>
          <h2 className="text-3xl font-bold text-center mb-12">Perché Scegliere LastMinute.it</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card>
              <CardContent className="pt-6 text-center">
                <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Flessibilità Totale</h3>
                <p className="text-muted-foreground">
                  Scegli tu quando e dove lavorare. Nessun obbligo, massima libertà.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <TrendingUp className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Guadagni Competitivi</h3>
                <p className="text-muted-foreground">
                  Compensi da €100 a €200 al giorno. Pagamenti rapidi e sicuri.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Shield className="h-12 w-12 text-success mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Ambiente Sicuro</h3>
                <p className="text-muted-foreground">
                  Lavora solo con aziende verificate. Sistema di recensioni trasparente.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Come Funziona</h2>
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Crea il tuo profilo</h3>
                <p className="text-muted-foreground">
                  Registrati gratuitamente e completa il tuo profilo professionale in pochi minuti.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Esplora le opportunità</h3>
                <p className="text-muted-foreground">
                  Naviga centinaia di lavori disponibili e candidati per quelli che ti interessano.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Inizia a lavorare</h3>
                <p className="text-muted-foreground">
                  Ricevi conferma, presenta ti all'evento e guadagna. Semplice!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Pronto per Iniziare?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Unisciti a migliaia di professionisti che hanno già trovato la loro opportunità
          </p>
          <Button size="lg" asChild className="bg-gradient-primary text-lg px-8">
            <Link to="/register">Registrati Ora</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Dipendenti;
