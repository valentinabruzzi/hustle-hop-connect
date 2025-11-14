import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useApplications } from '@/hooks/useApplications';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Clock, Calendar } from 'lucide-react';

interface InviteWorkerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  workerId: string;
}

export function InviteWorkerDialog({ isOpen, onClose, workerId }: InviteWorkerDialogProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const { createInvitation } = useApplications();
  
  const [requestType, setRequestType] = useState<'now' | 'book'>('now');
  const [selectedJobId, setSelectedJobId] = useState<string>('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [jobs, setJobs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && user?.id) {
      fetchJobs();
    }
  }, [isOpen, user?.id]);

  const fetchJobs = async () => {
    if (!user?.id) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('created_by', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setJobs(data || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast({
        title: "Errore",
        description: "Impossibile caricare i lavori",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user?.id) {
      toast({
        title: "Errore",
        description: "Devi essere autenticato per inviare inviti",
        variant: "destructive",
      });
      return;
    }

    if (!selectedJobId) {
      toast({
        title: "Errore",
        description: "Seleziona un lavoro",
        variant: "destructive",
      });
      return;
    }

    if (requestType === 'book' && (!startDate || !startTime)) {
      toast({
        title: "Errore",
        description: "Inserisci data e ora di inizio",
        variant: "destructive",
      });
      return;
    }

    try {
      await createInvitation.mutateAsync({
        job_id: selectedJobId,
        user_id: workerId,
      });

      toast({
        title: "Invito inviato!",
        description: "Il lavoratore riceverà una notifica del tuo invito",
      });

      onClose();
      setSelectedJobId('');
      setStartDate('');
      setStartTime('');
      setRequestType('now');
    } catch (error) {
      console.error('Error creating invitation:', error);
      toast({
        title: "Errore",
        description: "Impossibile inviare l'invito. Riprova.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Invita Lavoratore</DialogTitle>
          <DialogDescription>
            Scegli se richiedere il lavoratore ora o prenotare per una data specifica
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <Label>Tipo di Richiesta</Label>
            <RadioGroup value={requestType} onValueChange={(value) => setRequestType(value as 'now' | 'book')}>
              <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-accent">
                <RadioGroupItem value="now" id="now" />
                <Label htmlFor="now" className="flex items-center gap-2 cursor-pointer flex-1">
                  <Clock className="w-5 h-5" />
                  <div>
                    <div className="font-semibold">Richiedi ORA</div>
                    <div className="text-sm text-muted-foreground">Necessità urgente</div>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-accent">
                <RadioGroupItem value="book" id="book" />
                <Label htmlFor="book" className="flex items-center gap-2 cursor-pointer flex-1">
                  <Calendar className="w-5 h-5" />
                  <div>
                    <div className="font-semibold">Prenota</div>
                    <div className="text-sm text-muted-foreground">Pianifica per una data specifica</div>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="job">Seleziona Lavoro *</Label>
              <Select value={selectedJobId} onValueChange={setSelectedJobId} disabled={isLoading}>
                <SelectTrigger>
                  <SelectValue placeholder={isLoading ? "Caricamento..." : "Scegli un lavoro"} />
                </SelectTrigger>
                <SelectContent>
                  {jobs.map((job) => (
                    <SelectItem key={job.id} value={job.id}>
                      {job.title} - {job.city} ({new Date(job.start_date).toLocaleDateString('it-IT')})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {requestType === 'book' && (
              <>
                <div>
                  <Label htmlFor="startDate">Data Inizio *</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="startTime">Ora Inizio *</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required
                  />
                </div>
              </>
            )}
          </div>

          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Annulla
            </Button>
            <Button type="submit" className="flex-1" disabled={createInvitation.isPending || isLoading}>
              {createInvitation.isPending ? 'Invio...' : 'Invia Invito'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
