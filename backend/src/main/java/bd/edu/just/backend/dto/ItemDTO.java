package bd.edu.just.backend.dto;

public class ItemDTO {
    private Long id;
    private String name;
    private String nameBn;
    private Long categoryId;
    private String categoryName;
    private String code;
    private String description;
    private String units;
    private Double unitPrice;
    private Integer quantity;
    private Boolean isActive;

    public ItemDTO() {}

    public ItemDTO(Long id, String name, String nameBn, Long categoryId, String categoryName, 
                   String code, String description, String units, Double unitPrice, 
                   Integer quantity, Boolean isActive) {
        this.id = id;
        this.name = name;
        this.nameBn = nameBn;
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.code = code;
        this.description = description;
        this.units = units;
        this.unitPrice = unitPrice;
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
    
    public String getUnits() { return units; }
    public void setUnits(String units) { this.units = units; }
    
    public Double getUnitPrice() { return unitPrice; }
    public void setUnitPrice(Double unitPrice) { this.unitPrice = unitPrice; }
    
    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
    
    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }
}
