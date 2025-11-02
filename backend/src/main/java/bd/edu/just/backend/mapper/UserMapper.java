package bd.edu.just.backend.mapper;

import bd.edu.just.backend.dto.UserDTO;
import bd.edu.just.backend.model.Role;
import bd.edu.just.backend.model.User;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class UserMapper {

    public UserDTO toDTO(User user) {
        if (user == null) {
            return null;
        }

        UserDTO dto = new UserDTO();
        dto.setId(user.getId() != null ? user.getId().toString() : null);
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setName(user.getName());

        // Map roles to a single primary role
        // Priority: ADMIN > USER (adjust as needed)
        if (user.getRoles() != null && !user.getRoles().isEmpty()) {
            List<String> roleNames = user.getRoles().stream()
                    .map(Role::getName)
                    .collect(Collectors.toList());

            // Set primary role based on priority
            if (roleNames.contains("ROLE_SUPER_ADMIN")) {
                dto.setRole("SUPER_ADMIN");
            } else if (roleNames.contains("ROLE_ADMIN")) {
                dto.setRole("ADMIN");
            } else if (roleNames.contains("ROLE_FACULTY_ADMIN")) {
                dto.setRole("FACULTY_ADMIN");
            } else if (roleNames.contains("ROLE_DEPARTMENT_ADMIN")) {
                dto.setRole("DEPARTMENT_ADMIN");
            } else if (roleNames.contains("ROLE_OFFICE_MANAGER")) {
                dto.setRole("OFFICE_MANAGER");
            } else if (roleNames.contains("ROLE_VIEWER")) {
                dto.setRole("VIEWER");
            } else if (roleNames.contains("ROLE_USER")) {
                dto.setRole("USER");
            } else {
                // Default to first role if no match
                dto.setRole(roleNames.get(0).replace("ROLE_", ""));
            }

            // For now, permissions are empty - can be added later
            dto.setPermissions(List.of());
        }

        // Map office if present
        if (user.getOffice() != null) {
            dto.setOfficeId(user.getOffice().getId() != null ? user.getOffice().getId().toString() : null);
            dto.setOfficeName(user.getOffice().getName());
        }

        return dto;
    }
}
