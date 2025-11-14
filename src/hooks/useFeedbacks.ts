import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export const useFeedbacks = () => {
  const { user } = useAuth();

  const { data: feedbacks = [], isLoading } = useQuery({
    queryKey: ['feedbacks', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('feedbacks')
        .select(`
          *,
          jobs (title, company_name),
          company:company_id (first_name, last_name)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  const averageRating = feedbacks.length > 0
    ? (feedbacks.reduce((sum: number, f: any) => sum + f.rating, 0) / feedbacks.length).toFixed(1)
    : '0.0';

  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: feedbacks.filter((f: any) => f.rating === rating).length,
    percentage: feedbacks.length > 0
      ? ((feedbacks.filter((f: any) => f.rating === rating).length / feedbacks.length) * 100).toFixed(0)
      : '0'
  }));

  return { feedbacks, isLoading, averageRating, ratingDistribution, totalReviews: feedbacks.length };
};
