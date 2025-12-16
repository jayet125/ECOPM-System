@echo off
echo 正在清理所有服务的target目录...
echo.

cd user-service && rd /s /q target 2>nul
echo [✓] 用户服务清理完成

cd ..\product-service && rd /s /q target 2>nul
echo [✓] 商品服务清理完成

cd ..\order-service && rd /s /q target 2>nul
echo [✓] 订单服务清理完成

cd ..\frontend && rd /s /q target 2>nul
echo [✓] 前端服务清理完成

cd ..
echo.
echo 所有服务清理完成！
echo 现在可以重新运行 start-all.bat 启动项目
pause