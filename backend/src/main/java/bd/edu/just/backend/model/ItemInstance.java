package bd.edu.just.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "item_instances")
public class ItemInstance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "item_id", nullable = false)
    private Item item;

    @ManyToOne
    @JoinColumn(name = "purchase_id", nullable = false)
    private Purchase purchase;

    @Column(name = "barcode", unique = true, nullable = false)
    private String barcode;

    @Column(name = "unit_price", nullable = false)
    private Double unitPrice;

    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    private ItemInstanceStatus status = ItemInstanceStatus.IN_STOCK;

    @ManyToOne
    @JoinColumn(name = "distributed_to_office_id")
    private Office distributedToOffice;

    @Column(name = "distributed_at")
    private LocalDateTime distributedAt;

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;

    @Column(name = "remarks")
    private String remarks;

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

    public ItemInstance() {}

    public ItemInstance(Item item, Purchase purchase, String barcode, Double unitPrice, User owner) {
        this.item = item;
        this.purchase = purchase;
        this.barcode = barcode;
        this.unitPrice = unitPrice;
        this.owner = owner;
        this.status = ItemInstanceStatus.IN_STOCK;
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

    public Purchase getPurchase() {
        return purchase;
    }

    public void setPurchase(Purchase purchase) {
        this.purchase = purchase;
    }

    public String getBarcode() {
        return barcode;
    }

    public void setBarcode(String barcode) {
        this.barcode = barcode;
    }

    public Double getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(Double unitPrice) {
        this.unitPrice = unitPrice;
    }

    public ItemInstanceStatus getStatus() {
        return status;
    }

    public void setStatus(ItemInstanceStatus status) {
        this.status = status;
    }

    public Office getDistributedToOffice() {
        return distributedToOffice;
    }

    public void setDistributedToOffice(Office distributedToOffice) {
        this.distributedToOffice = distributedToOffice;
    }

    public LocalDateTime getDistributedAt() {
        return distributedAt;
    }

    public void setDistributedAt(LocalDateTime distributedAt) {
        this.distributedAt = distributedAt;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public enum ItemInstanceStatus {
        IN_STOCK,
        DISTRIBUTED,
        DAMAGED,
        LOST,
        RETIRED
    }
}
