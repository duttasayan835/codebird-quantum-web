
-- Add email column to profiles table for easier user lookup
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS email TEXT;

-- Create audit logs table for tracking admin actions
CREATE TABLE IF NOT EXISTS admin_activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    action_type TEXT NOT NULL,
    target_type TEXT, -- 'user', 'event', 'project', 'resource', 'blog', etc.
    target_id UUID,
    description TEXT NOT NULL,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on audit logs
ALTER TABLE admin_activity_logs ENABLE ROW LEVEL SECURITY;

-- Policy for admins to view audit logs
CREATE POLICY "Admins can view audit logs" ON admin_activity_logs
    FOR SELECT TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role IN ('admin')
        ) OR
        EXISTS (
            SELECT 1 FROM super_admins 
            WHERE super_admins.id = auth.uid()
        )
    );

-- Policy for admins to insert audit logs
CREATE POLICY "Admins can insert audit logs" ON admin_activity_logs
    FOR INSERT TO authenticated
    WITH CHECK (admin_id = auth.uid());

-- Add function to log admin activities
CREATE OR REPLACE FUNCTION log_admin_activity(
    p_action_type TEXT,
    p_target_type TEXT DEFAULT NULL,
    p_target_id UUID DEFAULT NULL,
    p_description TEXT DEFAULT '',
    p_metadata JSONB DEFAULT '{}'
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    INSERT INTO admin_activity_logs (
        admin_id,
        action_type,
        target_type,
        target_id,
        description,
        metadata
    ) VALUES (
        auth.uid(),
        p_action_type,
        p_target_type,
        p_target_id,
        p_description,
        p_metadata
    );
END;
$$;

-- Create function to get user by email
CREATE OR REPLACE FUNCTION get_user_by_email(user_email TEXT)
RETURNS TABLE(user_id UUID, full_name TEXT, role TEXT, is_super_admin BOOLEAN)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.id, 
        p.full_name, 
        p.role::TEXT,
        EXISTS(SELECT 1 FROM super_admins sa WHERE sa.id = p.id) as is_super_admin
    FROM profiles p
    WHERE p.email = user_email;
END;
$$;

-- Update profiles with email from auth.users (one-time migration)
UPDATE profiles 
SET email = au.email 
FROM auth.users au 
WHERE profiles.id = au.id 
AND profiles.email IS NULL;

-- Create trigger to keep email in sync
CREATE OR REPLACE FUNCTION sync_profile_email()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- Update email in profiles when user email changes
    UPDATE profiles 
    SET email = NEW.email 
    WHERE id = NEW.id;
    
    RETURN NEW;
END;
$$;

-- Create trigger on auth.users email updates
DROP TRIGGER IF EXISTS sync_profile_email_trigger ON auth.users;
CREATE TRIGGER sync_profile_email_trigger
    AFTER UPDATE OF email ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION sync_profile_email();
