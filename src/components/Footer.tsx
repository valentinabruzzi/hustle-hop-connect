import { Link } from "react-router-dom";
import { Briefcase } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-muted border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 font-bold text-lg mb-4">
              <Briefcase className="h-5 w-5 text-primary" />
              <span>LastMinute.it</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              La piattaforma che connette dipendenti e aziende per opportunità di lavoro last minute.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Per Dipendenti</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/dipendenti" className="text-muted-foreground hover:text-primary transition-colors">
                  Diventa Dipendente
                </Link>
              </li>
              <li>
                <Link to="/come-funziona-hostess" className="text-muted-foreground hover:text-primary transition-colors">
                  Come Funziona
                </Link>
              </li>
              <li>
                <Link to="/faq-dipendenti" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/crea-un-profilo-hostess-steward-di-successo" className="text-muted-foreground hover:text-primary transition-colors">
                  Crea Profilo di Successo
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Per Aziende</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/aziende" className="text-muted-foreground hover:text-primary transition-colors">
                  Servizi per Aziende
                </Link>
              </li>
              <li>
                <Link to="/come-funziona-aziende" className="text-muted-foreground hover:text-primary transition-colors">
                  Come Funziona
                </Link>
              </li>
              <li>
                <Link to="/faq-aziende" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQ Aziende
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Informazioni</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contacts" className="text-muted-foreground hover:text-primary transition-colors">
                  Contatti
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/cookie" className="text-muted-foreground hover:text-primary transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Termini di Utilizzo
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} LastMinute.it - Tutti i diritti riservati</p>
        </div>
      </div>
    </footer>
  );
};
