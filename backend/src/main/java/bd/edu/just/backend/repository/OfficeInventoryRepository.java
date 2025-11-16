package bd.edu.just.backend.repository;

import bd.edu.just.backend.model.Item;
import bd.edu.just.backend.model.Office;
import bd.edu.just.backend.model.OfficeInventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OfficeInventoryRepository extends JpaRepository<OfficeInventory, Long> {

    Optional<OfficeInventory> findByOfficeAndItem(Office office, Item item);

    List<OfficeInventory> findByOffice(Office office);

    List<OfficeInventory> findByItem(Item item);

    @Query("SELECT oi FROM OfficeInventory oi WHERE oi.office = :office AND oi.quantity > 0 ORDER BY oi.lastUpdated DESC")
    List<OfficeInventory> findAvailableItemsByOffice(@Param("office") Office office);

    @Query("SELECT SUM(oi.quantity) FROM OfficeInventory oi WHERE oi.item = :item")
    Long getTotalQuantityByItem(@Param("item") Item item);

    @Query("SELECT oi FROM OfficeInventory oi WHERE oi.quantity > 0 ORDER BY oi.office.name, oi.item.name")
    List<OfficeInventory> findAllWithStock();

    boolean existsByOfficeAndItem(Office office, Item item);
}