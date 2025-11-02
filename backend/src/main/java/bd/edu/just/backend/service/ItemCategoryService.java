package bd.edu.just.backend.service;

import bd.edu.just.backend.dto.ItemCategoryDTO;
import bd.edu.just.backend.model.ItemCategory;
import bd.edu.just.backend.repository.ItemCategoryRepository;
import bd.edu.just.backend.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ItemCategoryService {

    @Autowired
    private ItemCategoryRepository categoryRepository;

    @Autowired
    private ItemRepository itemRepository;

    public List<ItemCategoryDTO> getAllCategories() {
        return categoryRepository.findByIsActiveTrue().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public ItemCategoryDTO getCategoryById(Long id) {
        ItemCategory category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + id));
        return convertToDTO(category);
    }

    @Transactional
    public ItemCategoryDTO createCategory(ItemCategoryDTO categoryDTO) {
        ItemCategory category = new ItemCategory();
        category.setName(categoryDTO.getName());
        category.setNameBn(categoryDTO.getNameBn());
        category.setCode(categoryDTO.getCode());
        category.setDescription(categoryDTO.getDescription());
        category.setIsActive(true);

        ItemCategory savedCategory = categoryRepository.save(category);
        return convertToDTO(savedCategory);
    }

    @Transactional
    public ItemCategoryDTO updateCategory(Long id, ItemCategoryDTO categoryDTO) {
        ItemCategory category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        if (categoryDTO.getName() != null) category.setName(categoryDTO.getName());
        if (categoryDTO.getNameBn() != null) category.setNameBn(categoryDTO.getNameBn());
        if (categoryDTO.getCode() != null) category.setCode(categoryDTO.getCode());
        if (categoryDTO.getDescription() != null) category.setDescription(categoryDTO.getDescription());

        ItemCategory updatedCategory = categoryRepository.save(category);
        return convertToDTO(updatedCategory);
    }

    @Transactional
    public void deleteCategory(Long id) {
        ItemCategory category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        
        // Check if category has items
        long itemCount = itemRepository.findByCategory(category).stream()
                .filter(item -> item.getIsActive())
                .count();
        
        if (itemCount > 0) {
            throw new RuntimeException("Cannot delete category with active items");
        }

        category.setIsActive(false);
        categoryRepository.save(category);
    }

    private ItemCategoryDTO convertToDTO(ItemCategory category) {
        ItemCategoryDTO dto = new ItemCategoryDTO(
                category.getId(),
                category.getName(),
                category.getNameBn(),
                category.getCode(),
                category.getDescription(),
                category.getIsActive()
        );
        
        // Get item count
        long itemCount = itemRepository.findByCategory(category).stream()
                .filter(item -> item.getIsActive())
                .count();
        dto.setItemCount(itemCount);
        
        return dto;
    }
}
