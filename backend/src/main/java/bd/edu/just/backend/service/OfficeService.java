package bd.edu.just.backend.service;
import bd.edu.just.backend.model.Office;
import bd.edu.just.backend.dto.OfficeResponseDTO;
import java.util.*;


public interface OfficeService {
    Office createOffice(Office office);
    List<Office> getAllOffices();
    List<OfficeResponseDTO> getAllOfficesDto();
    List<Office> getAllParentOffices();
    List<Office> getAllFacultyOffices();
    List<Office> getAllDepartmentOffices();
    Optional<Office> getOfficeById(Long id);
    Office updateOffice(Long id, Office office);
    void deleteOffice(Long id);
}

