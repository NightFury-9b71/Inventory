-- Step 2: Remove old columns from purchases table
-- This step removes the item_id, quantity, and unit_price columns
-- since they are now tracked in the purchase_items table

ALTER TABLE purchases 
  DROP COLUMN item_id,
  DROP COLUMN quantity,
  DROP COLUMN unit_price;

-- Verification
SELECT 'Old columns dropped successfully!' as status;
SELECT COLUMN_NAME FROM information_schema.COLUMNS 
WHERE TABLE_SCHEMA = 'inventory' AND TABLE_NAME = 'purchases' 
ORDER BY ORDINAL_POSITION;
