import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FileText, Users, CheckCircle, Calendar, Star } from "lucide-react";

const ComeFunzionaAziende = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1">
        <section className="py-20 bg-gradient-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Come Funziona per Aziende
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              Trova personale qualificato in 5 semplici passi
            </p>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-12">
              <div className="flex gap-6 items-start">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-2xl flex-shrink-0">
                  1
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <FileText className="h-6 w-6 text-primary" />
                    <h3 className="text-2xl font-bold">Richiedi un Preventivo</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Compila il form indicando tipo di evento, numero di persone necessarie, date e requisiti specifici. Il nostro team ti contatterà entro 24 ore con un preventivo personalizzato.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-2xl flex-shrink-0">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3">Pubblica l'Annuncio</h3>
                  <p className="text-muted-foreground mb-4">
                    Creiamo insieme l'annuncio perfetto. Definiamo requisiti, compenso e dettagli dell'evento. Pubblichiamo e promuoviamo l'annuncio al nostro database di professionisti verificati.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-2xl flex-shrink-0">
                  3
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Users className="h-6 w-6 text-primary" />
                    <h3 className="text-2xl font-bold">Ricevi Candidature</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Visualizza i profili completi dei candidati con foto, esperienze e recensioni. Puoi anche invitare direttamente i professionisti che preferisci dal nostro database.
                  </p>
                  <Card>
                    <CardContent className="p-4 bg-muted/50">
                      <p className="text-sm font-medium">✓ Profili verificati con documenti</p>
                      <p className="text-sm font-medium">✓ Recensioni di altre aziende</p>
                      <p className="text-sm font-medium">✓ Esperienza e competenze certificate</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-16 h-16 bg-success text-success-foreground rounded-full flex items-center justify-center font-bold text-2xl flex-shrink-0">
                  4
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <CheckCircle className="h-6 w-6 text-success" />
                    <h3 className="text-2xl font-bold">Seleziona e Conferma</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Scegli i candidati che preferisci e conferma le selezioni. Il sistema invia automaticamente tutte le comunicazioni e le conferme necessarie.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-16 h-16 bg-success text-success-foreground rounded-full flex items-center justify-center font-bold text-2xl flex-shrink-0">
                  5
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Calendar className="h-6 w-6 text-success" />
                    <h3 className="text-2xl font-bold">Evento e Follow-up</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Il personale si presenta puntuale all'evento. Il nostro supporto è sempre disponibile per qualsiasi necessità. Dopo l'evento, lascia una recensione per aiutare altri a scegliere i migliori professionisti.
                  </p>
                  <Card>
                    <CardContent className="p-4 bg-success/10 border-success">
                      <p className="text-sm font-medium">📞 Supporto durante l'evento</p>
                      <p className="text-sm font-medium">💼 Gestione pagamenti semplificata</p>
                      <p className="text-sm font-medium">🔄 Sostituzioni rapide se necessario</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            <div className="text-center mt-16">
              <Button size="lg" asChild className="bg-gradient-primary text-lg px-8">
                <Link to="/aziende">Richiedi Preventivo</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default ComeFunzionaAziende;
