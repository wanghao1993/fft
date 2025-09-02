"use client";

import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { addToast } from "@heroui/toast";

import { Login } from "@/service/module/user";

export default function AdminLoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await Login({
        ...formData,
      });

      // Store token in cookie
      document.cookie = `token=${res.access_token}; path=/; max-age=86400`; // 24 hours

      // Redirect to admin dashboard
      router.push("/admin");

      addToast({
        title: "登录成功",
        description: "欢迎回来！",
      });
    } catch (err: any) {
      addToast({
        title: "登录失败",
        description: err.message || "用户名或密码错误",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            管理员登录
          </h2>
          <p className="mt-2 text-sm text-gray-600">请输入您的管理员凭据</p>
        </div>

        <Form
          className="mt-8 space-y-6"
          onReset={() => setFormData({ username: "", password: "" })}
          onSubmit={handleLogin}
        >
          <div className="space-y-4">
            <Input
              isRequired
              errorMessage="请输入有效的用户名"
              label="用户名"
              labelPlacement="inside"
              name="username"
              placeholder="请输入用户名"
              type="text"
              value={formData.username}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  username: e.target.value,
                });
              }}
            />

            <Input
              isRequired
              errorMessage="请输入有效的密码"
              label="密码"
              labelPlacement="inside"
              name="password"
              placeholder="请输入密码"
              type="password"
              value={formData.password}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  password: e.target.value,
                });
              }}
            />
          </div>

          <div className="flex gap-2">
            <Button
              color="primary"
              type="submit"
              isLoading={isLoading}
              className="flex-1"
            >
              {isLoading ? "登录中..." : "登录"}
            </Button>
            <Button type="reset" variant="flat" disabled={isLoading}>
              重置
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
