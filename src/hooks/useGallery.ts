import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export const useGallery = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: photos, isLoading } = useQuery({
    queryKey: ['gallery', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('gallery_photos')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  const uploadPhoto = useMutation({
    mutationFn: async (file: File) => {
      if (!user?.id) throw new Error('No user');
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('gallery')
        .upload(fileName, file);
      
      if (uploadError) throw uploadError;
      
      const { data: { publicUrl } } = supabase.storage
        .from('gallery')
        .getPublicUrl(fileName);
      
      const { error: dbError } = await supabase
        .from('gallery_photos')
        .insert({
          user_id: user.id,
          photo_url: publicUrl,
        });
      
      if (dbError) throw dbError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery', user?.id] });
    },
  });

  const deletePhoto = useMutation({
    mutationFn: async (photoId: string) => {
      const photo = photos?.find(p => p.id === photoId);
      if (!photo) throw new Error('Photo not found');
      
      const fileName = photo.photo_url.split('/').slice(-2).join('/');
      
      const { error: storageError } = await supabase.storage
        .from('gallery')
        .remove([fileName]);
      
      if (storageError) throw storageError;
      
      const { error: dbError } = await supabase
        .from('gallery_photos')
        .delete()
        .eq('id', photoId);
      
      if (dbError) throw dbError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery', user?.id] });
    },
  });

  const setProfilePicture = useMutation({
    mutationFn: async (photoId: string) => {
      if (!user?.id) throw new Error('No user');
      
      await supabase
        .from('gallery_photos')
        .update({ is_profile_picture: false })
        .eq('user_id', user.id);
      
      const { error } = await supabase
        .from('gallery_photos')
        .update({ is_profile_picture: true })
        .eq('id', photoId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['profile', user?.id] });
    },
  });

  return { 
    photos: photos || [], 
    isLoading, 
    uploadPhoto, 
    deletePhoto, 
    setProfilePicture 
  };
};
