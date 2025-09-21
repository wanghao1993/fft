"use client";
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Kbd } from "@heroui/kbd";
import { link as linkStyles } from "@heroui/theme";
import clsx from "clsx";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { ChevronDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

import LanguageSwitch from "./lan-switch";
import SearchDialog from "./searchDialog";
import { LogoIcon } from "./icons";

import { getVisibleNavs } from "@/service/module/nav";
import { Nav } from "@/types/nav";
import { ThemeSwitch } from "@/components/theme-switch";
import { Link as NextLink } from "@/i18n/navigation";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();
  const t = useTranslations("Search");
  const SearchInput = (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className="w-[200px] h-8 bg-default-100 rounded-md flex justify-between items-center p-2"
      onClick={() => setIsOpen(true)}
    >
      <span className="text-gray-400">{t("search")}</span>
      <Kbd className="hidden lg:inline-block" keys={["command"]}>
        K
      </Kbd>
    </div>
  );

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "k" && e.metaKey) {
        setIsOpen(true);
      }
    });

    return () => {
      window.removeEventListener("keydown", (e) => {
        if (e.key === "k") {
          setIsOpen(false);
        }
      });
    };
  }, []);

  const buildNavTree = (navs: Nav[]): Nav[] => {
    // 创建映射表，便于快速查找
    const navMap = new Map<string, Nav>();
    const rootNavs: Nav[] = [];

    // 初始化所有导航项，添加 children 属性
    navs.forEach((nav) => {
      navMap.set(nav.id, { ...nav, children: [] });
    });

    // 构建树形结构

    navs.forEach((nav) => {
      const navWithChildren = navMap.get(nav.id)!;

      if (nav.parentId) {
        // 如果有父级，添加到父级的 children 中
        const parent = navMap.get(nav.parentId);
        if (parent) {
          parent.children!.push(navWithChildren);
        }
      } else {
        // 如果没有父级，添加到根级别
        rootNavs.push(navWithChildren);
      }
    });

    // 递归排序函数
    const sortNavs = (navList: Nav[]): Nav[] => {
      return navList
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map((nav) => ({
          ...nav,
          children:
            nav.children && nav.children.length > 0
              ? sortNavs(nav.children)
              : [],
        }));
    };

    return sortNavs(rootNavs);
  };

  const [navData, setNavItems] = useState<Nav[]>([]);
  const getNavItems = async () => {
    const navItems = await getVisibleNavs();

    setNavItems(buildNavTree(navItems));
  };

  useEffect(() => {
    getNavItems();
  }, []);

  return (
    <HeroUINavbar
      className=" h-16 left-0 top-0 right-0 border-b border-b-gray-200"
      maxWidth="2xl"
      shouldHideOnScroll={false}
    >
      <NavbarContent className="basis-1/5 sm:basis-full gap-8" justify="start">
        <NavbarBrand as="div" className="gap-3 w-[120px]">
          <NextLink
            className="flex justify-start items-center overflow-hidden"
            href="/"
          >
            <LogoIcon className="text-red" height={42} />
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-6 justify-start ml-2">
          {navData.map((item) => {
            // 根据当前语言选择显示名称
            const displayName = locale === "zh-CN" ? item.nameZh : item.nameEn; // 这里可以根据语言切换，暂时使用英文

            if (item.children && item.children.length > 0) {
              return (
                <Dropdown key={item.id}>
                  <NavbarItem>
                    <DropdownTrigger>
                      <span
                        className={clsx(
                          linkStyles({ color: "foreground" }),
                          "data-[active=true]:text-primary font-semibold text-foreground text-base flex items-center gap-2"
                        )}
                      >
                        {displayName}
                        <ChevronDownIcon className="w-4 h-4" />
                      </span>
                    </DropdownTrigger>
                  </NavbarItem>
                  <DropdownMenu
                    aria-label={displayName}
                    itemClasses={{
                      base: "gap-4",
                    }}
                  >
                    {item.children.map((child) => (
                      <DropdownItem key={child.id}>
                        <NextLink
                          className={clsx(
                            linkStyles({ color: "foreground" }),
                            "data-[active=true]:text-primary font-semibold w-full !block"
                          )}
                          color="foreground"
                          href={child.url || "#"}
                        >
                          {locale === "zh-CN" ? child.nameZh : child.nameEn}
                        </NextLink>
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              );
            }

            return (
              <NavbarItem key={item.id}>
                <NextLink
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    "data-[active=true]:text-primary font-semibold"
                  )}
                  color="foreground"
                  href={item.url || "#"}
                >
                  {displayName}
                </NextLink>
              </NavbarItem>
            );
          })}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden lg:flex">{SearchInput}</NavbarItem>
        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem>
          <LanguageSwitch />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        {SearchInput}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {navData.map((item, index) => {
            const displayName = locale === "zh-CN" ? item.nameZh : item.nameEn;

            return (
              <div key={item.id}>
                <NavbarMenuItem>
                  <NextLink
                    className="w-full"
                    color={
                      index === 2
                        ? "primary"
                        : index === navData.length - 1
                          ? "danger"
                          : "foreground"
                    }
                    href={item.url || "#"}
                  >
                    {displayName}
                  </NextLink>
                </NavbarMenuItem>
                {/* 渲染子菜单 */}
                {item.children && item.children.length > 0 && (
                  <div className="ml-4 flex flex-col gap-1">
                    {item.children.map((child) => (
                      <NavbarMenuItem key={child.id}>
                        <NextLink
                          className="w-full text-sm text-gray-600"
                          href={child.url || "#"}
                        >
                          {locale === "zh-CN" ? child.nameZh : child.nameEn}
                        </NextLink>
                      </NavbarMenuItem>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </NavbarMenu>
      <SearchDialog isOpen={isOpen} onOpenChange={setIsOpen} />
    </HeroUINavbar>
  );
};
