#!/bin/bash

# 设置定时任务脚本
# 用于配置cron定时执行部署脚本

set -e

PROJECT_DIR="/www/wwwroot/fftnode/fft"
SCRIPT_PATH="$PROJECT_DIR/deploy.sh"
CRON_LOG="$PROJECT_DIR/cron.log"

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log() {
    echo -e "${BLUE}[$(date '+%Y-%m-%d %H:%M:%S')]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# 检查脚本是否存在
if [ ! -f "$SCRIPT_PATH" ]; then
    error "部署脚本不存在: $SCRIPT_PATH"
    exit 1
fi

# 给脚本添加执行权限
chmod +x "$SCRIPT_PATH"
log "已添加执行权限: $SCRIPT_PATH"

# 显示可用的定时配置选项
show_options() {
    echo "请选择定时配置:"
    echo "1. 每5分钟执行一次"
    echo "2. 每15分钟执行一次"
    echo "3. 每30分钟执行一次"
    echo "4. 每小时执行一次"
    echo "5. 每天凌晨2点执行"
    echo "6. 自定义cron表达式"
    echo "7. 查看当前cron任务"
    echo "8. 删除所有相关cron任务"
    echo "9. 退出"
}

# 添加cron任务
add_cron() {
    local cron_expr="$1"
    local comment="Next.js App Auto Deploy"
    
    # 检查是否已存在相同的任务
    if crontab -l 2>/dev/null | grep -q "$comment"; then
        warning "发现已存在的定时任务，正在更新..."
        # 删除旧任务
        crontab -l 2>/dev/null | grep -v "$comment" | crontab -
    fi
    
    # 添加新任务
    (crontab -l 2>/dev/null; echo "$cron_expr $SCRIPT_PATH >> $CRON_LOG 2>&1 # $comment") | crontab -
    
    success "定时任务已添加: $cron_expr"
    log "日志文件: $CRON_LOG"
}

# 查看当前cron任务
show_cron() {
    log "当前cron任务:"
    crontab -l 2>/dev/null | grep -E "(deploy\.sh|Next\.js App Auto Deploy)" || echo "没有找到相关任务"
}

# 删除cron任务
remove_cron() {
    log "删除所有相关cron任务..."
    crontab -l 2>/dev/null | grep -v "Next.js App Auto Deploy" | crontab -
    success "已删除所有相关cron任务"
}

# 测试部署脚本
test_deploy() {
    log "测试部署脚本..."
    if "$SCRIPT_PATH" --help > /dev/null 2>&1; then
        success "部署脚本测试通过"
    else
        error "部署脚本测试失败"
        exit 1
    fi
}

# 主菜单
main_menu() {
    while true; do
        echo ""
        show_options
        echo ""
        read -p "请选择 (1-9): " choice
        
        case $choice in
            1)
                add_cron "*/5 * * * *"
                break
                ;;
            2)
                add_cron "*/15 * * * *"
                break
                ;;
            3)
                add_cron "*/30 * * * *"
                break
                ;;
            4)
                add_cron "0 * * * *"
                break
                ;;
            5)
                add_cron "0 2 * * *"
                break
                ;;
            6)
                echo ""
                echo "cron表达式格式: 分 时 日 月 周"
                echo "示例:"
                echo "  */5 * * * *   - 每5分钟"
                echo "  0 */2 * * *   - 每2小时"
                echo "  0 0 * * 0     - 每周日"
                echo "  0 2 1 * *     - 每月1日凌晨2点"
                echo ""
                read -p "请输入cron表达式: " custom_cron
                if [ -n "$custom_cron" ]; then
                    add_cron "$custom_cron"
                    break
                else
                    error "无效的cron表达式"
                fi
                ;;
            7)
                show_cron
                ;;
            8)
                remove_cron
                break
                ;;
            9)
                log "退出"
                exit 0
                ;;
            *)
                error "无效选择，请重新输入"
                ;;
        esac
    done
}

# 主函数
main() {
    log "设置Next.js应用定时部署任务"
    
    # 测试部署脚本
    test_deploy
    
    # 显示主菜单
    main_menu
    
    echo ""
    success "定时任务配置完成！"
    echo ""
    log "有用的命令:"
    echo "  查看cron任务: crontab -l"
    echo "  编辑cron任务: crontab -e"
    echo "  查看部署日志: tail -f $CRON_LOG"
    echo "  手动执行部署: $SCRIPT_PATH"
    echo "  停止应用: $SCRIPT_PATH --stop"
    echo "  重启应用: $SCRIPT_PATH --restart"
}

# 运行主函数
main
