package bd.edu.just.backend.service;
import bd.edu.just.backend.model.Office;
import bd.edu.just.backend.model.OfficeType;
import bd.edu.just.backend.repository.OfficeRepository;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.NoSuchElementException;


@Service
@Transactional
public class OfficeServiceImpl implements OfficeService {

    private final OfficeRepository officeRepository;

    @Autowired
    public OfficeServiceImpl(OfficeRepository officeRepository) {
        this.officeRepository = officeRepository;
    }

    @Override
    public Office createOffice(Office office) {
        return officeRepository.save(office);
    }

    @Override
    public List<Office> getAllOffices() {
        return officeRepository.findAll();
    }

    @Override
    public List<Office> getAllParentOffices() {
        return officeRepository.findAll().stream()
            .filter(office -> office.getParentOffice() == null)
            .toList();
    }

    @Override
    public List<Office> getAllFacultyOffices() {
        return officeRepository.findAll().stream()
            .filter(office -> office.getType() == OfficeType.FACULTY)
            .toList();
    }

    @Override
    public List<Office> getAllDepartmentOffices() {
        return officeRepository.findAll().stream()
            .filter(office -> office.getType() == OfficeType.DEPARTMENT)
            .toList();
    }

    @Override
    public Optional<Office> getOfficeById(Long id) {
        return officeRepository.findById(id);
    }

    @Override
    public Office updateOffice(Long id, Office updatedOffice) {
        return officeRepository.findById(id).map(office -> {
            office.setName(updatedOffice.getName());
            office.setNameBn(updatedOffice.getNameBn());
            office.setType(updatedOffice.getType());
            office.setCode(updatedOffice.getCode());
            office.setDescription(updatedOffice.getDescription());
            office.setIsActive(updatedOffice.getIsActive());
            office.setOrderIndex(updatedOffice.getOrderIndex());
            office.setParentOffice(updatedOffice.getParentOffice());
            return officeRepository.save(office);
        }).orElseThrow(() -> new RuntimeException("Office not found"));
    }

    @Override
    public void deleteOffice(Long id) {
        if (!officeRepository.existsById(id)) {
            throw new NoSuchElementException("Office not found with id: " + id);
        }
        officeRepository.deleteById(id);
    }
}