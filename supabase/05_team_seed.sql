-- Team section seed
-- Images: featured-aspect, face tops ~22% headroom (team/v10/)

delete from team_members;

insert into team_members (
  name, role_title, bio, image_path, sort_order, is_featured, is_visible
) values
  ('재이 JAY', 'SENIOR STYLIST', 'instagram:https://www.instagram.com/', 'team/v10/jay.jpg', 1, true, true),
  ('수아 SUA', 'STYLIST', 'instagram:https://www.instagram.com/', 'team/v10/sua.jpg', 2, false, true),
  ('민지 MINJI', 'STYLIST', 'instagram:https://www.instagram.com/', 'team/v10/minji.jpg', 3, false, true),
  ('하린 HARIN', 'STYLIST', 'instagram:https://www.instagram.com/', 'team/v10/harin.jpg', 4, false, true),
  ('유나 YUNA', 'STYLIST', 'instagram:https://www.instagram.com/', 'team/v10/yuna.jpg', 5, false, true);
