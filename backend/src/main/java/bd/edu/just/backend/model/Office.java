package bd.edu.just.backend.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;


@Entity
@Table(name = "offices")
public class Office {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name")
    private String name;

    @Column(name = "name_bn")
    private String nameBn;



    @OneToMany(mappedBy = "parentOffice", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Office> subOffices;

    @ManyToOne
    @JoinColumn(name = "parent_id")
    @JsonBackReference
    private Office parentOffice;

    @OneToMany(mappedBy = "office", cascade = CascadeType.ALL)
    private List<ItemDistribution> itemDistributions;

    @OneToMany(mappedBy = "office", cascade = CascadeType.ALL)
    private List<Employee> employees;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private OfficeType type;
    
    @Column(name = "code", unique = true)
    private String code;
    
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;
    
    @Column(name = "order_index")
    private Integer orderIndex;
    
    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public Office() {};
    
    public Office(String name, String nameBn, OfficeType type, String code, String description) {
        this.name = name;
        this.nameBn = nameBn; 
        this.type = type;
        this.code = code;
        this.description = description;
        this.isActive = true;
    }

    // Gaters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getNameBn() { return nameBn; }
    public void setNameBn(String nameBn) { this.nameBn = nameBn; }
    
    public OfficeType getType() { return type; }
    public void setType(OfficeType type) { this.type = type; }
    
    public Office getParentOffice() { return parentOffice; }
    public void setParentOffice(Office parentOffice) { this.parentOffice = parentOffice; }
    
    public List<Office> getSubOffices() { return subOffices; }
    public void setSubOffices(List<Office> subOffices) { this.subOffices = subOffices; }
    
    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Integer getOrderIndex() { return orderIndex; }
    public void setOrderIndex(Integer orderIndex) { this.orderIndex = orderIndex; }
    
    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }

    public List<ItemDistribution> getItemDistributions() { return itemDistributions; }
    public void setItemDistributions(List<ItemDistribution> itemDistributions) { this.itemDistributions = itemDistributions; }

    public List<Employee> getEmployees() { return employees; }
    public void setEmployees(List<Employee> employees) { this.employees = employees; }
}
