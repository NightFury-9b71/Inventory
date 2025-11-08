package bd.edu.just.backend.dto;

public class ItemDTO {
    private Long id;
    private String name;
    private String nameBn;
    private Long categoryId;
    private String categoryName;
    private String code;
    private String description;
    private Long unitId;
    private String unitName;
    private String unitSymbol;
    private Integer quantity;
    private Boolean isActive;

    public ItemDTO() {}

    public ItemDTO(Long id, String name, String nameBn, Long categoryId, String categoryName, 
                   String code, String description, Long unitId, String unitName, String unitSymbol,
                   Integer quantity, Boolean isActive) {
        this.id = id;
        this.name = name;
        this.nameBn = nameBn;
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.code = code;
        this.description = description;
        this.unitId = unitId;
        this.unitName = unitName;
        this.unitSymbol = unitSymbol;
        this.quantity = quantity;
        this.isActive = isActive;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getNameBn() { return nameBn; }
    public void setNameBn(String nameBn) { this.nameBn = nameBn; }
    
    public Long getCategoryId() { return categoryId; }
    public void setCategoryId(Long categoryId) { this.categoryId = categoryId; }
    
    public String getCategoryName() { return categoryName; }
    public void setCategoryName(String categoryName) { this.categoryName = categoryName; }
    
    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public Long getUnitId() { return unitId; }
    public void setUnitId(Long unitId) { this.unitId = unitId; }
    
    public String getUnitName() { return unitName; }
    public void setUnitName(String unitName) { this.unitName = unitName; }
    
    public String getUnitSymbol() { return unitSymbol; }
    public void setUnitSymbol(String unitSymbol) { this.unitSymbol = unitSymbol; }
    
    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
    
    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }
}
