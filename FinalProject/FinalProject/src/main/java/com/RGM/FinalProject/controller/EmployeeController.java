package com.RGM.FinalProject.controller;

import com.RGM.FinalProject.dto.EmployeeDto;
import com.RGM.FinalProject.service.EmployeeService;
import org.springframework.security.core.Authentication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/api/warehouse_management")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }



    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/createEmployee")
    public ResponseEntity<String> saveEmployee(@RequestBody EmployeeDto employeeDto) {
        try {
            employeeService.saveEmployee(employeeDto);
            return ResponseEntity.status(HttpStatus.CREATED).body("Employee successfully created");
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'OPERATOR')")
    @GetMapping("/readEmployeeById/{id}")
    public ResponseEntity<EmployeeDto> getEmployeeById(@PathVariable Long id) {
        return ResponseEntity.ok(employeeService.getEmployeeById(id));
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'OPERATOR')")
    @GetMapping("/readAllEmployees")
    public ResponseEntity<List<EmployeeDto>> getAllEmployees() {
        return ResponseEntity.ok(employeeService.getAllEmployees());
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    @PutMapping("/updateEmployee/{id}")
    public ResponseEntity<String> updateEmployee(@PathVariable Long id, @RequestBody EmployeeDto employeeDto) {
        try {
            employeeService.updateEmployee(id, employeeDto);
            return ResponseEntity.ok("Employee successfully updated");
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/deleteEmployee/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable Long id) {
        try {
            employeeService.deleteEmployeeById(id);
            return ResponseEntity.ok("Employee successfully deleted");
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

}
