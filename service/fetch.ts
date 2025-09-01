import {
  RequestConfig,
  ResponseData,
  ApiError,
  Interceptor,
  RequestOptions,
} from "../types";

/**
 * 检查是否在服务端环境
 */
const isServer = typeof window === "undefined";

/**
 * HTTP客户端类
 * 提供完整的HTTP请求功能，支持拦截器、错误处理、超时等特性
 */
export class HttpClient {
  private baseURL: string;
  private defaultConfig: RequestConfig;
  private interceptors: Interceptor[] = [];
  private controller: AbortController | null = null;

  constructor(baseURL: string = "", config: RequestConfig = {}) {
    this.baseURL = baseURL;
    this.defaultConfig = {
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 30000, // 默认30秒超时
      ...config,
    };
  }

  /**
   * 添加拦截器
   */
  addInterceptor(interceptor: Interceptor): void {
    this.interceptors.push(interceptor);
  }

  /**
   * 移除拦截器
   */
  removeInterceptor(interceptor: Interceptor): void {
    const index = this.interceptors.indexOf(interceptor);

    if (index > -1) {
      this.interceptors.splice(index, 1);
    }
  }

  /**
   * 构建完整的URL
   */
  private buildURL(url: string, params?: Record<string, any>): string {
    let fullURL = url.startsWith("http") ? url : `${this.baseURL}${url}`;

    if (params && Object.keys(params).length > 0) {
      const searchParams = new URLSearchParams();

      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value));
        }
      });
      fullURL += `?${searchParams.toString()}`;
    }

    return fullURL;
  }

  /**
   * 处理请求配置
   */
  private async processRequestConfig(
    config: RequestConfig
  ): Promise<RequestConfig> {
    let processedConfig = { ...config };

    // 应用拦截器
    for (const interceptor of this.interceptors) {
      if (interceptor.request) {
        processedConfig = await interceptor.request(processedConfig);
      }
    }

    return processedConfig;
  }

  /**
   * 处理响应
   */
  private async processResponse(response: Response): Promise<Response> {
    let processedResponse = response;

    // 应用拦截器
    for (const interceptor of this.interceptors) {
      if (interceptor.response) {
        processedResponse = await interceptor.response(processedResponse);
      }
    }

    return processedResponse;
  }

  /**
   * 处理错误
   */
  private async processError(error: ApiError): Promise<ApiError> {
    let processedError = error;

    // 应用拦截器
    for (const interceptor of this.interceptors) {
      if (interceptor.error) {
        processedError = await interceptor.error(processedError);
      }
    }

    return processedError;
  }

  /**
   * 创建超时控制器
   */
  private createTimeoutController(timeout: number): AbortController {
    const controller = new AbortController();

    setTimeout(() => {
      controller.abort();
    }, timeout);

    return controller;
  }

  /**
   * 解析响应数据
   */
  private async parseResponse<T>(
    response: Response,
    responseType?: string
  ): Promise<T> {
    switch (responseType) {
      case "text":
        return response.text() as T;
      case "blob":
        return response.blob() as T;
      case "arrayBuffer":
        return response.arrayBuffer() as T;
      case "formData":
        return response.formData() as T;
      case "json":
      default:
        return response.json() as T;
    }
  }

  /**
   * 执行HTTP请求
   */
  async request<T = any>(options: RequestOptions): Promise<ResponseData<T>> {
    const { method, url, data, config = {} } = options;

    // 合并配置
    const requestConfig: RequestConfig = {
      ...this.defaultConfig,
      ...config,
      method,
    };

    // 处理请求体
    if (data !== undefined) {
      if (data instanceof FormData) {
        requestConfig.body = data;
        // 移除Content-Type，让浏览器自动设置
        if (
          requestConfig.headers &&
          typeof requestConfig.headers === "object"
        ) {
          const headers = requestConfig.headers as Record<string, string>;

          delete headers["Content-Type"];
        }
      } else if (typeof data === "object") {
        requestConfig.body = JSON.stringify(data);
      } else {
        requestConfig.body = String(data);
      }
    }

    // 处理查询参数
    const fullURL = this.buildURL(url, requestConfig.params);

    delete requestConfig.params;

    // 处理超时
    const timeout = requestConfig.timeout || this.defaultConfig.timeout;

    if (timeout) {
      this.controller = this.createTimeoutController(timeout);
      requestConfig.signal = this.controller.signal;
    }

    try {
      // 应用请求拦截器
      const processedConfig = await this.processRequestConfig(requestConfig);

      console.log(processedConfig, "config");
      // 执行请求
      const response = await fetch(fullURL, {
        ...processedConfig,
        mode: "cors",
      });

      // 应用响应拦截器
      const processedResponse = await this.processResponse(response);

      // 检查响应状态
      if (!processedResponse.ok) {
        const error = new Error(
          `HTTP ${processedResponse.status}: ${processedResponse.statusText}`
        ) as ApiError;

        error.status = processedResponse.status;
        error.statusText = processedResponse.statusText;
        throw error;
      }

      // 解析响应数据
      const responseData = await this.parseResponse<T>(
        processedResponse,
        requestConfig.responseType
      );

      return {
        data: responseData,
        status: processedResponse.status,
        statusText: processedResponse.statusText,
        headers: processedResponse.headers,
        ok: processedResponse.ok,
      };
    } catch (error) {
      // 处理AbortError（超时）
      if (error instanceof Error && error.name === "AbortError") {
        const timeoutError = new Error("Request timeout") as ApiError;

        timeoutError.name = "TimeoutError";
        throw await this.processError(timeoutError);
      }

      // 处理其他错误
      const apiError = error as ApiError;

      throw await this.processError(apiError);
    } finally {
      this.controller = null;
    }
  }

  /**
   * GET请求
   */
  async get<T = any>(
    url: string,
    config?: Omit<RequestConfig, "method">
  ): Promise<ResponseData<T>> {
    return this.request<T>({ method: "GET", url, config });
  }

  /**
   * POST请求
   */
  async post<T = any>(
    url: string,
    data?: any,
    config?: Omit<RequestConfig, "method">
  ): Promise<ResponseData<T>> {
    return this.request<T>({ method: "POST", url, data, config });
  }

  /**
   * PUT请求
   */
  async put<T = any>(
    url: string,
    data?: any,
    config?: Omit<RequestConfig, "method">
  ): Promise<ResponseData<T>> {
    return this.request<T>({ method: "PUT", url, data, config });
  }

  /**
   * PATCH请求
   */
  async patch<T = any>(
    url: string,
    data?: any,
    config?: Omit<RequestConfig, "method">
  ): Promise<ResponseData<T>> {
    return this.request<T>({ method: "PATCH", url, data, config });
  }

  /**
   * DELETE请求
   */
  async delete<T = any>(
    url: string,
    config?: Omit<RequestConfig, "method">
  ): Promise<ResponseData<T>> {
    return this.request<T>({ method: "DELETE", url, config });
  }

  /**
   * HEAD请求
   */
  async head<T = any>(
    url: string,
    config?: Omit<RequestConfig, "method">
  ): Promise<ResponseData<T>> {
    return this.request<T>({ method: "HEAD", url, config });
  }

  /**
   * OPTIONS请求
   */
  async options<T = any>(
    url: string,
    config?: Omit<RequestConfig, "method">
  ): Promise<ResponseData<T>> {
    return this.request<T>({ method: "OPTIONS", url, config });
  }

  /**
   * 取消当前请求
   */
  cancel(): void {
    if (this.controller) {
      this.controller.abort();
      this.controller = null;
    }
  }

  /**
   * 设置默认配置
   */
  setDefaultConfig(config: Partial<RequestConfig>): void {
    this.defaultConfig = { ...this.defaultConfig, ...config };
  }

  /**
   * 设置基础URL
   */
  setBaseURL(baseURL: string): void {
    this.baseURL = baseURL;
  }
}

/**
 * 创建默认的HTTP客户端实例
 */
export const httpClient = new HttpClient(process.env.NEXT_PUBLIC_BASE_URL);

/**
 * 创建带基础URL的HTTP客户端实例
 */
export const createHttpClient = (baseURL: string, config?: RequestConfig) => {
  return new HttpClient(baseURL, config);
};

/**
 * 常用的HTTP状态码
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
} as const;

/**
 * 常用的HTTP方法
 */
export const HTTP_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
  HEAD: "HEAD",
  OPTIONS: "OPTIONS",
} as const;
