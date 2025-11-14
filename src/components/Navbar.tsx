import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Briefcase, Menu, X } from "lucide-react";
import { useState } from "react";

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <Briefcase className="h-6 w-6 text-primary" />
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              LastMinute.it
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/dipendenti" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Dipendenti
            </Link>
            <Link to="/promoter" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Promoter
            </Link>
            <Link to="/aziende" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Aziende
            </Link>
            <Link to="/contacts" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Contatti
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link to="/login">Accedi</Link>
            </Button>
            <Button asChild className="bg-gradient-primary">
              <Link to="/register">Registrati</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-border">
            <Link
              to="/dipendenti"
              className="block px-4 py-2 text-sm font-medium hover:bg-muted rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dipendenti
            </Link>
            <Link
              to="/promoter"
              className="block px-4 py-2 text-sm font-medium hover:bg-muted rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Promoter
            </Link>
            <Link
              to="/aziende"
              className="block px-4 py-2 text-sm font-medium hover:bg-muted rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Aziende
            </Link>
            <Link
              to="/contacts"
              className="block px-4 py-2 text-sm font-medium hover:bg-muted rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contatti
            </Link>
            <div className="flex flex-col gap-2 px-4 pt-2">
              <Button variant="outline" asChild className="w-full">
                <Link to="/login">Accedi</Link>
              </Button>
              <Button asChild className="w-full bg-gradient-primary">
                <Link to="/register">Registrati</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
