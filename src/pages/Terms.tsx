import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 bg-background py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-slate">
            <h1 className="text-4xl font-bold mb-8">Termini di Utilizzo</h1>
            <p className="text-muted-foreground mb-8">Ultimo aggiornamento: 14 Novembre 2025</p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Accettazione dei Termini</h2>
              <p className="text-muted-foreground">
                Utilizzando LastMinute.it accetti di essere vincolato da questi Termini di Utilizzo. Se non accetti questi termini, non utilizzare la piattaforma.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Descrizione del Servizio</h2>
              <p className="text-muted-foreground">
                LastMinute.it è una piattaforma che mette in contatto dipendenti professionali (hostess, steward, promoter) con aziende che necessitano di personale per eventi.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Registrazione e Account</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Devi avere almeno 18 anni per registrarti</li>
                <li>Le informazioni fornite devono essere accurate e veritiere</li>
                <li>Sei responsabile della sicurezza del tuo account</li>
                <li>Non puoi condividere le credenziali con terzi</li>
                <li>Puoi avere un solo account per persona</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Obblighi dei Dipendenti</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Mantenere il profilo aggiornato con informazioni accurate</li>
                <li>Rispettare gli impegni presi e presentarsi agli eventi confermati</li>
                <li>Comportarsi in modo professionale durante i lavori</li>
                <li>Fornire documenti validi quando richiesto</li>
                <li>Non accettare pagamenti al di fuori della piattaforma</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Obblighi delle Aziende</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Fornire informazioni accurate sugli eventi</li>
                <li>Rispettare i compensi concordati</li>
                <li>Garantire condizioni di lavoro sicure</li>
                <li>Rispettare le normative sul lavoro vigenti</li>
                <li>Pagare i compensi nei tempi stabiliti</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Pagamenti e Compensi</h2>
              <p className="text-muted-foreground mb-4">
                I compensi sono definiti negli annunci di lavoro. LastMinute.it gestisce i pagamenti tra aziende e dipendenti, trattenendo una commissione per il servizio fornito.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Cancellazioni e Modifiche</h2>
              <p className="text-muted-foreground">
                Le cancellazioni devono essere comunicate con almeno 48 ore di anticipo salvo cause di forza maggiore. Cancellazioni ripetute senza preavviso possono comportare la sospensione dell'account.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Proprietà Intellettuale</h2>
              <p className="text-muted-foreground">
                Tutti i contenuti della piattaforma (logo, testi, grafica) sono di proprietà di LastMinute.it e protetti da copyright. È vietata qualsiasi riproduzione senza autorizzazione.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">9. Limitazione di Responsabilità</h2>
              <p className="text-muted-foreground">
                LastMinute.it agisce come intermediario tra dipendenti e aziende. Non siamo responsabili per controversie derivanti dai rapporti di lavoro, anche se ci impegniamo a facilitare la risoluzione di eventuali problemi.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">10. Sospensione e Terminazione</h2>
              <p className="text-muted-foreground">
                Ci riserviamo il diritto di sospendere o terminare account che violano questi termini, forniscono informazioni false o si comportano in modo inappropriato.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">11. Modifiche ai Termini</h2>
              <p className="text-muted-foreground">
                Ci riserviamo il diritto di modificare questi termini in qualsiasi momento. Le modifiche saranno comunicate via email e sul sito.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">12. Legge Applicabile</h2>
              <p className="text-muted-foreground">
                Questi termini sono regolati dalla legge italiana. Per qualsiasi controversia è competente il foro di Milano.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">13. Contatti</h2>
              <p className="text-muted-foreground">
                Per domande sui Termini di Utilizzo: legal@lastminute.it
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Terms;
