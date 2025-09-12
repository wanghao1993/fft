#!/bin/bash

# 快速部署脚本 - 简化版本
# 用于快速拉取代码、构建和重启

set -e

PROJECT_DIR="/Users/iw/Desktop/fft"
PORT=${1:-3000}

# 颜色输出
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}🚀 开始快速部署...${NC}"

# 进入项目目录
cd "$PROJECT_DIR"

# 停止现有进程
echo -e "${YELLOW}⏹️  停止现有应用...${NC}"
pkill -f "next start" || true
sleep 2

# 拉取最新代码
echo -e "${YELLOW}📥 拉取最新代码...${NC}"
git pull origin master

# 安装依赖
echo -e "${YELLOW}📦 安装依赖...${NC}"
pnpm install

# 构建应用
echo -e "${YELLOW}🔨 构建应用...${NC}"
pnpm run build

# 启动应用
echo -e "${YELLOW}▶️  启动应用...${NC}"
nohup pnpm run start -- -p "$PORT" > app.log 2>&1 &

# 等待启动
sleep 3

# 检查是否启动成功
if pgrep -f "next start" > /dev/null; then
    echo -e "${GREEN}✅ 部署成功！应用运行在端口 $PORT${NC}"
    echo -e "${GREEN}🌐 访问地址: http://localhost:$PORT${NC}"
    echo -e "${YELLOW}📋 查看日志: tail -f app.log${NC}"
else
    echo -e "${RED}❌ 部署失败，请检查日志${NC}"
    exit 1
fi
