package bd.edu.just.backend.service;

import bd.edu.just.backend.model.Item;
import bd.edu.just.backend.model.Office;
import bd.edu.just.backend.model.OfficeInventory;
import bd.edu.just.backend.repository.OfficeInventoryRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class OfficeInventoryServiceImpl implements OfficeInventoryService {

    private final OfficeInventoryRepository officeInventoryRepository;

    @Autowired
    public OfficeInventoryServiceImpl(OfficeInventoryRepository officeInventoryRepository) {
        this.officeInventoryRepository = officeInventoryRepository;
    }

    @Override
    public OfficeInventory addOrUpdateInventory(Office office, Item item, Integer quantity) {
        Optional<OfficeInventory> existingInventory = officeInventoryRepository.findByOfficeAndItem(office, item);

        if (existingInventory.isPresent()) {
            OfficeInventory inventory = existingInventory.get();
            inventory.setQuantity(quantity);
            return officeInventoryRepository.save(inventory);
        } else {
            OfficeInventory newInventory = new OfficeInventory(office, item, quantity);
            return officeInventoryRepository.save(newInventory);
        }
    }

    @Override
    public Optional<OfficeInventory> getInventoryByOfficeAndItem(Office office, Item item) {
        return officeInventoryRepository.findByOfficeAndItem(office, item);
    }

    @Override
    public List<OfficeInventory> getInventoryByOffice(Office office) {
        return officeInventoryRepository.findByOffice(office);
    }

    @Override
    public List<OfficeInventory> getInventoryByItem(Item item) {
        return officeInventoryRepository.findByItem(item);
    }

    @Override
    public List<OfficeInventory> getAvailableItemsByOffice(Office office) {
        return officeInventoryRepository.findAvailableItemsByOffice(office);
    }

    @Override
    public Long getTotalQuantityByItem(Item item) {
        Long total = officeInventoryRepository.getTotalQuantityByItem(item);
        return total != null ? total : 0L;
    }

    @Override
    public List<OfficeInventory> getAllInventoryWithStock() {
        return officeInventoryRepository.findAllWithStock();
    }

    @Override
    public void transferItems(Office fromOffice, Office toOffice, Item item, Integer quantity) {
        if (!hasSufficientStock(fromOffice, item, quantity)) {
            throw new RuntimeException("Insufficient stock in source office");
        }

        // Decrease quantity from source office
        adjustInventory(fromOffice, item, -quantity);

        // Increase quantity in destination office
        adjustInventory(toOffice, item, quantity);
    }

    @Override
    public void adjustInventory(Office office, Item item, Integer quantityChange) {
        Optional<OfficeInventory> existingInventory = officeInventoryRepository.findByOfficeAndItem(office, item);

        if (existingInventory.isPresent()) {
            OfficeInventory inventory = existingInventory.get();
            int newQuantity = inventory.getQuantity() + quantityChange;

            if (newQuantity <= 0) {
                // Remove inventory entry if quantity becomes zero or negative
                officeInventoryRepository.delete(inventory);
            } else {
                inventory.setQuantity(newQuantity);
                officeInventoryRepository.save(inventory);
            }
        } else if (quantityChange > 0) {
            // Create new inventory entry only if adding positive quantity
            OfficeInventory newInventory = new OfficeInventory(office, item, quantityChange);
            officeInventoryRepository.save(newInventory);
        }
        // If trying to subtract from non-existent inventory, do nothing
    }

    @Override
    public boolean hasSufficientStock(Office office, Item item, Integer requiredQuantity) {
        Optional<OfficeInventory> inventory = officeInventoryRepository.findByOfficeAndItem(office, item);
        return inventory.isPresent() && inventory.get().getQuantity() >= requiredQuantity;
    }
}