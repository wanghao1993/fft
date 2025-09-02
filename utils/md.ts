import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
export const getHtml = async (content: string) => {
  try {
    const result = await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype)
      .use(rehypeStringify)
      .process(content);

    const html = result.toString();

    return html;
  } catch (error: any) {
    // 如果解析失败，返回原始内容作为fallback
    return content;
  }
};
