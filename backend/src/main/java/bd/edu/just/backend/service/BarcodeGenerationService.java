package bd.edu.just.backend.service;

import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

@Service
public class BarcodeGenerationService {

    private static final String BARCODE_PREFIX = "INV";
    private static final SecureRandom random = new SecureRandom();
    private final Set<String> generatedBarcodes = new HashSet<>();

    /**
     * Generate a unique barcode for an item instance
     * Format: INV-{ITEMCODE}-{TIMESTAMP}-{RANDOM}
     * Example: INV-ITM001-1699564829-A7B2
     */
    public synchronized String generateBarcode(String itemCode, Long purchaseId) {
        String barcode;
        int attempts = 0;
        final int MAX_ATTEMPTS = 100;

        do {
            barcode = createBarcode(itemCode, purchaseId);
            attempts++;
            
            if (attempts > MAX_ATTEMPTS) {
                throw new RuntimeException("Failed to generate unique barcode after " + MAX_ATTEMPTS + " attempts");
            }
        } while (generatedBarcodes.contains(barcode));

        generatedBarcodes.add(barcode);
        return barcode;
    }

    private String createBarcode(String itemCode, Long purchaseId) {
        // Get current timestamp (seconds)
        long timestamp = Instant.now().getEpochSecond();
        
        // Generate random alphanumeric string (4 characters)
        String randomPart = generateRandomString(4);
        
        // Combine parts
        return String.format("%s-%s-%d-%d-%s", 
            BARCODE_PREFIX, 
            itemCode.toUpperCase(), 
            purchaseId,
            timestamp, 
            randomPart);
    }

    private String generateRandomString(int length) {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        StringBuilder sb = new StringBuilder(length);
        
        for (int i = 0; i < length; i++) {
            int index = random.nextInt(characters.length());
            sb.append(characters.charAt(index));
        }
        
        return sb.toString();
    }

    /**
     * Generate multiple unique barcodes for a quantity
     */
    public Set<String> generateBarcodes(String itemCode, Long purchaseId, int quantity) {
        Set<String> barcodes = new HashSet<>();
        
        for (int i = 0; i < quantity; i++) {
            String barcode = generateBarcode(itemCode, purchaseId);
            barcodes.add(barcode);
        }
        
        return barcodes;
    }

    /**
     * Clear the in-memory cache of generated barcodes
     * This should be called periodically or on application restart
     */
    public void clearCache() {
        generatedBarcodes.clear();
    }
}
