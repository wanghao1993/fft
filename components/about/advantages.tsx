import { motion } from "framer-motion";

export function Advantages() {
  const advantages = [
    {
      emoji: "📍",
      title: "深耕行业",
      description:
        "创始团队深耕海内外商业媒体与金融传播一线，曾服务于主流媒体、公关巨头与加密头部项目，拥有丰富的内容实战经验与行业资源",
    },
    {
      emoji: "🌉",
      title: "跨文化能力",
      description:
        "精通中英文内容策划，能在'全球理解中国，中国表达全球'中找到平衡",
    },
    {
      emoji: "📈",
      title: "全栈内容",
      description: "从新闻到短视频，从推文到访谈，内容资产全周期管理",
    },
    {
      emoji: "🧠",
      title: "策略性强",
      description: "紧贴政策、监管与资本动态，为客户提供超前的传播节奏设计",
    },
    {
      emoji: "🤝",
      title: "高质量人脉网络",
      description: "对接媒体、KOL、资本方、交易所、监管者",
    },
  ];

  return (
    <section className="py-20 px-6 bg-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 border border-blue-300 rounded-full" />
        <div className="absolute bottom-40 right-20 w-24 h-24 border border-purple-300 rounded-full" />
        <div className="absolute top-1/2 left-1/3 w-16 h-16 border border-emerald-300 rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div className="inline-block px-4 py-2 bg-gray-100 rounded-full mb-8">
            <span className="text-gray-600">为什么选择我们</span>
          </div>

          <h2 className="text-4xl md:text-6xl text-gray-900 mb-8">
            你与行业之间，
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent">
              差一个好故事
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => (
            <motion.div
              key={advantage.title}
              className="group"
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <div className="relative p-8 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl hover:shadow-lg hover:border-gray-300 transition-all duration-300 h-full">
                {/* Emoji circle */}
                <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">{advantage.emoji}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl text-gray-900 mb-4 group-hover:text-blue-700 transition-colors duration-300">
                  {advantage.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed text-sm">
                  {advantage.description}
                </p>

                {/* Hover effect decoration */}
                <div className="absolute bottom-4 right-4 w-8 h-8 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
