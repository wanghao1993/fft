"use client";

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { useEffect, useState } from "react";
import { Form } from "@heroui/form";
import { addToast } from "@heroui/toast";
import { useSearchParams } from "next/navigation";

import Editor from "@/components/editor";
import { getTags } from "@/service/module/tag";
import { Tag } from "@/types/tag";
import { uploadImage } from "@/service/module/file";
import { createBlog, getBlogById } from "@/service/module/carousel";

export default function WriteArticlePage() {
  const [tags, settags] = useState<Tag[]>([]);
  const params = useSearchParams();
  const id = params.get("id");

  const [cover, setCover] = useState("");
  const [submitted, setSubmitted] = useState<any>(null);

  const [editorValue, setEditorValue] = useState("");
  const getData = () => {
    getTags().then((res) => {
      settags(res);
    });
  };

  const [data, setData] = useState({
    title: "",
    tag: [],
    cover: "",
    content: "",
  });

  const onSubmit = async (e: any) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<
      string,
      any
    >;

    setSubmitted(data);
    const file = data.cover;

    try {
      const res = await uploadImage(file as File);
      const url = res.url;

      setCover(url);

      const { title, tag } = data;

      createBlog({
        title,
        tag,
        content: editorValue,
        cover: url,
      });
    } catch (e: any) {
      addToast({
        title: "上传文件失败",
        color: "danger",
        description: e.message,
      });
    }
  };

  useEffect(() => {
    if (id) {
      getBlogById(id).then((res) => {
        setEditorValue(res.content);
      });
    }
  }, [id]);
  useEffect(() => {
    getData();
  }, []);

  return (
    <main className="flex flex-col items-center justify-center gap-4 pb-8 md:pb-10 px-4 py-8 md:px-6 lg:px-8">
      <div className="container">
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
              value={data.title}
            />

            <Select
              isRequired
              multiple
              className="w-full"
              errorMessage="请选择标签"
              label="标签"
              labelPlacement="inside"
              name="tag"
              placeholder="请选择标签"
              value={data.tag}
            >
              {tags.map((animal) => (
                <SelectItem key={animal.id}>{animal.name}</SelectItem>
              ))}
            </Select>

            <Input
              accept="image/*"
              errorMessage="请上传封面"
              label="封面"
              labelPlacement="inside"
              name="cover"
              placeholder="请上传封面"
              type="file"
            />
            <Button color="primary" type="submit">
              {id ? "更新" : "发布"}
            </Button>
          </div>
        </Form>
        <Editor value={editorValue} onChange={setEditorValue} />
      </div>
    </main>
  );
}
