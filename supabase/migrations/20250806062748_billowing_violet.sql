/*
  # Add member forms table

  1. New Tables
    - `member_forms`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `region` (text, required)
      - `cat_info` (text, required)
      - `reason` (text, required)
      - `status` (text, default 'pending')
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `member_forms` table
    - Add policy for anyone to submit forms
    - Add policy for admins to read all forms
*/

CREATE TABLE IF NOT EXISTS member_forms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  region text NOT NULL,
  cat_info text NOT NULL,
  reason text NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE member_forms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit member forms"
  ON member_forms
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admin users can read all member forms"
  ON member_forms
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.user_id = auth.uid() 
      AND admin_users.role = 'admin'
    )
  );

CREATE POLICY "Admin users can update member forms"
  ON member_forms
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.user_id = auth.uid() 
      AND admin_users.role = 'admin'
    )
  );

CREATE INDEX IF NOT EXISTS idx_member_forms_created_at ON member_forms(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_member_forms_status ON member_forms(status);