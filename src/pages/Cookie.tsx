import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowLeft } from "lucide-react";

const Cookie = () => {
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
            <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
            <p className="text-muted-foreground mb-8">Ultimo aggiornamento: 14 Novembre 2025</p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Cosa sono i Cookie</h2>
              <p className="text-muted-foreground">
                I cookie sono piccoli file di testo che vengono memorizzati sul tuo dispositivo quando visiti un sito web. Vengono utilizzati per far funzionare i siti in modo più efficiente e per fornire informazioni ai proprietari del sito.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Come utilizziamo i Cookie</h2>
              <p className="text-muted-foreground mb-4">LastMinute.it utilizza diversi tipi di cookie:</p>
              
              <h3 className="text-xl font-semibold mb-3">Cookie Necessari</h3>
              <p className="text-muted-foreground mb-4">
                Questi cookie sono essenziali per il funzionamento del sito. Ti permettono di navigare nel sito e utilizzare le sue funzionalità, come l'accesso alle aree protette.
              </p>

              <h3 className="text-xl font-semibold mb-3">Cookie di Preferenze</h3>
              <p className="text-muted-foreground mb-4">
                Questi cookie permettono al sito di ricordare le scelte che fai (come il tuo nome utente, lingua o regione) e fornire funzionalità migliorate e più personalizzate.
              </p>

              <h3 className="text-xl font-semibold mb-3">Cookie Statistici</h3>
              <p className="text-muted-foreground mb-4">
                Questi cookie ci aiutano a capire come i visitatori interagiscono con il sito raccogliendo e riportando informazioni in forma anonima. Utilizziamo Google Analytics per questo scopo.
              </p>

              <h3 className="text-xl font-semibold mb-3">Cookie di Marketing</h3>
              <p className="text-muted-foreground mb-4">
                Questi cookie vengono utilizzati per tracciare i visitatori attraverso i siti web. L'intento è quello di visualizzare annunci pertinenti e coinvolgenti per il singolo utente.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Cookie di Terze Parti</h2>
              <p className="text-muted-foreground mb-4">Utilizziamo servizi di terze parti che possono impostare i propri cookie:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Google Analytics:</strong> per analizzare l'utilizzo del sito</li>
                <li><strong>Google Maps:</strong> per visualizzare mappe e indicazioni</li>
                <li><strong>Facebook Pixel:</strong> per ottimizzare le campagne pubblicitarie</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Durata dei Cookie</h2>
              <p className="text-muted-foreground mb-4">I cookie possono essere:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Cookie di sessione:</strong> temporanei e vengono eliminati quando chiudi il browser</li>
                <li><strong>Cookie persistenti:</strong> rimangono sul tuo dispositivo per un periodo specifico o fino a quando non li elimini manualmente</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Come gestire i Cookie</h2>
              <p className="text-muted-foreground mb-4">
                Puoi gestire le preferenze dei cookie attraverso le impostazioni del tuo browser. La maggior parte dei browser ti permette di:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Vedere quali cookie sono stati impostati</li>
                <li>Bloccare i cookie di terze parti</li>
                <li>Bloccare i cookie da siti specifici</li>
                <li>Bloccare tutti i cookie</li>
                <li>Eliminare tutti i cookie quando chiudi il browser</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                <strong>Nota:</strong> Se scegli di disabilitare i cookie, alcune funzionalità del sito potrebbero non funzionare correttamente.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Guide per Browser</h2>
              <p className="text-muted-foreground mb-4">Ecco i link alle guide per gestire i cookie nei browser più comuni:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Chrome</a></li>
                <li><a href="https://support.mozilla.org/it/kb/Attivare%20e%20disattivare%20i%20cookie" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Mozilla Firefox</a></li>
                <li><a href="https://support.apple.com/it-it/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Safari</a></li>
                <li><a href="https://support.microsoft.com/it-it/microsoft-edge/eliminare-i-cookie-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Microsoft Edge</a></li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Aggiornamenti a questa Policy</h2>
              <p className="text-muted-foreground">
                Potremmo aggiornare questa Cookie Policy periodicamente per riflettere cambiamenti nelle nostre pratiche o per altri motivi operativi, legali o normativi.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Contatti</h2>
              <p className="text-muted-foreground">
                Per domande sulla nostra Cookie Policy, contattaci a: privacy@lastminute.it
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cookie;
