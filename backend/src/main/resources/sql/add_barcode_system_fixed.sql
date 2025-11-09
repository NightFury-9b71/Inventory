-- SQL migration script to update purchases table and add new tables for barcode tracking
-- Run this script on your database to support the new barcode system

-- Step 1: Create the purchase_items table
CREATE TABLE IF NOT EXISTS purchase_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    purchase_id BIGINT NOT NULL,
    item_id BIGINT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (purchase_id) REFERENCES purchases(id) ON DELETE CASCADE,
    FOREIGN KEY (item_id) REFERENCES items(id)
);

-- Step 2: Create the item_instances table for tracking individual barcodes
CREATE TABLE IF NOT EXISTS item_instances (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    item_id BIGINT NOT NULL,
    purchase_id BIGINT NOT NULL,
    barcode VARCHAR(255) NOT NULL UNIQUE,
    unit_price DECIMAL(10, 2) NOT NULL,
    status ENUM('IN_STOCK', 'DISTRIBUTED', 'DAMAGED', 'LOST', 'RETIRED') DEFAULT 'IN_STOCK',
    distributed_to_office_id BIGINT,
    distributed_at TIMESTAMP NULL,
    remarks TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (item_id) REFERENCES items(id),
    FOREIGN KEY (purchase_id) REFERENCES purchases(id) ON DELETE CASCADE,
    FOREIGN KEY (distributed_to_office_id) REFERENCES offices(id),
    INDEX idx_barcode (barcode),
    INDEX idx_item_id (item_id),
    INDEX idx_purchase_id (purchase_id),
    INDEX idx_status (status)
);

-- Step 3: Migrate existing purchase data to the new structure
-- For each existing purchase, create a purchase_item entry
INSERT INTO purchase_items (purchase_id, item_id, quantity, unit_price, total_price, created_at, updated_at)
SELECT 
    id as purchase_id,
    item_id,
    quantity,
    unit_price,
    total_price,
    created_at,
    updated_at
FROM purchases
WHERE item_id IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM purchase_items pi WHERE pi.purchase_id = purchases.id
  );

-- Step 4: Get the foreign key name dynamically and drop it
SET @fk_name = (
    SELECT CONSTRAINT_NAME
    FROM information_schema.KEY_COLUMN_USAGE
    WHERE TABLE_SCHEMA = 'inventory'
      AND TABLE_NAME = 'purchases'
      AND COLUMN_NAME = 'item_id'
      AND REFERENCED_TABLE_NAME IS NOT NULL
    LIMIT 1
);

-- Drop the foreign key if it exists
SET @drop_fk = IF(@fk_name IS NOT NULL, 
    CONCAT('ALTER TABLE purchases DROP FOREIGN KEY ', @fk_name),
    'SELECT "No foreign key to drop"'
);

PREPARE stmt FROM @drop_fk;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Step 5: Remove old columns from purchases table
ALTER TABLE purchases 
  DROP COLUMN IF EXISTS item_id,
  DROP COLUMN IF EXISTS quantity,
  DROP COLUMN IF EXISTS unit_price;

-- Note: total_price is kept as it now represents the sum of all items in the purchase

-- Verification queries (optional - comment out if not needed)
SELECT 'Migration completed successfully!' as status;
SELECT COUNT(*) as purchase_items_count FROM purchase_items;
SELECT COUNT(*) as item_instances_count FROM item_instances;
