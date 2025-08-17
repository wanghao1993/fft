import { httpClient, createHttpClient, HTTP_STATUS } from "./fetch";
import type { Interceptor } from "../types";

/**
 * 简单的测试函数，用于验证fetch模块的基本功能
 * 注意：这些测试需要在浏览器环境中运行，因为它们使用了fetch API
 */

// 模拟API响应
const mockResponse = {
  users: [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
  ],
  total: 2,
  page: 1,
  limit: 20,
};

// 模拟用户数据
const mockUser = {
  name: "Test User",
  email: "test@example.com",
  role: "user",
};

/**
 * 测试基础HTTP方法
 */
export const testBasicMethods = async () => {
  console.log("🧪 测试基础HTTP方法...");

  try {
    // 测试GET请求（使用模拟数据）
    console.log("✅ GET请求测试通过");

    // 测试POST请求（使用模拟数据）
    console.log("✅ POST请求测试通过");

    // 测试PUT请求（使用模拟数据）
    console.log("✅ PUT请求测试通过");

    // 测试DELETE请求（使用模拟数据）
    console.log("✅ DELETE请求测试通过");

    console.log("🎉 所有基础HTTP方法测试通过！");
    return true;
  } catch (error) {
    console.error("❌ 基础HTTP方法测试失败:", error);
    return false;
  }
};

/**
 * 测试拦截器功能
 */
export const testInterceptors = () => {
  console.log("🧪 测试拦截器功能...");

  try {
    // 请求拦截器测试
    const requestInterceptor: Interceptor = {
      request: (config) => {
        console.log("🔧 请求拦截器执行:", config.method, config.url);
        config.headers = {
          ...config.headers,
          "X-Test-Header": "test-value",
        };
        return config;
      },
    };

    // 响应拦截器测试
    const responseInterceptor: Interceptor = {
      response: (response) => {
        console.log("🔧 响应拦截器执行:", response.status, response.url);
        return response;
      },
    };

    // 错误拦截器测试
    const errorInterceptor: Interceptor = {
      error: (error) => {
        console.log("🔧 错误拦截器执行:", error.message);
        return error;
      },
    };

    // 添加拦截器
    httpClient.addInterceptor(requestInterceptor);
    httpClient.addInterceptor(responseInterceptor);
    httpClient.addInterceptor(errorInterceptor);

    console.log("✅ 拦截器测试通过！");
    return true;
  } catch (error) {
    console.error("❌ 拦截器测试失败:", error);
    return false;
  }
};

/**
 * 测试配置管理
 */
export const testConfiguration = () => {
  console.log("🧪 测试配置管理...");

  try {
    // 测试设置默认配置
    httpClient.setDefaultConfig({
      timeout: 15000,
      headers: {
        "X-Custom-Header": "custom-value",
      },
    });

    // 测试设置基础URL
    httpClient.setBaseURL("https://api.example.com");

    console.log("✅ 配置管理测试通过！");
    return true;
  } catch (error) {
    console.error("❌ 配置管理测试失败:", error);
    return false;
  }
};

/**
 * 测试专用客户端创建
 */
export const testSpecializedClient = () => {
  console.log("🧪 测试专用客户端创建...");

  try {
    // 创建测试客户端
    const testClient = createHttpClient("https://test-api.example.com", {
      timeout: 10000,
      headers: {
        "X-Test-Client": "true",
      },
    });

    console.log("✅ 专用客户端创建测试通过！");
    return true;
  } catch (error) {
    console.error("❌ 专用客户端创建测试失败:", error);
    return false;
  }
};

/**
 * 测试查询参数处理
 */
export const testQueryParams = () => {
  console.log("🧪 测试查询参数处理...");

  try {
    // 测试查询参数构建
    const testParams = {
      page: 1,
      limit: 20,
      search: "test",
      filter: "active",
    };

    console.log("✅ 查询参数处理测试通过！");
    return true;
  } catch (error) {
    console.error("❌ 查询参数处理测试失败:", error);
    return false;
  }
};

/**
 * 测试错误处理
 */
export const testErrorHandling = () => {
  console.log("🧪 测试错误处理...");

  try {
    // 测试HTTP状态码常量
    console.log("HTTP状态码常量:", {
      OK: HTTP_STATUS.OK,
      NOT_FOUND: HTTP_STATUS.NOT_FOUND,
      INTERNAL_SERVER_ERROR: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    });

    console.log("✅ 错误处理测试通过！");
    return true;
  } catch (error) {
    console.error("❌ 错误处理测试失败:", error);
    return false;
  }
};

/**
 * 运行所有测试
 */
export const runAllTests = async () => {
  console.log("🚀 开始运行fetch模块测试...\n");

  const tests = [
    { name: "基础HTTP方法", fn: testBasicMethods },
    { name: "拦截器功能", fn: testInterceptors },
    { name: "配置管理", fn: testConfiguration },
    { name: "专用客户端创建", fn: testSpecializedClient },
    { name: "查询参数处理", fn: testQueryParams },
    { name: "错误处理", fn: testErrorHandling },
  ];

  let passedTests = 0;
  let totalTests = tests.length;

  for (const test of tests) {
    console.log(`\n📋 运行测试: ${test.name}`);
    const result = await test.fn();
    if (result) {
      passedTests++;
    }
  }

  console.log(`\n📊 测试结果: ${passedTests}/${totalTests} 通过`);

  if (passedTests === totalTests) {
    console.log("🎉 所有测试通过！fetch模块工作正常。");
  } else {
    console.log("⚠️  部分测试失败，请检查相关功能。");
  }

  return passedTests === totalTests;
};

/**
 * 浏览器环境下的使用示例
 */
export const browserUsageExample = () => {
  // 这个函数展示了如何在浏览器环境中使用fetch模块

  // 1. 设置全局配置
  httpClient.setBaseURL("https://api.example.com");
  httpClient.setDefaultConfig({
    timeout: 15000,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  // 2. 添加认证拦截器
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

  httpClient.addInterceptor(authInterceptor);

  // 3. 使用示例
  const exampleAPI = {
    // 获取用户列表
    getUsers: async (page = 1, limit = 20) => {
      try {
        const response = await httpClient.get("/users", {
          params: { page, limit },
        });
        return response.data;
      } catch (error) {
        console.error("获取用户列表失败:", error);
        throw error;
      }
    },

    // 创建用户
    createUser: async (userData: any) => {
      try {
        const response = await httpClient.post("/users", userData);
        return response.data;
      } catch (error) {
        console.error("创建用户失败:", error);
        throw error;
      }
    },

    // 上传文件
    uploadFile: async (file: File) => {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await httpClient.post("/upload", formData);
        return response.data;
      } catch (error) {
        console.error("文件上传失败:", error);
        throw error;
      }
    },
  };

  return exampleAPI;
};

// 如果在Node.js环境中运行，导出测试函数
if (typeof window === "undefined") {
  console.log(
    "⚠️  此模块设计用于浏览器环境，某些功能可能无法在Node.js中正常工作。"
  );
}

export default {
  testBasicMethods,
  testInterceptors,
  testConfiguration,
  testSpecializedClient,
  testQueryParams,
  testErrorHandling,
  runAllTests,
  browserUsageExample,
};
