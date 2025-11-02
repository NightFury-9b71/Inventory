package bd.edu.just.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import bd.edu.just.backend.model.ItemCategory;

import java.util.List;
import java.util.Optional;

@Repository
public interface ItemCategoryRepository extends JpaRepository<ItemCategory, Long> {
    
    Optional<ItemCategory> findByCode(String code);
    
    Optional<ItemCategory> findByName(String name);
    
    List<ItemCategory> findByIsActiveTrue();
    
    @Query("SELECT COUNT(c) FROM ItemCategory c WHERE c.isActive = true")
    Long countActiveCategories();
}
