package bd.edu.just.backend.service;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashSet;
import java.util.Set;
import java.util.concurrent.atomic.AtomicInteger;

@Service
public class BarcodeGenerationService {

    private static final DateTimeFormatter DATE_FORMAT = DateTimeFormatter.ofPattern("yyyyMMdd");
    private final Set<String> generatedBarcodes = new HashSet<>();
    private final AtomicInteger dailyCounter = new AtomicInteger(1);

    /**
     * Generate a unique barcode for an item instance
     * Format: {DATE}-{ITEMCODE}-{ITEMCOUNT}
     * Example: 20241111-ITM001-000001
     */
    public synchronized String generateBarcode(String itemCode) {
        String barcode;
        int attempts = 0;
        final int MAX_ATTEMPTS = 100;

        do {
            barcode = createBarcode(itemCode);
            attempts++;

            if (attempts > MAX_ATTEMPTS) {
                throw new RuntimeException("Failed to generate unique barcode after " + MAX_ATTEMPTS + " attempts");
            }
        } while (generatedBarcodes.contains(barcode));

        generatedBarcodes.add(barcode);
        return barcode;
    }

    private String createBarcode(String itemCode) {
        // Get current date in YYYYMMDD format
        String datePart = LocalDate.now().format(DATE_FORMAT);

        // Get item code (clean and uppercase)
        String cleanItemCode = itemCode.replaceAll("[^A-Za-z0-9]", "").toUpperCase();

        // Get next item count for today (6 digits, zero-padded)
        int count = dailyCounter.getAndIncrement();
        String countPart = String.format("%06d", count);

        // Combine parts
        return String.format("%s-%s-%s",
            datePart,
            cleanItemCode,
            countPart);
    }

    /**
     * Generate multiple unique barcodes for a quantity
     */
    public Set<String> generateBarcodes(String itemCode, int quantity) {
        Set<String> barcodes = new HashSet<>();
        
        for (int i = 0; i < quantity; i++) {
            String barcode = generateBarcode(itemCode);
            barcodes.add(barcode);
        }
        
        return barcodes;
    }    /**
     * Clear the in-memory cache of generated barcodes
     * This should be called periodically or on application restart
     */
    public void clearCache() {
        generatedBarcodes.clear();
        dailyCounter.set(1); // Reset counter
    }

    /**
     * Reset the daily counter (useful for testing or daily maintenance)
     */
    public void resetDailyCounter() {
        dailyCounter.set(1);
    }
}
