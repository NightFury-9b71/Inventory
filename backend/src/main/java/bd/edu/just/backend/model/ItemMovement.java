package bd.edu.just.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "item_movements")
public class ItemMovement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "item_id", nullable = false)
    private Item item;

    @ManyToOne
    @JoinColumn(name = "from_office_id", nullable = false)
    private Office fromOfficeId;

    @ManyToOne
    @JoinColumn(name = "to_office_id", nullable = false)
    private Office toOfficeId;

    @ManyToOne
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    @Column(name = "date_moved", nullable = false)
    private LocalDateTime dateMoved;

    @Column(name = "remarks")
    private String remarks;

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
        if (dateMoved == null) {
            dateMoved = LocalDateTime.now();
        }
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public ItemMovement() {}

    public ItemMovement(Item item, Office fromOffice, Office toOffice, Employee employee, Integer quantity) {
        this.item = item;
        this.fromOfficeId = fromOffice;
        this.toOfficeId = toOffice;
        this.employee = employee;
        this.quantity = quantity;
        this.isActive = true;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }

    public Office getFromOfficeId() {
        return fromOfficeId;
    }

    public void setFromOfficeId(Office fromOfficeId) {
        this.fromOfficeId = fromOfficeId;
    }

    public Office getToOfficeId() {
        return toOfficeId;
    }

    public void setToOfficeId(Office toOfficeId) {
        this.toOfficeId = toOfficeId;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public LocalDateTime getDateMoved() {
        return dateMoved;
    }

    public void setDateMoved(LocalDateTime dateMoved) {
        this.dateMoved = dateMoved;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
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

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}
