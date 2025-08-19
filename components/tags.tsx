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

// 定义标签的类型
interface Tag {
  id: string;
  label: string;
  category: string;
}

// 定义分类的类型
interface Category {
  key: string;
  label: string;
}

// 定义Tags组件的props
interface TagsProps {
  tags: Tag[];
  categories: Category[];
  uiText?: {
    filtering: string;
    more: string;
  };
}

export default function Tags({ tags, categories, uiText }: TagsProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>(["首页"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [showSearch, setShowSearch] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 默认UI文本
  const defaultUIText = {
    filtering: "筛选中:",
    more: "更多",
  };

  const finalUIText = uiText || defaultUIText;

  const filteredTags = useMemo(() => {
    return tags.filter((tag) => {
      const matchesSearch = tag.label
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        categoryFilter === "all" || tag.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, categoryFilter, tags]);

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
    <section className="sticky top-16 z-40 bg-white backdrop-blur-sm border-b border-divider">
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
              <span>{finalUIText.filtering}</span>
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
                    +{selectedTags.length - 5} {finalUIText.more}
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
