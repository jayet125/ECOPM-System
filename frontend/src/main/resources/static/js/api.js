// js/api.js - 统一的API调用封装
const API = {
    baseURL: {
        user: 'http://localhost:8081',
        product: 'http://localhost:8082',
        order: 'http://localhost:8083'
    },

    // 用户服务API
    user: {
        async register(userData) {
            const response = await fetch(`${API.baseURL.user}/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });
            return await response.text();
        },

        async login(username, password) {
            const response = await fetch(
                `${API.baseURL.user}/users/login?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                }
            );
            return await response.text();
        },

        async getAllUsers() {
            const response = await fetch(`${API.baseURL.user}/users/getUser`);
            return await response.json();
        },

        async getUserById(id) {
            const response = await fetch(`${API.baseURL.user}/users/getUserById?id=${id}`);
            return await response.json();
        },

        async test() {
            const response = await fetch(`${API.baseURL.user}/users/test`);
            return await response.text();
        }
    },

    // 商品服务API
    product: {
        async getAll() {
            try {
                const response = await fetch(`${API.baseURL.product}/products`);
                if (!response.ok) throw new Error('获取商品失败');
                return await response.json();
            } catch (error) {
                console.error('获取商品列表失败:', error);
                return [];
            }
        },

        async getById(id) {
            const response = await fetch(`${API.baseURL.product}/products/${id}`);
            return await response.json();
        },

        async getByCategory(category) {
            const response = await fetch(`${API.baseURL.product}/products/category/${category}`);
            return await response.json();
        },

        async addProduct(product) {
            const response = await fetch(`${API.baseURL.product}/products`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product)
            });
            return await response.json();
        },

        async test() {
            const response = await fetch(`${API.baseURL.product}/products/test`);
            return await response.text();
        }
    },

    // 订单服务API
    order: {
        async create(orderData) {
            const response = await fetch(`${API.baseURL.order}/orders/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData)
            });
            return await response.json();
        },

        async getAll() {
            const response = await fetch(`${API.baseURL.order}/orders`);
            return await response.json();
        },

        async getByUserId(userId) {
            const response = await fetch(`${API.baseURL.order}/orders/user/${userId}`);
            return await response.json();
        },

        async test() {
            const response = await fetch(`${API.baseURL.order}/orders/test`);
            return await response.text();
        }
    },

    // 测试所有服务
    async testAllServices() {
        console.log('正在测试所有服务连接...');

        const results = {
            user: await this.testService('用户服务', this.user.test),
            product: await this.testService('商品服务', this.product.test),
            order: await this.testService('订单服务', this.order.test)
        };

        console.log('服务连接测试完成:', results);
        return results;
    },

    async testService(name, testFunc) {
        try {
            const result = await testFunc();
            console.log(`✅ ${name} 连接成功:`, result);
            return { success: true, message: result };
        } catch (error) {
            console.error(`❌ ${name} 连接失败:`, error);
            return { success: false, error: error.message };
        }
    }
};

// 全局API对象
window.api = API;