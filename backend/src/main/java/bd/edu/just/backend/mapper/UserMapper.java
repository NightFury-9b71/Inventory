package bd.edu.just.backend.mapper;

import bd.edu.just.backend.dto.UserDTO;
import bd.edu.just.backend.model.Designation;
import bd.edu.just.backend.model.User;
import bd.edu.just.backend.service.DesignationService;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class UserMapper {

    private final DesignationService designationService;

    public UserMapper(DesignationService designationService) {
        this.designationService = designationService;
    }

    public UserDTO toDTO(User user) {
        if (user == null) {
            return null;
        }

        UserDTO dto = new UserDTO();
        dto.setId(user.getId() != null ? user.getId().toString() : null);
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setName(user.getName());

        // Get primary designation
        Optional<Designation> primaryDesignation = designationService.getPrimaryDesignation(user);

        if (primaryDesignation.isPresent()) {
            Designation designation = primaryDesignation.get();

            // Map role from primary designation
            dto.setRole(designation.getRole().getName().replace("ROLE_", ""));

            // Map office from primary designation
            dto.setOfficeId(designation.getOffice().getId() != null ? designation.getOffice().getId().toString() : null);
            dto.setOfficeName(designation.getOffice().getName());

            // For now, permissions are empty - can be added later
            dto.setPermissions(List.of());
        } else {
            // No primary designation found
            dto.setRole("USER"); // Default role
            dto.setPermissions(List.of());
        }

        return dto;
    }
}
