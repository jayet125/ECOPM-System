package edu.ecopm.service;

import edu.ecopm.entity.Order;
import edu.ecopm.entity.OrderItem;
import edu.ecopm.feign.ProductFeignClient;
import edu.ecopm.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductFeignClient productFeignClient;

    @Transactional
    public Order createOrder(Long userId, Long productId,Integer quantity,
        String reveiverName,String receiverPhone,String receiverAddress   ){

        try{
            edu.ecopm.entity.Product product = productFeignClient.getProductById(productId);

            if (product== null){
                throw new RuntimeException("商品不存在");
            }
            BigDecimal totalAmount = product.getPrice().multiply(new BigDecimal(quantity));

            Order order =new Order();
            order.setUserId(userId);
            order.setOrderNo(generateOrderNo());
            order.setTotalAmount(totalAmount);
            order.setReceiverName(reveiverName);
            order.setReceiverPhone(receiverPhone);
            order.setReceiverAddress(receiverAddress);

            Order savedOrder = orderRepository.save(order);

            OrderItem orderItem = new OrderItem();
            orderItem.setOrderId(savedOrder.getId());
            orderItem.setProductId(productId);
            orderItem.setProductName(product.getName());
            orderItem.setPrice(product.getPrice());
            orderItem.setQuantity(quantity);

            return savedOrder;

        } catch (Exception e) {
            throw new RuntimeException("创建订单失败："+e.getMessage());
        }
    }

    public List<Order> getAllOrders(){
        return orderRepository.findAll();
    }

    public List<Order> getOrdersBtyUserId(Long userId){
        return orderRepository.findByUserId(userId);
    }

    public Order getOrderByOrderNo(String orderNo){
        return orderRepository.findByOrderNo(orderNo);
    }

    private String generateOrderNo(){
        return "ORDER_"+System.currentTimeMillis()+ UUID.randomUUID().toString().substring(0,8).toUpperCase();
    }

    public String testFeign(){
        return productFeignClient.test();
    }

}
