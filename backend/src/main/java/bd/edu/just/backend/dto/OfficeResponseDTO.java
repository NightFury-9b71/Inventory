package bd.edu.just.backend.dto;

import bd.edu.just.backend.model.OfficeType;
import java.time.LocalDateTime;
import java.util.List;

public class OfficeResponseDTO {
    private Long id;
    private String name;
    private String nameBn;
    private List<OfficeResponseDTO> subOffices;
    private Long parentId;
    private OfficeType type;
    private String code;
    private String description;
    private Integer orderIndex;
    private Boolean isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Constructors
    public OfficeResponseDTO() {}

    public OfficeResponseDTO(Long id, String name, String nameBn, Long parentId, 
                            OfficeType type, String code, String description, 
                            Integer orderIndex, Boolean isActive, 
                            LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.name = name;
        this.nameBn = nameBn;
        this.parentId = parentId;
        this.type = type;
        this.code = code;
        this.description = description;
        this.orderIndex = orderIndex;
        this.isActive = isActive;
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNameBn() {
        return nameBn;
    }

    public void setNameBn(String nameBn) {
        this.nameBn = nameBn;
    }

    public List<OfficeResponseDTO> getSubOffices() {
        return subOffices;
    }

    public void setSubOffices(List<OfficeResponseDTO> subOffices) {
        this.subOffices = subOffices;
    }

    public Long getParentId() {
        return parentId;
    }

    public void setParentId(Long parentId) {
        this.parentId = parentId;
    }

    public OfficeType getType() {
        return type;
    }

    public void setType(OfficeType type) {
        this.type = type;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getOrderIndex() {
        return orderIndex;
    }

    public void setOrderIndex(Integer orderIndex) {
        this.orderIndex = orderIndex;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
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