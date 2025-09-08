import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Globe, Zap } from "lucide-react";

export function Vision() {
  const futureInitiatives = [
    {
      icon: Sparkles,
      title: "自有品牌栏目",
      description: "推出更多原创内容IP，建立行业话语权",
    },
    {
      icon: Globe,
      title: "Web3内容峰会",
      description: "举办高品质行业峰会，连接全球Web3生态",
    },
    {
      icon: Zap,
      title: "全球影响力产品",
      description: "孵化具有全球影响力的内容产品与平台",
    },
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/6 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/6 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [-10, 10, -10],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.2, 1],
          }}
          className={`absolute w-2 h-2 bg-white/20 rounded-full`}
          style={{
            top: `${20 + i * 15}%`,
            left: `${10 + i * 12}%`,
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8">
            <span className="text-white/80">我们向何处去</span>
          </div>

          <h2 className="text-4xl md:text-6xl text-white mb-8 leading-tight">
            <motion.div
              className="block"
              initial={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              未来是什么样子？
            </motion.div>
          </h2>

          <motion.p
            className="text-xl md:text-2xl text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text mb-12"
            initial={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            与我们一起站上前沿
          </motion.p>
        </motion.div>

        {/* Main vision content */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div className="relative bg-white/5 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/10">
            {/* Decorative corners */}
            <div className="absolute top-6 left-6 w-8 h-8 border-l-2 border-t-2 border-blue-400/50 rounded-tl-lg" />
            <div className="absolute top-6 right-6 w-8 h-8 border-r-2 border-t-2 border-purple-400/50 rounded-tr-lg" />
            <div className="absolute bottom-6 left-6 w-8 h-8 border-l-2 border-b-2 border-emerald-400/50 rounded-bl-lg" />
            <div className="absolute bottom-6 right-6 w-8 h-8 border-r-2 border-b-2 border-orange-400/50 rounded-br-lg" />

            <div className="relative z-10 text-center">
              <div className="inline-block p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl mb-8">
                <Globe className="text-white" size={32} />
              </div>

              <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-4xl mx-auto mb-8">
                <strong className="text-white">Future Frontier</strong>{" "}
                致力于成为全球新金融、新叙事、新市场交汇处的桥梁，
                陪伴真正有远见的项目站上世界舞台。
              </p>

              <div className="w-24 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto" />
            </div>
          </div>
        </motion.div>

        {/* Future initiatives */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {futureInitiatives.map((initiative, index) => {
            const Icon = initiative.icon;

            return (
              <motion.div
                key={initiative.title}
                className="group"
                initial={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <div className="relative p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                  <div className="text-center">
                    <div className="inline-flex p-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="text-white" size={20} />
                    </div>

                    <h3 className="text-white mb-3 group-hover:text-blue-300 transition-colors duration-300">
                      {initiative.title}
                    </h3>

                    <p className="text-white/70 text-sm leading-relaxed">
                      {initiative.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Call to action */}
        {/* <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, scale: 1 }}
        >
          <div className="inline-block p-8 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-emerald-600/20 backdrop-blur-lg rounded-3xl border border-white/10">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <span className="text-2xl">🚀</span>
              <h3 className="text-2xl text-white">与未来同行</h3>
            </div>

            <p className="text-white/80 mb-6 max-w-md mx-auto">
              在Web3的无限可能中，让我们一起书写属于这个时代的传奇故事
            </p>

            <div className="inline-flex items-center space-x-2 text-blue-300 group cursor-pointer">
              <span>开启合作之旅</span>
              <ArrowRight
                className="group-hover:translate-x-1 transition-transform duration-300"
                size={16}
              />
            </div>
          </div>
        </motion.div> */}
      </div>
    </section>
  );
}
