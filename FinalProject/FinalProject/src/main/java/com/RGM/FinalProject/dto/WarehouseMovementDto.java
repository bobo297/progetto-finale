package com.RGM.FinalProject.dto;

import java.time.LocalDateTime;

public class WarehouseMovementDto {
    private Long id;
    private Integer quantity;
    private LocalDateTime dateTime;
    private String movementType;
    private Long product;
    private Long shelfOrigin; // nullable
    private Long shelfDestination;
    private Long employee;

    // Nomi leggibili
    private String productName;
    private String employeeFirstName;
    private String employeeLastName;
    private String shelfOriginDescription; // Nome della shelf origin
    private String shelfDestinationDescription; // Nome della shelf destination

    public WarehouseMovementDto() {
    }

    public WarehouseMovementDto(Long id, Integer quantity, LocalDateTime dateTime, String movementType,
                                Long product, Long shelfOrigin, Long shelfDestination, String productName,
                                Long employee, String employeeFirstName, String employeeLastName,
                                String shelfOriginDescription, String shelfDestinationDescription) {
        this.id = id;
        this.quantity = quantity;
        this.dateTime = dateTime;
        this.movementType = movementType;
        this.product = product;
        this.shelfOrigin = shelfOrigin;
        this.shelfDestination = shelfDestination;
        this.productName = productName;
        this.employee = employee;
        this.employeeFirstName = employeeFirstName;
        this.employeeLastName = employeeLastName;
        this.shelfOriginDescription = shelfOriginDescription;
        this.shelfDestinationDescription = shelfDestinationDescription;
    }

    // Getters e setters esistenti
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public LocalDateTime getDateTime() {
        return dateTime;
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }

    public String getMovementType() {
        return movementType;
    }

    public void setMovementType(String movementType) {
        this.movementType = movementType;
    }

    public Long getProduct() {
        return product;
    }

    public void setProduct(Long product) {
        this.product = product;
    }

    public Long getShelfOrigin() {
        return shelfOrigin;
    }

    public void setShelfOrigin(Long shelfOrigin) {
        this.shelfOrigin = shelfOrigin;
    }

    public Long getShelfDestination() {
        return shelfDestination;
    }

    public void setShelfDestination(Long shelfDestination) {
        this.shelfDestination = shelfDestination;
    }

    public Long getEmployee() {
        return employee;
    }

    public void setEmployee(Long employee) {
        this.employee = employee;
    }

    public String getEmployeeFirstName() {
        return employeeFirstName;
    }

    public void setEmployeeFirstName(String employeeFirstName) {
        this.employeeFirstName = employeeFirstName;
    }

    public String getEmployeeLastName() {
        return employeeLastName;
    }

    public void setEmployeeLastName(String employeeLastName) {
        this.employeeLastName = employeeLastName;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    // Nuovi getters e setters per le shelf descriptions
    public String getShelfOriginDescription() {
        return shelfOriginDescription;
    }

    public void setShelfOriginDescription(String shelfOriginDescription) {
        this.shelfOriginDescription = shelfOriginDescription;
    }

    public String getShelfDestinationDescription() {
        return shelfDestinationDescription;
    }

    public void setShelfDestinationDescription(String shelfDestinationDescription) {
        this.shelfDestinationDescription = shelfDestinationDescription;
    }
}