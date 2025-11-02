package bd.edu.just.backend.dto;

public class ItemCategoryDTO {
    private Long id;
    private String name;
    private String nameBn;
    private String code;
    private String description;
    private Boolean isActive;
    private Long itemCount;

    public ItemCategoryDTO() {}

    public ItemCategoryDTO(Long id, String name, String nameBn, String code, String description, Boolean isActive) {
        this.id = id;
        this.name = name;
        this.nameBn = nameBn;
        this.code = code;
        this.description = description;
        this.isActive = isActive;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getNameBn() { return nameBn; }
    public void setNameBn(String nameBn) { this.nameBn = nameBn; }
    
    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }
    
    public Long getItemCount() { return itemCount; }
    public void setItemCount(Long itemCount) { this.itemCount = itemCount; }
}
