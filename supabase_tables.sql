-- ============================================
-- ChartHub Database Tables
-- Run this in Supabase Dashboard → SQL Editor
-- ============================================

-- TABLE: postIdea
CREATE TABLE "postIdea" (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    currency_pair TEXT NOT NULL,
    description TEXT NOT NULL,
    images TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- TABLE: comments
CREATE TABLE comments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    idea_id UUID REFERENCES "postIdea"(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS: postIdea
ALTER TABLE "postIdea" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view ideas" ON "postIdea" FOR SELECT TO public USING (true);
CREATE POLICY "Users can create ideas" ON "postIdea" FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own ideas" ON "postIdea" FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own ideas" ON "postIdea" FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- RLS: comments
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view comments" ON comments FOR SELECT TO public USING (true);
CREATE POLICY "Users can create comments" ON comments FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own comments" ON comments FOR DELETE TO authenticated USING (auth.uid() = user_id);
