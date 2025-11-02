-- SQL Script to add new columns to users table
-- Run this in your MySQL database to update the schema

-- Add email column (nullable, unique)
ALTER TABLE users ADD COLUMN IF NOT EXISTS email VARCHAR(255) UNIQUE;

-- Add name column (nullable)
ALTER TABLE users ADD COLUMN IF NOT EXISTS name VARCHAR(255);

-- Add office_id column (nullable, foreign key to offices table)
ALTER TABLE users ADD COLUMN IF NOT EXISTS office_id BIGINT;

-- Add foreign key constraint for office_id
ALTER TABLE users ADD CONSTRAINT fk_users_office 
FOREIGN KEY (office_id) REFERENCES offices(id) ON DELETE SET NULL;

-- Verify the changes
DESCRIBE users;
