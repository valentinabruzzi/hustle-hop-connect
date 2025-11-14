import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export const useExperiences = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: experiences = [], isLoading } = useQuery({
    queryKey: ['experiences', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('experiences')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  const addExperience = useMutation({
    mutationFn: async (experience: any) => {
      if (!user?.id) throw new Error('No user');
      
      const { error } = await supabase
        .from('experiences')
        .insert({ ...experience, user_id: user.id });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['experiences', user?.id] });
    },
  });

  const updateExperience = useMutation({
    mutationFn: async ({ id, ...updates }: any) => {
      const { error } = await supabase
        .from('experiences')
        .update(updates)
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['experiences', user?.id] });
    },
  });

  const deleteExperience = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('experiences')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['experiences', user?.id] });
    },
  });

  return { experiences, isLoading, addExperience, updateExperience, deleteExperience };
};
