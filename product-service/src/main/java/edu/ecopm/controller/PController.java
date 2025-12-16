package edu.ecopm.controller;


import edu.ecopm.entity.Product;
import edu.ecopm.service.PService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/products")
public class PController {
   private final PService pService;

   @Autowired
    public PController(PService pService) {
        this.pService = pService;
    }

    @GetMapping("/test")
    public String test() {
        return "产品服务API测试成功！";
    }
    @GetMapping("/ping")
    public String ping() {
        return "Pong! 服务时间：" + new java.util.Date();
    }
    @GetMapping("/info")
    public String info() {
        return "可用";
    }
    @GetMapping
    public List<Product> getAllProducts(){
       return pService.getAllProducts();
    }

    @PostMapping
    public Product addProduct(@RequestBody Product product){
       return pService.addProduct(product);
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Integer id){
       return pService.getProductById(id);
    }

    @GetMapping("/category/{category}")
    public List<Product> getProductsByCategory(@PathVariable String category){
       return pService.getProductsByCategory(category);
    }




}
