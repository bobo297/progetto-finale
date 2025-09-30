package com.RGM.FinalProject.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "warehouse_movement")
public class WarehouseMovement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer quantity;
    private LocalDateTime dateTime;
    private String movementType;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne(optional = true)
    @JoinColumn(name = "shelf_origin_id")
    private Shelf shelfOrigin;

    @ManyToOne
    @JoinColumn(name = "shelf_destination_id")
    private Shelf shelfDestination;

    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;

    public WarehouseMovement() {
    }

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

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Shelf getShelfOrigin() {
        return shelfOrigin;
    }

    public void setShelfOrigin(Shelf shelfOrigin) {
        this.shelfOrigin = shelfOrigin;
    }

    public Shelf getShelfDestination() {
        return shelfDestination;
    }

    public void setShelfDestination(Shelf shelfDestination) {
        this.shelfDestination = shelfDestination;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }
}
