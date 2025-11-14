import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FaqAziende = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-4 text-center">FAQ Aziende</h1>
            <p className="text-xl text-muted-foreground mb-12 text-center">
              Tutto quello che devi sapere per trovare il personale perfetto
            </p>

            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1">
                <AccordionTrigger>Come pubblico un annuncio di lavoro?</AccordionTrigger>
                <AccordionContent>
                  Contattaci tramite il form aziende indicando le tue esigenze. Il nostro team ti aiuterà a creare l'annuncio perfetto e a gestire tutto il processo di selezione.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>Quanto costa il servizio?</AccordionTrigger>
                <AccordionContent>
                  Le tariffe variano in base al numero di persone necessarie e alla tipologia di evento. Contattaci per un preventivo personalizzato senza impegno.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>In quanto tempo trovo il personale?</AccordionTrigger>
                <AccordionContent>
                  Per eventi urgenti, possiamo trovare personale qualificato anche in 24-48 ore. Per eventi programmati, consigliamo di contattarci almeno 1-2 settimane prima.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>I professionisti sono verificati?</AccordionTrigger>
                <AccordionContent>
                  Sì, tutti i professionisti sono verificati con documenti d'identità e hanno un profilo completo con esperienze e recensioni. Puoi visualizzare tutto prima di scegliere.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>Posso scegliere personalmente chi assumere?</AccordionTrigger>
                <AccordionContent>
                  Assolutamente sì. Puoi invitare direttamente i professionisti che preferisci o ricevere candidature e selezionare tu chi assumere. Hai sempre il controllo totale.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger>Cosa succede se qualcuno non si presenta?</AccordionTrigger>
                <AccordionContent>
                  Abbiamo un sistema di conferme e promemoria. In caso di imprevisti, possiamo trovare rapidamente un sostituto dal nostro database di professionisti disponibili.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7">
                <AccordionTrigger>Come gestisco i pagamenti?</AccordionTrigger>
                <AccordionContent>
                  Riceverai una fattura mensile per tutti i servizi utilizzati. I pagamenti ai dipendenti sono gestiti direttamente da noi, semplificando la tua contabilità.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8">
                <AccordionTrigger>Offrite supporto durante l'evento?</AccordionTrigger>
                <AccordionContent>
                  Sì, il nostro team è sempre disponibile durante gli eventi per qualsiasi necessità o imprevisto. Hai un referente dedicato che puoi contattare in qualsiasi momento.
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

export default FaqAziende;
