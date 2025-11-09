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
WHERE item_id IS NOT NULL;

-- Step 4: Update purchases table - remove item-specific columns
-- Note: You may want to back up the data before running this
ALTER TABLE purchases DROP FOREIGN KEY IF EXISTS purchases_ibfk_1;
ALTER TABLE purchases DROP COLUMN IF EXISTS item_id;
ALTER TABLE purchases DROP COLUMN IF EXISTS quantity;
ALTER TABLE purchases DROP COLUMN IF EXISTS unit_price;

-- Note: total_price is kept as it now represents the sum of all items in the purchase
