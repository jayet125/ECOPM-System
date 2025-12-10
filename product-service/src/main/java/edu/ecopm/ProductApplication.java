package edu.ecopm;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class ProductApplication {

    public static void main(String[] args) {

        SpringApplication.run(ProductApplication.class, args);
        System.out.println("\n" +
                "╔══════════════════════════════════════════╗\n" +
                "║     🚀 商品服务启动成功:                    ║\n" +
                "║                                          ║\n" +
                "║  端口: 8082                               ║\n" +
                "║  服务名: product-service                  ║\n" +
                "║                                          ║\n" +
                "║  测试接口：                                ║\n" +
                "║  http://localhost:8082/product/test      ║\n" +
                "║  http://localhost:8082/product           ║\n" +
                "╚══════════════════════════════════════════╝\n");
    }

}


