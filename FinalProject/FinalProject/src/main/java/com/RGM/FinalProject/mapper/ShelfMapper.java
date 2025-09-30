package com.RGM.FinalProject.mapper;

import com.RGM.FinalProject.dto.ShelfDto;
import com.RGM.FinalProject.entity.Shelf;
import com.RGM.FinalProject.entity.Warehouse;

public class ShelfMapper {

    public static ShelfDto mapToShelfDTO(Shelf shelf) {
        ShelfDto dto = new ShelfDto();
        dto.setId(shelf.getId());
        dto.setDescription(shelf.getDescription());
        if (shelf.getWarehouse() != null) {
            dto.setWarehouseId(shelf.getWarehouse().getId());
            dto.setWarehouseName(shelf.getWarehouse().getWarehouseName());
            // optionally dto.setWarehouseName(shelf.getWarehouse().getWarehouseName());
        }
        return dto;
    }


    public static Shelf mapToShelf(ShelfDto dto,Warehouse warehouse) {
        if (dto == null) {
            return null;
        }

        Shelf shelf = new Shelf();
        shelf.setId(dto.getId());
        shelf.setDescription(dto.getDescription());
        shelf.setWarehouse(warehouse);

        return shelf;
    }
}
