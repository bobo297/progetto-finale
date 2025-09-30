package com.RGM.FinalProject.mapper;

import com.RGM.FinalProject.dto.EmployeeDto;
import com.RGM.FinalProject.entity.Employee;

public class EmployeeMapper {

    public static EmployeeDto mapToEmployeeDto(Employee employee){
        if (employee == null) return null;
        return new EmployeeDto(
                employee.getId(),
                employee.getFirstName(),
                employee.getLastName(),
                employee.getEmail(),
                employee.getRole().toString(),
                employee.getPhoneNumber(),
                employee.getPassword()
        );
    }
    /*
    public static Employee mapToEmployee(EmployeeDto employeeDto){

        if (employeeDto == null) return null;

        Employee employee = new Employee();
        employee.setId(employeeDto.getId());
        employee.setFirstName(employeeDto.getFirstName());
        employee.setLastName(employeeDto.getLastName());
        employee.setEmail(employeeDto.getEmail());
        employee.setRole(employeeDto.getRole());
        employee.setPhoneNumber(employeeDto.getPhoneNumber()); // stesso qui
        employee.setPassword(employeeDto.getPassword());

        return employee;
    }
     */

    public static Employee mapToEmployee(EmployeeDto employeeDto) {
        if (employeeDto == null) return null;

        Employee employee = new Employee();
        employee.setId(employeeDto.getId());
        employee.setFirstName(employeeDto.getFirstName());
        employee.setLastName(employeeDto.getLastName());
        employee.setEmail(employeeDto.getEmail());

        try {
            Employee.Role roleEnum = Employee.Role.valueOf(employeeDto.getRole().toUpperCase());
            employee.setRole(roleEnum);
        } catch (IllegalArgumentException | NullPointerException e) {
            throw new RuntimeException("Invalid role. Allowed roles: admin, manager, operator");
        }

        employee.setPhoneNumber(employeeDto.getPhoneNumber());
        employee.setPassword(employeeDto.getPassword());

        return employee;
    }
}
