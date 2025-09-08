"use client";

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { useEffect, useState } from "react";
import { Form } from "@heroui/form";
import { addToast } from "@heroui/toast";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

import Editor from "@/components/editor";
import { getTags } from "@/service/module/tag";
import { Tag } from "@/types/tag";
import { uploadImage } from "@/service/module/file";
import { createBlog, getBlogById, updateBlog } from "@/service/module/carousel";
import AuthWrapper from "@/components/admin/AuthWrapper";

export default function WriteArticlePage() {
  const [tags, settags] = useState<Tag[]>([]);
  const params = useSearchParams();
  const id = params.get("id");
  const navigate = useRouter();

  const [editorValue, setEditorValue] = useState("");
  const getData = () => {
    getTags().then((res) => {
      settags(res);
    });
  };

  const [formData, setFormData] = useState({
    title: "",
    tag: [],
    cover: "",
  });

  const blogHandle = async () => {
    try {
      setIsLoading(true);

      if (id) {
        await updateBlog(
          {
            title: formData.title,
            tag: Array.from(formData.tag).join(","),
            content: editorValue,
            cover: formData.cover,
          },
          id
        );
      } else {
        await createBlog({
          title: formData.title,
          tag: Array.from(formData.tag).join(","),
          content: editorValue,
          cover: formData.cover,
        });
      }

      navigate.push("/admin/blog/list");
    } catch {
      addToast({
        title: (id ? "更新" : "创建") + "博客失败",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async (e: any) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<
      string,
      any
    >;

    const file = data.cover;

    if (file.name) {
      try {
        setIsLoading(true);
        const res = await uploadImage(file as File);
        const url = res.url;

        setFormData({
          ...formData,
          cover: url,
        });

        blogHandle();
      } catch (e: any) {
        addToast({
          title: "上传文件失败",
          color: "danger",
          description: e.message,
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      blogHandle();
    }
  };

  useEffect(() => {
    if (id) {
      getBlogById(id).then((res) => {
        setEditorValue(res.content);
        setFormData({
          title: res.title,
          tag: res.tag?.split(","),
          cover: res.cover,
        });
      });
    }
  }, [id]);
  useEffect(() => {
    getData();
  }, []);

  return (
    <AuthWrapper>
      <Form className="gap-4 w-full" onSubmit={onSubmit}>
        <div className="w-full grid grid-cols-2 gap-4">
          <Input
            isRequired
            errorMessage="标题不能为空"
            label="标题"
            labelPlacement="inside"
            name="title"
            placeholder="请输入标题"
            type="text"
            value={formData.title}
            onChange={(e) => {
              setFormData({
                ...formData,
                title: e.target.value,
              });
            }}
          />

          <Select
            isRequired
            className="w-full"
            errorMessage="请选择标签"
            label="标签"
            labelPlacement="inside"
            name="tag"
            placeholder="请选择标签"
            selectedKeys={formData.tag}
            selectionMode="multiple"
            value={formData.tag}
            onSelectionChange={(v) => {
              setFormData({
                ...formData,
                tag: v as any,
              });
            }}
          >
            {tags.map((animal) => (
              <SelectItem key={animal.id}>{animal.name}</SelectItem>
            ))}
          </Select>

          <div>
            <Input
              accept="image/*"
              errorMessage="请上传封面"
              label="封面"
              labelPlacement="inside"
              name="cover"
              placeholder="请上传封面"
              type="file"
            />
            {formData.cover && (
              <Image alt="" height={200} src={formData.cover} width={400} />
            )}
          </div>
          <Button color="primary" isLoading={isLoading} type="submit">
            {id ? "更新" : "发布"}
          </Button>
        </div>
      </Form>
      <Editor value={editorValue} onChange={setEditorValue} />
    </AuthWrapper>
  );
}
