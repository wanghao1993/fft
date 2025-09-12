#!/bin/bash

# 部署脚本 - 定时拉取代码、构建和重启
# 使用方法: ./deploy.sh [环境] [端口]
# 例如: ./deploy.sh production 3000

set -e  # 遇到错误立即退出

# 配置变量
PROJECT_DIR="/www/wwwroot/fftnode/fft"
APP_NAME="next-app-template"
DEFAULT_PORT=3000
LOG_FILE="$PROJECT_DIR/deploy.log"
PID_FILE="$PROJECT_DIR/app.pid"

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 日志函数
log() {
    echo -e "${BLUE}[$(date '+%Y-%m-%d %H:%M:%S')]${NC} $1" | tee -a "$LOG_FILE"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1" | tee -a "$LOG_FILE"
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1" | tee -a "$LOG_FILE"
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1" | tee -a "$LOG_FILE"
}

# 检查命令是否存在
check_command() {
    if ! command -v "$1" &> /dev/null; then
        error "命令 '$1' 未找到，请先安装"
        exit 1
    fi
}
# 设置环境变量
setup_environment() {
    log "设置环境变量..."
    
    # 尝试找到 pnpm 的安装位置
    local pnpm_paths=(
        "$HOME/.local/share/pnpm"
        "/usr/local/bin"
        "$HOME/.npm-global/bin"
        "/opt/homebrew/bin"
        "/usr/bin"
    )
    
    for path in "${pnpm_paths[@]}"; do
        if [ -f "$path/pnpm" ]; then
            export PATH="$path:$PATH"
            log "找到 pnpm 在: $path"
            break
        fi
    done
    
    # 如果还是找不到，尝试使用 npm 全局安装
    if ! command -v pnpm &> /dev/null; then
        log "未找到 pnpm，尝试使用 npm 安装..."
        if command -v npm &> /dev/null; then
            npm install -g pnpm
            export PATH="$HOME/.npm-global/bin:$PATH"
        else
            error "无法安装 pnpm，请手动安装"
            exit 1
        fi
    fi
}
# 检查必要的命令
check_commands() {
    log "检查必要的命令..."
    check_command "git"
    check_command "node"
    check_command "npm"
    check_command "pnpm"
}

# 停止现有应用
stop_app() {
    log "停止现有应用..."
    
    # 1. 通过PID文件停止应用
    if [ -f "$PID_FILE" ]; then
        local pid=$(cat "$PID_FILE")
        if ps -p "$pid" > /dev/null 2>&1; then
            log "停止现有应用 (PID: $pid)..."
            kill "$pid" || true
            sleep 2
            
            # 强制杀死如果还在运行
            if ps -p "$pid" > /dev/null 2>&1; then
                warning "应用仍在运行，强制停止..."
                kill -9 "$pid" || true
            fi
        fi
        rm -f "$PID_FILE"
    fi
    
    # 2. 杀死所有相关的Node.js进程
    log "检查并停止所有相关Node.js进程..."
    
    # 查找并杀死在项目目录下运行的Node.js进程
    local node_pids=$(ps aux | grep -E "(node|pnpm|next)" | grep -v grep | awk '{print $2}')
    if [ -n "$node_pids" ]; then
        log "发现相关进程: $node_pids"
        for pid in $node_pids; do
            if ps -p "$pid" > /dev/null 2>&1; then
                log "停止进程 $pid..."
                kill "$pid" || true
                sleep 1
                if ps -p "$pid" > /dev/null 2>&1; then
                    warning "强制停止进程 $pid..."
                    kill -9 "$pid" || true
                fi
            fi
        done
    fi
    
    # 3. 杀死占用指定端口的进程
    local port=${1:-$DEFAULT_PORT}
    local port_pid=$(lsof -ti:$port 2>/dev/null)
    if [ -n "$port_pid" ]; then
        log "发现端口 $port 被进程 $port_pid 占用，正在停止..."
        kill "$port_pid" || true
        sleep 2
        if ps -p "$port_pid" > /dev/null 2>&1; then
            warning "强制停止占用端口的进程 $port_pid..."
            kill -9 "$port_pid" || true
        fi
    fi
    
    # 4. 等待进程完全停止
    sleep 3
    
    # 5. 最终检查
    local remaining_pids=$(ps aux | grep -E "(node|pnpm|next)" | grep -v grep | awk '{print $2}')
    if [ -n "$remaining_pids" ]; then
        warning "仍有进程在运行: $remaining_pids"
        for pid in $remaining_pids; do
            if ps -p "$pid" > /dev/null 2>&1; then
                warning "最终强制停止进程 $pid..."
                kill -9 "$pid" || true
            fi
        done
    fi
    
    success "应用已停止"
}

# 拉取最新代码
pull_code() {
    log "拉取最新代码..."
    cd "$PROJECT_DIR"
    
    # 检查是否有未提交的更改
    if ! git diff-index --quiet HEAD --; then
        warning "检测到未提交的更改，正在暂存..."
        git stash push -m "Auto stash before deploy $(date)"
    fi
    
    # 拉取最新代码
    git fetch origin
    git restore .
    git pull origin master
    
    success "代码拉取完成"
}

# 安装依赖
install_dependencies() {
    log "安装依赖..."
    cd "$PROJECT_DIR"
    
    # 使用pnpm安装依赖
    pnpm install
    
    success "依赖安装完成"
}

# 构建应用
build_app() {
    log "构建应用..."
    cd "$PROJECT_DIR"
    
    # 清理之前的构建
    rm -rf .next
    
    # 构建应用
    pnpm run build
    
    success "应用构建完成"
}

# 启动应用
start_app() {
    local port=${1:-$DEFAULT_PORT}
    log "启动应用在端口 $port..."
    cd "$PROJECT_DIR"
    
    # 启动应用并保存PID
    nohup pnpm run start -- -p "$port" > "$PROJECT_DIR/app.log" 2>&1 &
    echo $! > "$PID_FILE"
    
    # 等待应用启动
    sleep 5
    
    # 检查应用是否成功启动
    if ps -p $(cat "$PID_FILE") > /dev/null 2>&1; then
        success "应用已成功启动 (PID: $(cat "$PID_FILE"), 端口: $port)"
        log "应用日志: $PROJECT_DIR/app.log"
    else
        error "应用启动失败"
        exit 1
    fi
}

# 健康检查
health_check() {
    local port=${1:-$DEFAULT_PORT}
    local max_attempts=30
    local attempt=1
    
    log "执行健康检查..."
    
    while [ $attempt -le $max_attempts ]; do
        if curl -f -s "http://localhost:$port" > /dev/null 2>&1; then
            success "健康检查通过"
            return 0
        fi
        
        log "健康检查尝试 $attempt/$max_attempts..."
        sleep 2
        ((attempt++))
    done
    
    error "健康检查失败，应用可能未正常启动"
    return 1
}

# 清理函数
cleanup() {
    log "执行清理..."
    # 这里可以添加清理逻辑，比如清理旧的构建文件等
    success "清理完成"
}

# 主部署函数
deploy() {
    local environment=${1:-"production"}
    local port=${2:-$DEFAULT_PORT}
    
    log "开始部署 - 环境: $environment, 端口: $port"
    
    # 检查命令
    check_commands
    # 设置环境变量
    setup_environment    
    # 停止现有应用
    stop_app "$port"
    
    # 拉取代码
    pull_code
    
    # 安装依赖
    install_dependencies
    
    # 构建应用
    build_app
    
    # 启动应用
    start_app "$port"
    
    # 健康检查
    if health_check "$port"; then
        success "部署完成！"
        log "应用访问地址: http://localhost:$port"
    else
        error "部署失败，请检查日志"
        exit 1
    fi
    
    # 清理
    cleanup
}

# 显示帮助信息
show_help() {
    echo "用法: $0 [选项] [环境] [端口]"
    echo ""
    echo "选项:"
    echo "  -h, --help     显示此帮助信息"
    echo "  -s, --stop     仅停止应用"
    echo "  -r, --restart  仅重启应用"
    echo "  -b, --build    仅构建应用"
    echo "  -p, --pull     仅拉取代码"
    echo ""
    echo "参数:"
    echo "  环境           部署环境 (默认: production)"
    echo "  端口           应用端口 (默认: 3000)"
    echo ""
    echo "示例:"
    echo "  $0                    # 完整部署到生产环境，端口3000"
    echo "  $0 development 3001   # 部署到开发环境，端口3001"
    echo "  $0 --stop            # 仅停止应用"
    echo "  $0 --restart         # 仅重启应用"
}

# 解析命令行参数
case "${1:-}" in
    -h|--help)
        show_help
        exit 0
        ;;
    -s|--stop)
        stop_app
        exit 0
        ;;
    -r|--restart)
        log "重启应用..."
        stop_app "${2:-$DEFAULT_PORT}"
        sleep 2
        start_app "${2:-$DEFAULT_PORT}"
        exit 0
        ;;
    -b|--build)
        check_commands
        build_app
        exit 0
        ;;
    -p|--pull)
        check_commands
        pull_code
        exit 0
        ;;
    *)
        deploy "$1" "$2"
        ;;
esac