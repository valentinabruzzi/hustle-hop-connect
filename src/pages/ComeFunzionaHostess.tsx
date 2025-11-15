import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { UserPlus, Search, Send, CheckCircle, Star, Euro, ArrowLeft } from "lucide-react";

const ComeFunzionaHostess = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1">
        <section className="py-20 bg-gradient-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Come Funziona per Dipendenti
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              In 6 semplici passi dalla registrazione al primo compenso
            </p>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <Button variant="ghost" asChild className="mb-6">
              <Link to="/dipendenti">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Torna Indietro
              </Link>
            </Button>
            <div className="max-w-4xl mx-auto space-y-12">
              {/* Step 1 */}
              <div className="flex gap-6 items-start">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-2xl flex-shrink-0">
                  1
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <UserPlus className="h-6 w-6 text-primary" />
                    <h3 className="text-2xl font-bold">Registrati Gratuitamente</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Crea il tuo account in pochi minuti. Inserisci email, password e dati anagrafici di base. La registrazione è completamente gratuita e senza impegni.
                  </p>
                  <Card>
                    <CardContent className="p-4 bg-muted/50">
                      <p className="text-sm font-medium">✓ Nessun costo di registrazione</p>
                      <p className="text-sm font-medium">✓ Nessun vincolo contrattuale</p>
                      <p className="text-sm font-medium">✓ Attivazione immediata</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-6 items-start">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-2xl flex-shrink-0">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3">Completa il Profilo</h3>
                  <p className="text-muted-foreground mb-4">
                    Aggiungi foto professionali, descrivi la tua esperienza, indica le tue competenze linguistiche e carica i documenti necessari. Un profilo completo aumenta le tue possibilità di essere scelto.
                  </p>
                  <Card>
                    <CardContent className="p-4 bg-muted/50">
                      <p className="text-sm"><strong>Foto:</strong> Almeno 3 foto professionali</p>
                      <p className="text-sm"><strong>Bio:</strong> Descrivi la tua esperienza</p>
                      <p className="text-sm"><strong>Documenti:</strong> CI e CF</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-6 items-start">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-2xl flex-shrink-0">
                  3
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Search className="h-6 w-6 text-primary" />
                    <h3 className="text-2xl font-bold">Esplora le Opportunità</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Naviga tra centinaia di annunci attivi. Usa i filtri per trovare lavori nella tua città, nelle date che preferisci. Ogni annuncio mostra compenso, requisiti e dettagli dell'evento.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex gap-6 items-start">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-2xl flex-shrink-0">
                  4
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Send className="h-6 w-6 text-primary" />
                    <h3 className="text-2xl font-bold">Candidati</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Candidati con un click per i lavori che ti interessano. Puoi anche ricevere inviti diretti dalle aziende che hanno visto il tuo profilo. Riceverai notifica quando l'azienda avrà esaminato la tua candidatura.
                  </p>
                </div>
              </div>

              {/* Step 5 */}
              <div className="flex gap-6 items-start">
                <div className="w-16 h-16 bg-success text-success-foreground rounded-full flex items-center justify-center font-bold text-2xl flex-shrink-0">
                  5
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <CheckCircle className="h-6 w-6 text-success" />
                    <h3 className="text-2xl font-bold">Lavora</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Una volta confermato, presentati all'evento con il tuo documento. Riceverai tutte le informazioni necessarie: orario, luogo esatto, dress code e nome del referente da contattare.
                  </p>
                </div>
              </div>

              {/* Step 6 */}
              <div className="flex gap-6 items-start">
                <div className="w-16 h-16 bg-success text-success-foreground rounded-full flex items-center justify-center font-bold text-2xl flex-shrink-0">
                  6
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Euro className="h-6 w-6 text-success" />
                    <h3 className="text-2xl font-bold">Ricevi il Pagamento</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Il compenso viene accreditato sul tuo conto entro 15 giorni lavorativi dalla conclusione dell'evento. L'azienda può anche lasciare una recensione che aumenterà la tua reputazione sulla piattaforma.
                  </p>
                  <Card>
                    <CardContent className="p-4 bg-success/10 border-success">
                      <p className="text-sm font-medium">💰 Pagamento garantito</p>
                      <p className="text-sm font-medium">⭐ Costruisci la tua reputazione</p>
                      <p className="text-sm font-medium">🚀 Ricevi più inviti dalle aziende</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            <div className="text-center mt-16">
              <Button size="lg" asChild className="bg-gradient-primary text-lg px-8">
                <Link to="/register">Inizia Subito</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default ComeFunzionaHostess;
