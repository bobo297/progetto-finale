package com.RGM.FinalProject.controller;

import com.RGM.FinalProject.dto.WarehouseDto;
import com.RGM.FinalProject.service.WarehouseService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/warehouse_management")
public class WarehouseController {
    private final WarehouseService warehouseService;

    public WarehouseController(WarehouseService warehouseService) {
        this.warehouseService = warehouseService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/createWarehouse")
    public ResponseEntity<String> saveWarehouse(@RequestBody WarehouseDto warehouseDto) {
        try {
            warehouseService.saveWarehouse(warehouseDto);
            return ResponseEntity.status(HttpStatus.CREATED).body("Warehouse successfully created");
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'OPERATOR')")
    @GetMapping("/readWarehouseById/{id}")
    public ResponseEntity<WarehouseDto> getWarehouseById(@PathVariable Long id) {
        return ResponseEntity.ok(warehouseService.getWarehouseById(id));
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'OPERATOR')")
    @GetMapping("/readAllWarehouse")
    public ResponseEntity<List<WarehouseDto>> getAllWarehouses() {
        return ResponseEntity.ok(warehouseService.getAllWarehouse());
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    @PutMapping("/updateWarehouse/{id}")
    public ResponseEntity<String> updateWarehouse(@PathVariable Long id, @RequestBody WarehouseDto warehouseDto) {
        try {
            warehouseService.updateWarehouse(id, warehouseDto);
            return ResponseEntity.ok("Warehouse successfully updated");
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/deleteWarehouse/{id}")
    public ResponseEntity<String> deleteWarehouse(@PathVariable Long id) {
        try {
            warehouseService.deleteWarehouseById(id);
            return ResponseEntity.ok("Warehouse successfully deleted");
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
