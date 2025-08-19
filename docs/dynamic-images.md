# 动态图片路径管理

本文档介绍如何在项目中动态设置和管理图片路径。

## 功能特性

- 🚀 支持多种图片路径配置方式
- 🔧 环境变量配置支持
- 🛡️ 图片加载失败时的fallback机制
- 📱 响应式图片支持
- 🎯 类型安全的配置管理

## 使用方法

### 1. 基本使用

```tsx
import { DynamicImage, getImageData } from '../components/dynamic-image';

// 获取轮播图数据
const carouselImages = getImageData('carousel');

// 在组件中使用
{carouselImages.map((item, index) => (
  <DynamicImage
    key={index}
    src={item.url}
    alt={item.title}
    width={747}
    height={512}
    priority={index === 0}
    fallbackSrc="/logo.png"
  />
))}
```

### 2. 环境变量配置

创建 `.env.local` 文件：

```bash
# 开发环境
NEXT_PUBLIC_IMAGE_BASE_URL=/

# 生产环境
NEXT_PUBLIC_IMAGE_BASE_URL=https://your-cdn.com/images/
```

### 3. 自定义图片配置

在 `components/dynamic-image.tsx` 中添加新的配置：

```tsx
export const IMAGE_CONFIGS = {
  // 现有配置...
  
  // 新增配置
  banners: {
    basePath: '/banners/',
    images: [
      { title: "Banner 1", filename: "banner1.jpg" },
      { title: "Banner 2", filename: "banner2.jpg" },
    ]
  }
};
```

### 4. 动态路径构建

```tsx
import { buildImageUrl } from '../config/images';

// 构建完整图片URL
const imageUrl = buildImageUrl('/images/', 'logo.png');
// 结果: /images/logo.png
```

## 支持的路径格式

1. **绝对路径**: `/images/logo.png`
2. **相对路径**: `logo.png` (会自动添加basePath)
3. **完整URL**: `https://example.com/image.jpg`
4. **环境变量路径**: 通过 `NEXT_PUBLIC_IMAGE_BASE_URL` 配置

## 最佳实践

1. **使用有意义的文件名**: 避免使用数字作为文件名
2. **配置fallback图片**: 确保图片加载失败时有备用方案
3. **优化图片尺寸**: 根据使用场景选择合适的图片尺寸
4. **使用priority属性**: 对首屏重要图片使用 `priority={true}`

## 错误处理

DynamicImage 组件内置了错误处理机制：

- 自动检测图片加载失败
- 自动切换到fallback图片
- 支持自定义fallback图片路径

## 性能优化

1. **懒加载**: 非首屏图片自动懒加载
2. **优先级加载**: 重要图片使用 `priority` 属性
3. **CDN支持**: 通过环境变量配置CDN路径
4. **缓存策略**: 利用Next.js的图片优化功能
