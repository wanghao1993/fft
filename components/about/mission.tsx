import { motion } from "framer-motion";

export function Mission() {
  return (
    <section className="py-20 px-6 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-50 rounded-full blur-3xl opacity-40" />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div className="inline-block px-4 py-2 bg-gray-100 rounded-full mb-8">
            <span className="text-gray-600">我们的使命</span>
          </div>

          <h2 className="text-4xl md:text-6xl text-gray-900 mb-6">
            为什么我们出发
          </h2>

          <motion.div
            className="text-2xl md:text-3xl text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text mb-12"
            initial={{ opacity: 0, scale: 0.95 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, scale: 1 }}
          >
            叙事，是这个时代最强的杠杆
          </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <div className="relative p-8 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl">
              <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg opacity-10" />
              <p className="text-lg text-gray-700 leading-relaxed">
                我们相信，内容不仅是传播，更是
                <strong className="text-gray-900"> 影响力的铸造</strong>。
                在全球逐步规范化、价值回归本质的加密时代，Future Frontier
                希望通过
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  可信叙事
                </span>
                ，连接人、技术与资本的信任纽带。
              </p>
            </div>

            <div className="relative p-8 bg-gradient-to-br from-emerald-50 to-white border border-emerald-200 rounded-2xl">
              <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-lg opacity-10" />
              <p className="text-lg text-gray-700 leading-relaxed">
                让
                <span className="bg-gradient-to-r from-red-500 via-yellow-500 to-red-600 bg-clip-text text-transparent">
                  中国故事讲给世界听
                </span>
                ， 让
                <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                  全球市场听懂我们的创新
                </span>
                。
              </p>
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <div className="relative bg-gradient-to-br from-slate-900 to-slate-700 p-12 rounded-3xl text-white">
              {/* Decorative elements */}
              <div className="absolute top-6 left-6 w-8 h-8 border-2 border-blue-400 rounded-full opacity-30" />
              <div className="absolute bottom-6 right-6 w-6 h-6 bg-gradient-to-r from-purple-400 to-emerald-400 rounded-full opacity-40" />
              <div className="absolute top-1/2 right-8 w-2 h-2 bg-white rounded-full opacity-60" />

              <div className="relative z-10">
                <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mb-6" />
                <h3 className="text-2xl mb-6">连接 · 信任 · 创新</h3>
                <div className="space-y-4 text-white/80">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full" />
                    <span>人与技术的桥梁</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full" />
                    <span>资本与创新的纽带</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                    <span>全球与本土的融合</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
