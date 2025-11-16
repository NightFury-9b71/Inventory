-- Comprehensive Database Seed Script for Inventory Management System
-- This script populates all tables with sample data for testing and development
-- Run this script after running the database_migration_v2.sql script

-- ===========================================
-- 1. ROLES (with purchasing power settings)
-- ===========================================
INSERT INTO roles (name, description, purchasing_power) VALUES
('ROLE_SUPER_ADMIN', 'Super Administrator with full system access', TRUE),
('ROLE_ADMIN', 'Administrator with management privileges', TRUE),
('ROLE_PROCUREMENT_MANAGER', 'Procurement Manager with purchasing power', TRUE),
('ROLE_DEPARTMENT_HEAD', 'Department Head with limited purchasing power', TRUE),
('ROLE_FACULTY_MEMBER', 'Faculty Member with basic access', FALSE),
('ROLE_STUDENT', 'Student with read-only access', FALSE),
('ROLE_STAFF', 'Staff member with operational access', FALSE),
('ROLE_VIEWER', 'Read-only viewer access', FALSE)
ON DUPLICATE KEY UPDATE
    description = VALUES(description),
    purchasing_power = VALUES(purchasing_power);

-- ===========================================
-- 2. USERS (with hashed passwords)
-- ===========================================
-- Passwords are hashed using BCrypt
-- password -> $2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi
INSERT INTO users (username, email, name, password) VALUES
('superadmin', 'superadmin@just.edu.bd', 'Super Administrator', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'),
('admin', 'admin@just.edu.bd', 'System Administrator', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'),
('procurement_mgr', 'procurement@just.edu.bd', 'Procurement Manager', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'),
('dept_head_cse', 'cse.head@just.edu.bd', 'CSE Department Head', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'),
('faculty_cse', 'faculty.cse@just.edu.bd', 'CSE Faculty Member', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'),
('staff_lab', 'lab.staff@just.edu.bd', 'Lab Staff Member', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'),
('student', 'student@just.edu.bd', 'Demo Student', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'),
('viewer', 'viewer@just.edu.bd', 'Demo Viewer', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi')
ON DUPLICATE KEY UPDATE
    email = VALUES(email),
    name = VALUES(name),
    password = VALUES(password);

-- ===========================================
-- 3. OFFICES (sample subset from CSV)
-- ===========================================
INSERT INTO offices (id, name, name_bn, type, parent_id, code, description, order_index, is_active, created_at, updated_at) VALUES
(1, 'Chancellor Office', 'চ্যান্সেলর অফিস', 'OFFICE', NULL, 'CHAN', 'Chancellor''s Office', 1, TRUE, NOW(), NOW()),
(2, 'Vice Chancellor Office', 'উপাচার্য অফিস', 'OFFICE', NULL, 'VC', 'Vice Chancellor''s Office and Administrative Wing', 2, TRUE, NOW(), NOW()),
(14, 'Department of Computer Science & Engineering', 'কম্পিউটার বিজ্ঞান ও প্রকৌশল বিভাগ', 'DEPARTMENT', 13, 'CSE', 'Computer Science and Engineering Department', 14, TRUE, NOW(), NOW()),
(15, 'Department of Software Engineering', 'সফটওয়্যার প্রকৌশল বিভাগ', 'DEPARTMENT', 13, 'SE', 'Software Engineering Department', 15, TRUE, NOW(), NOW()),
(53, 'Office of the Registrar', 'রেজিস্ট্রার অফিস', 'OFFICE', 2, 'REG', 'Registrar''s Office and Administrative Sections', 53, TRUE, NOW(), NOW()),
(54, 'Office of the Librarian', 'গ্রন্থাগারিক অফিস', 'OFFICE', 2, 'LIB', 'Central Library', 54, TRUE, NOW(), NOW()),
(77, 'ICT Cell', 'আইসিটি সেল', 'OFFICE', 2, 'ICT', 'Information and Communication Technology Cell', 77, TRUE, NOW(), NOW())
ON DUPLICATE KEY UPDATE
    name = VALUES(name),
    name_bn = VALUES(name_bn),
    type = VALUES(type),
    parent_id = VALUES(parent_id),
    code = VALUES(code),
    description = VALUES(description),
    order_index = VALUES(order_index),
    is_active = VALUES(is_active),
    updated_at = NOW();

-- ===========================================
-- 4. DESIGNATIONS (linking users, roles, offices)
-- ===========================================
INSERT INTO designations (user_id, role_id, office_id, is_primary, is_active, assigned_at, created_at, updated_at) VALUES
-- Super Admin
((SELECT id FROM users WHERE username = 'superadmin'), (SELECT id FROM roles WHERE name = 'ROLE_SUPER_ADMIN'), 1, TRUE, TRUE, NOW(), NOW(), NOW()),
((SELECT id FROM users WHERE username = 'superadmin'), (SELECT id FROM roles WHERE name = 'ROLE_SUPER_ADMIN'), 2, FALSE, TRUE, NOW(), NOW(), NOW()),

-- Admin
((SELECT id FROM users WHERE username = 'admin'), (SELECT id FROM roles WHERE name = 'ROLE_ADMIN'), 2, TRUE, TRUE, NOW(), NOW(), NOW()),

-- Procurement Manager
((SELECT id FROM users WHERE username = 'procurement_mgr'), (SELECT id FROM roles WHERE name = 'ROLE_PROCUREMENT_MANAGER'), 53, TRUE, TRUE, NOW(), NOW(), NOW()),

-- Department Heads
((SELECT id FROM users WHERE username = 'dept_head_cse'), (SELECT id FROM roles WHERE name = 'ROLE_DEPARTMENT_HEAD'), 14, TRUE, TRUE, NOW(), NOW(), NOW()),

-- Faculty Members
((SELECT id FROM users WHERE username = 'faculty_cse'), (SELECT id FROM roles WHERE name = 'ROLE_FACULTY_MEMBER'), 14, TRUE, TRUE, NOW(), NOW(), NOW()),

-- Staff
((SELECT id FROM users WHERE username = 'staff_lab'), (SELECT id FROM roles WHERE name = 'ROLE_STAFF'), 14, TRUE, TRUE, NOW(), NOW(), NOW()),
((SELECT id FROM users WHERE username = 'staff_lab'), (SELECT id FROM roles WHERE name = 'ROLE_STAFF'), 77, FALSE, TRUE, NOW(), NOW(), NOW()),

-- Students and Viewers
((SELECT id FROM users WHERE username = 'student'), (SELECT id FROM roles WHERE name = 'ROLE_STUDENT'), 14, TRUE, TRUE, NOW(), NOW(), NOW()),
((SELECT id FROM users WHERE username = 'viewer'), (SELECT id FROM roles WHERE name = 'ROLE_VIEWER'), 54, TRUE, TRUE, NOW(), NOW(), NOW())
ON DUPLICATE KEY UPDATE
    is_primary = VALUES(is_primary),
    is_active = VALUES(is_active),
    updated_at = NOW();

-- ===========================================
-- 5. ITEM CATEGORIES
-- ===========================================
INSERT INTO item_categories (name, name_bn, code, description, is_active, created_at, updated_at) VALUES
('Electronics', 'ইলেকট্রনিক্স', 'ELEC', 'Electronic devices and components', TRUE, NOW(), NOW()),
('Furniture', 'আসবাবপত্র', 'FURN', 'Office and classroom furniture', TRUE, NOW(), NOW()),
('Lab Equipment', 'ল্যাব যন্ত্রপাতি', 'LAB_EQ', 'Laboratory equipment and supplies', TRUE, NOW(), NOW()),
('Stationery', 'স্টেশনারি', 'STAT', 'Office stationery and supplies', TRUE, NOW(), NOW()),
('Books', 'বই', 'BOOK', 'Books and educational materials', TRUE, NOW(), NOW()),
('Chemicals', 'রাসায়নিক', 'CHEM', 'Chemical substances and reagents', TRUE, NOW(), NOW()),
('Software', 'সফটওয়্যার', 'SOFT', 'Software licenses and digital products', TRUE, NOW(), NOW()),
('Maintenance', 'রক্ষণাবেক্ষণ', 'MAINT', 'Maintenance and repair supplies', TRUE, NOW(), NOW())
ON DUPLICATE KEY UPDATE
    name_bn = VALUES(name_bn),
    code = VALUES(code),
    description = VALUES(description),
    is_active = VALUES(is_active),
    updated_at = NOW();

-- ===========================================
-- 6. UNITS
-- ===========================================
INSERT INTO units (name, name_bn, symbol, description, is_active, created_at, updated_at) VALUES
('Piece', 'পিস', 'pcs', 'Individual pieces or items', TRUE, NOW(), NOW()),
('Kilogram', 'কিলোগ্রাম', 'kg', 'Weight in kilograms', TRUE, NOW(), NOW()),
('Liter', 'লিটার', 'L', 'Volume in liters', TRUE, NOW(), NOW()),
('Meter', 'মিটার', 'm', 'Length in meters', TRUE, NOW(), NOW()),
('Box', 'বাক্স', 'box', 'Boxes or cartons', TRUE, NOW(), NOW()),
('Pack', 'প্যাক', 'pack', 'Packages or sets', TRUE, NOW(), NOW()),
('Set', 'সেট', 'set', 'Complete sets', TRUE, NOW(), NOW()),
('Dozen', 'ডজন', 'doz', 'Dozen (12 pieces)', TRUE, NOW(), NOW())
ON DUPLICATE KEY UPDATE
    name_bn = VALUES(name_bn),
    symbol = VALUES(symbol),
    description = VALUES(description),
    is_active = VALUES(is_active),
    updated_at = NOW();

-- ===========================================
-- 7. ITEMS
-- ===========================================
INSERT INTO items (name, name_bn, category_id, code, description, unit_id, quantity, is_active, created_at, updated_at) VALUES
('Laptop Computer', 'ল্যাপটপ কম্পিউটার', (SELECT id FROM item_categories WHERE name = 'Electronics'), 'LAPTOP-DELL-001', 'Dell Inspiron 15 Laptop', (SELECT id FROM units WHERE name = 'Piece'), 0, TRUE, NOW(), NOW()),
('Projector', 'প্রজেক্টর', (SELECT id FROM item_categories WHERE name = 'Electronics'), 'PROJ-EPSON-001', 'Epson EB-S41 Projector', (SELECT id FROM units WHERE name = 'Piece'), 0, TRUE, NOW(), NOW()),
('Office Chair', 'অফিস চেয়ার', (SELECT id FROM item_categories WHERE name = 'Furniture'), 'CHAIR-EXEC-001', 'Executive Office Chair', (SELECT id FROM units WHERE name = 'Piece'), 0, TRUE, NOW(), NOW()),
('Whiteboard', 'হোয়াইটবোর্ড', (SELECT id FROM item_categories WHERE name = 'Furniture'), 'BOARD-WHT-001', 'Magnetic Whiteboard 4x6 ft', (SELECT id FROM units WHERE name = 'Piece'), 0, TRUE, NOW(), NOW()),
('Microscope', 'মাইক্রোস্কোপ', (SELECT id FROM item_categories WHERE name = 'Lab Equipment'), 'MICRO-COM-001', 'Compound Microscope', (SELECT id FROM units WHERE name = 'Piece'), 0, TRUE, NOW(), NOW()),
('Chemical Reagent Set', 'রাসায়নিক রিয়াজেন্ট সেট', (SELECT id FROM item_categories WHERE name = 'Chemicals'), 'CHEM-SET-001', 'Basic Chemistry Lab Reagent Set', (SELECT id FROM units WHERE name = 'Set'), 0, TRUE, NOW(), NOW()),
('Notebook', 'নোটবুক', (SELECT id FROM item_categories WHERE name = 'Stationery'), 'NOTE-A4-001', 'A4 Notebook 200 pages', (SELECT id FROM units WHERE name = 'Piece'), 0, TRUE, NOW(), NOW()),
('Printer Toner', 'প্রিন্টার টোনার', (SELECT id FROM item_categories WHERE name = 'Maintenance'), 'TONER-HP-001', 'HP LaserJet Toner Cartridge', (SELECT id FROM units WHERE name = 'Piece'), 0, TRUE, NOW(), NOW()),
('Programming Book', 'প্রোগ্রামিং বই', (SELECT id FROM item_categories WHERE name = 'Books'), 'BOOK-JAVA-001', 'Java Programming Textbook', (SELECT id FROM units WHERE name = 'Piece'), 0, TRUE, NOW(), NOW()),
('Software License', 'সফটওয়্যার লাইসেন্স', (SELECT id FROM item_categories WHERE name = 'Software'), 'SW-MS-OFFICE', 'Microsoft Office 365 License', (SELECT id FROM units WHERE name = 'Piece'), 0, TRUE, NOW(), NOW())
ON DUPLICATE KEY UPDATE
    name_bn = VALUES(name_bn),
    category_id = VALUES(category_id),
    description = VALUES(description),
    unit_id = VALUES(unit_id),
    quantity = VALUES(quantity),
    is_active = VALUES(is_active),
    updated_at = NOW();

-- ===========================================
-- 8. SAMPLE PURCHASES
-- ===========================================
INSERT INTO purchases (total_price, vendor_name, vendor_contact, purchase_date, invoice_number, remarks, purchased_by, is_active, created_at, updated_at) VALUES
(150000.00, 'Tech Solutions Ltd', '+8801712345678', '2024-11-01', 'INV-2024-001', 'Initial laptop purchase for CSE department', (SELECT id FROM users WHERE username = 'procurement_mgr'), TRUE, NOW(), NOW()),
(50000.00, 'Office Furniture Co', '+8801712345679', '2024-11-05', 'INV-2024-002', 'Office chairs for faculty rooms', (SELECT id FROM users WHERE username = 'procurement_mgr'), TRUE, NOW(), NOW()),
(75000.00, 'Lab Equipment Suppliers', '+8801712345680', '2024-11-10', 'INV-2024-003', 'Microscopes for biology lab', (SELECT id FROM users WHERE username = 'procurement_mgr'), TRUE, NOW(), NOW()),
(25000.00, 'Stationery World', '+8801712345681', '2024-11-15', 'INV-2024-004', 'Notebooks and stationery supplies', (SELECT id FROM users WHERE username = 'procurement_mgr'), TRUE, NOW(), NOW()),
(30000.00, 'Chemical Supplies Inc', '+8801712345682', '2024-11-20', 'INV-2024-005', 'Chemical reagents for chemistry lab', (SELECT id FROM users WHERE username = 'procurement_mgr'), TRUE, NOW(), NOW())
ON DUPLICATE KEY UPDATE
    total_price = VALUES(total_price),
    vendor_name = VALUES(vendor_name),
    vendor_contact = VALUES(vendor_contact),
    purchase_date = VALUES(purchase_date),
    invoice_number = VALUES(invoice_number),
    remarks = VALUES(remarks),
    purchased_by = VALUES(purchased_by),
    is_active = VALUES(is_active),
    updated_at = NOW();

-- ===========================================
-- 9. PURCHASE ITEMS
-- ===========================================
INSERT INTO purchase_items (purchase_id, item_id, quantity, unit_price, total_price, created_at, updated_at) VALUES
-- Purchase 1: Laptops
((SELECT id FROM purchases WHERE invoice_number = 'INV-2024-001'), (SELECT id FROM items WHERE code = 'LAPTOP-DELL-001'), 10, 15000.00, 150000.00, NOW(), NOW()),

-- Purchase 2: Office Chairs
((SELECT id FROM purchases WHERE invoice_number = 'INV-2024-002'), (SELECT id FROM items WHERE code = 'CHAIR-EXEC-001'), 20, 2500.00, 50000.00, NOW(), NOW()),

-- Purchase 3: Microscopes
((SELECT id FROM purchases WHERE invoice_number = 'INV-2024-003'), (SELECT id FROM items WHERE code = 'MICRO-COM-001'), 15, 5000.00, 75000.00, NOW(), NOW()),

-- Purchase 4: Notebooks
((SELECT id FROM purchases WHERE invoice_number = 'INV-2024-004'), (SELECT id FROM items WHERE code = 'NOTE-A4-001'), 100, 250.00, 25000.00, NOW(), NOW()),

-- Purchase 5: Chemical Reagents
((SELECT id FROM purchases WHERE invoice_number = 'INV-2024-005'), (SELECT id FROM items WHERE code = 'CHEM-SET-001'), 10, 3000.00, 30000.00, NOW(), NOW())
ON DUPLICATE KEY UPDATE
    quantity = VALUES(quantity),
    unit_price = VALUES(unit_price),
    total_price = VALUES(total_price),
    updated_at = NOW();

-- ===========================================
-- 10. ITEM INSTANCES (with barcodes and ownership)
-- ===========================================
-- Generate barcodes and create item instances for the purchased items
-- Note: Barcodes follow the pattern YYYYMMDD-ITEMCODE-XXXXXX

-- Laptops (Purchase 1)
INSERT INTO item_instances (item_id, purchase_id, barcode, unit_price, status, owner_id, created_at, updated_at) VALUES
((SELECT id FROM items WHERE code = 'LAPTOP-DELL-001'), (SELECT id FROM purchases WHERE invoice_number = 'INV-2024-001'), '20241101-LAPTOPDELL001-000001', 15000.00, 'IN_STOCK', (SELECT id FROM users WHERE username = 'procurement_mgr'), NOW(), NOW()),
((SELECT id FROM items WHERE code = 'LAPTOP-DELL-001'), (SELECT id FROM purchases WHERE invoice_number = 'INV-2024-001'), '20241101-LAPTOPDELL001-000002', 15000.00, 'IN_STOCK', (SELECT id FROM users WHERE username = 'procurement_mgr'), NOW(), NOW()),
((SELECT id FROM items WHERE code = 'LAPTOP-DELL-001'), (SELECT id FROM purchases WHERE invoice_number = 'INV-2024-001'), '20241101-LAPTOPDELL001-000003', 15000.00, 'IN_STOCK', (SELECT id FROM users WHERE username = 'procurement_mgr'), NOW(), NOW()),
((SELECT id FROM items WHERE code = 'LAPTOP-DELL-001'), (SELECT id FROM purchases WHERE invoice_number = 'INV-2024-001'), '20241101-LAPTOPDELL001-000004', 15000.00, 'IN_STOCK', (SELECT id FROM users WHERE username = 'procurement_mgr'), NOW(), NOW()),
((SELECT id FROM items WHERE code = 'LAPTOP-DELL-001'), (SELECT id FROM purchases WHERE invoice_number = 'INV-2024-001'), '20241101-LAPTOPDELL001-000005', 15000.00, 'IN_STOCK', (SELECT id FROM users WHERE username = 'procurement_mgr'), NOW(), NOW()),
((SELECT id FROM items WHERE code = 'LAPTOP-DELL-001'), (SELECT id FROM purchases WHERE invoice_number = 'INV-2024-001'), '20241101-LAPTOPDELL001-000006', 15000.00, 'IN_STOCK', (SELECT id FROM users WHERE username = 'procurement_mgr'), NOW(), NOW()),
((SELECT id FROM items WHERE code = 'LAPTOP-DELL-001'), (SELECT id FROM purchases WHERE invoice_number = 'INV-2024-001'), '20241101-LAPTOPDELL001-000007', 15000.00, 'IN_STOCK', (SELECT id FROM users WHERE username = 'procurement_mgr'), NOW(), NOW()),
((SELECT id FROM items WHERE code = 'LAPTOP-DELL-001'), (SELECT id FROM purchases WHERE invoice_number = 'INV-2024-001'), '20241101-LAPTOPDELL001-000008', 15000.00, 'IN_STOCK', (SELECT id FROM users WHERE username = 'procurement_mgr'), NOW(), NOW()),
((SELECT id FROM items WHERE code = 'LAPTOP-DELL-001'), (SELECT id FROM purchases WHERE invoice_number = 'INV-2024-001'), '20241101-LAPTOPDELL001-000009', 15000.00, 'IN_STOCK', (SELECT id FROM users WHERE username = 'procurement_mgr'), NOW(), NOW()),
((SELECT id FROM items WHERE code = 'LAPTOP-DELL-001'), (SELECT id FROM purchases WHERE invoice_number = 'INV-2024-001'), '20241101-LAPTOPDELL001-000010', 15000.00, 'IN_STOCK', (SELECT id FROM users WHERE username = 'procurement_mgr'), NOW(), NOW())
ON DUPLICATE KEY UPDATE
    status = VALUES(status),
    owner_id = VALUES(owner_id),
    updated_at = NOW();

-- Office Chairs (Purchase 2)
INSERT INTO item_instances (item_id, purchase_id, barcode, unit_price, status, owner_id, created_at, updated_at) VALUES
((SELECT id FROM items WHERE code = 'CHAIR-EXEC-001'), (SELECT id FROM purchases WHERE invoice_number = 'INV-2024-002'), '20241105-CHAIREXEC001-000011', 2500.00, 'IN_STOCK', (SELECT id FROM users WHERE username = 'procurement_mgr'), NOW(), NOW()),
((SELECT id FROM items WHERE code = 'CHAIR-EXEC-001'), (SELECT id FROM purchases WHERE invoice_number = 'INV-2024-002'), '20241105-CHAIREXEC001-000012', 2500.00, 'IN_STOCK', (SELECT id FROM users WHERE username = 'procurement_mgr'), NOW(), NOW()),
((SELECT id FROM items WHERE code = 'CHAIR-EXEC-001'), (SELECT id FROM purchases WHERE invoice_number = 'INV-2024-002'), '20241105-CHAIREXEC001-000013', 2500.00, 'IN_STOCK', (SELECT id FROM users WHERE username = 'procurement_mgr'), NOW(), NOW()),
((SELECT id FROM items WHERE code = 'CHAIR-EXEC-001'), (SELECT id FROM purchases WHERE invoice_number = 'INV-2024-002'), '20241105-CHAIREXEC001-000014', 2500.00, 'IN_STOCK', (SELECT id FROM users WHERE username = 'procurement_mgr'), NOW(), NOW()),
((SELECT id FROM items WHERE code = 'CHAIR-EXEC-001'), (SELECT id FROM purchases WHERE invoice_number = 'INV-2024-002'), '20241105-CHAIREXEC001-000015', 2500.00, 'IN_STOCK', (SELECT id FROM users WHERE username = 'procurement_mgr'), NOW(), NOW())
ON DUPLICATE KEY UPDATE
    status = VALUES(status),
    owner_id = VALUES(owner_id),
    updated_at = NOW();

-- ===========================================
-- 11. OFFICE INVENTORY (initial stock distribution)
-- ===========================================
INSERT INTO office_inventory (office_id, item_id, quantity, last_updated, created_at, updated_at) VALUES
-- CSE Department inventory
(14, (SELECT id FROM items WHERE code = 'LAPTOP-DELL-001'), 8, NOW(), NOW(), NOW()),
(14, (SELECT id FROM items WHERE code = 'NOTE-A4-001'), 50, NOW(), NOW(), NOW()),

-- Registrar Office inventory
(53, (SELECT id FROM items WHERE code = 'CHAIR-EXEC-001'), 10, NOW(), NOW(), NOW()),
(53, (SELECT id FROM items WHERE code = 'NOTE-A4-001'), 30, NOW(), NOW(), NOW()),

-- Library inventory
(54, (SELECT id FROM items WHERE code = 'BOOK-JAVA-001'), 20, NOW(), NOW(), NOW()),

-- ICT Cell inventory
(77, (SELECT id FROM items WHERE code = 'LAPTOP-DELL-001'), 2, NOW(), NOW(), NOW()),
(77, (SELECT id FROM items WHERE code = 'PROJ-EPSON-001'), 3, NOW(), NOW(), NOW())
ON DUPLICATE KEY UPDATE
    quantity = VALUES(quantity),
    last_updated = NOW(),
    updated_at = NOW();

-- ===========================================
-- 12. SAMPLE DISTRIBUTIONS
-- ===========================================
INSERT INTO item_distributions (item_id, office_id, user_id, quantity, date_distributed, remarks, status, is_active, created_at, updated_at) VALUES
-- Distribute laptops to CSE faculty
((SELECT id FROM items WHERE code = 'LAPTOP-DELL-001'), 14, (SELECT id FROM users WHERE username = 'faculty_cse'), 3, NOW(), 'Distributed to CSE faculty for teaching', 'COMPLETED', TRUE, NOW(), NOW()),

-- Distribute chairs to registrar office
((SELECT id FROM items WHERE code = 'CHAIR-EXEC-001'), 53, (SELECT id FROM users WHERE username = 'admin'), 5, NOW(), 'Office chairs for administrative staff', 'COMPLETED', TRUE, NOW(), NOW())
ON DUPLICATE KEY UPDATE
    quantity = VALUES(quantity),
    date_distributed = VALUES(date_distributed),
    remarks = VALUES(remarks),
    status = VALUES(status),
    is_active = VALUES(is_active),
    updated_at = NOW();

-- ===========================================
-- VERIFICATION QUERIES
-- ===========================================
SELECT 'Database seeding completed successfully!' as status;
SELECT 'Total Users:' as info, COUNT(*) as count FROM users;
SELECT 'Total Roles:' as info, COUNT(*) as count FROM roles;
SELECT 'Total Offices:' as info, COUNT(*) as count FROM offices;
SELECT 'Total Designations:' as info, COUNT(*) as count FROM designations;
SELECT 'Total Items:' as info, COUNT(*) as count FROM items;
SELECT 'Total Purchases:' as info, COUNT(*) as count FROM purchases;
SELECT 'Total Item Instances:' as info, COUNT(*) as count FROM item_instances;
SELECT 'Total Office Inventory Records:' as info, COUNT(*) as count FROM office_inventory;
SELECT 'Users with Purchasing Power:' as info, COUNT(*) as count FROM designations d JOIN roles r ON d.role_id = r.id WHERE r.purchasing_power = TRUE AND d.is_active = TRUE;