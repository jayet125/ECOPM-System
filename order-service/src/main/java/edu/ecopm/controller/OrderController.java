package edu.ecopm.controller;


import edu.ecopm.entity.Order;
import edu.ecopm.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping("test")
    public String test(){
        return "✅ 订单服务API测试成功！";
    }

    @GetMapping("/feign-test")
    public String testFeign(){
        return orderService.testFeign();
    }

    @PostMapping("/create")
    public Order createOrder(
            @RequestParam Long userId,
            @RequestParam Long productId,
            @RequestParam Integer quantity,
            @RequestParam String reveiverName,
            @RequestParam String receiverPhone,
            @RequestParam String receiverAddress
    ){
        return orderService.createOrder(userId, productId, quantity, reveiverName, receiverPhone, receiverAddress);
    }

    @GetMapping
    public List<Order> getAllOrders(){
        return orderService.getAllOrders();
    }

    @GetMapping("/user/{userId}")
    public List<Order> getOrdersBtyUserId(@PathVariable Long userId){
        return orderService.getOrdersBtyUserId(userId);
    }

    @GetMapping("/orderNo/{orderNo}")
    public Order getOrderByOrderNo(@PathVariable String orderNo){
        return orderService.getOrderByOrderNo(orderNo);
    }

    @PostMapping("/create-test")
    public String createOrderTest( ){
      try {
          Order order = orderService.createOrder(1L, 1L, 1, "张三", "12345678901", "中国");
          return "订单创建成功！订单号：" + order.getOrderNo();
      } catch (Exception e) {
          return "订单创建失败！" + e.getMessage();
      }
    }

}
