import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useUserRole } from "@/hooks/useUserRole";
import { ArrowLeft, Briefcase, Building2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

const SwitchRole = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const { data: currentRole, refetch } = useUserRole();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const isDipendente = currentRole === 'dipendente';
  const isAzienda = currentRole === 'azienda';

  const handleRoleSwitch = async (newRole: 'dipendente' | 'azienda') => {
    if (!user) return;

    setIsLoading(true);
    try {
      // Remove current role if exists
      if (currentRole) {
        const { error: deleteError } = await supabase
          .from('user_roles')
          .delete()
          .eq('user_id', user.id)
          .eq('role', currentRole);

        if (deleteError) throw deleteError;
      }

      // Add new role
      const { error: insertError } = await supabase
        .from('user_roles')
        .insert({
          user_id: user.id,
          role: newRole
        });

      if (insertError) throw insertError;

      // Refetch role and invalidate queries
      await refetch();
      queryClient.invalidateQueries({ queryKey: ['user-role'] });

      toast({
        title: "Ruolo cambiato con successo",
        description: `Ora sei registrato come ${newRole === 'dipendente' ? 'Lavoratore' : 'Azienda'}`,
      });

      // Refresh the page to update UI
      window.location.href = '/user/dashboard';
    } catch (error) {
      console.error('Error switching role:', error);
      toast({
        title: "Errore",
        description: "Non è stato possibile cambiare il ruolo. Riprova.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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

          <Card>
            <CardHeader>
              <CardTitle>Cambia Tipo di Profilo</CardTitle>
              <CardDescription>
                Passa da profilo lavoratore a profilo azienda e viceversa
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Dipendente Card */}
              <Card className={`border-2 transition-all ${isDipendente ? 'border-primary bg-primary/5' : 'border-border'}`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${isDipendente ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                        <Briefcase className="h-6 w-6" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-semibold text-lg">Profilo Lavoratore</h3>
                        <p className="text-sm text-muted-foreground">
                          Cerca e candidati per lavori, gestisci le tue applicazioni e ricevi feedback
                        </p>
                        <ul className="text-sm text-muted-foreground mt-3 space-y-1">
                          <li>• Candidati a offerte di lavoro</li>
                          <li>• Visualizza il tuo calendario lavori</li>
                          <li>• Ricevi notifiche per nuove opportunità</li>
                          <li>• Gestisci il tuo profilo pubblico</li>
                        </ul>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      {isDipendente && (
                        <span className="text-sm font-medium text-primary">Attivo</span>
                      )}
                      <Switch
                        checked={isDipendente}
                        onCheckedChange={(checked) => {
                          if (checked && !isDipendente) {
                            handleRoleSwitch('dipendente');
                          }
                        }}
                        disabled={isLoading || isDipendente}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Azienda Card */}
              <Card className={`border-2 transition-all ${isAzienda ? 'border-primary bg-primary/5' : 'border-border'}`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${isAzienda ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                        <Building2 className="h-6 w-6" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-semibold text-lg">Profilo Azienda</h3>
                        <p className="text-sm text-muted-foreground">
                          Pubblica offerte di lavoro, gestisci candidature e trova talenti
                        </p>
                        <ul className="text-sm text-muted-foreground mt-3 space-y-1">
                          <li>• Pubblica annunci di lavoro</li>
                          <li>• Gestisci candidature ricevute</li>
                          <li>• Cerca e invita lavoratori</li>
                          <li>• Visualizza calendario lavori pubblicati</li>
                        </ul>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      {isAzienda && (
                        <span className="text-sm font-medium text-primary">Attivo</span>
                      )}
                      <Switch
                        checked={isAzienda}
                        onCheckedChange={(checked) => {
                          if (checked && !isAzienda) {
                            handleRoleSwitch('azienda');
                          }
                        }}
                        disabled={isLoading || isAzienda}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">
                  <strong>Nota:</strong> Cambiando tipo di profilo, verrai reindirizzato alla dashboard corrispondente.
                  I tuoi dati personali rimarranno invariati.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SwitchRole;
