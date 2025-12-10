package edu.ecopm.service;

import edu.ecopm.entity.Product;
import edu.ecopm.repository.PRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PService {

    @Autowired
    private PRepository prepository;

    public Product addProduct(Product product){
        return prepository.save(product);
    }

    public Product getProductById(Integer id){
        return prepository.findById(id).orElse(null);
    }

    public List<Product> getAllProducts(){
        return prepository.findAll();
    }

    public List<Product> getProductsByCategory(String category){
        return prepository.findByCategory(category);
    }

    public Product updateStock(Integer id, Integer quantity){
        Product product = getProductById(id);
        if (product != null){
            product.setStock(product.getStock() - quantity);
            return prepository.save(product);
        }
        return null;
    }

}
