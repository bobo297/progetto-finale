package com.RGM.FinalProject.mapper;

import com.RGM.FinalProject.dto.StockDto;
import com.RGM.FinalProject.entity.Product;
import com.RGM.FinalProject.entity.Shelf;
import com.RGM.FinalProject.entity.Stock;

public class StockMapper {

    public static StockDto mapToStockDTO(Stock stock) {
        if (stock == null) {
            return null;
        }

        Long productId = null;
        String productName = null;
        if (stock.getProduct() != null) {
            productId = stock.getProduct().getId();
            productName = stock.getProduct().getProductName();
        }

        Long shelfId = null;
        String shelfDescription = null;
        if (stock.getShelf() != null) {
            shelfId = stock.getShelf().getId();
            shelfDescription = stock.getShelf().getDescription();
        }

        return new StockDto(
                stock.getId(),
                stock.getQuantity(),
                productId,
                shelfId,
                productName,
                shelfDescription
        );
    }

    public static Stock mapToStock(StockDto dto, Product product, Shelf shelf) {
        if (dto == null) {
            return null;
        }

        Stock stock = new Stock();
        stock.setId(dto.getId());
        stock.setQuantity(dto.getQuantity());
        stock.setProduct(product);
        stock.setShelf(shelf);

        return stock;
    }
}
