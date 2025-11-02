package bd.edu.just.backend.dto;

import java.time.LocalDate;

public class PurchaseDTO {
    private Long id;
    private Long itemId;
    private String itemName;
    private Integer quantity;
    private Double unitPrice;
    private Double totalPrice;
    private String vendorName;
    private String vendorContact;
    private LocalDate purchaseDate;
    private String invoiceNumber;
    private String remarks;
    private Long purchasedById;
    private String purchasedByName;
    private Boolean isActive;

    public PurchaseDTO() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Long getItemId() { return itemId; }
    public void setItemId(Long itemId) { this.itemId = itemId; }
    
    public String getItemName() { return itemName; }
    public void setItemName(String itemName) { this.itemName = itemName; }
    
    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
    
    public Double getUnitPrice() { return unitPrice; }
    public void setUnitPrice(Double unitPrice) { this.unitPrice = unitPrice; }
    
    public Double getTotalPrice() { return totalPrice; }
    public void setTotalPrice(Double totalPrice) { this.totalPrice = totalPrice; }
    
    public String getVendorName() { return vendorName; }
    public void setVendorName(String vendorName) { this.vendorName = vendorName; }
    
    public String getVendorContact() { return vendorContact; }
    public void setVendorContact(String vendorContact) { this.vendorContact = vendorContact; }
    
    public LocalDate getPurchaseDate() { return purchaseDate; }
    public void setPurchaseDate(LocalDate purchaseDate) { this.purchaseDate = purchaseDate; }
    
    public String getInvoiceNumber() { return invoiceNumber; }
    public void setInvoiceNumber(String invoiceNumber) { this.invoiceNumber = invoiceNumber; }
    
    public String getRemarks() { return remarks; }
    public void setRemarks(String remarks) { this.remarks = remarks; }
    
    public Long getPurchasedById() { return purchasedById; }
    public void setPurchasedById(Long purchasedById) { this.purchasedById = purchasedById; }
    
    public String getPurchasedByName() { return purchasedByName; }
    public void setPurchasedByName(String purchasedByName) { this.purchasedByName = purchasedByName; }
    
    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }
}
