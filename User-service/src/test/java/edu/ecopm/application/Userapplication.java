package edu.ecopm.application;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "edu.ecopm.repository")

public class Userapplication {
    public static void main(String[] args) {
        SpringApplication.run(Userapplication.class,args);
        System.out.println("启动成功");
    }
}

