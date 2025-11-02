package bd.edu.just.backend.service;

import bd.edu.just.backend.dto.ItemDTO;
import bd.edu.just.backend.model.Item;
import bd.edu.just.backend.model.ItemCategory;
import bd.edu.just.backend.repository.ItemRepository;
import bd.edu.just.backend.repository.ItemCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ItemService {

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private ItemCategoryRepository categoryRepository;

    public List<ItemDTO> getAllItems() {
        return itemRepository.findByIsActiveTrue().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public ItemDTO getItemById(Long id) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item not found with id: " + id));
        return convertToDTO(item);
    }

    public ItemDTO getItemByCode(String code) {
        Item item = itemRepository.findByCode(code)
                .orElseThrow(() -> new RuntimeException("Item not found with code: " + code));
        return convertToDTO(item);
    }

    @Transactional
    public ItemDTO createItem(ItemDTO itemDTO) {
        ItemCategory category = categoryRepository.findById(itemDTO.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        Item item = new Item();
        item.setName(itemDTO.getName());
        item.setNameBn(itemDTO.getNameBn());
        item.setCategory(category);
        item.setCode(itemDTO.getCode());
        item.setDescription(itemDTO.getDescription());
        item.setUnits(itemDTO.getUnits());
        item.setUnitPrice(itemDTO.getUnitPrice());
        item.setQuantity(itemDTO.getQuantity() != null ? itemDTO.getQuantity() : 0);
        item.setIsActive(true);

        Item savedItem = itemRepository.save(item);
        return convertToDTO(savedItem);
    }

    @Transactional
    public ItemDTO updateItem(Long id, ItemDTO itemDTO) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item not found"));

        if (itemDTO.getCategoryId() != null) {
            ItemCategory category = categoryRepository.findById(itemDTO.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            item.setCategory(category);
        }

        if (itemDTO.getName() != null) item.setName(itemDTO.getName());
        if (itemDTO.getNameBn() != null) item.setNameBn(itemDTO.getNameBn());
        if (itemDTO.getCode() != null) item.setCode(itemDTO.getCode());
        if (itemDTO.getDescription() != null) item.setDescription(itemDTO.getDescription());
        if (itemDTO.getUnits() != null) item.setUnits(itemDTO.getUnits());
        if (itemDTO.getUnitPrice() != null) item.setUnitPrice(itemDTO.getUnitPrice());
        if (itemDTO.getQuantity() != null) item.setQuantity(itemDTO.getQuantity());

        Item updatedItem = itemRepository.save(item);
        return convertToDTO(updatedItem);
    }

    @Transactional
    public void deleteItem(Long id) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item not found"));
        item.setIsActive(false);
        itemRepository.save(item);
    }

    public List<ItemDTO> searchItems(String search) {
        return itemRepository.searchItems(search).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<ItemDTO> getLowStockItems(Integer threshold) {
        return itemRepository.findLowStockItems(threshold).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public void updateStock(Long itemId, Integer quantity) {
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Item not found"));
        item.setQuantity(item.getQuantity() + quantity);
        itemRepository.save(item);
    }

    private ItemDTO convertToDTO(Item item) {
        return new ItemDTO(
                item.getId(),
                item.getName(),
                item.getNameBn(),
                item.getCategory().getId(),
                item.getCategory().getName(),
                item.getCode(),
                item.getDescription(),
                item.getUnits(),
                item.getUnitPrice(),
                item.getQuantity(),
                item.getIsActive()
        );
    }
}
