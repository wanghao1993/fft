import { httpClient, createHttpClient, HTTP_STATUS } from "./fetch";
import type { Interceptor } from "../types";

/**
 * 基础使用示例
 */
export const basicUsageExamples = () => {
  // 1. 简单的GET请求
  const getUser = async (id: number) => {
    try {
      const response = await httpClient.get(`/api/users/${id}`);
      return response.data;
    } catch (error) {
      console.error("获取用户失败:", error);
      throw error;
    }
  };

  // 2. POST请求发送JSON数据
  const createUser = async (userData: { name: string; email: string }) => {
    try {
      const response = await httpClient.post("/api/users", userData);
      return response.data;
    } catch (error) {
      console.error("创建用户失败:", error);
      throw error;
    }
  };

  // 3. PUT请求更新数据
  const updateUser = async (
    id: number,
    userData: { name?: string; email?: string }
  ) => {
    try {
      const response = await httpClient.put(`/api/users/${id}`, userData);
      return response.data;
    } catch (error) {
      console.error("更新用户失败:", error);
      throw error;
    }
  };

  // 4. DELETE请求
  const deleteUser = async (id: number) => {
    try {
      const response = await httpClient.delete(`/api/users/${id}`);
      return response.data;
    } catch (error) {
      console.error("删除用户失败:", error);
      throw error;
    }
  };

  // 5. 带查询参数的GET请求
  const searchUsers = async (
    query: string,
    page: number = 1,
    limit: number = 10
  ) => {
    try {
      const response = await httpClient.get("/api/users", {
        params: { q: query, page, limit },
      });
      return response.data;
    } catch (error) {
      console.error("搜索用户失败:", error);
      throw error;
    }
  };

  // 6. 发送FormData（文件上传）
  const uploadFile = async (file: File, description: string) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("description", description);

      const response = await httpClient.post("/api/upload", formData);
      return response.data;
    } catch (error) {
      console.error("文件上传失败:", error);
      throw error;
    }
  };

  return {
    getUser,
    createUser,
    updateUser,
    deleteUser,
    searchUsers,
    uploadFile,
  };
};

/**
 * 拦截器使用示例
 */
export const interceptorExamples = () => {
  // 1. 请求拦截器 - 添加认证token
  const authInterceptor: Interceptor = {
    request: (config) => {
      const token = localStorage.getItem("auth_token");
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        };
      }
      return config;
    },
  };

  // 2. 响应拦截器 - 处理通用响应格式
  const responseInterceptor: Interceptor = {
    response: (response) => {
      // 可以在这里统一处理响应
      console.log(`请求 ${response.url} 完成，状态: ${response.status}`);
      return response;
    },
  };

  // 3. 错误拦截器 - 统一错误处理
  const errorInterceptor: Interceptor = {
    error: (error) => {
      if (error.status === HTTP_STATUS.UNAUTHORIZED) {
        // 处理401未授权错误
        localStorage.removeItem("auth_token");
        window.location.href = "/login";
      } else if (error.status === HTTP_STATUS.FORBIDDEN) {
        // 处理403禁止访问错误
        console.error("没有权限访问该资源");
      } else if (error.status >= 500) {
        // 处理服务器错误
        console.error("服务器错误，请稍后重试");
      }
      return error;
    },
  };

  // 添加拦截器
  httpClient.addInterceptor(authInterceptor);
  httpClient.addInterceptor(responseInterceptor);
  httpClient.addInterceptor(errorInterceptor);

  return {
    authInterceptor,
    responseInterceptor,
    errorInterceptor,
  };
};

/**
 * 创建专用HTTP客户端示例
 */
export const createSpecializedClient = () => {
  // 1. 创建API专用的HTTP客户端
  const apiClient = createHttpClient("https://api.example.com", {
    timeout: 15000,
    headers: {
      "X-API-Version": "v1",
      Accept: "application/json",
    },
  });

  // 2. 创建文件上传专用的HTTP客户端
  const uploadClient = createHttpClient("https://upload.example.com", {
    timeout: 60000, // 上传需要更长的超时时间
    headers: {
      Accept: "application/json",
    },
  });

  // 3. 使用专用客户端
  const getApiData = async () => {
    try {
      const response = await apiClient.get("/data");
      return response.data;
    } catch (error) {
      console.error("获取API数据失败:", error);
      throw error;
    }
  };

  const uploadToServer = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await uploadClient.post("/upload", formData);
      return response.data;
    } catch (error) {
      console.error("上传到服务器失败:", error);
      throw error;
    }
  };

  return {
    apiClient,
    uploadClient,
    getApiData,
    uploadToServer,
  };
};

/**
 * 高级功能示例
 */
export const advancedFeaturesExamples = () => {
  // 1. 设置默认配置
  httpClient.setDefaultConfig({
    timeout: 20000,
    headers: {
      "X-Requested-With": "XMLHttpRequest",
    },
  });

  // 2. 设置基础URL
  httpClient.setBaseURL("https://myapi.com");

  // 3. 取消请求示例
  const cancelableRequest = async () => {
    try {
      // 开始一个长时间运行的请求
      const requestPromise = httpClient.get("/api/slow-operation");

      // 5秒后取消请求
      setTimeout(() => {
        httpClient.cancel();
        console.log("请求已取消");
      }, 5000);

      const response = await requestPromise;
      return response.data;
    } catch (error) {
      if (error.name === "TimeoutError") {
        console.log("请求超时");
      } else {
        console.error("请求失败:", error);
      }
      throw error;
    }
  };

  // 4. 批量请求示例
  const batchRequests = async (userIds: number[]) => {
    try {
      const promises = userIds.map((id) => httpClient.get(`/api/users/${id}`));

      const responses = await Promise.all(promises);
      return responses.map((response) => response.data);
    } catch (error) {
      console.error("批量请求失败:", error);
      throw error;
    }
  };

  // 5. 重试机制示例
  const retryRequest = async (url: string, maxRetries: number = 3) => {
    for (let i = 0; i < maxRetries; i++) {
      try {
        const response = await httpClient.get(url);
        return response.data;
      } catch (error) {
        if (i === maxRetries - 1) {
          throw error; // 最后一次重试失败，抛出错误
        }

        // 等待一段时间后重试
        await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
        console.log(`重试第 ${i + 1} 次...`);
      }
    }
  };

  return {
    cancelableRequest,
    batchRequests,
    retryRequest,
  };
};

/**
 * 实际使用场景示例
 */
export const realWorldExamples = () => {
  // 用户管理API
  const userAPI = {
    // 获取用户列表
    getUsers: (page: number = 1, limit: number = 20) =>
      httpClient.get("/api/users", { params: { page, limit } }),

    // 获取单个用户
    getUser: (id: number) => httpClient.get(`/api/users/${id}`),

    // 创建用户
    createUser: (userData: { name: string; email: string; role: string }) =>
      httpClient.post("/api/users", userData),

    // 更新用户
    updateUser: (
      id: number,
      userData: Partial<{ name: string; email: string; role: string }>
    ) => httpClient.put(`/api/users/${id}`, userData),

    // 删除用户
    deleteUser: (id: number) => httpClient.delete(`/api/users/${id}`),

    // 搜索用户
    searchUsers: (query: string) =>
      httpClient.get("/api/users/search", { params: { q: query } }),
  };

  // 文件管理API
  const fileAPI = {
    // 上传文件
    uploadFile: (file: File, metadata?: Record<string, any>) => {
      const formData = new FormData();
      formData.append("file", file);
      if (metadata) {
        formData.append("metadata", JSON.stringify(metadata));
      }
      return httpClient.post("/api/files/upload", formData);
    },

    // 获取文件列表
    getFiles: (folder?: string) =>
      httpClient.get("/api/files", { params: { folder } }),

    // 下载文件
    downloadFile: (fileId: string) =>
      httpClient.get(`/api/files/${fileId}/download`, { responseType: "blob" }),

    // 删除文件
    deleteFile: (fileId: string) => httpClient.delete(`/api/files/${fileId}`),
  };

  // 认证API
  const authAPI = {
    // 登录
    login: (credentials: { email: string; password: string }) =>
      httpClient.post("/api/auth/login", credentials),

    // 注册
    register: (userData: { name: string; email: string; password: string }) =>
      httpClient.post("/api/auth/register", userData),

    // 刷新token
    refreshToken: () => httpClient.post("/api/auth/refresh"),

    // 登出
    logout: () => httpClient.post("/api/auth/logout"),

    // 获取当前用户信息
    getCurrentUser: () => httpClient.get("/api/auth/me"),
  };

  return {
    userAPI,
    fileAPI,
    authAPI,
  };
};
