import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Upload, FileText, CheckCircle, AlertCircle, X } from "lucide-react";

const Documents = () => {
  const { toast } = useToast();
  const [documents, setDocuments] = useState([
    { id: 1, type: "Carta d'Identità", filename: "carta_identita.pdf", status: "verified", uploadDate: "15 Nov 2024" },
    { id: 2, type: "Codice Fiscale", filename: "codice_fiscale.pdf", status: "verified", uploadDate: "15 Nov 2024" },
  ]);

  const documentTypes = [
    { id: "id_card", name: "Carta d'Identità", required: true },
    { id: "fiscal_code", name: "Codice Fiscale", required: true },
    { id: "passport", name: "Passaporto", required: false },
    { id: "residence", name: "Certificato di Residenza", required: false },
  ];

  const handleRemove = (id: number) => {
    setDocuments(documents.filter(doc => doc.id !== id));
    toast({
      title: "Documento rimosso",
      description: "Il documento è stato eliminato.",
    });
  };

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
              <CardTitle>Documenti</CardTitle>
              <CardDescription>Gestisci i tuoi documenti di identità</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Upload Area */}
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm font-medium mb-2">Carica un nuovo documento</p>
                <p className="text-xs text-muted-foreground mb-4">
                  PDF, JPG, PNG fino a 10MB
                </p>
                <Button variant="outline">Seleziona File</Button>
              </div>

              {/* Document Types */}
              <div>
                <h3 className="font-semibold mb-4">Documenti Richiesti</h3>
                <div className="space-y-3">
                  {documentTypes.map((docType) => {
                    const uploaded = documents.find(d => d.type === docType.name);
                    return (
                      <div key={docType.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{docType.name}</p>
                            {docType.required && (
                              <p className="text-xs text-muted-foreground">Obbligatorio</p>
                            )}
                          </div>
                        </div>
                        {uploaded ? (
                          <Badge className="bg-success text-success-foreground">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Caricato
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="border-warning text-warning">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            Da caricare
                          </Badge>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Uploaded Documents */}
              {documents.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-4">Documenti Caricati</h3>
                  <div className="space-y-3">
                    {documents.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">{doc.type}</p>
                            <p className="text-xs text-muted-foreground">
                              {doc.filename} • Caricato il {doc.uploadDate}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {doc.status === "verified" && (
                            <Badge className="bg-success text-success-foreground">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Verificato
                            </Badge>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRemove(doc.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Documents;
