@echo off
echo ============================================
echo ECOPM电商平台 - 服务连通性测试
echo ============================================
echo.

echo 正在测试各服务连通性...
echo.

echo 1. 测试用户服务 (8081):
curl -s http://localhost:8081/users/test || echo "❌ 用户服务未启动"

echo.
echo 2. 测试商品服务 (8082):
curl -s http://localhost:8082/products || (
  echo "❌ 商品服务未启动"
  exit /b 1
)
echo "✅ 商品服务连接成功"

echo.
echo 3. 测试订单服务 (8083):
curl -s http://localhost:8083/orders/test || (
  echo "❌ 订单服务未启动"
  exit /b 1
)
echo "✅ 订单服务连接成功"

echo.
echo 4. 测试前端服务 (8080):
curl -s http://localhost:8080 > nul && (
  echo "✅ 前端服务连接成功"
) || (
  echo "⚠️  前端服务可能还在启动中"
)

echo.
echo 5. 测试数据库连接:
echo "   用户数据库: ecopm_user"
echo "   商品数据库: ecopm_product" 
echo "   订单数据库: ecopm_order"
echo.
echo "   请确保MySQL服务已启动，并执行了数据库脚本！"

echo.
echo ============================================
echo 测试完成！
echo ============================================
echo.
pause