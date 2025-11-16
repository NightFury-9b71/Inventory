package bd.edu.just.backend.controller;

import bd.edu.just.backend.model.Designation;
import bd.edu.just.backend.model.User;
import bd.edu.just.backend.model.UserDetailsResponse;
import bd.edu.just.backend.repository.UserRepository;
import bd.edu.just.backend.service.DesignationService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserRepository userRepository;
    private final DesignationService designationService;

    public UserController(UserRepository userRepository, DesignationService designationService) {
        this.userRepository = userRepository;
        this.designationService = designationService;
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated() || "anonymousUser".equals(authentication.getName())) {
            return ResponseEntity.status(401).body("Unauthorized");
        }

        String username = authentication.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Designation> designations = designationService.getActiveDesignationsByUser(user);
        List<String> roles = designations.stream()
                                .map(designation -> designation.getRole().getName())
                                .collect(Collectors.toList());

        UserDetailsResponse response = new UserDetailsResponse(user.getUsername(), roles);
        return ResponseEntity.ok(response);
    }
}
