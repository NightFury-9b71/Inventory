package bd.edu.just.backend.dto;

import java.util.Map;

public class DashboardStatsDTO {
    private Long totalItems;
    private Long totalCategories;
    private Long totalStock;
    private Long lowStockItems;
    private Long totalDistributions;
    private Long pendingDistributions;
    private Double totalPurchaseValue;
    private Map<String, Long> categoryDistribution;
    private Map<String, Long> monthlyPurchases;

    public DashboardStatsDTO() {}

    // Getters and Setters
    public Long getTotalItems() { return totalItems; }
    public void setTotalItems(Long totalItems) { this.totalItems = totalItems; }
    
    public Long getTotalCategories() { return totalCategories; }
    public void setTotalCategories(Long totalCategories) { this.totalCategories = totalCategories; }
    
    public Long getTotalStock() { return totalStock; }
    public void setTotalStock(Long totalStock) { this.totalStock = totalStock; }
    
    public Long getLowStockItems() { return lowStockItems; }
    public void setLowStockItems(Long lowStockItems) { this.lowStockItems = lowStockItems; }
    
    public Long getTotalDistributions() { return totalDistributions; }
    public void setTotalDistributions(Long totalDistributions) { this.totalDistributions = totalDistributions; }
    
    public Long getPendingDistributions() { return pendingDistributions; }
    public void setPendingDistributions(Long pendingDistributions) { this.pendingDistributions = pendingDistributions; }
    
    public Double getTotalPurchaseValue() { return totalPurchaseValue; }
    public void setTotalPurchaseValue(Double totalPurchaseValue) { this.totalPurchaseValue = totalPurchaseValue; }
    
    public Map<String, Long> getCategoryDistribution() { return categoryDistribution; }
    public void setCategoryDistribution(Map<String, Long> categoryDistribution) { this.categoryDistribution = categoryDistribution; }
    
    public Map<String, Long> getMonthlyPurchases() { return monthlyPurchases; }
    public void setMonthlyPurchases(Map<String, Long> monthlyPurchases) { this.monthlyPurchases = monthlyPurchases; }
}
