import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export const useApplications = (status?: string) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: applications = [], isLoading } = useQuery({
    queryKey: ['applications', user?.id, status],
    queryFn: async () => {
      if (!user?.id) return [];
      
      let query = supabase
        .from('applications')
        .select(`
          *,
          jobs (*)
        `)
        .eq('user_id', user.id);
      
      if (status === 'sended') {
        query = query.eq('status', 'pending').eq('is_invitation', false);
      } else if (status === 'fastbooks') {
        query = query.eq('is_invitation', true).in('status', ['pending', 'accepted']);
      } else if (status === 'confirmed') {
        query = query.eq('status', 'confirmed');
      } else if (status === 'closed') {
        query = query.eq('status', 'completed');
      }
      
      const { data, error } = await query.order('applied_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  const applyToJob = useMutation({
    mutationFn: async (jobId: string) => {
      if (!user?.id) throw new Error('No user');
      
      const { error } = await supabase
        .from('applications')
        .insert({
          job_id: jobId,
          user_id: user.id,
          status: 'pending',
          is_invitation: false,
        });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications', user?.id] });
    },
  });

  const updateApplication = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: 'pending' | 'accepted' | 'rejected' | 'confirmed' | 'completed' }) => {
      const { error } = await supabase
        .from('applications')
        .update({ status })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications', user?.id] });
    },
  });

  return { applications, isLoading, applyToJob, updateApplication };
};
