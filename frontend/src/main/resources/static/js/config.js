// js/config.js
const CONFIG = {
    // API 基础配置
    API_BASE_URL: 'http://localhost:8081',  // User Service
    PRODUCT_API_BASE: 'http://localhost:8082/api/product',
    ORDER_API_BASE: 'http://localhost:8083/api/orders',

    // 本地存储键名
    STORAGE_KEYS: {
        USER_TOKEN: 'user_token',
        USER_INFO: 'user_info',
        CART_ITEMS: 'cart_items',
        CURRENT_USER_ID: 'current_user_id'
    },

    // 状态码
    STATUS_CODES: {
        SUCCESS: 200,
        CREATED: 201,
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        NOT_FOUND: 404,
        SERVER_ERROR: 500
    },

    // 订单状态映射
    ORDER_STATUS: {
        0: '待支付',
        1: '已支付',
        2: '已发货',
        3: '已完成',
        4: '已取消',
        5: '退款中'
    }
};

// 全局变量
let currentUser = null;
let cartItems = [];

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    loadUserInfo();
    loadCart();
});