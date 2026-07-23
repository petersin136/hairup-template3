-- Customer reviews seed

delete from reviews;

insert into reviews (body, author_name, service_label, variant, sort_order, is_visible) values
(
  '{"quote":"컬의 흐름 하나하나가 저만을 위해 디테일하게 디자인된 느낌이에요. 미나 선생님 센스에 반했습니다.","handle":"pp*****","date":"26-07-28"}',
  '미나',
  'SIGNATURE PERM',
  'dark',
  1,
  true
),
(
  '{"quote":"얼굴형이 확 살아나는 컷이에요. 아침마다 스타일링이 쉬워져서 만족합니다.","handle":"ha*****","date":"26-07-12"}',
  '재이',
  'DESIGN CUT',
  'light',
  2,
  true
),
(
  '{"quote":"염색이 칙칙하지 않고 피부톤에 딱 맞아요. 손질할수록 더 예뻐지는 컬러입니다.","handle":"su*****","date":"26-06-30"}',
  '수아',
  'COLORING',
  'light',
  3,
  true
),
(
  '{"quote":"두피 케어부터 너무 꼼꼼하셨어요. 시술 후에도 모발이 가볍고 윤기가 살아납니다.","handle":"mi*****","date":"26-06-18"}',
  '민지',
  'CLINIC & CARE',
  'light',
  4,
  true
),
(
  '{"quote":"상담이 정말 친절하고 디테일해요. 원하던 무드를 정확히 이해해주셔서 감사했습니다.","handle":"yu*****","date":"26-05-22"}',
  '유나',
  'DESIGN CUT',
  'light',
  5,
  true
),
(
  '{"quote":"펌이 자연스럽고 볼륨이 오래가요. 주변에서 머리 어디 했냐고 자꾸 물어봐요.","handle":"ha*****","date":"26-05-09"}',
  '하린',
  'SIGNATURE PERM',
  'dark',
  6,
  true
);
