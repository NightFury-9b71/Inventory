package bd.edu.just.backend.service;

import bd.edu.just.backend.model.User;
import bd.edu.just.backend.model.Designation;
import bd.edu.just.backend.repository.UserRepository;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;
    private final DesignationService designationService;

    public CustomUserDetailsService(UserRepository userRepository, DesignationService designationService){
        this.userRepository = userRepository;
        this.designationService = designationService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));

        // Get roles from active designations
        List<Designation> designations = designationService.getActiveDesignationsByUser(user);
        Set<GrantedAuthority> authorities = designations.stream()
            .map(designation -> new SimpleGrantedAuthority(designation.getRole().getName()))
            .collect(Collectors.toSet());

        return new org.springframework.security.core.userdetails.User(
            user.getUsername(),
            user.getPassword(),
            authorities
        );
    }
}
