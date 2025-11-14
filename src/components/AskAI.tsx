import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Sparkles, Send, Loader2 } from "lucide-react";

interface AskAIProps {
  userType: 'dipendente' | 'azienda';
}

export const AskAI = ({ userType }: AskAIProps) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { user, session } = useAuth();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleAsk = async () => {
    if (!message.trim()) {
      toast({
        title: "Inserisci una domanda",
        description: "Scrivi qualcosa prima di inviare",
        variant: "destructive",
      });
      return;
    }

    if (!user || !session) {
      toast({
        title: "Autenticazione richiesta",
        description: "Devi essere autenticato per usare l'AI",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    const userMessage = message.trim();
    setMessage("");
    
    // Add user message to UI immediately
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

    try {
      const { data, error } = await supabase.functions.invoke('ask-ai', {
        body: { 
          message: userMessage,
          userType,
          conversationId
        },
        headers: {
          Authorization: `Bearer ${session!.access_token}`,
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
        // Remove the user message on error
        setMessages(prev => prev.slice(0, -1));
        setMessage(userMessage);
        setIsLoading(false);
        return;
      }

      if (data && data.response) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
        if (data.conversationId) {
          setConversationId(data.conversationId);
        }
      } else {
        toast({
          title: "Errore",
          description: "Risposta non valida dall'AI.",
          variant: "destructive",
        });
        setMessages(prev => prev.slice(0, -1));
        setMessage(userMessage);
      }
    } catch (error) {
      console.error('Error asking AI:', error);
      toast({
        title: "Errore",
        description: "Non è stato possibile ottenere una risposta. Riprova.",
        variant: "destructive",
      });
      setMessages(prev => prev.slice(0, -1));
      setMessage(userMessage);
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
        
        {messages.length > 0 && (
          <div className="mb-3 max-h-48 overflow-y-auto space-y-2">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-lg text-sm ${
                  msg.role === 'user'
                    ? 'bg-primary/10 ml-8'
                    : 'bg-background/50 mr-8'
                }`}
              >
                <p className="text-xs font-medium mb-1 opacity-70">
                  {msg.role === 'user' ? 'Tu' : 'AI'}
                </p>
                <p className="text-foreground whitespace-pre-wrap">{msg.content}</p>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}

        <div className="flex gap-2">
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
      </CardContent>
    </Card>
  );
};
