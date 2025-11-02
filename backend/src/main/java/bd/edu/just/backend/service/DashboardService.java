package bd.edu.just.backend.service;

import bd.edu.just.backend.dto.DashboardStatsDTO;
import bd.edu.just.backend.model.DistributionStatus;
import bd.edu.just.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class DashboardService {

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private ItemCategoryRepository categoryRepository;

    @Autowired
    private PurchaseRepository purchaseRepository;

    @Autowired
    private ItemDistributionRepository distributionRepository;

    public DashboardStatsDTO getDashboardStats() {
        DashboardStatsDTO stats = new DashboardStatsDTO();

        // Basic counts
        stats.setTotalItems(itemRepository.countActiveItems());
        stats.setTotalCategories(categoryRepository.countActiveCategories());
        stats.setTotalStock(itemRepository.getTotalStock());
        stats.setLowStockItems((long) itemRepository.findLowStockItems(10).size());
        stats.setTotalDistributions((long) distributionRepository.findByIsActiveTrue().size());
        stats.setPendingDistributions(distributionRepository.countByStatus(DistributionStatus.PENDING));

        // Financial data
        Double totalPurchaseValue = purchaseRepository.getTotalPurchaseValue();
        stats.setTotalPurchaseValue(totalPurchaseValue != null ? totalPurchaseValue : 0.0);

        // Category distribution
        Map<String, Long> categoryDist = new HashMap<>();
        categoryRepository.findByIsActiveTrue().forEach(category -> {
            long count = itemRepository.findByCategory(category).stream()
                    .filter(item -> item.getIsActive())
                    .count();
            categoryDist.put(category.getName(), count);
        });
        stats.setCategoryDistribution(categoryDist);

        // Monthly purchases (simplified)
        Map<String, Long> monthlyPurchases = new HashMap<>();
        stats.setMonthlyPurchases(monthlyPurchases);

        return stats;
    }
}
