package bd.edu.just.backend.config;

import bd.edu.just.backend.model.Role;
import bd.edu.just.backend.model.User;
import bd.edu.just.backend.repository.RoleRepository;
import bd.edu.just.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;
import java.util.Set;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initDefaultUsers(UserRepository userRepository,
                                              RoleRepository roleRepository,
                                              PasswordEncoder passwordEncoder) {
        return args -> {
            // Default credentials
            String adminUsername = "admin";
            String adminPassword = "admin123";
            String demoUsername = "user";
            String demoPassword = "user123";

            // Ensure roles exist
            Role adminRole = roleRepository.findByName("ROLE_ADMIN").orElseGet(() -> {
                Role newRole = new Role();
                newRole.setName("ROLE_ADMIN");
                return roleRepository.save(newRole);
            });

            Role userRole = roleRepository.findByName("ROLE_USER").orElseGet(() -> {
                Role newRole = new Role();
                newRole.setName("ROLE_USER");
                return roleRepository.save(newRole);
            });

            // Create admin user if not exists
            if (userRepository.findByUsername(adminUsername).isEmpty()) {
                User adminUser = new User();
                adminUser.setUsername(adminUsername);
                adminUser.setPassword(passwordEncoder.encode(adminPassword));
                adminUser.setRoles(new HashSet<>(Set.of(adminRole)));
                userRepository.save(adminUser);
                System.out.println("✅ Default admin user created");
            } else {
                System.out.println("ℹ️ Admin user already exists");
            }

            // Create demo user if not exists
            if (userRepository.findByUsername(demoUsername).isEmpty()) {
                User demoUser = new User();
                demoUser.setUsername(demoUsername);
                demoUser.setPassword(passwordEncoder.encode(demoPassword));
                demoUser.setRoles(new HashSet<>(Set.of(userRole)));
                userRepository.save(demoUser);
                System.out.println("✅ Demo user created");
            } else {
                System.out.println("ℹ️ Demo user already exists");
            }
        };
    }
}
