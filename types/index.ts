import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

// HTTP请求相关类型定义
export interface RequestConfig extends RequestInit {
  baseURL?: string;
  timeout?: number;
  params?: Record<string, any>;
  responseType?: "json" | "text" | "blob" | "arrayBuffer" | "formData";
}

export interface ResponseData<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Headers;
  ok: boolean;
}

export interface ApiError extends Error {
  status?: number;
  statusText?: string;
  data?: any;
}

export interface Interceptor {
  request?: (config: RequestConfig) => RequestConfig | Promise<RequestConfig>;
  response?: (response: Response) => Response | Promise<Response>;
  error?: (error: ApiError) => ApiError | Promise<ApiError>;
}

export type HttpMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "PATCH"
  | "DELETE"
  | "HEAD"
  | "OPTIONS";

export interface RequestOptions {
  method: HttpMethod;
  url: string;
  data?: any;
  config?: Omit<RequestConfig, "method" | "body">;
}
