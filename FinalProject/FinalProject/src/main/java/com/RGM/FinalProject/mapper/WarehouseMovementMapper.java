package com.RGM.FinalProject.mapper;

import com.RGM.FinalProject.dto.WarehouseMovementDto;
import com.RGM.FinalProject.entity.Employee;
import com.RGM.FinalProject.entity.Product;
import com.RGM.FinalProject.entity.Shelf;
import com.RGM.FinalProject.entity.WarehouseMovement;

import java.time.LocalDateTime;

public class WarehouseMovementMapper {

    public static WarehouseMovementDto mapToWarehouseMovementDTO(WarehouseMovement wm) {
        WarehouseMovementDto dto = new WarehouseMovementDto();
        dto.setId(wm.getId());

        // Product
        dto.setProduct(wm.getProduct().getId());
        dto.setProductName(wm.getProduct().getProductName());

        // Employee
        dto.setEmployee(wm.getEmployee().getId());
        dto.setEmployeeFirstName(wm.getEmployee().getFirstName());
        dto.setEmployeeLastName(wm.getEmployee().getLastName());

        // Movement details
        dto.setQuantity(wm.getQuantity());
        dto.setMovementType(wm.getMovementType());
        dto.setDateTime(wm.getDateTime());

        // Shelf Origin (nullable)
        if (wm.getShelfOrigin() != null) {
            dto.setShelfOrigin(wm.getShelfOrigin().getId());
            dto.setShelfOriginDescription(wm.getShelfOrigin().getDescription());
        }

        // Shelf Destination (nullable)
        if (wm.getShelfDestination() != null) {
            dto.setShelfDestination(wm.getShelfDestination().getId());
            dto.setShelfDestinationDescription(wm.getShelfDestination().getDescription());
        }

        return dto;
    }

    public static WarehouseMovement mapToWarehouseMovement(WarehouseMovementDto dto, Product product, Shelf shelfOrigin, Shelf shelfDestination, Employee employee) {
        if (dto == null) {
            return null;
        }

        WarehouseMovement movement = new WarehouseMovement();
        movement.setId(dto.getId());
        movement.setQuantity(dto.getQuantity());

        // Gestione della data
        if (dto.getDateTime() == null) {
            movement.setDateTime(LocalDateTime.now());
        } else {
            movement.setDateTime(dto.getDateTime());
        }

        movement.setMovementType(dto.getMovementType());
        movement.setProduct(product);
        movement.setShelfOrigin(shelfOrigin);
        movement.setShelfDestination(shelfDestination);
        movement.setEmployee(employee);

        return movement;
    }
}
