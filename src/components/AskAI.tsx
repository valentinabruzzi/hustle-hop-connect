import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, Send, Loader2 } from "lucide-react";

interface AskAIProps {
  userType: 'dipendente' | 'azienda';
}

export const AskAI = ({ userType }: AskAIProps) => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAsk = async () => {
    if (!message.trim()) {
      toast({
        title: "Inserisci una domanda",
        description: "Scrivi qualcosa prima di inviare",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setResponse("");

    try {
      const { data, error } = await supabase.functions.invoke('ask-ai', {
        body: { 
          message: message.trim(),
          userType 
        }
      });

      if (error) {
        console.error('Edge function error:', error);
        if (error.message?.includes('429')) {
          toast({
            title: "Troppe richieste",
            description: "Hai superato il limite. Riprova tra qualche minuto.",
            variant: "destructive",
          });
        } else if (error.message?.includes('402')) {
          toast({
            title: "Crediti esauriti",
            description: "Contatta il supporto per aggiungere crediti.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Errore",
            description: error.message || "Non è stato possibile ottenere una risposta.",
            variant: "destructive",
          });
        }
        setIsLoading(false);
        return;
      }

      if (data && data.response) {
        setResponse(data.response);
        setMessage("");
      } else {
        toast({
          title: "Errore",
          description: "Risposta non valida dall'AI.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error asking AI:', error);
      toast({
        title: "Errore",
        description: "Non è stato possibile ottenere una risposta. Riprova.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAsk();
    }
  };

  const placeholderText = userType === 'azienda'
    ? "chiedi all'ai come trovare i migliori candidati..."
    : "chiedi all'ai come trovare lavoro...";

  return (
    <Card className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border-primary/20">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">ask to ai</span>
        </div>
        
        <div className="flex gap-2 mb-3">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholderText}
            disabled={isLoading}
            className="flex-1 text-sm"
          />
          <Button 
            onClick={handleAsk} 
            disabled={isLoading || !message.trim()}
            size="sm"
            className="px-3"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>

        {response && (
          <div className="mt-3 p-3 bg-background/50 rounded-lg border border-border">
            <p className="text-sm text-foreground whitespace-pre-wrap">{response}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
