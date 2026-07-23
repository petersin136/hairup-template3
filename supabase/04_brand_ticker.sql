-- Brand ticker logos (matches live DB: is_visible)

create table if not exists brand_logos (
  id bigint generated always as identity primary key,
  name text not null,
  image_path text not null,
  sort_order int not null default 0,
  is_visible boolean not null default true
);

-- migrate legacy column name if present
do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_name = 'brand_logos' and column_name = 'is_active'
  ) and not exists (
    select 1 from information_schema.columns
    where table_name = 'brand_logos' and column_name = 'is_visible'
  ) then
    alter table brand_logos rename column is_active to is_visible;
  end if;
end $$;

alter table brand_logos enable row level security;

drop policy if exists "Public read brand_logos" on brand_logos;
create policy "Public read brand_logos"
  on brand_logos for select
  using (true);

delete from brand_logos;

insert into brand_logos (name, image_path, sort_order, is_visible) values
  ('Aveda', 'brands/aveda.svg', 1, true),
  ('Kérastase', 'brands/kerastase.svg', 2, true),
  ('Shiseido', 'brands/shiseido.svg', 3, true),
  ('Olaplex', 'brands/olaplex.svg', 4, true),
  ('Moroccanoil', 'brands/moroccanoil.svg', 5, true);
