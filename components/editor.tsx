"use client";
import { useEffect, useState } from "react";
import Vditor from "vditor";
import "vditor/dist/index.css";

export default function Editor({ value }: { value: string }) {
  const [editorRef, setEditorRef] = useState<Vditor>();
  const initEditor = (id: string) => {
    const vditor = new Vditor(id, {
      height: innerHeight - 200 + "px",
      width: "100%",
      value: value,
    });

    setEditorRef(vditor);
  };

  useEffect(() => {
    editorRef?.setValue(value, true);
  }, [value]);

  const getHtml = () => {
    return editorRef?.getHTML();
  };

  useEffect(() => {
    initEditor("editor");
  }, []);
  return <div id="editor">Editor</div>;
}
