package com.RGM.FinalProject.mapper;

import com.RGM.FinalProject.dto.ProductDto;
import com.RGM.FinalProject.entity.Product;

public class ProductMapper {

    public static ProductDto mapToProductDTO(Product product) {
        if (product == null) {
            return null;
        }

        return new ProductDto(
                product.getId(),
                product.getProductName(),
                product.getDescription(),
                product.getUnitPrice()
        );
    }

    public static Product mapToProduct(ProductDto dto) {
        if (dto == null) {
            return null;
        }

        Product product = new Product();
        product.setId(dto.getId());
        product.setProductName(dto.getProductName());
        product.setDescription(dto.getDescription());
        product.setUnitPrice(dto.getUnitPrice());

        return product;
    }
}
