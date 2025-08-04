package bd.edu.just.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "item_categories")
public class ItemCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @Column(name = "name_bn", nullable = false)
    private String nameBn;

    @Column(name = "code", unique = true, nullable = false)
    private String code;

    public ItemCategory() {}
}

