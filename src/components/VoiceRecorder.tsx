import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Mic, Square } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface VoiceRecorderProps {
  onTranscript: (text: string) => void;
  disabled?: boolean;
}

export const VoiceRecorder = ({ onTranscript, disabled }: VoiceRecorderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const { toast } = useToast();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        await transcribeAudio(audioBlob);
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast({
        title: "Errore",
        description: "Impossibile accedere al microfono",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      try {
        // Ensure the last dataavailable fires
        if (typeof mediaRecorderRef.current.requestData === 'function') {
          mediaRecorderRef.current.requestData();
        }
      } catch (e) {
        console.warn('requestData failed:', e);
      } finally {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
      }
    }
  };

  const transcribeAudio = async (audioBlob: Blob) => {
    setIsProcessing(true);
    try {
      // Guard: avoid sending empty/very short audio
      if (!audioBlob || audioBlob.size < 1024) {
        toast({
          title: "Nessun audio registrato",
          description: "Tieni premuto un po' più a lungo e riprova.",
          variant: "destructive",
        });
        setIsProcessing(false);
        return;
      }

      // Convert blob to base64
      const reader = new FileReader();
      reader.onerror = () => {
        console.error('FileReader error while reading audio blob');
        toast({
          title: "Errore",
          description: "Problema nella lettura dell'audio.",
          variant: "destructive",
        });
        setIsProcessing(false);
      };

      reader.onloadend = async () => {
        const result = reader.result as string | null;
        const base64Audio = result ? result.split(',')[1] : "";

        if (!base64Audio) {
          toast({
            title: "Audio vuoto",
            description: "La registrazione è risultata vuota. Riprova.",
            variant: "destructive",
          });
          setIsProcessing(false);
          return;
        }

        try {
          const { data, error } = await supabase.functions.invoke('transcribe-audio', {
            body: { audio: base64Audio }
          });

          if (error) throw error;
          if (data?.text) {
            onTranscript(data.text);
          }
        } catch (err) {
          console.error('Error transcribing audio:', err);
          toast({
            title: "Errore",
            description: "Impossibile trascrivere l'audio",
            variant: "destructive",
          });
        } finally {
          setIsProcessing(false);
        }
      };

      reader.readAsDataURL(audioBlob);
    } catch (error) {
      console.error('Error preparing transcription:', error);
      toast({
        title: "Errore",
        description: "Impossibile avviare la trascrizione",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  return (
    <Button
      onClick={isRecording ? stopRecording : startRecording}
      disabled={disabled || isProcessing}
      size="icon"
      variant={isRecording ? "destructive" : "outline"}
      className="shrink-0"
    >
      {isProcessing ? (
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      ) : isRecording ? (
        <Square className="h-4 w-4" />
      ) : (
        <Mic className="h-4 w-4" />
      )}
    </Button>
  );
};