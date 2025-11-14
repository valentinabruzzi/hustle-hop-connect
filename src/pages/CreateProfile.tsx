import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Camera, FileText, Star, Award, CheckCircle } from "lucide-react";

const CreateProfile = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1">
        <section className="py-20 bg-gradient-hero text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Crea un Profilo di Successo
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              Un profilo completo e professionale aumenta le tue possibilità di essere scelto dalle migliori aziende
            </p>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-12">
              <div className="flex gap-6 items-start">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Camera className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3">Foto Professionali</h3>
                  <p className="text-muted-foreground mb-4">
                    Le foto sono il primo elemento che le aziende guardano. Carica almeno 3-5 foto di qualità che ti mostrino in contesti professionali.
                  </p>
                  <Card>
                    <CardContent className="p-4 bg-muted/50">
                      <p className="text-sm font-medium mb-2">✓ Cosa fare:</p>
                      <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                        <li>• Sfondo neutro e luminoso</li>
                        <li>• Abbigliamento elegante e professionale</li>
                        <li>• Sorriso naturale</li>
                        <li>• Primo piano e figura intera</li>
                      </ul>
                      <p className="text-sm font-medium mt-3 mb-2">✗ Cosa evitare:</p>
                      <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                        <li>• Foto sfocate o di bassa qualità</li>
                        <li>• Selfie casuali</li>
                        <li>• Abbigliamento troppo informale</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3">Bio Efficace</h3>
                  <p className="text-muted-foreground mb-4">
                    La tua bio deve catturare l'attenzione in poche righe. Sii conciso ma completo.
                  </p>
                  <Card>
                    <CardContent className="p-4 bg-muted/50">
                      <p className="text-sm font-medium mb-2">Struttura ideale:</p>
                      <ul className="text-sm text-muted-foreground space-y-2 ml-4">
                        <li>1. Chi sei e quanti anni di esperienza hai</li>
                        <li>2. Le tue specializzazioni (eventi fashion, sportivi, corporate...)</li>
                        <li>3. Le tue competenze chiave (lingue, soft skills)</li>
                        <li>4. La tua disponibilità geografica</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Star className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3">Esperienze Dettagliate</h3>
                  <p className="text-muted-foreground mb-4">
                    Elenca le tue esperienze più rilevanti con dettagli specifici.
                  </p>
                  <Card>
                    <CardContent className="p-4 bg-muted/50">
                      <p className="text-sm font-medium mb-2">Per ogni esperienza indica:</p>
                      <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                        <li>• Nome dell'evento/azienda</li>
                        <li>• Periodo (mese/anno)</li>
                        <li>• Ruolo svolto</li>
                        <li>• Responsabilità principali</li>
                        <li>• Risultati ottenuti (se misurabili)</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3">Certificazioni e Competenze</h3>
                  <p className="text-muted-foreground mb-4">
                    Aggiungi tutte le certificazioni e competenze che possono fare la differenza.
                  </p>
                  <Card>
                    <CardContent className="p-4 bg-muted/50">
                      <p className="text-sm font-medium mb-2">Certificazioni utili:</p>
                      <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                        <li>• HACCP (per eventi con somministrazione)</li>
                        <li>• Primo Soccorso</li>
                        <li>• Certificati linguistici (IELTS, TOEFL, DELE...)</li>
                        <li>• Patente B (essenziale per molti eventi)</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-16 h-16 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-8 w-8 text-success" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3">Completezza al 100%</h3>
                  <p className="text-muted-foreground mb-4">
                    Un profilo completo al 100% appare più in alto nelle ricerche delle aziende.
                  </p>
                  <Card>
                    <CardContent className="p-4 bg-success/10 border-success">
                      <p className="text-sm font-medium mb-2">Checklist profilo completo:</p>
                      <ul className="text-sm space-y-1 ml-4">
                        <li>✓ Almeno 3 foto professionali</li>
                        <li>✓ Bio completa (min 100 caratteri)</li>
                        <li>✓ Almeno 2 esperienze lavorative</li>
                        <li>✓ Competenze linguistiche specificate</li>
                        <li>✓ Dati fisici completi</li>
                        <li>✓ Documenti caricati</li>
                        <li>✓ IBAN per pagamenti</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            <div className="text-center mt-16">
              <p className="text-muted-foreground mb-6">
                Pronto a creare il tuo profilo di successo?
              </p>
              <Button size="lg" asChild className="bg-gradient-primary text-lg px-8">
                <Link to="/register">Inizia Ora</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default CreateProfile;
