/*
  # Projects and Team Member Assignments Schema

  1. New Tables
    - `projects`
      - `id` (uuid, primary key)
      - `name` (text)
      - `client_id` (uuid, foreign key)
      - `status` (text)
      - `priority` (text)
      - `progress` (integer)
      - `start_date` (date)
      - `end_date` (date)
      - `budget` (numeric)
      - `description` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `project_assignments`
      - `id` (uuid, primary key)
      - `project_id` (uuid, foreign key)
      - `user_id` (uuid, foreign key)
      - `role` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
*/

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  client_id uuid REFERENCES auth.users(id),
  status text NOT NULL DEFAULT 'Active',
  priority text NOT NULL DEFAULT 'Medium',
  progress integer NOT NULL DEFAULT 0,
  start_date date NOT NULL,
  end_date date NOT NULL,
  budget numeric,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create project assignments table
CREATE TABLE IF NOT EXISTS project_assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL DEFAULT 'member',
  created_at timestamptz DEFAULT now(),
  UNIQUE(project_id, user_id)
);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_assignments ENABLE ROW LEVEL SECURITY;

-- Policies for projects
CREATE POLICY "Users can view projects they are assigned to"
  ON projects
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM project_assignments
      WHERE project_assignments.project_id = projects.id
      AND project_assignments.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert projects"
  ON projects
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update projects they are assigned to"
  ON projects
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM project_assignments
      WHERE project_assignments.project_id = projects.id
      AND project_assignments.user_id = auth.uid()
    )
  );

-- Policies for project assignments
CREATE POLICY "Users can view their project assignments"
  ON project_assignments
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert project assignments"
  ON project_assignments
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create updated_at trigger for projects
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();