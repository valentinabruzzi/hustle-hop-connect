import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowLeft } from "lucide-react";

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 bg-background py-20">
        <div className="container mx-auto px-4">
          <Button variant="ghost" asChild className="mb-6">
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Torna alla Home
            </Link>
          </Button>
          <div className="max-w-4xl mx-auto prose prose-slate">
            <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
            <p className="text-muted-foreground mb-8">Ultimo aggiornamento: 14 Novembre 2025</p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Introduzione</h2>
              <p className="text-muted-foreground">
                LastMinute.it ("noi", "nostro") rispetta la tua privacy e si impegna a proteggere i tuoi dati personali. Questa Privacy Policy spiega come raccogliamo, utilizziamo e proteggiamo le tue informazioni personali in conformità al Regolamento Generale sulla Protezione dei Dati (GDPR).
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Dati che raccogliamo</h2>
              <p className="text-muted-foreground mb-4">Raccogliamo diverse tipologie di dati:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Dati di identificazione: nome, cognome, email, telefono</li>
                <li>Dati professionali: esperienze lavorative, competenze, foto professionali</li>
                <li>Documenti: carta d'identità, codice fiscale</li>
                <li>Dati di pagamento: IBAN per l'accredito compensi</li>
                <li>Dati di utilizzo: interazioni con la piattaforma, candidature, preferenze</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Come utilizziamo i tuoi dati</h2>
              <p className="text-muted-foreground mb-4">Utilizziamo i tuoi dati per:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Fornire e gestire i nostri servizi</li>
                <li>Mettere in contatto dipendenti e aziende</li>
                <li>Elaborare pagamenti e fatturazioni</li>
                <li>Inviare notifiche su opportunità di lavoro</li>
                <li>Migliorare la piattaforma e l'esperienza utente</li>
                <li>Adempiere obblighi legali e contrattuali</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Condivisione dei dati</h2>
              <p className="text-muted-foreground">
                I tuoi dati possono essere condivisi con aziende partner per finalità di selezione e assunzione, solo previo tuo consenso. Non vendiamo mai i tuoi dati personali a terze parti.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. I tuoi diritti</h2>
              <p className="text-muted-foreground mb-4">Hai diritto a:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Accedere ai tuoi dati personali</li>
                <li>Rettificare dati inesatti o incompleti</li>
                <li>Richiedere la cancellazione dei tuoi dati</li>
                <li>Limitare il trattamento dei tuoi dati</li>
                <li>Opporti al trattamento</li>
                <li>Portabilità dei dati</li>
                <li>Revocare il consenso in qualsiasi momento</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Sicurezza dei dati</h2>
              <p className="text-muted-foreground">
                Implementiamo misure di sicurezza tecniche e organizzative appropriate per proteggere i tuoi dati personali da accessi non autorizzati, perdita o distruzione.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Cookie</h2>
              <p className="text-muted-foreground">
                Utilizziamo cookie necessari per il funzionamento del sito e cookie analitici per migliorare i nostri servizi. Puoi gestire le preferenze sui cookie nelle impostazioni del tuo browser.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Contatti</h2>
              <p className="text-muted-foreground">
                Per esercitare i tuoi diritti o per qualsiasi domanda sulla Privacy Policy, contattaci a: privacy@lastminute.it
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Privacy;
