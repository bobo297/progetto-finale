package com.RGM.FinalProject.mapper;

import com.RGM.FinalProject.dto.WarehouseDto;
import com.RGM.FinalProject.entity.Shelf;
import com.RGM.FinalProject.entity.Warehouse;

import java.util.ArrayList;
import java.util.List;


public class WarehouseMapper {
    public static WarehouseDto maptoWarehouseDTO(Warehouse warehouse) {
        if (warehouse == null) {
            return null;
        }

        /*

        List<Long> shelfIds;

        if (warehouse.getShelves() != null) {
            shelfIds = new ArrayList<>();
            for (Shelf shelf : warehouse.getShelves()) {
                shelfIds.add(shelf.getId());
            }
        } else {
            shelfIds = null;
        }

        */

        return new WarehouseDto(
                warehouse.getId(),
                warehouse.getWarehouseName(),
                warehouse.getAddress(),
                warehouse.getDescription()

        );
    }


    public static Warehouse mapToWarehouse(WarehouseDto dto) {
        if (dto == null) {
            return null;
        }

        Warehouse warehouse = new Warehouse();
        warehouse.setId(dto.getId());
        warehouse.setWarehouseName(dto.getWarehouseName());
        warehouse.setAddress(dto.getAddress());
        warehouse.setDescription(dto.getDescription());
        //warehouse.setShelves(warehouse.getShelves());

        return warehouse;
    }
}
