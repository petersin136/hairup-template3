-- Customer reviews seed (시안 문구·줄바꿈 그대로)

delete from reviews;

insert into reviews (body, author_name, service_label, variant, sort_order, is_visible) values
(
  '{"quote":"“컬의 흐름 하나하나가 저만을 위해\n디테일하게 디자인된 느낌이에요.\n이렇게 가벼우면서도 자연스럽고\n볼륨감있는 펌은 처음입니다.”","handle":"pp*****","date":"26-07-28"}',
  '미나',
  'SIGNATURE PERM',
  'dark',
  1,
  true
),
(
  '{"quote":"“디자이너분이 제 얼굴형과 두상을\n완벽히 이해하고 커트해 주셨어요.\n손질도 편하고 전체적인 분위기가 한층\n세련돼졌습니다.”","handle":"TTYY*****","date":"26-07-17"}',
  '재이',
  'DESIGNER CUT',
  'light',
  2,
  true
),
(
  '{"quote":"“손상되었던 모발 결이 부드러워졌어요.\n프라이빗하고 편안한 분위기에서 받은\n두피 스파는 최고의 힐링이었습니다.”","handle":"JULY*****","date":"26-07-13"}',
  '카이',
  'SCALP & HAIR CARE',
  'light',
  3,
  true
),
(
  '{"quote":"“상담부터 마무리 스타일링까지\n저에게 온전히 맞춰진 고품격 케어를\n받았습니다.\n작은 디테일 차이가 완성도를 만드네요.”","handle":"SUN*****","date":"26-07-11"}',
  '준오',
  'BESPOKE SERVICE',
  'light',
  4,
  true
),
(
  '{"quote":"“미니멀하고 감각적인 공간,\n전문가의 섬세한 손길,\n그리고 완벽한 결과물까지.\n단순히 머리하는 곳이 아닌 브랜드 경험을\n주는 공간입니다.”","handle":"Abby*****","date":"26-07-07"}',
  '유미',
  'BRAND EXPERIENCE',
  'light',
  5,
  true
),
(
  '{"quote":"“늘 제게 맞는 스타일을 찾기 어려웠는데,\n제 매력을 가장 잘 살려주는 컷을\n제안해 주셨어요.\n앞으로 머리는 무조건 여기입니다.”","handle":"bb*****","date":"26-07-28"}',
  '미나',
  'SIGNATURE STYLING',
  'dark',
  6,
  true
);
