package edu.ecopm.feign;


import edu.ecopm.entity.Product;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "product-service")
public interface ProductFeignClient {

    @GetMapping("/products/{id}")
    Product getProductById(@PathVariable("id") Long id);

    @GetMapping("/products/test")
    String test();
}
