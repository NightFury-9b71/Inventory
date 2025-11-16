package bd.edu.just.backend.service;

import bd.edu.just.backend.model.Item;
import bd.edu.just.backend.model.Office;
import bd.edu.just.backend.model.OfficeInventory;

import java.util.List;
import java.util.Optional;

public interface OfficeInventoryService {
    OfficeInventory addOrUpdateInventory(Office office, Item item, Integer quantity);
    Optional<OfficeInventory> getInventoryByOfficeAndItem(Office office, Item item);
    List<OfficeInventory> getInventoryByOffice(Office office);
    List<OfficeInventory> getInventoryByItem(Item item);
    List<OfficeInventory> getAvailableItemsByOffice(Office office);
    Long getTotalQuantityByItem(Item item);
    List<OfficeInventory> getAllInventoryWithStock();
    void transferItems(Office fromOffice, Office toOffice, Item item, Integer quantity);
    void adjustInventory(Office office, Item item, Integer quantityChange);
    boolean hasSufficientStock(Office office, Item item, Integer requiredQuantity);
}