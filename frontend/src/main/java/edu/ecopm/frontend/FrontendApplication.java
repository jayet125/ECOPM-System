// 简化版启动类
package edu.ecopm.frontend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.annotation.Bean;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})

public class FrontendApplication {
    public static void main(String[] args) {
        SpringApplication.run(FrontendApplication.class, args);
        System.out.println("✅ 前端服务启动成功！");
        System.out.println("🌐 访问地址: http://localhost:8080");
        System.out.println("🔗 用户服务: http://localhost:8081");
        System.out.println("📦 商品服务: http://localhost:8082");
        System.out.println("📋 订单服务: http://localhost:8083");
    }


}