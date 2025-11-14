import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type JobInsert = Database['public']['Tables']['jobs']['Insert'];

export const useJobs = (filters?: { city?: string; dateFrom?: string; dateTo?: string; role?: string }) => {
  const queryClient = useQueryClient();

  const createJob = useMutation({
    mutationFn: async (jobData: JobInsert) => {
      const { data, error } = await supabase
        .from('jobs')
        .insert(jobData)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: ['company-jobs'] });
    },
  });

  const jobsQuery = useQuery({
    queryKey: ['jobs', filters],
    queryFn: async () => {
      let query = supabase
        .from('jobs')
        .select('*')
        .order('urgent', { ascending: false })
        .order('created_at', { ascending: false });
      
      if (filters?.city) {
        query = query.eq('city', filters.city);
      }
      if (filters?.dateFrom) {
        query = query.gte('start_date', filters.dateFrom);
      }
      if (filters?.dateTo) {
        query = query.lte('end_date', filters.dateTo);
      }
      if (filters?.role && filters.role !== 'all') {
        query = query.eq('type', filters.role as 'hostess' | 'steward' | 'promoter');
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data;
    },
  });

  return { ...jobsQuery, createJob };
};

export const useJob = (jobId: string | undefined) => {
  return useQuery({
    queryKey: ['job', jobId],
    queryFn: async () => {
      if (!jobId) return null;
      
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', jobId)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!jobId,
  });
};
