// js/auth.js
class AuthService {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    init() {
        this.loadUserFromStorage();
        this.checkLoginStatus();
    }

    loadUserFromStorage() {
        const userStr = localStorage.getItem(CONFIG.STORAGE_KEYS.USER_INFO);
        const userId = localStorage.getItem(CONFIG.STORAGE_KEYS.CURRENT_USER_ID);

        if (userStr && userId) {
            this.currentUser = JSON.parse(userStr);
            this.currentUser.id = parseInt(userId);
        }
    }

    saveUserToStorage(user) {
        if (user) {
            localStorage.setItem(CONFIG.STORAGE_KEYS.USER_INFO, JSON.stringify(user));
            localStorage.setItem(CONFIG.STORAGE_KEYS.CURRENT_USER_ID, user.id);
        }
    }

    async login(username, password) {
        try {
            const result = await api.user.login(username, password);
            if (result === '登录成功') {
                // 获取用户信息
                const users = await api.user.getAllUsers();
                const user = users.find(u => u.username === username);

                if (user) {
                    this.currentUser = user;
                    this.saveUserToStorage(user);
                    this.showLoginStatus();
                    return { success: true, user };
                }
            }
            return { success: false, message: '用户名或密码错误' };
        } catch (error) {
            console.error('登录失败:', error);
            return { success: false, message: '登录失败，请检查网络连接' };
        }
    }

    async register(userData) {
        try {
            const result = await api.user.register(userData);
            if (result === '注册成功') {
                return { success: true, message: '注册成功' };
            }
            return { success: false, message: result };
        } catch (error) {
            console.error('注册失败:', error);
            return { success: false, message: '注册失败' };
        }
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem(CONFIG.STORAGE_KEYS.USER_INFO);
        localStorage.removeItem(CONFIG.STORAGE_KEYS.CURRENT_USER_ID);
        this.showLoginStatus();
        window.location.href = 'index.html';
    }

    isLoggedIn() {
        return !!this.currentUser;
    }

    getCurrentUser() {
        return this.currentUser;
    }

    checkLoginStatus() {
        if (!this.isLoggedIn()) {
            // 如果不在登录页面，重定向到登录页
            if (!window.location.pathname.includes('login.html') &&
                !window.location.pathname.includes('register.html')) {
                window.location.href = 'pages/login.html';
            }
        }
    }

    showLoginStatus() {
        const userInfoEl = document.getElementById('user-info');
        const loginBtn = document.getElementById('login-btn');
        const logoutBtn = document.getElementById('logout-btn');
        const userGreeting = document.getElementById('user-greeting');

        if (this.isLoggedIn()) {
            if (userInfoEl) userInfoEl.style.display = 'block';
            if (loginBtn) loginBtn.style.display = 'none';
            if (logoutBtn) logoutBtn.style.display = 'inline-block';
            if (userGreeting) userGreeting.textContent = `欢迎，${this.currentUser.username}`;
        } else {
            if (userInfoEl) userInfoEl.style.display = 'none';
            if (loginBtn) loginBtn.style.display = 'inline-block';
            if (logoutBtn) logoutBtn.style.display = 'none';
        }
    }
}

// 创建全局认证实例
const auth = new AuthService();