package com.RGM.FinalProject.dto;

import com.RGM.FinalProject.entity.Shelf;

import java.util.List;

public class WarehouseDto {

    private Long id;

    private String warehouseName;
    private String address;
    private String description;

    //private List<Shelf> shelves;

    public WarehouseDto() {
    }

    public WarehouseDto(Long id, String warehouseName, String address, String description) {
        this.id = id;
        this.warehouseName = warehouseName;
        this.address = address;
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getWarehouseName() {
        return warehouseName;
    }

    public void setWarehouseName(String warehouseName) {
        this.warehouseName = warehouseName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
