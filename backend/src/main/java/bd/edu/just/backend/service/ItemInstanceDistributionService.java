package bd.edu.just.backend.service;

import bd.edu.just.backend.model.ItemInstance;
import bd.edu.just.backend.model.Office;
import bd.edu.just.backend.model.User;
import bd.edu.just.backend.repository.ItemInstanceRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ItemInstanceDistributionService {

    @Autowired
    private ItemInstanceRepository itemInstanceRepository;

    @Autowired
    private OfficeInventoryService officeInventoryService;

    /**
     * Distribute a specific item instance to an office and change ownership
     */
    public ItemInstance distributeItemInstance(Long itemInstanceId, Long toOfficeId, Long newOwnerId, String remarks) {
        ItemInstance itemInstance = itemInstanceRepository.findById(itemInstanceId)
                .orElseThrow(() -> new RuntimeException("Item instance not found"));

        // Check if item is available for distribution
        if (itemInstance.getStatus() != ItemInstance.ItemInstanceStatus.IN_STOCK) {
            throw new RuntimeException("Item instance is not available for distribution");
        }

        Office toOffice = new Office();
        toOffice.setId(toOfficeId);

        User newOwner = new User();
        newOwner.setId(newOwnerId);

        // Update item instance
        itemInstance.setOwner(newOwner);
        itemInstance.setDistributedToOffice(toOffice);
        itemInstance.setDistributedAt(LocalDateTime.now());
        itemInstance.setStatus(ItemInstance.ItemInstanceStatus.DISTRIBUTED);
        itemInstance.setRemarks(remarks);

        ItemInstance savedInstance = itemInstanceRepository.save(itemInstance);

        // Update office inventory
        officeInventoryService.adjustInventory(toOffice, itemInstance.getItem(), 1);

        return savedInstance;
    }

    /**
     * Distribute multiple item instances to an office
     */
    public List<ItemInstance> distributeItemInstances(List<Long> itemInstanceIds, Long toOfficeId, Long newOwnerId, String remarks) {
        return itemInstanceIds.stream()
                .map(id -> distributeItemInstance(id, toOfficeId, newOwnerId, remarks))
                .toList();
    }

    /**
     * Get item instances owned by a user
     */
    public List<ItemInstance> getItemInstancesByOwner(User owner) {
        return itemInstanceRepository.findByOwner(owner);
    }

    /**
     * Get item instances owned by a user that are in stock
     */
    public List<ItemInstance> getAvailableItemInstancesByOwner(User owner) {
        return itemInstanceRepository.findByOwnerAndStatus(owner, ItemInstance.ItemInstanceStatus.IN_STOCK);
    }

    /**
     * Get item instances distributed to an office
     */
    public List<ItemInstance> getItemInstancesByOffice(Office office) {
        return itemInstanceRepository.findByDistributedToOffice(office);
    }

    /**
     * Transfer ownership of an item instance between users within the same office
     */
    public ItemInstance transferOwnership(Long itemInstanceId, Long newOwnerId, String remarks) {
        ItemInstance itemInstance = itemInstanceRepository.findById(itemInstanceId)
                .orElseThrow(() -> new RuntimeException("Item instance not found"));

        User newOwner = new User();
        newOwner.setId(newOwnerId);

        itemInstance.setOwner(newOwner);
        itemInstance.setRemarks((itemInstance.getRemarks() != null ? itemInstance.getRemarks() + "; " : "") + remarks);

        return itemInstanceRepository.save(itemInstance);
    }

    /**
     * Get distribution history of an item instance
     */
    public List<ItemInstance> getItemInstanceHistory(Long itemInstanceId) {
        // For now, just return the current instance
        // In a more complex system, you might want to track distribution history separately
        Optional<ItemInstance> instance = itemInstanceRepository.findById(itemInstanceId);
        return instance.map(List::of).orElse(List.of());
    }
}