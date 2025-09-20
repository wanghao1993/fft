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
import Image from "next/image";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { ChevronDownIcon } from "lucide-react";
import { useEffect, useState } from "react";

import LanguageSwitch from "./lan-switch";

import { ThemeSwitch } from "@/components/theme-switch";
import { Link as NextLink } from "@/i18n/navigation";
import SearchDialog from "./searchDialog";
import { useTranslations } from "next-intl";
import { LogoIcon } from "./icons";
// 定义导航项的类型
interface NavItem {
  href: string;
  label: string;
  children?: NavItem[];
}

// 定义Navbar组件的props
interface NavbarProps {
  navItems: NavItem[];
  navMenuItems: NavItem[];
}

export const Navbar = ({ navItems, navMenuItems }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
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
            {/* <Image
              priority
              alt="FutureFrontier logo"
              height={32}
              src={"/logo.png"}
              width={120}
            /> */}
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-6 justify-start ml-2">
          {navItems.map((item) => {
            if (item.children) {
              return (
                <Dropdown key={item.href}>
                  <NavbarItem>
                    <DropdownTrigger>
                      <span
                        className={clsx(
                          linkStyles({ color: "foreground" }),
                          "data-[active=true]:text-primary font-semibold text-foreground text-base flex items-center gap-2"
                        )}
                      >
                        {item.label}
                        <ChevronDownIcon className="w-4 h-4" />
                      </span>
                    </DropdownTrigger>
                  </NavbarItem>
                  <DropdownMenu
                    aria-label={item.label}
                    itemClasses={{
                      base: "gap-4",
                    }}
                  >
                    {item.children.map((child) => (
                      <DropdownItem key={child.label}>
                        <NextLink
                          className={clsx(
                            linkStyles({ color: "foreground" }),
                            "data-[active=true]:text-primary font-semibold w-full !block"
                          )}
                          color="foreground"
                          href={child.href}
                        >
                          {child.label}
                        </NextLink>
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              );
            }

            return (
              <NavbarItem key={item.href}>
                <NextLink
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    "data-[active=true]:text-primary font-semibold"
                  )}
                  color="foreground"
                  href={item.href}
                >
                  {item.label}
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
          {navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <NextLink
                className="w-full"
                color={
                  index === 2
                    ? "primary"
                    : index === navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
      <SearchDialog isOpen={isOpen} onOpenChange={setIsOpen} />
    </HeroUINavbar>
  );
};
