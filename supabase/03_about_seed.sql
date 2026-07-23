-- About section schema extensions + seed
-- Run in Supabase SQL Editor if columns missing

alter table about_section
  add column if not exists subtitle text,
  add column if not exists title_line1 text,
  add column if not exists title_line2 text;

alter table about_stats
  add column if not exists description text;

-- Clear & seed
delete from about_media;
delete from about_stats;
delete from about_section;

insert into about_section (
  status, eyebrow, title, title_line1, title_line2, subtitle, body
) values (
  'published',
  'ABOUT HAIR UP',
  'Where Your True Beauty Elevates.',
  'Where Your',
  'True Beauty Elevates.',
  '감각적인 변화가 시작되는 곳, HAIR UP STUDIO',
  E'헤어 업은 단순한 헤어 시술을 넘어, 당신이 가진 고유의 분위기와 아름다움을 가장 정점으로 끌어올리는 공간입니다.\n\n정형화된 트렌드를 똑같이 쫓아가지 않고, 개인의 두상과 모질, 라이프스타일까지 섬세하게 분석하여 가장 나다운 스타일을 제안합니다.\n\n아늑하고 감각적인 인테리어 속에서 일상의 피로를 잠시 내려놓으세요. 헤어업을 나서는 순간, 한층 더 빛나는 나를 마주하게 될 것입니다. 당신의 소중한 일상에 특별한 변화의 가치를 더해드립니다.'
);

with a as (select id from about_section order by id desc limit 1)
insert into about_stats (about_id, value, label, description, sort_order)
select a.id, v.value, v.label, v.description, v.sort_order
from a,
(values
  ('10+', 'Years Of Experience', '10년 이상의 풍부한 실무 경험을 가진 베테랑 디자이너들이 상주합니다.', 1),
  ('1500+', 'Personal Styling', '트렌디한 감각으로 완성한 맞춤형 퍼스널 헤어 디자인 건수입니다.', 2),
  ('100%', 'Premium Products', '모발과 두피 손상을 최소화하는 검증된 프리미엄 정품만을 사용합니다.', 3),
  ('4.9', 'Satisfied Reviews', '꼼꼼한 시술과 세심한 서비스로 증명하는 실제 방문 고객만족도 평점입니다.', 4)
) as v(value, label, description, sort_order);

with a as (select id from about_section order by id desc limit 1)
insert into about_media (about_id, image_path, sort_order)
select a.id, v.path, v.sort_order
from a,
(values
  ('about/interior.jpg', 1),
  ('about/portrait.jpg', 2)
) as v(path, sort_order);
