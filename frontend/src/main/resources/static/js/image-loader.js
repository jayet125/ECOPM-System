// 图片加载器组件
class ImageLoader {
    constructor() {
        this.cache = new Map(); // 缓存已加载的图片
    }

    // 加载图片
    loadImage(src, alt, elementId) {
        return new Promise((resolve, reject) => {
            // 检查缓存
            if (this.cache.has(src)) {
                resolve(this.cache.get(src));
                return;
            }

            const img = new Image();

            img.onload = () => {
                this.cache.set(src, img);
                resolve(img);

                // 更新DOM元素
                if (elementId) {
                    const element = document.getElementById(elementId);
                    if (element) {
                        element.src = src;
                        element.style.opacity = 1;
                    }
                }
            };

            img.onerror = () => {
                console.warn(`图片加载失败: ${src}`);
                reject(new Error('图片加载失败'));

                // 使用默认图片
                if (elementId) {
                    const element = document.getElementById(elementId);
                    if (element) {
                        element.src = '../images/default/product.jpg';
                        element.alt = alt || '商品图片';
                    }
                }
            };

            img.src = src;
        });
    }

    // 预加载商品图片
    preloadProductImages(productIds) {
        const promises = [];

        productIds.forEach(id => {
            const src = `../images/products/${id}.jpg`;
            promises.push(this.loadImage(src, `商品${id}`));
        });

        return Promise.all(promises);
    }

    // 获取图片URL
    getProductImageUrl(productId, fallback = true) {
        const url = `../images/products/${productId}.jpg`;

        if (!fallback) return url;

        // 检查图片是否存在
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(url);
            img.onerror = () => resolve('../images/default/product.jpg');
            img.src = url;
        });
    }
}

// 创建全局图片加载器
const imageLoader = new ImageLoader();