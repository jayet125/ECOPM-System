// 图片管理器
const ImageManager = {
    // 图片基础路径
    basePaths: {
        products: 'images/products/',
        default: 'images/default/',
        icons: 'images/icons/'
    },

    // 获取商品图片URL
    getProductImage(productId, productName = '') {
        const imagePath = `${this.basePaths.products}${productId}.jpg`;
        const defaultPath = `${this.basePaths.default}product.jpg`;

        // 返回一个可以处理错误的对象
        return {
            url: imagePath,
            fallback: defaultPath,
            alt: productName || `商品${productId}`,
            // 检查图片是否存在
            async exists() {
                try {
                    const response = await fetch(imagePath, { method: 'HEAD' });
                    return response.ok;
                } catch {
                    return false;
                }
            }
        };
    },

    // 预加载图片
    async preloadImages(imageUrls) {
        const promises = imageUrls.map(url => {
            return new Promise((resolve) => {
                const img = new Image();
                img.onload = resolve;
                img.onerror = resolve; // 即使加载失败也不影响
                img.src = url;
            });
        });

        await Promise.all(promises);
    },

    // 创建图片元素
    createImageElement(productId, productName, className = '') {
        const img = document.createElement('img');
        const imageInfo = this.getProductImage(productId, productName);

        img.src = imageInfo.url;
        img.alt = imageInfo.alt;
        img.loading = 'lazy';
        img.className = className;

        // 错误处理
        img.onerror = function() {
            this.onerror = null;
            this.src = imageInfo.fallback;
            this.classList.add('default-image');

            // 如果还是加载失败，显示图标
            this.onerror = function() {
                this.style.display = 'none';
                const fallbackDiv = document.createElement('div');
                fallbackDiv.className = 'image-fallback';
                fallbackDiv.innerHTML = `<i class="fas fa-box"></i><span>${productName}</span>`;
                this.parentNode.appendChild(fallbackDiv);
            };
        };

        return img;
    },

    // 批量更新图片
    async updateAllProductImages() {
        const productImages = document.querySelectorAll('img[data-product-id]');

        for (const img of productImages) {
            const productId = img.dataset.productId;
            const productName = img.dataset.productName || '';
            const imageInfo = this.getProductImage(productId, productName);

            // 检查图片是否存在
            const exists = await imageInfo.exists();
            if (!exists) {
                img.src = imageInfo.fallback;
            }
        }
    }
};

// 图片加载优化
document.addEventListener('DOMContentLoaded', function() {
    // 延迟加载图片
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');

        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }
});