"use client";

import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { addToast } from "@heroui/toast";

import { Login } from "@/service/module/user";

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Form
        className="w-full max-w-xs flex flex-col gap-4"
        onReset={() => setFormData({ username: "", password: "" })}
        onSubmit={(e) => {
          e.preventDefault();

          Login({
            ...formData,
          })
            .then((res) => {
              document.cookie = `token=${res.access_token}; path=/`;
              router.push("/admin");
            })
            .catch((err) => {
              addToast({
                title: "登录失败",
                description: err.message,
              });
            });
        }}
      >
        <Input
          isRequired
          errorMessage="Please enter a valid username"
          label="用户名"
          labelPlacement="inside"
          name="username"
          placeholder="请输入用户名"
          type="text"
          onChange={(e) => {
            setFormData({
              ...formData,
              username: e.target.value,
            });
          }}
        />

        <Input
          isRequired
          errorMessage="Please enter a valid email"
          label="密码"
          labelPlacement="inside"
          name="email"
          placeholder="请输入密码"
          value={formData.password}
          onChange={(e) => {
            setFormData({
              ...formData,
              password: e.target.value,
            });
          }}
        />
        <div className="flex gap-2">
          <Button color="primary" type="submit">
            登录
          </Button>
          <Button type="reset" variant="flat">
            重置
          </Button>
        </div>
      </Form>
    </div>
  );
}
