ALTER TABLE repair_requests 
ADD COLUMN IF NOT EXISTS photo_urls text[] DEFAULT '{}';
