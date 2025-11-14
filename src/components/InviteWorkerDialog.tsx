import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useJobs } from '@/hooks/useJobs';
import { useApplications } from '@/hooks/useApplications';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Clock, Calendar } from 'lucide-react';

interface InviteWorkerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  workerId: string;
}

export function InviteWorkerDialog({ isOpen, onClose, workerId }: InviteWorkerDialogProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const { createJob } = useJobs();
  const { createInvitation } = useApplications();
  
  const [requestType, setRequestType] = useState<'now' | 'book'>('now');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    compensation: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    city: '',
    province: '',
    companyName: '',
  });

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

    try {
      // Create the job
      const jobData = {
        title: formData.title,
        description: formData.description,
        compensation: formData.compensation,
        start_date: formData.startDate,
        end_date: formData.endDate,
        duration: `${formData.startTime} - ${formData.endTime}`,
        city: formData.city,
        province: formData.province,
        company_name: formData.companyName,
        type: 'altro' as const,
        urgent: requestType === 'now',
        total_spots: 1,
        created_by: user.id,
      };

      const job = await createJob.mutateAsync(jobData);
      
      // Create the invitation
      await createInvitation.mutateAsync({
        job_id: job.id,
        user_id: workerId,
      });

      toast({
        title: "Invito inviato!",
        description: "Il lavoratore riceverà una notifica del tuo invito",
      });

      onClose();
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        compensation: '',
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
        city: '',
        province: '',
        companyName: '',
      });
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

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label htmlFor="title">Titolo Lavoro *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Es: Hostess per evento"
                required
              />
            </div>

            <div className="col-span-2">
              <Label htmlFor="description">Descrizione *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Descrivi i dettagli del lavoro..."
                rows={4}
                required
              />
            </div>

            <div>
              <Label htmlFor="companyName">Nome Azienda *</Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="compensation">Compenso *</Label>
              <Input
                id="compensation"
                value={formData.compensation}
                onChange={(e) => setFormData({ ...formData, compensation: e.target.value })}
                placeholder="Es: €100/giorno"
                required
              />
            </div>

            <div>
              <Label htmlFor="city">Città *</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="province">Provincia *</Label>
              <Input
                id="province"
                value={formData.province}
                onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                placeholder="Es: MI"
                required
              />
            </div>

            <div>
              <Label htmlFor="startDate">Data Inizio *</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="endDate">Data Fine *</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="startTime">Orario Inizio *</Label>
              <Input
                id="startTime"
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="endTime">Orario Fine *</Label>
              <Input
                id="endTime"
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Annulla
            </Button>
            <Button type="submit" className="flex-1" disabled={createJob.isPending || createInvitation.isPending}>
              {createJob.isPending || createInvitation.isPending ? 'Invio...' : 'Invia Invito'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
