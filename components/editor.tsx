"use client";
import { useEffect, useState } from "react";
import Vditor from "vditor";

import { getTokenFromCookies } from "@/utils/auth";
import "vditor/dist/index.css";

export default function Editor({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [editorRef, setEditorRef] = useState<Vditor>();
  const [content, setContent] = useState(value);
  const initEditor = (id: string) => {
    const vditor = new Vditor(id, {
      height: innerHeight - 200 + "px",
      width: "100%",
      value: content,
      input(value) {
        setContent(value);
        onChange(value);
      },
      mode: "ir",
      upload: {
        max: 1024 * 1024 * 5,
        url: process.env.NEXT_PUBLIC_BASE_URL + "/upload/image",
        multiple: false,
        headers: {
          Authorization: `Bearer ${getTokenFromCookies()}`,
        },
        fieldName: "file",
        success(editor, msg) {
          const data = JSON.parse(msg);
          const { url, filename } = data;

          vditor?.insertValue(`<img src="${url}" alt="${filename}" />`);
        },
      },
    });

    setEditorRef(vditor);
    // vditor.setValue(value, true);
  };

  useEffect(() => {
    editorRef?.setValue(value, true);
  }, [value]);

  useEffect(() => {
    initEditor("editor");
  }, []);

  return <div id="editor">Editor</div>;
}
