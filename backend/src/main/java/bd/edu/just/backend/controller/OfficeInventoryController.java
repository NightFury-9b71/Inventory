package bd.edu.just.backend.controller;

import bd.edu.just.backend.model.Item;
import bd.edu.just.backend.model.Office;
import bd.edu.just.backend.model.OfficeInventory;
import bd.edu.just.backend.service.OfficeInventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/office-inventory")
public class OfficeInventoryController {

    private final OfficeInventoryService officeInventoryService;

    @Autowired
    public OfficeInventoryController(OfficeInventoryService officeInventoryService) {
        this.officeInventoryService = officeInventoryService;
    }

    @PostMapping("/add")
    public ResponseEntity<OfficeInventory> addOrUpdateInventory(
            @RequestParam Long officeId,
            @RequestParam Long itemId,
            @RequestParam Integer quantity) {
        Office office = new Office();
        office.setId(officeId);

        Item item = new Item();
        item.setId(itemId);

        OfficeInventory inventory = officeInventoryService.addOrUpdateInventory(office, item, quantity);
        return ResponseEntity.ok(inventory);
    }

    @GetMapping("/office/{officeId}/item/{itemId}")
    public ResponseEntity<OfficeInventory> getInventoryByOfficeAndItem(
            @PathVariable Long officeId,
            @PathVariable Long itemId) {
        Office office = new Office();
        office.setId(officeId);

        Item item = new Item();
        item.setId(itemId);

        Optional<OfficeInventory> inventory = officeInventoryService.getInventoryByOfficeAndItem(office, item);
        return inventory.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/office/{officeId}")
    public ResponseEntity<List<OfficeInventory>> getInventoryByOffice(@PathVariable Long officeId) {
        Office office = new Office();
        office.setId(officeId);

        List<OfficeInventory> inventory = officeInventoryService.getInventoryByOffice(office);
        return ResponseEntity.ok(inventory);
    }

    @GetMapping("/item/{itemId}")
    public ResponseEntity<List<OfficeInventory>> getInventoryByItem(@PathVariable Long itemId) {
        Item item = new Item();
        item.setId(itemId);

        List<OfficeInventory> inventory = officeInventoryService.getInventoryByItem(item);
        return ResponseEntity.ok(inventory);
    }

    @GetMapping("/office/{officeId}/available")
    public ResponseEntity<List<OfficeInventory>> getAvailableItemsByOffice(@PathVariable Long officeId) {
        Office office = new Office();
        office.setId(officeId);

        List<OfficeInventory> inventory = officeInventoryService.getAvailableItemsByOffice(office);
        return ResponseEntity.ok(inventory);
    }

    @GetMapping("/item/{itemId}/total-quantity")
    public ResponseEntity<Long> getTotalQuantityByItem(@PathVariable Long itemId) {
        Item item = new Item();
        item.setId(itemId);

        Long totalQuantity = officeInventoryService.getTotalQuantityByItem(item);
        return ResponseEntity.ok(totalQuantity);
    }

    @GetMapping("/all-with-stock")
    public ResponseEntity<List<OfficeInventory>> getAllInventoryWithStock() {
        List<OfficeInventory> inventory = officeInventoryService.getAllInventoryWithStock();
        return ResponseEntity.ok(inventory);
    }

    @PostMapping("/transfer")
    public ResponseEntity<Void> transferItems(
            @RequestParam Long fromOfficeId,
            @RequestParam Long toOfficeId,
            @RequestParam Long itemId,
            @RequestParam Integer quantity) {
        try {
            Office fromOffice = new Office();
            fromOffice.setId(fromOfficeId);

            Office toOffice = new Office();
            toOffice.setId(toOfficeId);

            Item item = new Item();
            item.setId(itemId);

            officeInventoryService.transferItems(fromOffice, toOffice, item, quantity);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/adjust")
    public ResponseEntity<Void> adjustInventory(
            @RequestParam Long officeId,
            @RequestParam Long itemId,
            @RequestParam Integer quantityChange) {
        Office office = new Office();
        office.setId(officeId);

        Item item = new Item();
        item.setId(itemId);

        officeInventoryService.adjustInventory(office, item, quantityChange);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/check-stock")
    public ResponseEntity<Boolean> hasSufficientStock(
            @RequestParam Long officeId,
            @RequestParam Long itemId,
            @RequestParam Integer requiredQuantity) {
        Office office = new Office();
        office.setId(officeId);

        Item item = new Item();
        item.setId(itemId);

        boolean hasStock = officeInventoryService.hasSufficientStock(office, item, requiredQuantity);
        return ResponseEntity.ok(hasStock);
    }
}