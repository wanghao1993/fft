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
import { Input } from "@heroui/input";
import { link as linkStyles } from "@heroui/theme";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";

import LanguageSwitch from "./lan-switch";
import SearchDialog from "./searchDialog";

import { ThemeSwitch } from "@/components/theme-switch";
import { SearchIcon } from "@/components/icons";
import { Link as NextLink } from "@/i18n/navigation";
import { ChevronDownIcon } from "lucide-react";
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
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
      onFocus={() => {
        console.log("focus");
        setIsOpen(true);
      }}
    />
  );

  const [isOpen, setIsOpen] = useState(false);

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
      maxWidth="xl"
      shouldHideOnScroll={false}
    >
      <NavbarContent className="basis-1/5 sm:basis-full gap-8" justify="start">
        <NavbarBrand as="div" className="gap-3 w-[120px]">
          <NextLink
            className="flex justify-start items-center overflow-hidden"
            href="/"
          >
            <Image
              priority
              alt="FutureFrontier logo"
              height={32}
              src={"/logo.png"}
              width={120}
            />
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
        {/* <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem> */}
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
        {searchInput}
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
