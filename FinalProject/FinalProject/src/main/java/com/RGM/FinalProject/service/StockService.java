package com.RGM.FinalProject.service;

import com.RGM.FinalProject.dto.EmployeeDto;
import com.RGM.FinalProject.dto.StockDto;
import com.RGM.FinalProject.entity.Employee;
import com.RGM.FinalProject.entity.Product;
import com.RGM.FinalProject.entity.Shelf;
import com.RGM.FinalProject.entity.Stock;
import com.RGM.FinalProject.exception.ResourceNotFoundException;
import com.RGM.FinalProject.mapper.EmployeeMapper;
import com.RGM.FinalProject.mapper.StockMapper;
import com.RGM.FinalProject.repository.ProductRepository;
import com.RGM.FinalProject.repository.ShelfRepository;
import com.RGM.FinalProject.repository.StockRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class StockService {

    private final StockRepository stockRepository;
    private final ProductRepository productRepository;
    private final ShelfRepository shelfRepository;

    public StockService(StockRepository stockRepository, ProductRepository productRepository, ShelfRepository shelfRepository) {
        this.stockRepository = stockRepository;
        this.productRepository = productRepository;
        this.shelfRepository = shelfRepository;
    }


    public List<StockDto> getAllStocks() {
        List<Stock> stocks = stockRepository.findAll();
        List<StockDto> stockDtos = new ArrayList<>();

        if (stocks.isEmpty()) {
            throw new ResourceNotFoundException("No stocks found");
        } else {
            for (Stock stock : stocks) {
                stockDtos.add(StockMapper.mapToStockDTO(stock));
            }
            return stockDtos;
        }
    }


    public StockDto getStockById(Long id) {
        Stock stock = stockRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Stock not found with id: " + id));
        return StockMapper.mapToStockDTO(stock);
    }


    public StockDto saveStock(StockDto stockDto) {
        Product product = productRepository.findById(stockDto.getProduct())
                .orElseThrow(() -> new RuntimeException("Product not found"));
        Shelf shelf = shelfRepository.findById(stockDto.getShelf())
                .orElseThrow(() -> new RuntimeException("Shelf not found"));

        Stock stock = StockMapper.mapToStock(stockDto, product, shelf);
        Stock savedStock = stockRepository.save(stock);
        return StockMapper.mapToStockDTO(savedStock);
    }


    public StockDto updateStock(Long id, StockDto stockDto) {
        Stock existingStock = stockRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Stock not found"));

        Product product = productRepository.findById(stockDto.getProduct())
                .orElseThrow(() -> new RuntimeException("Product not found"));
        Shelf shelf = shelfRepository.findById(stockDto.getShelf())
                .orElseThrow(() -> new RuntimeException("Shelf not found"));

        existingStock.setQuantity(stockDto.getQuantity());
        existingStock.setProduct(product);
        existingStock.setShelf(shelf);

        Stock updatedStock = stockRepository.save(existingStock);
        return StockMapper.mapToStockDTO(updatedStock);
    }

    public void deleteStockById(Long id) {
        if (!stockRepository.existsById(id)) {
            throw new RuntimeException("Stock not found");
        }
        stockRepository.deleteById(id);
    }
}
