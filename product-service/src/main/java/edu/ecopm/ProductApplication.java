package edu.ecopm;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

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
    }// 在每个服务的启动类中添加以下方法
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:8080") // 前端运行的端口
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }



}


