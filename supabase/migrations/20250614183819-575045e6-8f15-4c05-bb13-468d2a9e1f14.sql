
-- Add blocked column to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS blocked BOOLEAN DEFAULT false;

-- Update RLS policies to account for blocked users
CREATE POLICY "Blocked users cannot access content" ON profiles
    FOR ALL TO authenticated
    USING (NOT blocked OR auth.uid() = id);
