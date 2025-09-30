package com.RGM.FinalProject.dto;

import com.RGM.FinalProject.entity.Warehouse;


public class ShelfDto {
    private Long id;

    private String description;
    private Long warehouseId;
    private String warehouseName;

    public ShelfDto() {
    }

    public ShelfDto(Long id, String description, Long warehouseId, String warehouseName) {
        this.id = id;
        this.description = description;
        this.warehouseId = warehouseId;
        this.warehouseName = warehouseName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getWarehouseId() {
        return warehouseId;
    }

    public void setWarehouseId(Long warehouseId) {
        this.warehouseId = warehouseId;
    }

    public String getWarehouseName() {
        return warehouseName;
    }

    public void setWarehouseName(String warehouseName) {
        this.warehouseName = warehouseName;
    }
}
