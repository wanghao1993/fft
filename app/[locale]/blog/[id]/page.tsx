import { getBlogById } from "@/service/module/carousel";
import dayjs from "dayjs";
import { getTranslations } from "next-intl/server";
import "./style.css";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";

const getHtml = async (content: string) => {
  try {
    console.log("Original content length:", content.length);
    console.log("Original content preview:", content.substring(0, 200));

    // 预处理内容，确保Markdown格式正确
    let processedContent = content;

    // 如果内容以#11这样的格式开头，尝试修复
    if (processedContent.startsWith("#11")) {
      processedContent = processedContent.replace(/^#11\s*/, "## 11. ");
      console.log("Fixed content starting with #11");
    }

    // 测试简单的Markdown解析
    const testContent = "# Test\nThis is a **test**.";
    console.log("Testing with simple content:", testContent);

    const testResult = await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype)
      .use(rehypeStringify)
      .process(testContent);

    console.log("Test result:", testResult.toString());

    console.log("Processing content:", processedContent.substring(0, 200));

    // 解析实际内容
    const result = await unified()
      .use(remarkParse) // 先解析Markdown
      .use(remarkGfm) // 支持GitHub风格的Markdown
      .use(remarkRehype) // 转换为HTML AST
      .use(rehypeStringify) // 转换为字符串
      .process(processedContent);

    const html = result.toString();
    console.log("Parsed HTML length:", html.length);
    console.log("Parsed HTML preview:", html.substring(0, 300));

    return html;
  } catch (error: any) {
    console.error("Markdown parsing error:", error);
    console.error("Error details:", {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });
    // 如果解析失败，返回原始内容作为fallback
    return content;
  }
};

export default async function BlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const t = await getTranslations("Common");
  const data = await getBlogById(id);
  const content = await getHtml(data.content);
  console.log(content, "content");
  return (
    <main className="flex flex-col items-center justify-center gap-4 pb-8 md:pb-10 px-4 py-8 md:px-6 lg:px-8">
      <h1 className="font-bold text-2xl lg:text-3xl">{data.title} </h1>
      <div className="flex items-center gap-5">
        <div>{data.tag}</div>
        <div>
          {" "}
          {t("publishedAt")}: {dayjs(data.createdAt).format("YYYY-MM-DD HH:mm")}
        </div>
        <div>
          {t("viewCount")}: {data.viewCount}
        </div>
      </div>
      <article id="article-content" className="text-foreground/80 leading-7">
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
      </article>
    </main>
  );
}
