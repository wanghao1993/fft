import { motion } from "framer-motion";
import { FileText, Megaphone, Target, Calendar } from "lucide-react";

export function BusinessSections() {
  const businessItems = [
    {
      icon: FileText,
      title: "内容资讯",
      subtitle: "Content & Editorial",
      description: [
        "快讯、深度文章、趋势洞察",
        "中英双语内容制作与发行",
        "原创栏目：《Fast Frontier》《Frontier Voices》",
      ],
      gradient: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50",
    },
    {
      icon: Megaphone,
      title: "媒体发布与公关传播",
      subtitle: "Media & PR",
      description: [
        "全球媒体发文与传播统筹",
        "危机公关、定向投放、媒体合作策略",
        "与 CoinDesk, Cointelegraph, PANews, Theblock等建立内容合作渠道",
      ],
      gradient: "from-purple-500 to-pink-500",
      bgColor: "from-purple-50 to-pink-50",
    },
    {
      icon: Target,
      title: "市场与战略咨询",
      subtitle: "Advisory & Consulting",
      description: [
        "品牌定位、传播节奏设计",
        "多语言叙事架构、社区触达路径规划",
        "Web2 向 Web3 转型策略建议",
      ],
      gradient: "from-emerald-500 to-green-500",
      bgColor: "from-emerald-50 to-green-50",
    },
    {
      icon: Calendar,
      title: "线下活动与商务路演",
      subtitle: "Events & IR",
      description: [
        "与行业大会协作专场（如Token2049、Hong Kong Fintech Week 等）",
        "私享会、闭门路演、媒体专访策划",
      ],
      gradient: "from-orange-500 to-red-500",
      bgColor: "from-orange-50 to-red-50",
    },
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div className="inline-block px-4 py-2 bg-white rounded-full border border-gray-200 mb-8 shadow-sm">
            <span className="text-gray-600">我们做什么</span>
          </div>

          <h2 className="text-4xl md:text-6xl text-gray-900 mb-6">
            核心业务板块
          </h2>

          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            全栈式Web3品牌成长解决方案
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {businessItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                className="group"
                initial={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <div
                  className={`relative p-8 bg-gradient-to-br ${item.bgColor} border border-gray-200 rounded-2xl hover:shadow-lg transition-all duration-300 h-full`}
                >
                  {/* Icon */}
                  <div
                    className={`inline-flex p-3 bg-gradient-to-r ${item.gradient} rounded-xl mb-6 text-white`}
                  >
                    <Icon size={24} />
                  </div>

                  {/* Title */}
                  <div className="mb-4">
                    <h3 className="text-xl text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-500 uppercase tracking-wide">
                      {item.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <ul className="space-y-3">
                    {item.description.map((desc, i) => (
                      <li key={i} className="flex items-start space-x-3">
                        <div
                          className={`w-2 h-2 bg-gradient-to-r ${item.gradient} rounded-full mt-2 flex-shrink-0`}
                        />
                        <span className="text-gray-700 text-sm leading-relaxed">
                          {desc}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Number indicator */}
                  <div className="absolute top-6 right-6">
                    <div
                      className={`w-8 h-8 bg-gradient-to-r ${item.gradient} rounded-full flex items-center justify-center text-white text-sm opacity-20`}
                    >
                      {index + 1}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA section */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div className="inline-block p-8 bg-white rounded-2xl border border-gray-200 shadow-sm">
            <p className="text-lg text-gray-600 mb-4">
              从策略到执行，从内容到传播
            </p>
            <p className="text-2xl text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text">
              全方位助力您的Web3品牌成长之路
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
