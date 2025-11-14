import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useProfiles = (filters?: { 
  city?: string; 
  minRating?: number;
  availableForTravel?: boolean;
}) => {
  return useQuery({
    queryKey: ['profiles', filters],
    queryFn: async () => {
      let query = supabase
        .from('profiles')
        .select(`
          *,
          experiences (
            id,
            title,
            company,
            period
          )
        `)
        .eq('profile_active', true)
        .order('average_rating', { ascending: false });
      
      if (filters?.city) {
        query = query.eq('city', filters.city);
      }
      
      if (filters?.minRating !== undefined && filters.minRating > 0) {
        query = query.gte('average_rating', filters.minRating);
      }
      
      if (filters?.availableForTravel !== undefined) {
        query = query.eq('available_for_travel', filters.availableForTravel);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data;
    },
  });
};

export const useProfile = (profileId: string | undefined) => {
  return useQuery({
    queryKey: ['profile', profileId],
    queryFn: async () => {
      if (!profileId) return null;
      
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          *,
          experiences (
            id,
            title,
            company,
            period,
            description
          ),
          languages (
            id,
            name,
            level
          ),
          certifications (
            id,
            name
          )
        `)
        .eq('id', profileId)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!profileId,
  });
};
