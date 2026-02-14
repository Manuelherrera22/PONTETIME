-- Insert bucket if not exists
insert into storage.buckets (id, name, public)
values ('watches', 'watches', true)
on conflict (id) do nothing;

-- Enable RLS
alter table storage.objects enable row level security;

-- Allow public access to view images
create policy "Public Select"
on storage.objects for select
using ( bucket_id = 'watches' );

-- Allow public access to upload images (Required for migration script without Service Role)
create policy "Public Insert"
on storage.objects for insert
with check ( bucket_id = 'watches' );

-- Allow public access to update images
create policy "Public Update"
on storage.objects for update
using ( bucket_id = 'watches' );
