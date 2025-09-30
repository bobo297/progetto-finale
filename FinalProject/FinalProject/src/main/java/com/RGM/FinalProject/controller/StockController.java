package com.RGM.FinalProject.controller;

import com.RGM.FinalProject.dto.StockDto;
import com.RGM.FinalProject.service.StockService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/warehouse_management")
public class StockController {
    private final StockService stockService;

    public StockController(StockService stockService) {
        this.stockService = stockService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/createStock")
    public ResponseEntity<String> saveStock(@RequestBody StockDto stockDto) {
        try {
            stockService.saveStock(stockDto);
            return ResponseEntity.status(HttpStatus.CREATED).body("Stock successfully created");
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'OPERATOR')")
    @GetMapping("/readStockById/{id}")
    public ResponseEntity<StockDto> getStockById(@PathVariable Long id) {
        return ResponseEntity.ok(stockService.getStockById(id));
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'OPERATOR')")
    @GetMapping("/readAllStocks")
    public ResponseEntity<List<StockDto>> getAllStocks() {
        return ResponseEntity.ok(stockService.getAllStocks());
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    @PutMapping("/updateStock/{id}")
    public ResponseEntity<String> updateStock(@PathVariable Long id, @RequestBody StockDto stockDto) {
        try {
            stockService.updateStock(id, stockDto);
            return ResponseEntity.ok("Stock successfully updated");
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/deleteStock/{id}")
    public ResponseEntity<String> deleteStock(@PathVariable Long id) {
        try {
            stockService.deleteStockById(id);
            return ResponseEntity.ok("Stock successfully deleted");
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
