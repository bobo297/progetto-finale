package com.RGM.FinalProject.dto;

public class ProductDto {
    private Long id;

    private String productName;
    private String description;

    private Double unitPrice;

    public ProductDto() {
    }

    public ProductDto(Long id, String productName, String description, Double unitPrice) {
        this.id = id;
        this.productName = productName;
        this.description = description;
        this.unitPrice = unitPrice;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(Double unitPrice) {
        this.unitPrice = unitPrice;
    }
}
