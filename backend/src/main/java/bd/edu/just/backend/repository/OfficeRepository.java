package bd.edu.just.backend.repository;
import bd.edu.just.backend.model.Office;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OfficeRepository extends JpaRepository<Office, Long> {
    
}