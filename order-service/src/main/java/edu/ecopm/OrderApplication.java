package edu.ecopm;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
@EnableFeignClients
public class OrderApplication {

    public static void main(String[] args) {
        SpringApplication.run(OrderApplication.class, args);
        System.out.println("\n" +
                "╔══════════════════════════════════════════╗\n" +
                "║     🚀 订单服务启动成功！                    ║\n" +
                "║                                          ║\n" +
                "║  端口: 8083                               ║\n" +
                "║  服务名: order-service                     ║\n" +
                "║                                           ║\n" +
                "║  测试接口:                                 ║\n" +
                "║  http://localhost:8083/orders/test       ║\n" +
                "║  http://localhost:8083/orders            ║\n" +
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
