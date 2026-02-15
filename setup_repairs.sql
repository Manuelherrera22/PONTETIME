-- Create repair_requests table
CREATE TABLE IF NOT EXISTS public.repair_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    brand TEXT NOT NULL,
    model TEXT,
    reference_number TEXT,
    serial_number TEXT, -- Optional for security
    issue_description TEXT NOT NULL,
    service_type TEXT,
    status TEXT DEFAULT 'pending_kit', -- pending_kit, kit_sent, received, in_progress, completed, shipped_back
    shipping_address JSONB NOT NULL,
    contact_email TEXT NOT NULL,
    contact_phone TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.repair_requests ENABLE ROW LEVEL SECURITY;

-- Policy: Users can see their own requests
CREATE POLICY "Users can view own repair requests"
ON public.repair_requests
FOR SELECT
USING (auth.uid() = user_id);

-- Policy: Anyone can insert (for guest checkout flow, though user_id will be null)
-- If we want to force login, we can change this.
CREATE POLICY "Anyone can create repair requests"
ON public.repair_requests
FOR INSERT
WITH CHECK (true);

-- Policy: Service Role (Admin) has full access (Default in Supabase)
