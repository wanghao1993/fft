import "./style.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Future Frontier（梵境传媒）是一家总部位于香港、面向全球的Web3品牌战略与内容传播机构。我们致力于连接新兴数字金融与文化叙事，为加密行业提供前沿的内容生产、媒体策略、品牌建设与战略顾问服务。",
};

const info = [
  {
    title: "我们是谁",
    content:
      "Future Frontier（梵境传媒）是一家总部位于香港、面向全球的Web3品牌战略与内容传播机构。我们致力于连接新兴数字金融与文化叙事，为加密行业提供前沿的内容生产、媒体策略、品牌建设与战略顾问服务。",
  },

  {
    title: "叙事，是这个时代最强的杠杆",
    content:
      "我们相信，内容不仅是传播，更是影响力的铸造。在全球逐步规范化、价值回归本质的加密时代，Future Frontier 希望通过可信叙事，连接人、技术与资本的信任纽带。<br/> 中国故事讲给世界听，让全球市场听懂我们的创新。",
  },

  {
    title: "核心业务板块",
    content:
      "1. 内容资讯<br/> 2. 媒体发布与公关传播<br/> 3. 市场与战略咨询<br/> 4. 线下活动与商务路演",
  },

  {
    title: "我们的优势",
    content:
      "1. 📌 深耕行业，创始团队深耕海内外商业媒体与金融传播一线，曾服务于主流媒体、公关巨头与加密头部项目，拥有丰富的内容实战经验与行业资源<br/> 2. 🌉 跨文化能力，精通中英文内容策划，能在“全球理解中国，中国表达全球”中找到平衡<br/> 3. 📈 全栈内容，从新闻到短视频，从推文到访谈，内容资产全周期管理<br/> 4. 🧠 策略性强，紧贴政策、监管与资本动态，为客户提供超前的传播节奏设计<br/> 5. 🤝 高质量人脉网络，对接媒体、KOL、资本方、交易所、监管者",
  },
  {
    title: "与我们一起站上前沿",
    content:
      "Future Frontier 致力于成为全球新金融、新叙事、新市场交汇处的桥梁，陪伴真正有远见的项目站上世界舞台。未来我们将推出更多自有品牌栏目、举办高品质Web3内容峰会、孵化全球影响力的内容产品。",
  },
];

export default function AboutUs() {
  return (
    <main className="py-6 lg:py-10 space-y-8" id="about">
      {info.map((item, index) => (
        <div
          key={index}
          className="grid grid-cols-1 lg:grid-cols-[2fr_3fr]  max-w-6xl items-center justify-center mx-auto p-8  rounded-2xl"
        >
          <h1 className="font-bold text-3xl text-center">{item.title}</h1>
          <div
            dangerouslySetInnerHTML={{ __html: item.content }}
            className="leading-relaxed text-foreground/70 lg:border-l pl-8 border-gray-300 text-sm text-center lg:text-left"
          />
        </div>
      ))}
    </main>
  );
}
