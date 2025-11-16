-- Database migration script for updated inventory system
-- This script implements the new database design with designations, ownership tracking, and office inventory
-- Run this script to migrate from the old system to the new system

-- Step 1: Create the designations table
CREATE TABLE IF NOT EXISTS designations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    role_id BIGINT NOT NULL,
    office_id BIGINT NOT NULL,
    is_primary BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    assigned_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
    FOREIGN KEY (office_id) REFERENCES offices(id) ON DELETE CASCADE,
    UNIQUE KEY unique_active_designation (user_id, role_id, office_id, is_active),
    INDEX idx_user_active (user_id, is_active),
    INDEX idx_office_active (office_id, is_active),
    INDEX idx_role_active (role_id, is_active)
);

-- Step 2: Add purchasing_power column to roles table
ALTER TABLE roles ADD COLUMN IF NOT EXISTS purchasing_power BOOLEAN NOT NULL DEFAULT FALSE;

-- Step 3: Add owner_id column to item_instances table
ALTER TABLE item_instances ADD COLUMN IF NOT EXISTS owner_id BIGINT;
ALTER TABLE item_instances ADD CONSTRAINT fk_item_instances_owner FOREIGN KEY (owner_id) REFERENCES users(id);

-- Step 4: Create office_inventory table
CREATE TABLE IF NOT EXISTS office_inventory (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    office_id BIGINT NOT NULL,
    item_id BIGINT NOT NULL,
    quantity INT NOT NULL DEFAULT 0,
    last_updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (office_id) REFERENCES offices(id) ON DELETE CASCADE,
    FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE,
    UNIQUE KEY unique_office_item (office_id, item_id),
    INDEX idx_office_quantity (office_id, quantity),
    INDEX idx_item_quantity (item_id, quantity)
);

-- Step 5: Migrate existing user-role-office relationships to designations
-- This assumes the current system has a many-to-many user_roles and direct office relationship
INSERT INTO designations (user_id, role_id, office_id, is_primary, is_active, assigned_at)
SELECT DISTINCT
    u.id as user_id,
    ur.role_id,
    COALESCE(u.office_id, 1) as office_id, -- Default to office ID 1 if no office assigned
    TRUE as is_primary, -- Mark as primary for migration
    TRUE as is_active,
    NOW() as assigned_at
FROM users u
JOIN user_roles ur ON u.id = ur.user_id
WHERE NOT EXISTS (
    SELECT 1 FROM designations d
    WHERE d.user_id = u.id AND d.role_id = ur.role_id AND d.office_id = COALESCE(u.office_id, 1)
);

-- Step 6: Set purchasing power for specific roles (customize based on your needs)
-- Example: Set purchasing power for roles with names containing 'admin' or 'manager'
UPDATE roles SET purchasing_power = TRUE WHERE name LIKE '%admin%' OR name LIKE '%manager%';

-- Step 7: Migrate existing item distributions to office inventory
-- This creates office inventory records based on existing item distributions
INSERT INTO office_inventory (office_id, item_id, quantity, last_updated)
SELECT
    id.office_id,
    id.item_id,
    id.quantity,
    COALESCE(id.date_distributed, NOW()) as last_updated
FROM item_distributions id
WHERE id.is_active = TRUE AND id.status = 'COMPLETED'
ON DUPLICATE KEY UPDATE
    quantity = quantity + VALUES(quantity),
    last_updated = GREATEST(last_updated, VALUES(last_updated));

-- Step 8: Update item_instances to set owners based on purchase records
-- Set owner to the purchaser if they have purchasing power
UPDATE item_instances ii
JOIN purchases p ON ii.purchase_id = p.id
JOIN designations d ON p.purchased_by = d.user_id
JOIN roles r ON d.role_id = r.id
SET ii.owner_id = p.purchased_by
WHERE r.purchasing_power = TRUE AND d.is_active = TRUE;

-- Step 9: Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_item_instances_owner ON item_instances(owner_id);
CREATE INDEX IF NOT EXISTS idx_item_instances_status_owner ON item_instances(status, owner_id);
CREATE INDEX IF NOT EXISTS idx_designations_primary ON designations(user_id, is_primary) WHERE is_active = TRUE;

-- Step 10: Update existing item_instances status based on distributions
UPDATE item_instances ii
JOIN item_distributions id ON ii.item_id = id.item_id
SET ii.status = 'DISTRIBUTED',
    ii.distributed_to_office_id = id.office_id,
    ii.distributed_at = id.date_distributed
WHERE ii.status = 'IN_STOCK' AND id.is_active = TRUE;

-- Verification queries (optional - comment out if not needed)
SELECT 'Migration completed successfully!' as status;
SELECT COUNT(*) as designations_created FROM designations;
SELECT COUNT(*) as roles_with_purchasing_power FROM roles WHERE purchasing_power = TRUE;
SELECT COUNT(*) as office_inventory_records FROM office_inventory;
SELECT COUNT(*) as item_instances_with_owners FROM item_instances WHERE owner_id IS NOT NULL;