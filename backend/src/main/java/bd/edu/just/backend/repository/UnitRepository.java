package bd.edu.just.backend.repository;

import bd.edu.just.backend.model.Unit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UnitRepository extends JpaRepository<Unit, Long> {
    
    List<Unit> findByIsActiveTrue();
    
    Optional<Unit> findBySymbol(String symbol);
}
