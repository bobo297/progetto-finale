package com.RGM.FinalProject.controller;

import com.RGM.FinalProject.dto.EmployeeDto;
import com.RGM.FinalProject.dto.ShelfDto;
import com.RGM.FinalProject.service.ShelfService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/warehouse_management")
public class ShelfController {

    private final ShelfService shelfService;

    public ShelfController(ShelfService shelfService) {
        this.shelfService = shelfService;
    }


    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/createShelf")
    public ResponseEntity<String> saveShelf(@RequestBody ShelfDto shelfDto) {
        try {
            shelfService.saveShelf(shelfDto);
            return ResponseEntity.status(HttpStatus.CREATED).body("Shelf successfully created");
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'OPERATOR')")
    @GetMapping("/readShelfById/{id}")
    public ResponseEntity<ShelfDto> getShelfById(@PathVariable Long id) {
        return ResponseEntity.ok(shelfService.getShelfById(id));
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'OPERATOR')")
    @GetMapping("/readAllShelves")
    public ResponseEntity<List<ShelfDto>> getAllShelves() {
        return ResponseEntity.ok(shelfService.getAllShelves());
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    @PutMapping("/updateShelf/{id}")
    public ResponseEntity<String> updateShelf(@PathVariable Long id, @RequestBody ShelfDto shelfDto) {
        try {
            shelfService.updateShelf(id, shelfDto);
            return ResponseEntity.ok("Shelf successfully updated");
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/deleteShelf/{id}")
    public ResponseEntity<String> deleteShelf(@PathVariable Long id) {
        try {
            shelfService.deleteShelfById(id);
            return ResponseEntity.ok("Shelf successfully deleted");
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
