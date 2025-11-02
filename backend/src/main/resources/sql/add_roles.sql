-- SQL Script to add missing roles to the database
-- Run this in your MySQL database to ensure all roles exist

-- Insert roles if they don't exist
INSERT IGNORE INTO roles (name) VALUES ('ROLE_SUPER_ADMIN');
INSERT IGNORE INTO roles (name) VALUES ('ROLE_ADMIN');
INSERT IGNORE INTO roles (name) VALUES ('ROLE_FACULTY_ADMIN');
INSERT IGNORE INTO roles (name) VALUES ('ROLE_DEPARTMENT_ADMIN');
INSERT IGNORE INTO roles (name) VALUES ('ROLE_OFFICE_MANAGER');
INSERT IGNORE INTO roles (name) VALUES ('ROLE_VIEWER');
INSERT IGNORE INTO roles (name) VALUES ('ROLE_USER');

-- Verify roles were created
SELECT * FROM roles;

-- Optional: Update existing users if needed
-- Example: Give admin role to a specific user
-- UPDATE user_roles SET role_id = (SELECT id FROM roles WHERE name = 'ROLE_ADMIN') 
-- WHERE user_id = (SELECT id FROM users WHERE username = 'your_username');
