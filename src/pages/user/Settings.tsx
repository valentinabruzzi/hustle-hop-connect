import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft,
  User,
  Image,
  Bell,
  Share2,
  FileText,
  Ruler,
  Info,
  Mail,
  Lock,
  Phone,
  MapPin,
  FileCheck,
  FileSignature,
  UserX,
  CreditCard,
  ChevronRight,
  RefreshCw
} from "lucide-react";

const Settings = () => {
  const settingsSections = [
    {
      title: "Informazioni Personali",
      items: [
        {
          icon: User,
          title: "Dati Personali",
          description: "Nome, cognome, data di nascita",
          link: "/user/settings/edit-personal-data"
        },
        {
          icon: Image,
          title: "Foto e Gallery",
          description: "Gestisci le tue foto profilo",
          link: "/user/settings/edit-gallery"
        },
        {
          icon: FileText,
          title: "Bio & Esperienze",
          description: "Racconta la tua storia professionale",
          link: "/user/settings/edit-bio-and-experiences"
        },
      ]
    },
    {
      title: "Dettagli Professionali",
      items: [
        {
          icon: Ruler,
          title: "Dati Fisici",
          description: "Altezza, taglia, misure",
          link: "/user/settings/edit-physical-info"
        },
        {
          icon: Info,
          title: "Altre Informazioni",
          description: "Patente, lingue, disponibilità",
          link: "/user/settings/edit-more-informations"
        },
        {
          icon: Share2,
          title: "Social Media",
          description: "Instagram, LinkedIn, Facebook",
          link: "/user/settings/edit-social-info"
        },
      ]
    },
    {
      title: "Account & Sicurezza",
      items: [
        {
          icon: Mail,
          title: "Indirizzo Email",
          description: "Modifica la tua email",
          link: "/user/settings/change-email-address"
        },
        {
          icon: Lock,
          title: "Password",
          description: "Cambia la tua password",
          link: "/user/settings/change-password"
        },
        {
          icon: Phone,
          title: "Numero di Telefono",
          description: "Aggiorna il tuo numero",
          link: "/user/settings/edit-phone"
        },
        {
          icon: MapPin,
          title: "Indirizzo",
          description: "Indirizzo di residenza",
          link: "/user/settings/edit-address"
        },
      ]
    },
    {
      title: "Documenti & Pagamenti",
      items: [
        {
          icon: FileCheck,
          title: "Documenti",
          description: "Carica documenti di identità",
          link: "/user/settings/edit-documents"
        },
        {
          icon: FileSignature,
          title: "Contratti",
          description: "Visualizza e scarica contratti",
          link: "/user/settings/edit-contracts"
        },
        {
          icon: CreditCard,
          title: "Metodo di Pagamento",
          description: "IBAN e coordinate bancarie",
          link: "/user/settings/payment-info"
        },
      ]
    },
    {
      title: "Preferenze",
      items: [
        {
          icon: RefreshCw,
          title: "Cambia Tipo di Profilo",
          description: "Passa da lavoratore ad azienda",
          link: "/user/settings/switch-role"
        },
        {
          icon: Bell,
          title: "Notifiche",
          description: "Gestisci le notifiche dell'app",
          link: "/user/settings/edit-notifications"
        },
        {
          icon: UserX,
          title: "Disattiva Profilo",
          description: "Rendi il profilo non visibile",
          link: "/user/settings/disable-profile"
        },
      ]
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <Button variant="ghost" asChild className="mb-6">
            <Link to="/user/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Torna alla Dashboard
            </Link>
          </Button>

          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Impostazioni Profilo</h1>
            <p className="text-muted-foreground">
              Gestisci le tue informazioni personali e le preferenze del tuo account
            </p>
          </div>

          <div className="max-w-4xl space-y-6">
            {settingsSections.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
                <Card>
                  <CardContent className="p-0">
                    {section.items.map((item, itemIndex) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={itemIndex}
                          to={item.link}
                          className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors border-b border-border last:border-b-0"
                        >
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold">{item.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {item.description}
                            </p>
                          </div>
                          <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                        </Link>
                      );
                    })}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Settings;
