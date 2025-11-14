-- Aggiungi policy per permettere alle aziende di creare inviti
-- Le aziende possono creare applications (inviti) per i loro job
CREATE POLICY "Companies can create invitations for their jobs"
ON applications
FOR INSERT
WITH CHECK (
  is_invitation = true 
  AND EXISTS (
    SELECT 1 FROM jobs 
    WHERE jobs.id = job_id 
    AND jobs.created_by = auth.uid()
  )
);