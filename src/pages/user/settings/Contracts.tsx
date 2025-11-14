import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowLeft, FileText, Download, Eye } from "lucide-react";

const Contracts = () => {
  const contracts = [
    {
      id: 1,
      title: "Contratto Framework LastMinute.it",
      type: "Framework",
      date: "15 Nov 2024",
      status: "firmato",
      size: "245 KB"
    },
    {
      id: 2,
      title: "Contratto Lavoro - Fashion Week Milano",
      type: "Lavoro Specifico",
      date: "10 Nov 2024",
      status: "firmato",
      size: "182 KB"
    },
    {
      id: 3,
      title: "Contratto Lavoro - Evento Sportivo Roma",
      type: "Lavoro Specifico",
      date: "25 Ott 2024",
      status: "firmato",
      size: "178 KB"
    },
    {
      id: 4,
      title: "Privacy Policy e Termini di Servizio",
      type: "Documentazione",
      date: "15 Nov 2024",
      status: "accettato",
      size: "320 KB"
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <Button variant="ghost" asChild className="mb-6">
            <Link to="/user/settings">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Torna alle Impostazioni
            </Link>
          </Button>

          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle>Contratti e Documentazione</CardTitle>
              <CardDescription>Visualizza e scarica i tuoi contratti firmati</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {contracts.map((contract) => (
                  <div 
                    key={contract.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium mb-1">{contract.title}</h3>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span>{contract.type}</span>
                          <span>•</span>
                          <span>{contract.date}</span>
                          <span>•</span>
                          <span>{contract.size}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        className={
                          contract.status === "firmato" 
                            ? "bg-success text-success-foreground" 
                            : "bg-primary text-primary-foreground"
                        }
                      >
                        {contract.status === "firmato" ? "Firmato" : "Accettato"}
                      </Badge>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        Visualizza
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}

                {contracts.length === 0 && (
                  <div className="text-center py-12">
                    <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <h3 className="text-xl font-semibold mb-2">Nessun contratto</h3>
                    <p className="text-muted-foreground">
                      I tuoi contratti appariranno qui
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contracts;
