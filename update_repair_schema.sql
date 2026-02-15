-- Create storage bucket for repair photos if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('repair-photos', 'repair-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Policy to allow anyone to upload to repair-photos (for now, or authenticated)
-- Better: Allow public uploads if we don't force login for repairs, or auth only.
-- Let's assume public for the "Request" flow, or specific folder.
CREATE POLICY "Public Uploads" 
ON storage.objects FOR INSERT 
WITH CHECK ( bucket_id = 'repair-photos' );

CREATE POLICY "Public Select"
ON storage.objects FOR SELECT
USING ( bucket_id = 'repair-photos' );

-- Add photo_urls column to repair_requests if it doesn't exist
ALTER TABLE repair_requests 
ADD COLUMN IF NOT EXISTS photo_urls text[] DEFAULT '{}';

-- Check if it worked
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'repair_requests';
