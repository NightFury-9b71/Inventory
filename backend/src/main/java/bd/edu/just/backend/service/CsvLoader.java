package bd.edu.just.backend.service;

import bd.edu.just.backend.model.Office;
import bd.edu.just.backend.model.OfficeType;
import bd.edu.just.backend.repository.OfficeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.*;
import org.springframework.boot.CommandLineRunner;

@Component
public class CsvLoader implements CommandLineRunner {

    private final OfficeRepository officeRepository;

    @Autowired
    public CsvLoader(OfficeRepository officeRepository) {
        this.officeRepository = officeRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (officeRepository.count() == 0) {
            loadCsv();
        } else {
            System.out.println("Offices data already loaded, skipping CSV import.");
        }
    }

    public void loadCsv() {
        try (InputStream inputStream = getClass().getResourceAsStream("/csv/office.csv");
             BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream))) {

            String line;
            boolean isFirst = true;

            // Temporary store
            Map<Long, Office> savedOffices = new HashMap<>();
            List<String[]> dataRows = new ArrayList<>();

            while ((line = reader.readLine()) != null) {
                // Skip header
                if (isFirst) {
                    isFirst = false;
                    continue;
                }

                String[] row = line.split(",", -1);

                dataRows.add(row);
            }

            // First pass: save without parents
            for (String[] row : dataRows) {
                // 0 - id, 1 - name, 2 - nameBn, 3 - type, 4 - parentId, 5 - code, 6 - description, 7 - orderIndex, 8 - isActive

                String name = row[1].trim();
                String nameBn = row[2].trim();
                OfficeType type = OfficeType.valueOf(row[3].trim().toUpperCase());
                String code = row[5].trim();
                String description = row[6].trim();
                Integer orderIndex = row[7].isEmpty() ? null : Integer.parseInt(row[7]);
                Boolean isActive = Boolean.parseBoolean(row[8]);

                Office office = new Office(name, nameBn, type, code, description);
                office.setOrderIndex(orderIndex);
                office.setIsActive(isActive);

                Office saved = officeRepository.save(office);
                savedOffices.put(saved.getId(), saved);
            }

            // Second pass: update parent relationships
            for (String[] row : dataRows) {
                Long id = Long.parseLong(row[0].trim());
                String parentIdStr = row[4].trim();

                if (!parentIdStr.isEmpty()) {
                    Long parentId = Long.parseLong(parentIdStr);
                    Office office = officeRepository.findById(id).orElse(null);
                    Office parent = officeRepository.findById(parentId).orElse(null);

                    if (office != null && parent != null) {
                        office.setParentOffice(parent);
                        officeRepository.save(office);
                    }
                }
            }

            System.out.println("CSV hierarchy loaded with parent IDs successfully.");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
