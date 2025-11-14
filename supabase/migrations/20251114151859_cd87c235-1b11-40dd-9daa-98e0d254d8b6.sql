-- Drop the existing job_type enum and recreate with all job types
ALTER TABLE jobs ALTER COLUMN type TYPE text;
DROP TYPE IF EXISTS job_type CASCADE;

-- Create new comprehensive job_type enum
CREATE TYPE job_type AS ENUM (
  'hostess',
  'steward', 
  'promoter',
  'modella',
  'modello',
  'attore',
  'attrice',
  'cantante',
  'musicista',
  'ballerino',
  'ballerina',
  'fotografo',
  'videomaker',
  'grafico',
  'web_designer',
  'programmatore',
  'social_media_manager',
  'copywriter',
  'traduttore',
  'cameriere',
  'barista',
  'cuoco',
  'receptionist',
  'addetto_vendite',
  'magazziniere',
  'autista',
  'rider',
  'baby_sitter',
  'dog_sitter',
  'personal_trainer',
  'estetista',
  'parrucchiere',
  'make_up_artist',
  'interprete',
  'guida_turistica',
  'animatore',
  'dj',
  'altro'
);

-- Convert back to enum type
ALTER TABLE jobs ALTER COLUMN type TYPE job_type USING type::job_type;

-- Update the handle_new_user trigger to support role selection from metadata
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  user_role app_role;
BEGIN
  -- Insert profile
  INSERT INTO public.profiles (id, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name'
  );
  
  -- Get role from metadata, default to dipendente
  user_role := COALESCE(
    (NEW.raw_user_meta_data->>'role')::app_role,
    'dipendente'::app_role
  );
  
  -- Assign role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, user_role);
  
  RETURN NEW;
END;
$function$;