package bd.edu.just.backend.controller;

import bd.edu.just.backend.dto.DesignationDTO;
import bd.edu.just.backend.model.Designation;
import bd.edu.just.backend.model.Office;
import bd.edu.just.backend.model.Role;
import bd.edu.just.backend.model.User;
import bd.edu.just.backend.service.DesignationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/designations")
public class DesignationController {

    private final DesignationService designationService;

    @Autowired
    public DesignationController(DesignationService designationService) {
        this.designationService = designationService;
    }

    @PostMapping
    public ResponseEntity<Designation> createDesignation(@RequestBody Designation designation) {
        Designation createdDesignation = designationService.createDesignation(designation);
        return ResponseEntity.ok(createdDesignation);
    }

    @GetMapping
    public ResponseEntity<List<DesignationDTO>> getAllDesignations() {
        List<Designation> designations = designationService.getAllDesignations();
        List<DesignationDTO> dtos = designations.stream()
                .map(designationService::convertToDTO)
                .toList();
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Designation> getDesignationById(@PathVariable Long id) {
        Optional<Designation> designation = designationService.getDesignationById(id);
        return designation.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Designation>> getDesignationsByUser(@PathVariable Long userId) {
        User user = new User();
        user.setId(userId);
        List<Designation> designations = designationService.getDesignationsByUser(user);
        return ResponseEntity.ok(designations);
    }

    @GetMapping("/office/{officeId}")
    public ResponseEntity<List<Designation>> getDesignationsByOffice(@PathVariable Long officeId) {
        Office office = new Office();
        office.setId(officeId);
        List<Designation> designations = designationService.getDesignationsByOffice(office);
        return ResponseEntity.ok(designations);
    }

    @GetMapping("/role/{roleId}")
    public ResponseEntity<List<Designation>> getDesignationsByRole(@PathVariable Long roleId) {
        Role role = new Role();
        role.setId(roleId);
        List<Designation> designations = designationService.getDesignationsByRole(role);
        return ResponseEntity.ok(designations);
    }

    @GetMapping("/user/{userId}/active")
    public ResponseEntity<List<Designation>> getActiveDesignationsByUser(@PathVariable Long userId) {
        User user = new User();
        user.setId(userId);
        List<Designation> designations = designationService.getActiveDesignationsByUser(user);
        return ResponseEntity.ok(designations);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Designation> updateDesignation(@PathVariable Long id, @RequestBody Designation designation) {
        try {
            Designation updatedDesignation = designationService.updateDesignation(id, designation);
            return ResponseEntity.ok(updatedDesignation);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDesignation(@PathVariable Long id) {
        try {
            designationService.deleteDesignation(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/user/{userId}/purchasing-power")
    public ResponseEntity<Boolean> hasUserPurchasingPower(@PathVariable Long userId) {
        User user = new User();
        user.setId(userId);
        boolean hasPower = designationService.hasUserPurchasingPower(user);
        return ResponseEntity.ok(hasPower);
    }

    @GetMapping("/purchasing-power/users")
    public ResponseEntity<List<User>> getUsersWithPurchasingPower() {
        List<User> users = designationService.getUsersWithPurchasingPower();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/user/{userId}/primary")
    public ResponseEntity<Designation> getPrimaryDesignation(@PathVariable Long userId) {
        User user = new User();
        user.setId(userId);
        Optional<Designation> designation = designationService.getPrimaryDesignation(user);
        return designation.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/user/{userId}/primary/{designationId}")
    public ResponseEntity<Void> assignPrimaryDesignation(@PathVariable Long userId, @PathVariable Long designationId) {
        try {
            User user = new User();
            user.setId(userId);
            Designation designation = designationService.getDesignationById(designationId)
                    .orElseThrow(() -> new RuntimeException("Designation not found"));
            designationService.assignPrimaryDesignation(user, designation);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}