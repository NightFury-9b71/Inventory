package bd.edu.just.backend.service;

import bd.edu.just.backend.dto.UnitDTO;
import bd.edu.just.backend.model.Unit;
import bd.edu.just.backend.repository.UnitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UnitService {

    @Autowired
    private UnitRepository unitRepository;

    public List<UnitDTO> getAllUnits() {
        return unitRepository.findByIsActiveTrue().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public UnitDTO getUnitById(Long id) {
        Unit unit = unitRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Unit not found with id: " + id));
        return convertToDTO(unit);
    }

    @Transactional
    public UnitDTO createUnit(UnitDTO unitDTO) {
        Unit unit = new Unit();
        unit.setName(unitDTO.getName());
        unit.setNameBn(unitDTO.getNameBn());
        unit.setSymbol(unitDTO.getSymbol());
        unit.setDescription(unitDTO.getDescription());
        unit.setIsActive(true);

        Unit savedUnit = unitRepository.save(unit);
        return convertToDTO(savedUnit);
    }

    @Transactional
    public UnitDTO updateUnit(Long id, UnitDTO unitDTO) {
        Unit unit = unitRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Unit not found"));

        if (unitDTO.getName() != null) unit.setName(unitDTO.getName());
        if (unitDTO.getNameBn() != null) unit.setNameBn(unitDTO.getNameBn());
        if (unitDTO.getSymbol() != null) unit.setSymbol(unitDTO.getSymbol());
        if (unitDTO.getDescription() != null) unit.setDescription(unitDTO.getDescription());

        Unit updatedUnit = unitRepository.save(unit);
        return convertToDTO(updatedUnit);
    }

    @Transactional
    public void deleteUnit(Long id) {
        Unit unit = unitRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Unit not found"));
        unit.setIsActive(false);
        unitRepository.save(unit);
    }

    private UnitDTO convertToDTO(Unit unit) {
        return new UnitDTO(
                unit.getId(),
                unit.getName(),
                unit.getNameBn(),
                unit.getSymbol(),
                unit.getDescription(),
                unit.getIsActive()
        );
    }
}
