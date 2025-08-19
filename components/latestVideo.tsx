"use client";
import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Button } from "@heroui/button";
import { Play, Clock, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { ImageWithFallback } from "./imageWithFallBack";
export function LatestVideos() {
  const videos = [
    {
      id: 1,
      title: "YouTube wsQeZKO4kNE",
      platform: "YouTube",
      duration: "33m",
      thumbnail:
        "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=225&fit=crop",
      description: "theCUBE POD, Dave Vellante",
    },
    {
      id: 2,
      title: "YouTube Zpp-noTeszk",
      platform: "YouTube",
      duration: "1h",
      thumbnail:
        "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=225&fit=crop",
      description: "FRIDAY AUG. 15, 2025",
    },
    {
      id: 3,
      title: "YouTube AKuld_wxZt2g",
      platform: "YouTube",
      duration: "1h",
      thumbnail:
        "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=400&h=225&fit=crop",
      description: "Robinhood 加密之战",
    },
    {
      id: 4,
      title: "YouTube NPwl_jqmDvY",
      platform: "YouTube",
      duration: "6h",
      thumbnail:
        "https://images.unsplash.com/photo-1631603090989-93f9ef6f9d80?w=400&h=225&fit=crop",
      description: "Binance Web3 Wallet",
    },
    {
      id: 5,
      title: "YouTube jfmZT9FNSl8",
      platform: "YouTube",
      duration: "6h",
      thumbnail:
        "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?w=400&h=225&fit=crop",
      description: "MAJOR NEWS! 比特币重大消息",
    },
  ];

  return (
    <section className="py-16 bg-default-50 w-full" id="video">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-foreground">最新视频</h2>
          </motion.div>
          <Button variant="bordered" size="sm">
            查看更多
          </Button>
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="group hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                {/* Thumbnail */}
                <div className="relative">
                  <ImageWithFallback
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-48 object-cover"
                  />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      isIconOnly
                      color="primary"
                      size="lg"
                      className="rounded-full w-16 h-16"
                    >
                      <Play className="h-6 w-6 ml-1" />
                    </Button>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs">
                    {video.duration}
                  </div>

                  {/* Platform Badge */}
                  <Chip
                    color="danger"
                    className="absolute top-2 left-2"
                    size="sm"
                  >
                    {video.platform}
                  </Chip>
                </div>

                <CardBody className="p-4">
                  <h3 className="font-medium text-foreground mb-2 group-hover:text-primary transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-sm text-default-500 mb-3">
                    {video.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-default-500">
                      <span>{video.platform}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-default-500">
                      <Clock className="h-3 w-3" />
                      <span>{video.duration}</span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* YouTube Channel CTA */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Card
            className="max-w-lg mx-auto"
            style={{ backgroundColor: "#fef2f2" }}
          >
            <CardBody className="p-6">
              <div className="flex items-center justify-center mb-4">
                <div className="h-12 w-12 bg-danger rounded-full flex items-center justify-center">
                  <Play className="h-6 w-6 text-white ml-1" />
                </div>
              </div>
              <h3 className="font-bold text-foreground mb-2">
                订阅我们的 YouTube 频道
              </h3>
              <p className="text-default-500 mb-4 text-sm">
                获取最新的 Web3 和加密货币视频内容
              </p>
              <Button
                color="danger"
                startContent={<ExternalLink className="h-4 w-4" />}
              >
                订阅频道
              </Button>
            </CardBody>
          </Card>
        </motion.div> */}
      </div>
    </section>
  );
}
