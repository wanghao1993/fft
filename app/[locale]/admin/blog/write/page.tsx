"use client";

import Editor from "@/components/editor";

export default function WriteArticlePage() {
  return (
    <div>
      <h1>Write Article</h1>
      <Editor value={""} />
    </div>
  );
}
