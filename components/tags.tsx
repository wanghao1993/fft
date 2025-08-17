"use client";
import { useState, useRef, useMemo } from "react";
import { Chip } from "@heroui/chip";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { ChevronLeft, ChevronRight, Search, Filter, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Tags() {
  const [selectedTags, setSelectedTags] = useState<string[]>(["首页"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [showSearch, setShowSearch] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const tags = [
    { id: "home", label: "首页", category: "main" },
    { id: "bitcoin", label: "比特币", category: "crypto" },
    { id: "ethereum", label: "以太坊", category: "crypto" },
    { id: "etf", label: "ETF", category: "finance" },
    { id: "sec", label: "SEC", category: "regulation" },
    { id: "vitalik", label: "Vitalik", category: "people" },
    { id: "solana", label: "Solana", category: "crypto" },
    { id: "ton", label: "TON", category: "crypto" },
    { id: "arthur-hayes", label: "Arthur Hayes", category: "people" },
    { id: "nft", label: "NFT", category: "crypto" },
    { id: "gaming", label: "游戏", category: "sector" },
    { id: "defi", label: "DeFi", category: "crypto" },
    { id: "rwa", label: "RWA", category: "crypto" },
    { id: "stablecoin", label: "Stablecoin", category: "crypto" },
    { id: "ai", label: "AI", category: "tech" },
    { id: "layer2", label: "Layer2", category: "crypto" },
    { id: "hongkong", label: "香港", category: "region" },
    { id: "singapore", label: "新加坡", category: "region" },
    { id: "japan", label: "日本", category: "region" },
    { id: "korea", label: "韩国", category: "region" },
    { id: "usa", label: "美国", category: "region" },
    { id: "europe", label: "欧洲", category: "region" },
    { id: "mining", label: "挖矿", category: "sector" },
    { id: "analysis", label: "深度", category: "content" },
    { id: "education", label: "科普", category: "content" },
    { id: "podcast", label: "播客", category: "content" },
    { id: "video", label: "视频", category: "content" },
    { id: "app", label: "APP阅读", category: "tools" },
    { id: "contact", label: "联系我们", category: "main" },
  ];

  const categories = [
    { key: "all", label: "全部分类" },
    { key: "main", label: "主要" },
    { key: "crypto", label: "加密货币" },
    { key: "finance", label: "金融" },
    { key: "regulation", label: "监管" },
    { key: "people", label: "人物" },
    { key: "sector", label: "行业" },
    { key: "region", label: "地区" },
    { key: "content", label: "内容" },
    { key: "tech", label: "技术" },
    { key: "tools", label: "工具" },
  ];

  const filteredTags = useMemo(() => {
    return tags.filter((tag) => {
      const matchesSearch = tag.label
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        categoryFilter === "all" || tag.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, categoryFilter]);

  const handleTagToggle = (tagLabel: string) => {
    setSelectedTags((prev) => {
      if (prev.includes(tagLabel)) {
        return prev.filter((label) => label !== tagLabel);
      } else {
        return [...prev, tagLabel];
      }
    });
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: any } = {
      main: "primary",
      crypto: "secondary",
      finance: "success",
      regulation: "warning",
      people: "danger",
      sector: "primary",
      region: "secondary",
      content: "success",
      tech: "secondary",
      tools: "warning",
    };
    return colors[category] || "default";
  };

  const clearAllTags = () => {
    setSelectedTags(["首页"]);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (showSearch) {
      setSearchQuery("");
    }
  };

  return (
    <section className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-divider">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Tags Section */}
        <div className="relative py-3 flex">
          {/* Left Scroll Button */}
          <Button
            isIconOnly
            variant="light"
            size="sm"
            className="w-10"
            onPress={scrollLeft}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {/* Tags Container */}
          <div
            ref={scrollRef}
            className="flex flex-1 gap-2 overflow-x-auto scrollbar-hide mx-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {filteredTags.map((tag, index) => (
              <motion.div
                key={tag.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.02 }}
                className="flex-shrink-0"
              >
                <Chip
                  variant={
                    selectedTags.includes(tag.label) ? "solid" : "bordered"
                  }
                  color={
                    selectedTags.includes(tag.label)
                      ? getCategoryColor(tag.category)
                      : "default"
                  }
                  className="cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-sm"
                  onClick={() => handleTagToggle(tag.label)}
                  size="sm"
                >
                  {tag.label}
                </Chip>
              </motion.div>
            ))}
          </div>

          {/* Right Scroll Button */}
          <Button
            isIconOnly
            variant="light"
            size="sm"
            className="w-10"
            onPress={scrollRight}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Selected Tags Summary */}
        {selectedTags.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="pb-3 border-t border-divider/50 pt-2"
          >
            <div className="flex items-center gap-2 text-sm text-default-500">
              <span>筛选中:</span>
              <div className="flex gap-1 flex-wrap">
                {selectedTags
                  .filter((tag) => tag !== "首页")
                  .slice(0, 4)
                  .map((tag) => (
                    <Chip
                      key={tag}
                      size="sm"
                      variant="flat"
                      color="primary"
                      onClose={() => handleTagToggle(tag)}
                    >
                      {tag}
                    </Chip>
                  ))}
                {selectedTags.length > 5 && (
                  <span className="text-default-400 text-xs px-2 py-1">
                    +{selectedTags.length - 5} 更多
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Custom scrollbar hide styles */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
