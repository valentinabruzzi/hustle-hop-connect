-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'dipendente', 'azienda');

-- Create enum for job types
CREATE TYPE public.job_type AS ENUM ('hostess', 'steward', 'promoter');

-- Create enum for application status
CREATE TYPE public.application_status AS ENUM ('pending', 'accepted', 'rejected', 'confirmed', 'completed');

-- Create enum for notification types
CREATE TYPE public.notification_type AS ENUM ('job_offer', 'application_status', 'invitation', 'feedback', 'general');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT,
  last_name TEXT,
  city TEXT,
  province TEXT,
  phone TEXT,
  birth_date DATE,
  birth_place TEXT,
  fiscal_code TEXT,
  street TEXT,
  postal_code TEXT,
  country TEXT DEFAULT 'Italia',
  
  -- Physical info
  height INTEGER,
  weight INTEGER,
  size TEXT,
  shoe_size TEXT,
  eye_color TEXT,
  hair_color TEXT,
  hair_length TEXT,
  tattoos BOOLEAN DEFAULT false,
  piercings BOOLEAN DEFAULT false,
  
  -- Additional info
  has_driving_license BOOLEAN DEFAULT false,
  has_own_car BOOLEAN DEFAULT false,
  available_for_travel BOOLEAN DEFAULT false,
  
  -- Bio
  bio TEXT,
  
  -- Social media
  instagram TEXT,
  facebook TEXT,
  tiktok TEXT,
  linkedin TEXT,
  
  -- Payment info
  iban TEXT,
  account_holder TEXT,
  bank_name TEXT,
  swift_bic TEXT,
  
  -- Profile settings
  profile_active BOOLEAN DEFAULT true,
  avatar_url TEXT,
  
  -- Notification settings
  email_notifications BOOLEAN DEFAULT true,
  push_notifications BOOLEAN DEFAULT true,
  notify_new_jobs BOOLEAN DEFAULT true,
  notify_applications BOOLEAN DEFAULT true,
  notify_invitations BOOLEAN DEFAULT true,
  notify_feedback BOOLEAN DEFAULT true,
  job_search_radius INTEGER DEFAULT 50,
  
  -- Rating
  average_rating DECIMAL(2,1) DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  completed_jobs INTEGER DEFAULT 0,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create user_roles table (separate for security)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE(user_id, role)
);

-- Create experiences table
CREATE TABLE public.experiences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  period TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create languages table
CREATE TABLE public.languages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  level TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create certifications table
CREATE TABLE public.certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create documents table
CREATE TABLE public.documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  uploaded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create contracts table
CREATE TABLE public.contracts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  file_url TEXT,
  signed BOOLEAN DEFAULT false,
  signed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create jobs table
CREATE TABLE public.jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  title TEXT NOT NULL,
  type job_type NOT NULL,
  city TEXT NOT NULL,
  province TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  duration TEXT NOT NULL,
  compensation TEXT NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT,
  dress_code TEXT,
  benefits TEXT,
  urgent BOOLEAN DEFAULT false,
  total_spots INTEGER NOT NULL,
  filled_spots INTEGER DEFAULT 0,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create applications table
CREATE TABLE public.applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID REFERENCES public.jobs(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  status application_status DEFAULT 'pending',
  is_invitation BOOLEAN DEFAULT false,
  message TEXT,
  applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(job_id, user_id)
);

-- Create feedbacks table
CREATE TABLE public.feedbacks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID REFERENCES public.jobs(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  company_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create notifications table
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  type notification_type NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  link TEXT,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create gallery photos table
CREATE TABLE public.gallery_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  photo_url TEXT NOT NULL,
  is_profile_picture BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) 
VALUES 
  ('avatars', 'avatars', true),
  ('gallery', 'gallery', true),
  ('documents', 'documents', false);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.languages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedbacks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_photos ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS Policies for profiles
CREATE POLICY "Profiles are viewable by everyone" 
  ON public.profiles FOR SELECT 
  USING (profile_active = true OR auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
  ON public.profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- RLS Policies for user_roles
CREATE POLICY "User roles are viewable by the user" 
  ON public.user_roles FOR SELECT 
  USING (auth.uid() = user_id);

-- RLS Policies for experiences
CREATE POLICY "Experiences are viewable by everyone" 
  ON public.experiences FOR SELECT 
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = experiences.user_id AND profile_active = true)
    OR auth.uid() = user_id
  );

CREATE POLICY "Users can manage their own experiences" 
  ON public.experiences FOR ALL 
  USING (auth.uid() = user_id);

-- RLS Policies for languages
CREATE POLICY "Languages are viewable by everyone" 
  ON public.languages FOR SELECT 
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = languages.user_id AND profile_active = true)
    OR auth.uid() = user_id
  );

CREATE POLICY "Users can manage their own languages" 
  ON public.languages FOR ALL 
  USING (auth.uid() = user_id);

-- RLS Policies for certifications
CREATE POLICY "Certifications are viewable by everyone" 
  ON public.certifications FOR SELECT 
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = certifications.user_id AND profile_active = true)
    OR auth.uid() = user_id
  );

CREATE POLICY "Users can manage their own certifications" 
  ON public.certifications FOR ALL 
  USING (auth.uid() = user_id);

-- RLS Policies for documents
CREATE POLICY "Users can view their own documents" 
  ON public.documents FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own documents" 
  ON public.documents FOR ALL 
  USING (auth.uid() = user_id);

-- RLS Policies for contracts
CREATE POLICY "Users can view their own contracts" 
  ON public.contracts FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own contracts" 
  ON public.contracts FOR UPDATE 
  USING (auth.uid() = user_id);

-- RLS Policies for jobs
CREATE POLICY "Jobs are viewable by everyone" 
  ON public.jobs FOR SELECT 
  USING (true);

CREATE POLICY "Companies can create jobs" 
  ON public.jobs FOR INSERT 
  WITH CHECK (public.has_role(auth.uid(), 'azienda'));

CREATE POLICY "Companies can update their own jobs" 
  ON public.jobs FOR UPDATE 
  USING (auth.uid() = created_by);

-- RLS Policies for applications
CREATE POLICY "Users can view their own applications" 
  ON public.applications FOR SELECT 
  USING (auth.uid() = user_id OR auth.uid() IN (SELECT created_by FROM public.jobs WHERE id = job_id));

CREATE POLICY "Users can create applications" 
  ON public.applications FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own applications" 
  ON public.applications FOR UPDATE 
  USING (auth.uid() = user_id OR auth.uid() IN (SELECT created_by FROM public.jobs WHERE id = job_id));

-- RLS Policies for feedbacks
CREATE POLICY "Feedbacks are viewable by related users" 
  ON public.feedbacks FOR SELECT 
  USING (auth.uid() = user_id OR auth.uid() = company_id);

CREATE POLICY "Companies can create feedbacks" 
  ON public.feedbacks FOR INSERT 
  WITH CHECK (auth.uid() = company_id);

-- RLS Policies for notifications
CREATE POLICY "Users can view their own notifications" 
  ON public.notifications FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications" 
  ON public.notifications FOR UPDATE 
  USING (auth.uid() = user_id);

-- RLS Policies for gallery_photos
CREATE POLICY "Gallery photos are viewable by everyone if profile is active" 
  ON public.gallery_photos FOR SELECT 
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = gallery_photos.user_id AND profile_active = true)
    OR auth.uid() = user_id
  );

CREATE POLICY "Users can manage their own gallery photos" 
  ON public.gallery_photos FOR ALL 
  USING (auth.uid() = user_id);

-- Storage policies for avatars
CREATE POLICY "Avatar images are publicly accessible" 
  ON storage.objects FOR SELECT 
  USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar" 
  ON storage.objects FOR INSERT 
  WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own avatar" 
  ON storage.objects FOR UPDATE 
  USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own avatar" 
  ON storage.objects FOR DELETE 
  USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Storage policies for gallery
CREATE POLICY "Gallery images are publicly accessible" 
  ON storage.objects FOR SELECT 
  USING (bucket_id = 'gallery');

CREATE POLICY "Users can upload to their own gallery" 
  ON storage.objects FOR INSERT 
  WITH CHECK (bucket_id = 'gallery' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own gallery" 
  ON storage.objects FOR UPDATE 
  USING (bucket_id = 'gallery' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete from their own gallery" 
  ON storage.objects FOR DELETE 
  USING (bucket_id = 'gallery' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Storage policies for documents
CREATE POLICY "Users can view their own documents" 
  ON storage.objects FOR SELECT 
  USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can upload their own documents" 
  ON storage.objects FOR INSERT 
  WITH CHECK (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own documents" 
  ON storage.objects FOR UPDATE 
  USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own documents" 
  ON storage.objects FOR DELETE 
  USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_experiences_updated_at BEFORE UPDATE ON public.experiences
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_jobs_updated_at BEFORE UPDATE ON public.jobs
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_applications_updated_at BEFORE UPDATE ON public.applications
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name'
  );
  
  -- Assign default role as dipendente
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'dipendente');
  
  RETURN NEW;
END;
$$;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();