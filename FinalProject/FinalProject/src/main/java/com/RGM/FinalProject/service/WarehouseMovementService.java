package com.RGM.FinalProject.service;

import com.RGM.FinalProject.dto.WarehouseMovementDto;
import com.RGM.FinalProject.entity.Employee;
import com.RGM.FinalProject.entity.Product;
import com.RGM.FinalProject.entity.Shelf;
import com.RGM.FinalProject.entity.WarehouseMovement;
import com.RGM.FinalProject.exception.ResourceNotFoundException;
import com.RGM.FinalProject.mapper.WarehouseMovementMapper;
import com.RGM.FinalProject.repository.EmployeeRepository;
import com.RGM.FinalProject.repository.ProductRepository;
import com.RGM.FinalProject.repository.ShelfRepository;
import com.RGM.FinalProject.repository.WarehouseMovementRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class WarehouseMovementService {

    private WarehouseMovementRepository warehouseMovementRepository;
    private ProductRepository productRepository;
    private ShelfRepository shelfRepository;
    private EmployeeRepository employeeRepository;

    public WarehouseMovementService(WarehouseMovementRepository warehouseMovementRepository, ProductRepository productRepository, ShelfRepository shelfRepository, EmployeeRepository employeeRepository) {
        this.warehouseMovementRepository = warehouseMovementRepository;
        this.productRepository = productRepository;
        this.shelfRepository = shelfRepository;
        this.employeeRepository = employeeRepository;
    }

    public WarehouseMovementDto saveWarehouseMovement(WarehouseMovementDto warehouseMovementDto) {

        Shelf shelfOrigin = null;
        if (warehouseMovementDto.getShelfOrigin() != null) {
            shelfOrigin = shelfRepository.findById(warehouseMovementDto.getShelfOrigin())
                    .orElseThrow(() -> new RuntimeException("Shelf origin not found"));
        }

        Product product = productRepository.findById(warehouseMovementDto.getProduct())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Shelf shelfDestination = shelfRepository.findById(warehouseMovementDto.getShelfDestination())
                .orElseThrow(() -> new RuntimeException("Shelf destination not found"));

        Employee employee = employeeRepository.findById(warehouseMovementDto.getEmployee())
                .orElseThrow(() -> new RuntimeException("Employee not found"));


        WarehouseMovement warehouseMovement = WarehouseMovementMapper.mapToWarehouseMovement(warehouseMovementDto, product, shelfOrigin, shelfDestination, employee);
        WarehouseMovement savedWarehouseMovement = warehouseMovementRepository.save(warehouseMovement);

        return WarehouseMovementMapper.mapToWarehouseMovementDTO(savedWarehouseMovement);

    }

    public List<WarehouseMovementDto> getAllWarehouseMovement() {
        List<WarehouseMovement> warehouseMovements = warehouseMovementRepository.findAll();
        List<WarehouseMovementDto> warehouseMovementDtos= new ArrayList<>();

        if (warehouseMovements.isEmpty()) {
            throw new ResourceNotFoundException("No Warehouse found");
        } else {
            for (WarehouseMovement warehouseMovement : warehouseMovements) {
                warehouseMovementDtos.add(WarehouseMovementMapper.mapToWarehouseMovementDTO(warehouseMovement));
            }
            return warehouseMovementDtos;
        }
    }

    public WarehouseMovementDto getWarehouseMovementById(Long id) {
        WarehouseMovement warehouseMovement = warehouseMovementRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Warehouse movement not found with id: " + id));
        return WarehouseMovementMapper.mapToWarehouseMovementDTO(warehouseMovement);
    }

    public WarehouseMovementDto updateWarehouseMovement(Long id, WarehouseMovementDto warehouseMovementDto) {
        WarehouseMovement existingWarehouseMovement = warehouseMovementRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Warehouse movement not found with id: " + id));
        if (warehouseMovementDto.getQuantity() != null) {
            existingWarehouseMovement.setQuantity(warehouseMovementDto.getQuantity());
        }
        if (warehouseMovementDto.getDateTime() != null) {
            existingWarehouseMovement.setDateTime(warehouseMovementDto.getDateTime());
        }
        if (warehouseMovementDto.getMovementType() != null) {
            existingWarehouseMovement.setMovementType(warehouseMovementDto.getMovementType());
        }
        if (warehouseMovementDto.getProduct() != null) {
            Product product = productRepository.findById(warehouseMovementDto.getProduct())
                    .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + warehouseMovementDto.getProduct()));
            existingWarehouseMovement.setProduct(product);
        }
        if (warehouseMovementDto.getShelfOrigin() != null) {
            Shelf shelfOrigin = shelfRepository.findById(warehouseMovementDto.getShelfOrigin())
                    .orElseThrow(() -> new ResourceNotFoundException("Shelf origin not found with id: " + warehouseMovementDto.getShelfOrigin()));
            existingWarehouseMovement.setShelfOrigin(shelfOrigin);
        } else {
            existingWarehouseMovement.setShelfOrigin(null); // clear origin if null
        }
        if (warehouseMovementDto.getShelfDestination() != null) {
            Shelf shelfDestination = shelfRepository.findById(warehouseMovementDto.getShelfDestination())
                    .orElseThrow(() -> new ResourceNotFoundException("Shelf destination not found with id: " + warehouseMovementDto.getShelfDestination()));
            existingWarehouseMovement.setShelfDestination(shelfDestination);
        }
        if (warehouseMovementDto.getEmployee() != null) {
            Employee employee = employeeRepository.findById(warehouseMovementDto.getEmployee())
                    .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + warehouseMovementDto.getEmployee()));
            existingWarehouseMovement.setEmployee(employee);
        }
        WarehouseMovement updatedWarehouseMovement = warehouseMovementRepository.save(existingWarehouseMovement);
        return WarehouseMovementMapper.mapToWarehouseMovementDTO(updatedWarehouseMovement);
    }

    public void deleteWarehouseMovementById(Long id) {
        WarehouseMovement existingWarehouseMovement = warehouseMovementRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Warehouse movement not found with id: " + id));
        warehouseMovementRepository.deleteById(existingWarehouseMovement.getId());
    }

}
