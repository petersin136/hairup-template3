-- ============================================================
-- Storage bucket (DB SQL과 별개 — 이 파일을 따로 실행하세요)
-- Supabase Dashboard → SQL Editor → New query → Run
-- ============================================================

-- 1) Public 버킷 생성
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'site-assets',
  'site-assets',
  true,
  10485760, -- 10MB
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- 2) Public read
drop policy if exists "Public read site-assets" on storage.objects;
create policy "Public read site-assets"
on storage.objects
for select
to public
using (bucket_id = 'site-assets');

-- 3) Authenticated upload/update/delete (대시보드 로그인 계정용)
--    대시보드에서 파일 올리면 보통 service role이라 정책 없이도 되지만,
--    클라이언트 업로드를 쓸 경우를 대비해 둡니다.
drop policy if exists "Auth upload site-assets" on storage.objects;
create policy "Auth upload site-assets"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'site-assets');

drop policy if exists "Auth update site-assets" on storage.objects;
create policy "Auth update site-assets"
on storage.objects
for update
to authenticated
using (bucket_id = 'site-assets')
with check (bucket_id = 'site-assets');

drop policy if exists "Auth delete site-assets" on storage.objects;
create policy "Auth delete site-assets"
on storage.objects
for delete
to authenticated
using (bucket_id = 'site-assets');
