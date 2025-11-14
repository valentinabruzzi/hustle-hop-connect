import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ForgotPassword = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast({
      title: "Email inviata!",
      description: "Controlla la tua casella email per le istruzioni.",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 font-bold text-2xl mb-4">
            <Briefcase className="h-8 w-8 text-primary" />
            <span className="bg-gradient-primary bg-clip-text text-transparent">LastMinute.it</span>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Password Dimenticata?</CardTitle>
            <CardDescription>
              Inserisci la tua email per ricevere le istruzioni
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="nome@esempio.it"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-gradient-primary">
                  Invia Email di Reset
                </Button>
              </form>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Email Inviata!</h3>
                <p className="text-muted-foreground mb-4">
                  Abbiamo inviato le istruzioni per reimpostare la password all'indirizzo {email}
                </p>
                <p className="text-sm text-muted-foreground">
                  Non hai ricevuto l'email? Controlla la cartella spam o{" "}
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="text-primary hover:underline"
                  >
                    riprova
                  </button>
                </p>
              </div>
            )}

            <div className="mt-6 text-center">
              <Link to="/login" className="text-sm text-primary flex items-center justify-center gap-2 hover:underline">
                <ArrowLeft className="h-4 w-4" />
                Torna al Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
