// js/cart.js
class CartService {
    constructor() {
        this.items = this.loadCart();
    }

    loadCart() {
        const cartStr = localStorage.getItem(CONFIG.STORAGE_KEYS.CART_ITEMS);
        return cartStr ? JSON.parse(cartStr) : [];
    }

    saveCart() {
        localStorage.setItem(CONFIG.STORAGE_KEYS.CART_ITEMS, JSON.stringify(this.items));
        this.updateCartCount();
    }

    addItem(product, quantity = 1) {
        const existingItem = this.items.find(item => item.productId === product.id);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({
                productId: product.id,
                name: product.name,
                price: product.price,
                quantity: quantity,
                image: product.image || 'images/default-product.jpg',
                category: product.category
            });
        }

        this.saveCart();
        this.showNotification(`${product.name} 已添加到购物车`);
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.productId !== productId);
        this.saveCart();
    }

    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.productId === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = quantity;
                this.saveCart();
            }
        }
    }

    clearCart() {
        this.items = [];
        this.saveCart();
    }

    getTotalPrice() {
        return this.items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    }

    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    updateCartCount() {
        const cartCountEls = document.querySelectorAll('.cart-count');
        const totalItems = this.getTotalItems();

        cartCountEls.forEach(el => {
            el.textContent = totalItems;
            el.style.display = totalItems > 0 ? 'inline-block' : 'none';
        });
    }

    showNotification(message) {
        // 创建通知元素
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <span>✅ ${message}</span>
            <a href="pages/cart.html" class="btn btn-small">查看购物车</a>
        `;

        // 添加到页面
        document.body.appendChild(notification);

        // 3秒后移除
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    renderCart() {
        const cartContainer = document.getElementById('cart-container');
        if (!cartContainer) return;

        if (this.items.length === 0) {
            cartContainer.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <h3>购物车是空的</h3>
                    <p>快去挑选心仪的商品吧！</p>
                    <a href="pages/products.html" class="btn btn-primary">去购物</a>
                </div>
            `;
            return;
        }

        let html = `
            <div class="cart-items">
                <table class="cart-table">
                    <thead>
                        <tr>
                            <th>商品</th>
                            <th>单价</th>
                            <th>数量</th>
                            <th>小计</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
        `;

        this.items.forEach(item => {
            const subtotal = item.price * item.quantity;
            html += `
                <tr>
                    <td>
                        <div class="cart-item-info">
                            <img src="${item.image}" alt="${item.name}" width="80">
                            <div>
                                <h4>${item.name}</h4>
                                <p class="text-muted">${item.category}</p>
                            </div>
                        </div>
                    </td>
                    <td>¥${item.price.toFixed(2)}</td>
                    <td>
                        <div class="quantity-control">
                            <button class="btn-qty minus" onclick="cart.updateQuantity(${item.productId}, ${item.quantity - 1})">-</button>
                            <input type="number" value="${item.quantity}" min="1" 
                                   onchange="cart.updateQuantity(${item.productId}, this.value)">
                            <button class="btn-qty plus" onclick="cart.updateQuantity(${item.productId}, ${item.quantity + 1})">+</button>
                        </div>
                    </td>
                    <td class="text-bold">¥${subtotal.toFixed(2)}</td>
                    <td>
                        <button class="btn-remove" onclick="cart.removeItem(${item.productId})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        });

        html += `
                    </tbody>
                </table>
                
                <div class="cart-summary">
                    <div class="summary-details">
                        <div class="summary-row">
                            <span>商品总数:</span>
                            <span>${this.getTotalItems()} 件</span>
                        </div>
                        <div class="summary-row">
                            <span>商品总价:</span>
                            <span>¥${this.getTotalPrice().toFixed(2)}</span>
                        </div>
                        <div class="summary-row total">
                            <span>应付总额:</span>
                            <span class="total-price">¥${this.getTotalPrice().toFixed(2)}</span>
                        </div>
                    </div>
                    <div class="cart-actions">
                        <a href="pages/products.html" class="btn btn-secondary">继续购物</a>
                        <a href="pages/checkout.html" class="btn btn-primary">去结算</a>
                    </div>
                </div>
            </div>
        `;

        cartContainer.innerHTML = html;
    }
    // 获取购物车商品的本地图片
    getCartItemImage(productId, category) {
        // 根据商品ID和分类获取本地图片
        const basePath = '../images/products/';
        const defaultImage = '../images/default/product.jpg';

        // 返回图片路径
        return `${basePath}${productId}.jpg`;
    }

    // 渲染购物车项目
    renderCartItem(item) {
        const imagePath = this.getCartItemImage(item.productId, item.category);

        return `
            <tr>
                <td>
                    <div class="cart-item">
                        <div class="cart-item-image">
                            <img src="${imagePath}" 
                                 alt="${item.name}"
                                 loading="lazy"
                                 onerror="this.onerror=null; this.src='../images/default/product.jpg'; this.classList.add('default-image'); this.innerHTML='<i class=\"fas fa-box\"></i>'">
                        </div>
                        <div class="cart-item-info">
                            <h4>${item.name}</h4>
                            <p class="text-muted">${item.category}</p>
                        </div>
                    </div>
                </td>
                <td>¥${item.price.toFixed(2)}</td>
                <td>
                    <div class="quantity-control">
                        <button class="quantity-btn minus" 
                                onclick="cart.updateQuantity(${item.productId}, ${item.quantity - 1})">
                            <i class="fas fa-minus"></i>
                        </button>
                        <input type="number" class="quantity-input" 
                               value="${item.quantity}" min="1"
                               onchange="cart.updateQuantity(${item.productId}, this.value)">
                        <button class="quantity-btn plus" 
                                onclick="cart.updateQuantity(${item.productId}, ${item.quantity + 1})">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </td>
                <td class="price">¥${(item.price * item.quantity).toFixed(2)}</td>
                <td>
                    <button class="remove-btn" onclick="cart.removeItem(${item.productId})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    }
}

// 创建全局购物车实例
const cart = new CartService();