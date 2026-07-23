-- Team section seed
-- Images: featured-aspect, face tops ~16% headroom (team/v9/)

delete from team_members;

insert into team_members (
  name, role_title, bio, image_path, sort_order, is_featured, is_visible
) values
  ('재이 JAY', 'SENIOR STYLIST', 'instagram:https://instagram.com/', 'team/v9/jay.jpg', 1, true, true),
  ('수아 SUA', 'STYLIST', null, 'team/v9/sua.jpg', 2, false, true),
  ('민지 MINJI', 'STYLIST', null, 'team/v9/minji.jpg', 3, false, true),
  ('하린 HARIN', 'STYLIST', null, 'team/v9/harin.jpg', 4, false, true),
  ('유나 YUNA', 'STYLIST', null, 'team/v9/yuna.jpg', 5, false, true);
