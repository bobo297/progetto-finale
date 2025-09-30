package com.RGM.FinalProject.dto;

import com.RGM.FinalProject.entity.Product;
import com.RGM.FinalProject.entity.Shelf;
import jakarta.persistence.ManyToOne;

public class StockDto {
    private Long id;
    private int quantity;
    private Long product;
    private Long shelf;

    private String productName;
    private String shelfDescription;

    public StockDto() {
    }

    public StockDto(Long id, int quantity, Long product, Long shelf, String productName, String shelfDescription) {
        this.id = id;
        this.quantity = quantity;
        this.product = product;
        this.shelf = shelf;
        this.productName = productName;
        this.shelfDescription = shelfDescription;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Long getProduct() {
        return product;
    }

    public void setProduct(Long product) {
        this.product = product;
    }

    public Long getShelf() {
        return shelf;
    }

    public void setShelf(Long shelf) {
        this.shelf = shelf;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getShelfDescription() {
        return shelfDescription;
    }

    public void setShelfDescription(String shelfDescription) {
        this.shelfDescription = shelfDescription;
    }
}
