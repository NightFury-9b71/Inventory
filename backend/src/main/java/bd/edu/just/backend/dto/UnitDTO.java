package bd.edu.just.backend.dto;

public class UnitDTO {
    private Long id;
    private String name;
    private String nameBn;
    private String symbol;
    private String description;
    private Boolean isActive;

    public UnitDTO() {}

    public UnitDTO(Long id, String name, String nameBn, String symbol, String description, Boolean isActive) {
        this.id = id;
        this.name = name;
        this.nameBn = nameBn;
        this.symbol = symbol;
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

    public String getSymbol() { return symbol; }
    public void setSymbol(String symbol) { this.symbol = symbol; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }
}
