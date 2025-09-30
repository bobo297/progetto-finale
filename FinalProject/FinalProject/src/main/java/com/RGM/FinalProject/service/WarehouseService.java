package com.RGM.FinalProject.service;

import com.RGM.FinalProject.dto.WarehouseDto;
import com.RGM.FinalProject.entity.Product;
import com.RGM.FinalProject.entity.Shelf;
import com.RGM.FinalProject.entity.Warehouse;
import com.RGM.FinalProject.exception.ResourceNotFoundException;
import com.RGM.FinalProject.mapper.WarehouseMapper;
import com.RGM.FinalProject.repository.ShelfRepository;
import com.RGM.FinalProject.repository.WarehouseRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class WarehouseService {

    private WarehouseRepository warehouseRepository;
    private ShelfRepository shelfRepository;


    public WarehouseService(WarehouseRepository warehouseRepository, ShelfRepository shelfRepository) {
        this.warehouseRepository = warehouseRepository;
        this.shelfRepository = shelfRepository;
    }

    /*
    public WarehouseDto saveWarehouse(WarehouseDto warehouseDto) {
        Warehouse warehouse = WarehouseMapper.mapToWarehouse(warehouseDto);
        if (warehouse.getShelves() != null) {
            for (Shelf shelf : warehouse.getShelves()) {
                shelf.setWarehouse(warehouse);
            }
        }
        Warehouse savedWarehouse = warehouseRepository.save(warehouse);

        return WarehouseMapper.maptoWarehouseDTO(savedWarehouse);

    }
     */

    public WarehouseDto saveWarehouse(WarehouseDto warehouseDto) {
        Warehouse warehouse = WarehouseMapper.mapToWarehouse(warehouseDto);

        warehouse.setShelves(new ArrayList<>());

        Warehouse savedWarehouse = warehouseRepository.save(warehouse);

        return WarehouseMapper.maptoWarehouseDTO(savedWarehouse);
    }

    /*
    public List<WarehouseDto> getAllWarehouse() {
        List<Warehouse> warehouses = warehouseRepository.findAll();
        List<WarehouseDto> warehouseDtos = new ArrayList<>();

        if (warehouses.isEmpty()) {
            throw new ResourceNotFoundException("No Warehouse found");
        } else {
            for (Warehouse warehouse : warehouses) {
                warehouseDtos.add(WarehouseMapper.maptoWarehouseDTO(warehouse));
            }
            return warehouseDtos;
        }
    }

     */

    public List<WarehouseDto> getAllWarehouse() {
        List<Warehouse> warehouses = warehouseRepository.findAll();
        if (warehouses.isEmpty()) {
            throw new ResourceNotFoundException("No Warehouse found");
        }
        List<WarehouseDto> warehouseDtos = new ArrayList<>();
        for (Warehouse warehouse : warehouses) {
            warehouseDtos.add(WarehouseMapper.maptoWarehouseDTO(warehouse));
        }
        return warehouseDtos;
    }

    /*
    public WarehouseDto getWarehouseById(Long id) {
        Warehouse warehouse = warehouseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Warehouse not found with id: " + id));
        return WarehouseMapper.maptoWarehouseDTO(warehouse);
    }

     */

    public WarehouseDto getWarehouseById(Long id) {
        Warehouse warehouse = warehouseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Warehouse not found with id: " + id));
        return WarehouseMapper.maptoWarehouseDTO(warehouse);
    }

    /*
    public WarehouseDto updateWarehouse(Long id, WarehouseDto warehouseDto) {
        Warehouse existingWarehouse = warehouseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));

        if (warehouseDto.getWarehouseName() != null) {
            existingWarehouse.setWarehouseName(warehouseDto.getWarehouseName());
        }
        if (warehouseDto.getAddress() != null) {
            existingWarehouse.setAddress(warehouseDto.getAddress());
        }
        if (warehouseDto.getAddress() != null) {
            existingWarehouse.setDescription(warehouseDto.getDescription());
        }
        if (warehouseDto.getShelves() != null) {
            existingWarehouse.setShelves(warehouseDto.getShelves());
        }

        Warehouse updatedWarehouse = warehouseRepository.save(existingWarehouse);
        return WarehouseMapper.maptoWarehouseDTO(updatedWarehouse);
    }

     */
    public WarehouseDto updateWarehouse(Long id, WarehouseDto warehouseDto) {
        Warehouse existingWarehouse = warehouseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Warehouse not found with id: " + id));

        if (warehouseDto.getWarehouseName() != null) {
            existingWarehouse.setWarehouseName(warehouseDto.getWarehouseName());
        }
        if (warehouseDto.getAddress() != null) {
            existingWarehouse.setAddress(warehouseDto.getAddress());
        }
        if (warehouseDto.getDescription() != null) {
            existingWarehouse.setDescription(warehouseDto.getDescription());
        }
        // Do NOT update shelves here.

        Warehouse updatedWarehouse = warehouseRepository.save(existingWarehouse);
        return WarehouseMapper.maptoWarehouseDTO(updatedWarehouse);
    }

    /*
    public void deleteWarehouseById(Long id) {
        Warehouse existingWarehouse = warehouseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));
        warehouseRepository.deleteById(existingWarehouse.getId());
    }

     */

    public void deleteWarehouseById(Long id) {
        Warehouse existingWarehouse = warehouseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Warehouse not found with id: " + id));
        warehouseRepository.deleteById(existingWarehouse.getId());
    }
}
