package bd.edu.just.backend.service;

import bd.edu.just.backend.dto.PurchaseDTO;
import bd.edu.just.backend.model.Purchase;
import bd.edu.just.backend.model.Item;
import bd.edu.just.backend.model.User;
import bd.edu.just.backend.repository.PurchaseRepository;
import bd.edu.just.backend.repository.ItemRepository;
import bd.edu.just.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PurchaseService {

    @Autowired
    private PurchaseRepository purchaseRepository;

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ItemService itemService;

    public List<PurchaseDTO> getAllPurchases() {
        return purchaseRepository.findByIsActiveTrue().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public PurchaseDTO getPurchaseById(Long id) {
        Purchase purchase = purchaseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Purchase not found with id: " + id));
        return convertToDTO(purchase);
    }

    @Transactional
    public PurchaseDTO createPurchase(PurchaseDTO purchaseDTO) {
        Item item = itemRepository.findById(purchaseDTO.getItemId())
                .orElseThrow(() -> new RuntimeException("Item not found"));

        User user = userRepository.findById(purchaseDTO.getPurchasedById())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Purchase purchase = new Purchase();
        purchase.setItem(item);
        purchase.setQuantity(purchaseDTO.getQuantity());
        purchase.setUnitPrice(purchaseDTO.getUnitPrice());
        purchase.setTotalPrice(purchaseDTO.getUnitPrice() * purchaseDTO.getQuantity());
        purchase.setVendorName(purchaseDTO.getVendorName());
        purchase.setVendorContact(purchaseDTO.getVendorContact());
        purchase.setPurchaseDate(purchaseDTO.getPurchaseDate() != null ? 
                purchaseDTO.getPurchaseDate() : LocalDate.now());
        purchase.setInvoiceNumber(purchaseDTO.getInvoiceNumber());
        purchase.setRemarks(purchaseDTO.getRemarks());
        purchase.setPurchasedBy(user);
        purchase.setIsActive(true);

        Purchase savedPurchase = purchaseRepository.save(purchase);

        // Update item stock
        itemService.updateStock(item.getId(), purchaseDTO.getQuantity());

        return convertToDTO(savedPurchase);
    }

    @Transactional
    public PurchaseDTO updatePurchase(Long id, PurchaseDTO purchaseDTO) {
        Purchase existingPurchase = purchaseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Purchase not found with id: " + id));

        Item item = itemRepository.findById(purchaseDTO.getItemId())
                .orElseThrow(() -> new RuntimeException("Item not found"));

        User user = userRepository.findById(purchaseDTO.getPurchasedById())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Reverse previous stock update
        itemService.updateStock(existingPurchase.getItem().getId(), -existingPurchase.getQuantity());

        // Update purchase fields
        existingPurchase.setItem(item);
        existingPurchase.setQuantity(purchaseDTO.getQuantity());
        existingPurchase.setUnitPrice(purchaseDTO.getUnitPrice());
        existingPurchase.setTotalPrice(purchaseDTO.getUnitPrice() * purchaseDTO.getQuantity());
        existingPurchase.setVendorName(purchaseDTO.getVendorName());
        existingPurchase.setVendorContact(purchaseDTO.getVendorContact());
        existingPurchase.setPurchaseDate(purchaseDTO.getPurchaseDate());
        existingPurchase.setInvoiceNumber(purchaseDTO.getInvoiceNumber());
        existingPurchase.setRemarks(purchaseDTO.getRemarks());
        existingPurchase.setPurchasedBy(user);

        Purchase updatedPurchase = purchaseRepository.save(existingPurchase);

        // Update item stock with new quantity
        itemService.updateStock(item.getId(), purchaseDTO.getQuantity());

        return convertToDTO(updatedPurchase);
    }

    public List<PurchaseDTO> getPurchasesByDateRange(LocalDate startDate, LocalDate endDate) {
        return purchaseRepository.findByDateRange(startDate, endDate).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<PurchaseDTO> getRecentPurchases() {
        return purchaseRepository.findRecentPurchases().stream()
                .limit(10)
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private PurchaseDTO convertToDTO(Purchase purchase) {
        PurchaseDTO dto = new PurchaseDTO();
        dto.setId(purchase.getId());
        dto.setItemId(purchase.getItem().getId());
        dto.setItemName(purchase.getItem().getName());
        dto.setQuantity(purchase.getQuantity());
        dto.setUnitPrice(purchase.getUnitPrice());
        dto.setTotalPrice(purchase.getTotalPrice());
        dto.setVendorName(purchase.getVendorName());
        dto.setVendorContact(purchase.getVendorContact());
        dto.setPurchaseDate(purchase.getPurchaseDate());
        dto.setInvoiceNumber(purchase.getInvoiceNumber());
        dto.setRemarks(purchase.getRemarks());
        dto.setPurchasedById(purchase.getPurchasedBy().getId());
        dto.setPurchasedByName(purchase.getPurchasedBy().getUsername());
        dto.setIsActive(purchase.getIsActive());
        return dto;
    }
}
