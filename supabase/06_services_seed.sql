-- Services section seed (시안 05)

delete from service_menu_items;
delete from service_categories;

insert into service_categories (
  slug, eyebrow, title, description, cta_label, sort_order, is_visible
) values
(
  'design-cut',
  'SERVICES 01',
  'DESIGN CUT',
  '{"subtitle":"Personalized Haircut / 맞춤형 퍼스널 컷","body":"얼굴형과 두상을 고려하여 결을 살리는 맞춤형 디자인 컷"}',
  '원하는 시술로 바로 예약하기',
  1,
  true
),
(
  'signature-perm',
  'SERVICES 02',
  'SIGNATURE PERM',
  '{"subtitle":"Texture & Volume Design / 시그니처 디자인 펌","body":"손상은 최소화하고 자연스러운 볼륨과 흐름을 완성하는 고품격 솔루션"}',
  '원하는 시술로 바로 예약하기',
  2,
  true
),
(
  'coloring',
  'SERVICES 03',
  'COLORING',
  '{"subtitle":"Full Color & Tone Correction / 전체 염색 & 톤 보정","body":"고유의 피부 톤을 가장 아름답게 밝혀주는 맞춤형 시그니처 염색"}',
  '원하는 시술로 바로 예약하기',
  3,
  true
),
(
  'clinic-care',
  'SERVICES 04',
  'CLINIC & CARE',
  '{"subtitle":"Premium Spa & Clinic / 프리미엄 케어 솔루션","body":"모발 내부 깊숙이 영양을 채워 본연의 윤기와 건강한 결을 되찾는 클리닉"}',
  '원하는 시술로 바로 예약하기',
  4,
  true
);

insert into service_menu_items (category_id, name, price_label, sort_order, is_visible)
select c.id, v.name, v.price, v.sort_order, true
from service_categories c
join (
  values
    ('design-cut', '디자인 여성 컷', '55,000', 1),
    ('design-cut', '디자인 남성 컷', '45,000', 2),
    ('design-cut', '포인트 앞머리 컷', '15,000', 3),
    ('signature-perm', '매직 셋팅 펌', '220,000', 1),
    ('signature-perm', '내추럴 웨이브 펌', '180,000', 2),
    ('signature-perm', '뿌리 볼륨 / 다운 펌', '80,000', 3),
    ('coloring', '프리미엄 탈색 & 베이스 톤', '220,000', 1),
    ('coloring', '발레아쥬 & 옴브레', '280,000', 2),
    ('coloring', '뿌리 염색 / 토닝 케어', '120,000', 3),
    ('clinic-care', '모발 집중 복구 클리닉', '150,000', 1),
    ('clinic-care', '두피 딥클렌징 스파', '120,000', 2),
    ('clinic-care', '수분 단백질 코팅 케어', '90,000', 3)
) as v(slug, name, price, sort_order)
  on c.slug = v.slug;
