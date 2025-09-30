package com.RGM.FinalProject.controller;

import com.RGM.FinalProject.dto.WarehouseMovementDto;
import com.RGM.FinalProject.service.WarehouseMovementService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/warehouse_management")
public class WarehouseMovementController {

    private final WarehouseMovementService warehouseMovementService;

    public WarehouseMovementController(WarehouseMovementService warehouseMovementService) {
        this.warehouseMovementService = warehouseMovementService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/createWarehouseMovement")
    public ResponseEntity<String> saveWarehouseMovement(@RequestBody WarehouseMovementDto warehouseMovementDto) {
        try {
            warehouseMovementService.saveWarehouseMovement(warehouseMovementDto);
            return ResponseEntity.status(HttpStatus.CREATED).body("Warehouse movement successfully created");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Errore: " + e.getMessage());
        }
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'OPERATOR')")
    @GetMapping("/readWarehouseMovementById/{id}")
    public ResponseEntity<WarehouseMovementDto> getWarehouseMovementById(@PathVariable Long id) {
        return ResponseEntity.ok(warehouseMovementService.getWarehouseMovementById(id));
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'OPERATOR')")
    @GetMapping("/readAllWarehouseMovement")
    public ResponseEntity<List<WarehouseMovementDto>> getAllWarehouseMovements() {
        return ResponseEntity.ok(warehouseMovementService.getAllWarehouseMovement());
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    @PutMapping("/updateWarehouseMovement/{id}")
    public ResponseEntity<String> updateWarehouseMovement(@PathVariable Long id, @RequestBody WarehouseMovementDto warehouseMovementDto) {
        try {
            warehouseMovementService.updateWarehouseMovement(id, warehouseMovementDto);
            return ResponseEntity.ok("Warehouse movement successfully updated");
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/deleteWarehouseMovement/{id}")
    public ResponseEntity<String> deleteWarehouseMovement(@PathVariable Long id) {
        try {
            warehouseMovementService.deleteWarehouseMovementById(id);
            return ResponseEntity.ok("Warehouse movement successfully deleted");
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
