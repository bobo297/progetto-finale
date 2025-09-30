package com.RGM.FinalProject.service;

import com.RGM.FinalProject.dto.EmployeeDto;
import com.RGM.FinalProject.dto.ShelfDto;
import com.RGM.FinalProject.entity.Employee;
import com.RGM.FinalProject.entity.Shelf;
import com.RGM.FinalProject.entity.Warehouse;
import com.RGM.FinalProject.exception.ResourceNotFoundException;
import com.RGM.FinalProject.mapper.EmployeeMapper;
import com.RGM.FinalProject.mapper.ShelfMapper;
import com.RGM.FinalProject.repository.ShelfRepository;

import com.RGM.FinalProject.repository.WarehouseRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
public class ShelfService {

    private ShelfRepository shelfRepository;
    private WarehouseRepository warehouseRepository;

    public ShelfService(ShelfRepository shelfRepository, WarehouseRepository warehouseRepository) {
        this.shelfRepository = shelfRepository;
        this.warehouseRepository = warehouseRepository;
    }

    public List<ShelfDto> getAllShelves() {
        return shelfRepository.findAll()
                .stream()
                .map(ShelfMapper::mapToShelfDTO)
                .collect(Collectors.toList());
    }

    public ShelfDto getShelfById(Long id) {
        Shelf shelf = shelfRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Shelf not found with id: " + id));
        return ShelfMapper.mapToShelfDTO(shelf);
    }

    /*
    public ShelfDto saveShelf(ShelfDto shelfDto) {
        Warehouse warehouse = null;
        if (shelfDto.getWarehouseId() != null && shelfDto.getWarehouseId().getId() != null) {
            warehouse = warehouseRepository.findById(shelfDto.getWarehouse().getId())
                    .orElseThrow(() -> new RuntimeException("Warehouse not found"));
        }

        Shelf shelf = ShelfMapper.mapToShelf(shelfDto, warehouse);
        Shelf savedShelf = shelfRepository.save(shelf);

        return ShelfMapper.mapToShelfDTO(savedShelf);
    }
    */

    public ShelfDto saveShelf(ShelfDto shelfDto) {
        if (shelfDto.getWarehouseId() == null) {
            throw new RuntimeException("Shelf must be linked to an existing warehouse");
        }

        Warehouse warehouse = warehouseRepository.findById(shelfDto.getWarehouseId())
                .orElseThrow(() -> new ResourceNotFoundException("Warehouse not found with id: " + shelfDto.getWarehouseId()));

        Shelf shelf = ShelfMapper.mapToShelf(shelfDto, warehouse);
        Shelf savedShelf = shelfRepository.save(shelf);

        return ShelfMapper.mapToShelfDTO(savedShelf);
    }

    /*

    public ShelfDto updateShelf(Long id, ShelfDto shelfDto) {
        Shelf existingShelf = shelfRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Shelf not found with id " + id));

        existingShelf.setDescription(shelfDto.getDescription());

        if (shelfDto.getWarehouse() != null && shelfDto.getWarehouse().getId() != null) {
            Warehouse warehouse = warehouseRepository.findById(shelfDto.getWarehouse().getId())
                    .orElseThrow(() -> new RuntimeException("Warehouse not found with id " + shelfDto.getWarehouse().getId()));
            existingShelf.setWarehouse(warehouse);
        } else {
            existingShelf.setWarehouse(null);
        }

        Shelf updatedShelf = shelfRepository.save(existingShelf);
        return ShelfMapper.mapToShelfDTO(updatedShelf);
    }

     */


    public ShelfDto updateShelf(Long id, ShelfDto shelfDto) {
        Shelf existingShelf = shelfRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Shelf not found with id " + id));

        if (shelfDto.getWarehouseId() == null) {
            throw new RuntimeException("Shelf must be linked to an existing warehouse");
        }

        Warehouse warehouse = warehouseRepository.findById(shelfDto.getWarehouseId())
                .orElseThrow(() -> new ResourceNotFoundException("Warehouse not found with id " + shelfDto.getWarehouseId()));

        existingShelf.setDescription(shelfDto.getDescription());
        existingShelf.setWarehouse(warehouse);

        Shelf updatedShelf = shelfRepository.save(existingShelf);
        return ShelfMapper.mapToShelfDTO(updatedShelf);
    }

    public void deleteShelfById(Long id) {
        if (!shelfRepository.existsById(id)) {
            throw new RuntimeException("Shelf not found with id " + id);
        }
        shelfRepository.deleteById(id);
    }
}
