-- Brand ticker logos (run in Supabase SQL Editor)

create table if not exists brand_logos (
  id bigint generated always as identity primary key,
  name text not null,
  image_path text not null,
  sort_order int not null default 0,
  is_active boolean not null default true
);

alter table brand_logos enable row level security;

drop policy if exists "Public read brand_logos" on brand_logos;
create policy "Public read brand_logos"
  on brand_logos for select
  using (true);

delete from brand_logos;

insert into brand_logos (name, image_path, sort_order, is_active) values
  ('Aveda', 'brands/aveda.png', 1, true),
  ('Kérastase', 'brands/kerastase.png', 2, true),
  ('Shiseido', 'brands/shiseido.png', 3, true),
  ('Olaplex', 'brands/olaplex.png', 4, true),
  ('Moroccanoil', 'brands/moroccanoil.png', 5, true);
