-- CCA Row Level Security Policies
-- Applied after initial schema migration

-- ===========================
-- Enable RLS on all tables
-- ===========================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE series ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_prerequisites ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE highlights ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- ===========================
-- Profiles
-- ===========================

-- Anyone can view profiles
CREATE POLICY "Profiles are viewable by everyone"
  ON profiles FOR SELECT
  TO authenticated, anon
  USING (true);

-- Users can update their own profile
CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- ===========================
-- Series (public read, admin write)
-- ===========================

CREATE POLICY "Published series are viewable by everyone"
  ON series FOR SELECT
  TO authenticated, anon
  USING (published = true);

-- ===========================
-- Articles (public read, admin write)
-- ===========================

CREATE POLICY "Published articles are viewable by everyone"
  ON articles FOR SELECT
  TO authenticated, anon
  USING (published = true);

-- ===========================
-- Article Prerequisites (public read)
-- ===========================

CREATE POLICY "Prerequisites are viewable by everyone"
  ON article_prerequisites FOR SELECT
  TO authenticated, anon
  USING (true);

-- ===========================
-- User Progress (user-scoped)
-- ===========================

CREATE POLICY "Users can view their own progress"
  ON user_progress FOR SELECT
  TO authenticated
  USING (auth.uid() IS NOT NULL AND auth.uid() = user_id);

CREATE POLICY "Users can create their own progress"
  ON user_progress FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = user_id);

CREATE POLICY "Users can update their own progress"
  ON user_progress FOR UPDATE
  TO authenticated
  USING (auth.uid() IS NOT NULL AND auth.uid() = user_id)
  WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = user_id);

-- ===========================
-- Highlights (user-scoped)
-- ===========================

CREATE POLICY "Users can view their own highlights"
  ON highlights FOR SELECT
  TO authenticated
  USING (auth.uid() IS NOT NULL AND auth.uid() = user_id);

CREATE POLICY "Users can create highlights"
  ON highlights FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = user_id);

CREATE POLICY "Users can delete their own highlights"
  ON highlights FOR DELETE
  TO authenticated
  USING (auth.uid() IS NOT NULL AND auth.uid() = user_id);

-- ===========================
-- Bookmarks (user-scoped)
-- ===========================

CREATE POLICY "Users can view their own bookmarks"
  ON bookmarks FOR SELECT
  TO authenticated
  USING (auth.uid() IS NOT NULL AND auth.uid() = user_id);

CREATE POLICY "Users can create bookmarks"
  ON bookmarks FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = user_id);

CREATE POLICY "Users can delete their own bookmarks"
  ON bookmarks FOR DELETE
  TO authenticated
  USING (auth.uid() IS NOT NULL AND auth.uid() = user_id);

-- ===========================
-- Comments
-- ===========================

-- Anyone can read comments
CREATE POLICY "Comments are viewable by everyone"
  ON comments FOR SELECT
  TO authenticated, anon
  USING (true);

-- Authenticated users can create comments
CREATE POLICY "Authenticated users can create comments"
  ON comments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = user_id);

-- Users can update their own comments
CREATE POLICY "Users can update their own comments"
  ON comments FOR UPDATE
  TO authenticated
  USING (auth.uid() IS NOT NULL AND auth.uid() = user_id)
  WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = user_id);

-- Users can delete their own comments
CREATE POLICY "Users can delete their own comments"
  ON comments FOR DELETE
  TO authenticated
  USING (auth.uid() IS NOT NULL AND auth.uid() = user_id);
