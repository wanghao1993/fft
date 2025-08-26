import { Blog } from "@/types/blog";
import { EmblaCarousel } from "../carousel";
import { Link } from "@/i18n/navigation";

async function getOriginContent() {
  const res = await fetch("https://futurefrontier.ai/api/blog.php");
  const data = await res.json();
  return data.items;
}

export default async function Hero() {
  const list = await getOriginContent();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] my-6 lg:my-10 gap-4 w-full container">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 border rounded-2xl  overflow-hidden">
        <EmblaCarousel />
        <div className="py-5 hidden space-y-4 lg:block">
          <div className="text-2xl font-bold italic">Must Read</div>
          <div className="font-semibold space-y-4">
            {list.map((item: Blog, index: number) => {
              return (
                <div
                  key={item.link}
                  className="line-clamp-1 hover:text-primary-400 hover:underline text-lg"
                >
                  <Link href={item.link} target="_blank">
                    {index + 1}. {item.title}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Latest News</h2>
          {/* <QuickNewsList /> */}
        </div>
      </div>
    </div>
  );
}
