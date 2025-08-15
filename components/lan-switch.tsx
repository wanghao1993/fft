"use client";

import React, { useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { Button } from "@heroui/button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { ChevronDownIcon } from "lucide-react";

interface Language {
  code: string;
  name: string;
  nativeName: string;
}

const languages: Language[] = [
  {
    code: "en",
    name: "English",
    nativeName: "English",
  },
  {
    code: "zh-CN",
    name: "Chinese",
    nativeName: "中文",
  },
];

export default function LanguageSwitch() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("LanguageSwitch");

  const currentLanguage = useMemo(() => {
    return languages.find((lang) => lang.code === locale) || languages[0];
  }, [locale]);

  const handleLanguageChange = (languageCode: string) => {
    // 获取不带语言前缀的路径
    router.replace(pathname, { locale: languageCode });
  };

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Button
          variant="light"
          className="gap-2 px-3 py-2 h-auto min-w-0"
          aria-label={t("languageSelector")}
        >
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-sm font-medium">
              {currentLanguage.nativeName}
            </span>
            <ChevronDownIcon className="h-4 w-4" />
          </div>
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label={t("selectLanguage")}
        className="w-48"
        selectionMode="single"
        selectedKeys={[locale]}
        onSelectionChange={(keys) => {
          const selectedKey = Array.from(keys)[0] as string;
          if (selectedKey) {
            handleLanguageChange(selectedKey);
          }
        }}
      >
        {languages.map((language) => (
          <DropdownItem
            key={language.code}
            className="gap-3"
            textValue={language.nativeName}
          >
            <div className="flex flex-col">
              <span className="text-sm font-medium">{language.nativeName}</span>
              <span className="text-xs text-default-500">{language.name}</span>
            </div>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
