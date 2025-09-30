package com.RGM.FinalProject.service;

import com.RGM.FinalProject.dto.ProductDto;
import com.RGM.FinalProject.dto.StockDto;
import com.RGM.FinalProject.entity.Product;
import com.RGM.FinalProject.entity.Stock;
import com.RGM.FinalProject.exception.InvalidInputException;
import com.RGM.FinalProject.exception.ResourceNotFoundException;
import com.RGM.FinalProject.mapper.ProductMapper;
import com.RGM.FinalProject.mapper.StockMapper;
import com.RGM.FinalProject.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductService {

    private ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public ProductDto saveProduct(ProductDto productDto) {
        if (productDto != null && !productRepository.existsByProductName(productDto.getProductName())) {

            Product product = ProductMapper.mapToProduct(productDto);
            Product savedProduct = productRepository.save(product);

            return ProductMapper.mapToProductDTO(savedProduct);
        } else {
            throw new InvalidInputException("Element is not valid");
        }
    }

    public List<ProductDto> getAllProducts() {
        List<Product> products = productRepository.findAll();
        List<ProductDto> productDtos = new ArrayList<>();

        if (products.isEmpty()) {
            throw new ResourceNotFoundException("No products found");
        } else {
            for (Product product : products) {
                productDtos.add(ProductMapper.mapToProductDTO(product));
            }
            return productDtos;
        }
    }

    public ProductDto getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));
        return ProductMapper.mapToProductDTO(product);
    }

    public ProductDto updateProduct(Long id, ProductDto productDto) {
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));

        if (productDto.getProductName() != null) {
            existingProduct.setProductName(productDto.getProductName());
        }
        if (productDto.getDescription() != null) {
            existingProduct.setDescription(productDto.getDescription());
        }
        if (productDto.getUnitPrice() != null) {
            existingProduct.setUnitPrice(productDto.getUnitPrice());
        }

        Product updatedProduct = productRepository.save(existingProduct);
        return ProductMapper.mapToProductDTO(updatedProduct);
    }

    public void deleteProductById(Long id) {
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));
        productRepository.deleteById(existingProduct.getId());
    }
}
