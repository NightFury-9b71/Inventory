package bd.edu.just.backend.service;
import bd.edu.just.backend.model.Office;
import java.util.*;


public interface OfficeService {
    Office createOffice(Office office);
    List<Office> getAllOffices();
    Optional<Office> getOfficeById(Long id);
    Office updateOffice(Long id, Office office);
    void deleteOffice(Long id);
}

