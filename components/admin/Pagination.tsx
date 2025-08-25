"use client";

import { Button } from "@heroui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  hasNext: boolean;
  hasPrev: boolean;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  hasNext,
  hasPrev,
}: PaginationProps) {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-between px-2 py-4">
      <div className="flex items-center space-x-2">
        <Button
          size="sm"
          variant="light"
          onPress={() => onPageChange(currentPage - 1)}
          isDisabled={!hasPrev}
        >
          <ChevronLeft size={16} />
          上一页
        </Button>

        {getPageNumbers().map((page, index) => (
          <Button
            key={index}
            size="sm"
            variant={page === currentPage ? "solid" : "light"}
            onPress={() => typeof page === "number" && onPageChange(page)}
            isDisabled={page === "..."}
            className={page === "..." ? "cursor-default" : ""}
          >
            {page}
          </Button>
        ))}

        <Button
          size="sm"
          variant="light"
          onPress={() => onPageChange(currentPage + 1)}
          isDisabled={!hasNext}
        >
          下一页
          <ChevronRight size={16} />
        </Button>
      </div>

      <div className="text-sm text-gray-600">
        第 {currentPage} 页，共 {totalPages} 页
      </div>
    </div>
  );
}
