import { motion } from "framer-motion";

export function BrandStatement() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 py-20 px-6">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(120,119,198,0.3),transparent_50%)] opacity-50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.05),transparent_50%)]" />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8">
            <span className="text-white/80">我们是谁</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight">
            <motion.div
              animate={{ opacity: 1, x: 0 }}
              className="block"
              initial={{ opacity: 0, x: -20 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              探索内容与金融的
            </motion.div>
            <motion.div
              animate={{ opacity: 1, x: 0 }}
              className="block bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, x: 20 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              交汇处
            </motion.div>
          </h1>

          <motion.h2
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-3xl text-white/70 mb-12"
            initial={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            走在未来的边界之上
          </motion.h2>
        </motion.div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <div className="relative bg-white/5 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-white/10">
            {/* Decorative corner elements */}
            <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-blue-400/50 rounded-tl-lg" />
            <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-purple-400/50 rounded-tr-lg" />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-emerald-400/50 rounded-bl-lg" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-orange-400/50 rounded-br-lg" />

            <div className="text-center space-y-6">
              <div className="inline-block">
                <h3 className="text-3xl md:text-4xl text-white mb-2">
                  Future Frontier
                </h3>
                <p className="text-lg text-white/60">梵境传媒</p>
              </div>

              <div className="w-16 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto" />

              <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto">
                <strong className="text-white">
                  Future Frontier（梵境传媒）
                </strong>
                是一家总部位于香港、面向全球的Web3品牌战略与内容传播机构。我们致力于连接新兴数字金融与文化叙事，为加密行业提供前沿的
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-medium">
                  内容生产、媒体策略、品牌建设与战略顾问服务
                </span>
                。
              </p>
            </div>
          </div>
        </motion.div>

        {/* Floating elements for visual enhancement */}
        <motion.div
          animate={{
            y: [0, -10, 0],
            opacity: [0.6, 1, 0.6],
          }}
          className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full opacity-60"
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          animate={{
            y: [0, 15, 0],
            x: [0, 5, 0],
            opacity: [0.4, 0.8, 0.4],
          }}
          className="absolute bottom-32 right-16 w-3 h-3 bg-purple-400 rounded-full opacity-40"
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.7, 1, 0.7],
          }}
          className="absolute top-1/3 right-20 w-1 h-1 bg-emerald-400 rounded-full opacity-70"
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
      </div>
    </section>
  );
}
