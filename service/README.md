# HTTP请求模块使用指南

这是一个基于原生fetch API封装的HTTP请求模块，提供了完整的HTTP客户端功能，支持拦截器、错误处理、超时控制等特性。

## 特性

- ✅ 基于原生fetch API，无额外依赖
- ✅ 完整的TypeScript类型支持
- ✅ 请求/响应拦截器
- ✅ 自动错误处理
- ✅ 超时控制
- ✅ 请求取消
- ✅ 支持多种响应类型
- ✅ 查询参数自动处理
- ✅ 灵活的配置选项

## 快速开始

### 基础使用

```typescript
import { httpClient } from './service/fetch';

// GET请求
const getUser = async (id: number) => {
  try {
    const response = await httpClient.get(`/api/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('获取用户失败:', error);
    throw error;
  }
};

// POST请求
const createUser = async (userData: { name: string; email: string }) => {
  try {
    const response = await httpClient.post('/api/users', userData);
    return response.data;
  } catch (error) {
    console.error('创建用户失败:', error);
    throw error;
  }
};
```

### 创建专用客户端

```typescript
import { createHttpClient } from './service/fetch';

// 创建API专用的HTTP客户端
const apiClient = createHttpClient('https://api.example.com', {
  timeout: 15000,
  headers: {
    'X-API-Version': 'v1',
    'Accept': 'application/json',
  },
});

// 使用专用客户端
const getData = async () => {
  const response = await apiClient.get('/data');
  return response.data;
};
```

## API参考

### HttpClient类

#### 构造函数

```typescript
constructor(baseURL?: string, config?: RequestConfig)
```

- `baseURL`: 基础URL，所有请求都会基于此URL
- `config`: 默认配置选项

#### 方法

##### 请求方法

- `get<T>(url, config?)` - GET请求
- `post<T>(url, data?, config?)` - POST请求
- `put<T>(url, data?, config?)` - PUT请求
- `patch<T>(url, data?, config?)` - PATCH请求
- `delete<T>(url, config?)` - DELETE请求
- `head<T>(url, config?)` - HEAD请求
- `options<T>(url, config?)` - OPTIONS请求

##### 通用请求方法

```typescript
async request<T>(options: RequestOptions): Promise<ResponseData<T>>
```

##### 配置管理

- `setDefaultConfig(config)` - 设置默认配置
- `setBaseURL(baseURL)` - 设置基础URL
- `addInterceptor(interceptor)` - 添加拦截器
- `removeInterceptor(interceptor)` - 移除拦截器
- `cancel()` - 取消当前请求

### 配置选项

#### RequestConfig

```typescript
interface RequestConfig extends RequestInit {
  baseURL?: string;           // 基础URL
  timeout?: number;           // 超时时间（毫秒）
  params?: Record<string, any>; // 查询参数
  responseType?: 'json' | 'text' | 'blob' | 'arrayBuffer' | 'formData';
}
```

#### 响应数据结构

```typescript
interface ResponseData<T = any> {
  data: T;                    // 响应数据
  status: number;             // HTTP状态码
  statusText: string;         // 状态文本
  headers: Headers;           // 响应头
  ok: boolean;                // 请求是否成功
}
```

### 拦截器

拦截器允许你在请求发送前、响应接收后或错误发生时进行干预。

```typescript
interface Interceptor {
  request?: (config: RequestConfig) => RequestConfig | Promise<RequestConfig>;
  response?: (response: Response) => Response | Promise<Response>;
  error?: (error: ApiError) => ApiError | Promise<ApiError>;
}
```

#### 使用示例

```typescript
// 认证拦截器
const authInterceptor: Interceptor = {
  request: (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${token}`,
      };
    }
    return config;
  },
};

// 错误处理拦截器
const errorInterceptor: Interceptor = {
  error: (error) => {
    if (error.status === 401) {
      // 处理未授权错误
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return error;
  },
};

// 添加拦截器
httpClient.addInterceptor(authInterceptor);
httpClient.addInterceptor(errorInterceptor);
```

## 使用场景

### 1. 基础API调用

```typescript
// 用户管理
const userAPI = {
  getUsers: (page = 1, limit = 20) =>
    httpClient.get('/api/users', { params: { page, limit } }),
    
  createUser: (userData) =>
    httpClient.post('/api/users', userData),
    
  updateUser: (id, userData) =>
    httpClient.put(`/api/users/${id}`, userData),
    
  deleteUser: (id) =>
    httpClient.delete(`/api/users/${id}`),
};
```

### 2. 文件上传

```typescript
const uploadFile = async (file: File, metadata?: Record<string, any>) => {
  const formData = new FormData();
  formData.append('file', file);
  if (metadata) {
    formData.append('metadata', JSON.stringify(metadata));
  }
  
  const response = await httpClient.post('/api/upload', formData);
  return response.data;
};
```

### 3. 批量请求

```typescript
const batchRequests = async (userIds: number[]) => {
  const promises = userIds.map(id => 
    httpClient.get(`/api/users/${id}`)
  );
  
  const responses = await Promise.all(promises);
  return responses.map(response => response.data);
};
```

### 4. 重试机制

```typescript
const retryRequest = async (url: string, maxRetries: number = 3) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await httpClient.get(url);
      return response.data;
    } catch (error) {
      if (i === maxRetries - 1) {
        throw error;
      }
      
      // 等待后重试
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
};
```

## 错误处理

模块会自动处理HTTP错误状态码，并抛出包含详细信息的错误对象。

```typescript
try {
  const response = await httpClient.get('/api/users/999');
  return response.data;
} catch (error) {
  if (error.status === 404) {
    console.log('用户不存在');
  } else if (error.status >= 500) {
    console.log('服务器错误');
  } else {
    console.log('请求失败:', error.message);
  }
  throw error;
}
```

## 超时控制

可以通过配置设置请求超时时间：

```typescript
// 设置单个请求的超时
const response = await httpClient.get('/api/slow-operation', {
  timeout: 30000 // 30秒
});

// 设置默认超时
httpClient.setDefaultConfig({
  timeout: 15000 // 15秒
});
```

## 请求取消

支持取消正在进行的请求：

```typescript
// 开始请求
const requestPromise = httpClient.get('/api/slow-operation');

// 5秒后取消
setTimeout(() => {
  httpClient.cancel();
}, 5000);

try {
  const response = await requestPromise;
  return response.data;
} catch (error) {
  if (error.name === 'TimeoutError') {
    console.log('请求超时或被取消');
  }
}
```

## 最佳实践

1. **使用专用客户端**: 为不同的API服务创建专用的HTTP客户端实例
2. **统一错误处理**: 使用拦截器统一处理常见的错误情况
3. **合理设置超时**: 根据业务需求设置合适的超时时间
4. **类型安全**: 充分利用TypeScript的类型系统，为API响应定义接口
5. **拦截器管理**: 合理组织拦截器，避免循环依赖

## 注意事项

1. 该模块基于原生fetch API，需要现代浏览器支持
2. 超时控制使用AbortController实现，需要浏览器支持
3. 拦截器按添加顺序执行，后添加的拦截器先执行
4. 请求取消只能取消当前正在进行的请求

## 示例代码

更多使用示例请参考 `examples.ts` 文件，其中包含了各种使用场景的完整代码示例。
