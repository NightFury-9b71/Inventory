package bd.edu.just.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import bd.edu.just.backend.model.Item;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    
}
