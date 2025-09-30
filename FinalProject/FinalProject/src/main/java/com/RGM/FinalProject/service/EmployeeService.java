package com.RGM.FinalProject.service;

import com.RGM.FinalProject.dto.EmployeeDto;
import com.RGM.FinalProject.entity.Employee;
import com.RGM.FinalProject.exception.InvalidInputException;
import com.RGM.FinalProject.exception.ResourceNotFoundException;
import com.RGM.FinalProject.mapper.EmployeeMapper;
import com.RGM.FinalProject.repository.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final PasswordEncoder passwordEncoder;

    public EmployeeService(EmployeeRepository employeeRepository, PasswordEncoder passwordEncoder) {
        this.employeeRepository = employeeRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public EmployeeDto saveEmployee(EmployeeDto employeeDto) {
        if (employeeDto != null && !employeeRepository.existsByFirstNameAndLastName(employeeDto.getFirstName(), employeeDto.getLastName())) {
            Employee employee = EmployeeMapper.mapToEmployee(employeeDto);
            employee.setPassword(passwordEncoder.encode(employee.getPassword()));
            Employee savedEmployee = employeeRepository.save(employee);
            return EmployeeMapper.mapToEmployeeDto(savedEmployee);
        } else {
            throw new InvalidInputException("Element is not valid");
        }
    }

    public List<EmployeeDto> getAllEmployees() {
            List<Employee> employees = employeeRepository.findAll();
            List<EmployeeDto> employeeDtos = new ArrayList<>();

            if (employees.isEmpty()) {
                throw new ResourceNotFoundException("No employees found");
            } else {
                for (Employee employee : employees) {
                    employeeDtos.add(EmployeeMapper.mapToEmployeeDto(employee));
                }
                return employeeDtos;
            }
    }

    public EmployeeDto getEmployeeById(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));
        return EmployeeMapper.mapToEmployeeDto(employee);
    }

    public EmployeeDto updateEmployee(Long id, EmployeeDto employeeDto) {
        Employee existingEmployee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));

        if (employeeDto.getFirstName() != null) {
            existingEmployee.setFirstName(employeeDto.getFirstName());
        }
        if (employeeDto.getLastName() != null) {
            existingEmployee.setLastName(employeeDto.getLastName());
        }
        if (employeeDto.getEmail() != null) {
            existingEmployee.setEmail(employeeDto.getEmail());
        }
        if (employeeDto.getPhoneNumber() != null) {
            existingEmployee.setPhoneNumber(employeeDto.getPhoneNumber());
        }
        if (employeeDto.getRole() != null) {
            try {
                Employee.Role roleEnum = Employee.Role.valueOf(employeeDto.getRole().toUpperCase());
                existingEmployee.setRole(roleEnum);
            } catch (IllegalArgumentException e) {
                throw new RuntimeException("Invalid role. Allowed roles: admin, manager, operator");
            }
        }
        if (employeeDto.getPassword() != null) {
            existingEmployee.setPassword(passwordEncoder.encode(employeeDto.getPassword()));
        }

        Employee updatedEmployee = employeeRepository.save(existingEmployee);
        return EmployeeMapper.mapToEmployeeDto(updatedEmployee);
    }

    public void deleteEmployeeById(Long id) {
        Employee existingEmployee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));
        employeeRepository.deleteById(existingEmployee.getId());
    }



}
