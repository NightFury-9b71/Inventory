-- Create units table
CREATE TABLE IF NOT EXISTS units (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    name_bn VARCHAR(255),
    symbol VARCHAR(50) NOT NULL,
    description TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert some default units
INSERT INTO units (name, name_bn, symbol, description, is_active) VALUES
('Pieces', 'পিস', 'pcs', 'Individual items counted as pieces', TRUE),
('Kilogram', 'কিলোগ্রাম', 'kg', 'Weight measurement in kilograms', TRUE),
('Gram', 'গ্রাম', 'g', 'Weight measurement in grams', TRUE),
('Liter', 'লিটার', 'L', 'Volume measurement in liters', TRUE),
('Milliliter', 'মিলিলিটার', 'mL', 'Volume measurement in milliliters', TRUE),
('Meter', 'মিটার', 'm', 'Length measurement in meters', TRUE),
('Centimeter', 'সেন্টিমিটার', 'cm', 'Length measurement in centimeters', TRUE),
('Box', 'বাক্স', 'box', 'Items packaged in boxes', TRUE),
('Carton', 'কার্টন', 'ctn', 'Items packaged in cartons', TRUE),
('Dozen', 'ডজন', 'doz', 'Set of 12 items', TRUE),
('Pack', 'প্যাক', 'pack', 'Items packaged in packs', TRUE),
('Set', 'সেট', 'set', 'Complete set of items', TRUE);

-- Add unit_id column to items table
ALTER TABLE items ADD COLUMN unit_id BIGINT AFTER description;

-- Add foreign key constraint
ALTER TABLE items ADD CONSTRAINT fk_items_unit 
    FOREIGN KEY (unit_id) REFERENCES units(id);

-- Optional: Migrate existing units data to the new system
-- Update items to use the 'Pieces' unit by default if they don't have a unit
UPDATE items SET unit_id = (SELECT id FROM units WHERE symbol = 'pcs' LIMIT 1) 
WHERE unit_id IS NULL AND units IS NOT NULL;

-- Drop the old units column (after verifying data migration)
-- ALTER TABLE items DROP COLUMN units;
-- ALTER TABLE items DROP COLUMN unit_price;
