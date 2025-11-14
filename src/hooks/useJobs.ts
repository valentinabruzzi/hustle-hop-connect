import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useJobs = (filters?: { city?: string; dateFrom?: string; dateTo?: string; role?: string }) => {
  return useQuery({
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
