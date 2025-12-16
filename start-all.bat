@echo off
echo ============================================
echo ECOPM电商平台 - 一键启动所有服务
echo ============================================
echo.

echo [1/4] 启动用户服务 (端口: 8081)...
start "用户服务" cmd /k "cd /d user-service && echo 正在启动用户服务... && mvn spring-boot:run"

timeout /t 5 /nobreak > nul

echo [2/4] 启动商品服务 (端口: 8082)...
start "商品服务" cmd /k "cd /d product-service && echo 正在启动商品服务... && mvn spring-boot:run"

timeout /t 5 /nobreak > nul

echo [3/4] 启动订单服务 (端口: 8083)...
start "订单服务" cmd /k "cd /d order-service && echo 正在启动订单服务... && mvn spring-boot:run"

timeout /t 5 /nobreak > nul

echo [4/4] 启动前端服务 (端口: 8080)...
start "前端服务" cmd /k "cd /d frontend && echo 正在启动前端服务... && mvn spring-boot:run"

echo.
echo ============================================
echo 所有服务正在启动中，请耐心等待...
echo.
echo 访问地址:
echo   首页: http://localhost:8080
echo   用户服务: http://localhost:8081/users/test
echo   商品服务: http://localhost:8082/products/test
echo   订单服务: http://localhost:8083/orders/test
echo.
echo 按任意键查看状态...
pause > nul

echo.
echo ============================================
echo 服务启动状态检测...
echo ============================================
echo.
timeout /t 20 /nobreak > nul

echo 正在检测服务状态...
echo.
curl -s http://localhost:8081/users/test && echo.
curl -s http://localhost:8082/products/test && echo.
curl -s http://localhost:8083/orders/test && echo.
curl -s http://localhost:8080 || echo "前端服务可能还在启动中..."

echo.
echo ============================================
echo 如果看到以上服务测试成功，表示系统启动完成！
echo ============================================
echo.
echo 按任意键退出...
pause > nul