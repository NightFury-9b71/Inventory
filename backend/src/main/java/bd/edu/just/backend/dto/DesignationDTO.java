package bd.edu.just.backend.dto;

import java.time.LocalDateTime;

public class DesignationDTO {
    private Long id;
    private Long userId;
    private String userName;
    private Long roleId;
    private String roleName;
    private Boolean purchasingPower;
    private Long officeId;
    private String officeName;
    private Boolean isPrimary;
    private Boolean isActive;
    private LocalDateTime assignedAt;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public DesignationDTO() {}

    public DesignationDTO(Long id, Long userId, String userName, Long roleId, String roleName,
                         Boolean purchasingPower, Long officeId, String officeName,
                         Boolean isPrimary, Boolean isActive, LocalDateTime assignedAt,
                         LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.userId = userId;
        this.userName = userName;
        this.roleId = roleId;
        this.roleName = roleName;
        this.purchasingPower = purchasingPower;
        this.officeId = officeId;
        this.officeName = officeName;
        this.isPrimary = isPrimary;
        this.isActive = isActive;
        this.assignedAt = assignedAt;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Long getRoleId() {
        return roleId;
    }

    public void setRoleId(Long roleId) {
        this.roleId = roleId;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public Boolean getPurchasingPower() {
        return purchasingPower;
    }

    public void setPurchasingPower(Boolean purchasingPower) {
        this.purchasingPower = purchasingPower;
    }

    public Long getOfficeId() {
        return officeId;
    }

    public void setOfficeId(Long officeId) {
        this.officeId = officeId;
    }

    public String getOfficeName() {
        return officeName;
    }

    public void setOfficeName(String officeName) {
        this.officeName = officeName;
    }

    public Boolean getIsPrimary() {
        return isPrimary;
    }

    public void setIsPrimary(Boolean isPrimary) {
        this.isPrimary = isPrimary;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public LocalDateTime getAssignedAt() {
        return assignedAt;
    }

    public void setAssignedAt(LocalDateTime assignedAt) {
        this.assignedAt = assignedAt;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}