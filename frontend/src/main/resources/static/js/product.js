// 在ProductService类中添加图片处理方法
class ProductService {
    constructor() {
        this.products = [];
        this.categories = ['全部', '电子产品', '服装', '食品', '书籍'];
        this.currentCategory = 'all';
    }

    // 获取本地图片路径
    getLocalImagePath(productId, category) {
        // 构建图片路径
        const basePath = '../images/products/';
        const defaultImage = '../images/default/product.jpg';

        // 尝试加载对应ID的图片
        const imagePath = `${basePath}${productId}.jpg`;

        // 返回图片路径（如果图片不存在，前端会显示默认图片）
        return imagePath;
    }

    // 渲染商品卡片
    renderProductCard(product) {
        const imagePath = this.getLocalImagePath(product.id, product.category);

        return `
            <div class="product-card">
                <div class="product-image">
                    <img src="${imagePath}" 
                         alt="${product.name}"
                         loading="lazy"
                         onerror="this.onerror=null; this.src='../images/default/product.jpg'; this.classList.add('default-image'); this.innerHTML='<i class=\"fas fa-box\"></i><span>${product.name}</span>'">
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description || '暂无商品描述'}</p>
                    <div class="product-price">
                        <i class="fas fa-tag"></i> ¥${product.price}
                    </div>
                    <div class="product-meta">
                        <span class="stock-badge">
                            <i class="fas fa-cubes"></i> 库存: ${product.stock}
                        </span>
                        <span class="category-badge">
                            <i class="fas fa-folder"></i> ${product.category}
                        </span>
                    </div>
                    <div class="product-actions">
                        <button class="btn btn-secondary btn-small" 
                                onclick="productService.showProductDetail(${product.id})">
                            <i class="fas fa-info-circle"></i> 详情
                        </button>
                        <button class="btn btn-primary btn-small" 
                                onclick="cart.addItem(${JSON.stringify(product).replace(/"/g, '&quot;')})">
                            <i class="fas fa-cart-plus"></i> 加入购物车
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    renderProducts() {
        const container = document.getElementById('products-grid');
        if (!container) return;

        // 显示加载动画
        container.innerHTML = `
            <div class="loading-container" style="grid-column: 1/-1; text-align: center; padding: 50px;">
                <div class="loading-spinner">
                    <i class="fas fa-spinner fa-spin fa-3x" style="color: #FF9800;"></i>
                </div>
                <p style="margin-top: 20px; color: #666;">正在加载商品，请稍候...</p>
            </div>
        `;

        if (this.products.length === 0) {
            container.innerHTML = `
                <div class="empty-products" style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
                    <i class="fas fa-box-open fa-4x" style="color: #FFE0B2; margin-bottom: 20px;"></i>
                    <h3 style="color: #666; margin-bottom: 10px;">暂无商品</h3>
                    <p style="color: #999; margin-bottom: 30px;">请稍后再来查看</p>
                    <button class="btn btn-primary" onclick="location.reload()">
                        <i class="fas fa-redo"></i> 刷新页面
                    </button>
                </div>
            `;
            return;
        }

        let html = '';
        const filteredProducts = this.currentCategory === 'all'
            ? this.products
            : this.products.filter(p => p.category === this.currentCategory);

        if (filteredProducts.length === 0) {
            html = `
                <div class="no-products" style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
                    <i class="fas fa-search fa-4x" style="color: #FFE0B2; margin-bottom: 20px;"></i>
                    <h3 style="color: #666; margin-bottom: 10px;">未找到相关商品</h3>
                    <p style="color: #999;">请尝试其他分类或搜索关键词</p>
                </div>
            `;
        } else {
            filteredProducts.forEach(product => {
                html += this.renderProductCard(product);
            });
        }

        container.innerHTML = html;
    }
    // 添加商品详情图片处理
    async showProductDetail(productId) {
        try {
            const product = await api.product.getById(productId);
            const modal = document.getElementById('product-modal');
            const content = document.getElementById('modal-product-detail');

            // 获取本地图片路径
            const imagePath = this.getLocalImagePath(product.id, product.category);

            content.innerHTML = `
            <div class="product-detail-modal">
                <div class="detail-images">
                    <div class="main-image">
                        <img src="${imagePath}" 
                             alt="${product.name}"
                             onerror="this.onerror=null; this.src='../images/default/product.jpg';">
                    </div>
                </div>
                <div class="detail-info">
                    <div class="detail-header">
                        <h2>${product.name}</h2>
                        <div class="detail-price">¥${product.price}</div>
                    </div>
                    <div class="detail-category">
                        <span class="badge category-badge">
                            <i class="fas fa-tag"></i> ${product.category}
                        </span>
                    </div>
                    <div class="detail-description">
                        <h4><i class="fas fa-file-alt"></i> 商品描述</h4>
                        <p>${product.description || '暂无详细描述'}</p>
                    </div>
                    <div class="detail-specs">
                        <div class="spec-item">
                            <i class="fas fa-cubes"></i>
                            <span>库存: ${product.stock} 件</span>
                        </div>
                        <div class="spec-item">
                            <i class="fas fa-barcode"></i>
                            <span>商品ID: ${product.id}</span>
                        </div>
                    </div>
                    <div class="detail-actions">
                        <div class="quantity-selector">
                            <label>数量:</label>
                            <div class="quantity-control">
                                <button class="quantity-btn minus" onclick="changeQuantity(-1)">-</button>
                                <input type="number" id="detail-quantity" value="1" min="1" max="${product.stock}">
                                <button class="quantity-btn plus" onclick="changeQuantity(1)">+</button>
                            </div>
                        </div>
                        <button class="btn btn-primary btn-large" 
                                onclick="addToCartFromDetail(${JSON.stringify(product).replace(/"/g, '&quot;')})">
                            <i class="fas fa-cart-plus"></i> 加入购物车
                        </button>
                    </div>
                </div>
            </div>
        `;

            modal.style.display = 'block';

            // 关闭模态框
            const closeBtn = document.querySelector('.close-modal');
            closeBtn.onclick = () => modal.style.display = 'none';
            window.onclick = (event) => {
                if (event.target === modal) {
                    modal.style.display = 'none';
                }
            };

            // 数量调整函数
            window.changeQuantity = function(delta) {
                const input = document.getElementById('detail-quantity');
                let value = parseInt(input.value) || 1;
                value += delta;
                if (value < 1) value = 1;
                if (value > product.stock) value = product.stock;
                input.value = value;
            };
        } catch (error) {
            console.error('加载商品详情失败:', error);
            this.showNotification('加载商品详情失败', 'error');
        }
    }
}