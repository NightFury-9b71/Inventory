package bd.edu.just.backend.mapper;

import bd.edu.just.backend.model.ItemDistribution;
import bd.edu.just.backend.dto.ItemDistributionDTO;
import bd.edu.just.backend.dto.ItemDistributionRequestDTO;
import org.springframework.stereotype.Component;
import java.time.LocalDateTime;

@Component
public class ItemDistributionMapper {

    public ItemDistributionDTO toDTO(ItemDistribution distribution) {
        if (distribution == null) {
            return null;
        }

        ItemDistributionDTO dto = new ItemDistributionDTO();
        dto.setId(distribution.getId());
        dto.setItemId(distribution.getItem().getId());
        dto.setItemName(distribution.getItem().getName());
        dto.setOfficeId(distribution.getOffice().getId());
        dto.setOfficeName(distribution.getOffice().getName());
        dto.setUserId(distribution.getUser().getId());
        dto.setUserName(distribution.getUser().getName());
        dto.setQuantity(distribution.getQuantity());
        dto.setDateDistributed(distribution.getDateDistributed());
        dto.setRemarks(distribution.getRemarks());
        dto.setStatus(distribution.getStatus().toString());
        dto.setIsActive(distribution.getIsActive());
        dto.setCreatedAt(distribution.getCreatedAt());
        dto.setUpdatedAt(distribution.getUpdatedAt());

        return dto;
    }

    public ItemDistribution toEntity(ItemDistributionRequestDTO dto) {
        if (dto == null) {
            return null;
        }

        ItemDistribution distribution = new ItemDistribution();
        // Note: Item, Office, User need to be set by service
        distribution.setQuantity(dto.getQuantity());
        if (dto.getDateDistributed() != null) {
            distribution.setDateDistributed(LocalDateTime.parse(dto.getDateDistributed() + "T00:00:00"));
        }
        distribution.setRemarks(dto.getRemarks());

        return distribution;
    }
}