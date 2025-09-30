package com.RGM.FinalProject.repository;

import com.RGM.FinalProject.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    boolean existsByFirstNameAndLastName(String firstName, String lastName);
    List<Employee> findByFirstNameAndLastName(String firstName, String lastName);
    Optional<Employee> findByEmail(String email);

}
