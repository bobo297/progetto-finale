package com.RGM.FinalProject.repository;

import com.RGM.FinalProject.entity.Stock;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StockRepository extends JpaRepository<Stock, Long> {
}
