-- Allow users to manage their own roles (dipendente and azienda only)
CREATE POLICY "Users can add dipendente or azienda role"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = user_id 
  AND role IN ('dipendente', 'azienda')
);

CREATE POLICY "Users can remove their own roles"
ON public.user_roles
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);