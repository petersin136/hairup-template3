-- Footer + social links seed

delete from social_links;
delete from footer_settings;

insert into footer_settings (address, hours, phone, email, copyright_text) values (
  '서울특별시 강남구 청담동 123-4, 2층',
  '[
    {"days":"MON - FRI","time":"10:00 AM – 08:00 PM"},
    {"days":"SAT","time":"10:00 AM – 09:00 PM"},
    {"days":"SUN","time":"10:00 AM – 07:00 PM"}
  ]',
  '02. 1234. 5678',
  'info@hairup.com',
  '{
    "business":"(주)헤어업 | 대표자 홍길동 | 사업자등록번호 123-45-67890 | 주소 서울특별시 강남구 청담동 123-4, 2층",
    "credit":"© 2026 COPYRIGHT BY HAIR UP | DESIGNED BY MARANATHA STUDIO",
    "adminLabel":"ADMIN",
    "adminHref":"/admin"
  }'
);

insert into social_links (platform, url, sort_order, is_visible) values
  ('FACEBOOK', 'https://facebook.com', 1, true),
  ('INSTAGRAM', 'https://instagram.com', 2, true),
  ('YOUTUBE', 'https://youtube.com', 3, true);
