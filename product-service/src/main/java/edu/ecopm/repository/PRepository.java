package edu.ecopm.repository;

import edu.ecopm.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PRepository extends JpaRepository<Product,Integer> {

    List<Product> findByCategory(String category);
    List<Product> findByNameContaining(String name);

}
