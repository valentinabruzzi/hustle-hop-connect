import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FaqDipendenti = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-4 text-center">FAQ Dipendenti</h1>
            <p className="text-xl text-muted-foreground mb-12 text-center">
              Risposte alle domande più frequenti
            </p>

            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1">
                <AccordionTrigger>Come funziona la registrazione?</AccordionTrigger>
                <AccordionContent>
                  La registrazione è gratuita e richiede solo pochi minuti. Compila il form con i tuoi dati, verifica la tua email e completa il profilo con foto e informazioni professionali.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>Quanto posso guadagnare?</AccordionTrigger>
                <AccordionContent>
                  I compensi variano da €100 a €200 al giorno in base al tipo di evento, esperienza e competenze richieste. Ogni annuncio indica chiaramente il compenso offerto.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>Come e quando ricevo i pagamenti?</AccordionTrigger>
                <AccordionContent>
                  I pagamenti vengono effettuati tramite bonifico bancario entro 15 giorni lavorativi dalla conclusione dell'evento. Assicurati di aver inserito correttamente il tuo IBAN nelle impostazioni.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>Posso scegliere quando e dove lavorare?</AccordionTrigger>
                <AccordionContent>
                  Sì, hai totale libertà di scegliere. Puoi candidarti solo per i lavori che ti interessano, nelle date e città che preferisci. Non c'è nessun obbligo.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>Cosa succede se vengo selezionato?</AccordionTrigger>
                <AccordionContent>
                  Riceverai una notifica via email e app. L'azienda ti contatterà per confermare tutti i dettagli (orario, luogo, dress code). Dovrai confermare la tua disponibilità entro i termini indicati.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger>Serve esperienza precedente?</AccordionTrigger>
                <AccordionContent>
                  Dipende dal lavoro. Alcuni richiedono esperienza specifica, altri sono aperti anche a principianti. Ogni annuncio indica chiaramente i requisiti necessari.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7">
                <AccordionTrigger>Cosa devo portare il giorno dell'evento?</AccordionTrigger>
                <AccordionContent>
                  Sempre documento d'identità valido. L'abbigliamento richiesto è specificato nell'annuncio. Eventuali divise vengono fornite dall'azienda il giorno stesso.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8">
                <AccordionTrigger>Come funziona il sistema di recensioni?</AccordionTrigger>
                <AccordionContent>
                  Dopo ogni lavoro completato, l'azienda può lasciarti una recensione. Le recensioni positive aumentano la tua visibilità e le possibilità di essere scelto per futuri lavori.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FaqDipendenti;
