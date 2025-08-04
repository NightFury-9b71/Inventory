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
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public ItemMovement() {}


}
