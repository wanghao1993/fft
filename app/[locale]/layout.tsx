import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";

import { Providers } from "../providers";

import { getLocalizedSiteConfig } from "@/config/site";
import { fontSans, robotoMono } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";
import { routing } from "@/i18n/routing";

// Navbar包装器组件，用于提供国际化配置
async function NavbarWrapper() {
  const siteConfig = await getLocalizedSiteConfig();

  return (
    <Navbar
      navItems={siteConfig.navItems}
      navMenuItems={siteConfig.navMenuItems}
    />
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await getLocalizedSiteConfig();

  return {
    title: {
      default: siteConfig.name,
      template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
    metadataBase: new URL("http://38.60.91.19:3002"),
    icons: {
      icon: "/favicon.ico",
    },
    openGraph: {
      title: siteConfig.name,
      description: siteConfig.description,
      images: [
        {
          url: "/images/og.svg",
        },
      ],
    },
    twitter: {
      title: siteConfig.name,
      description: siteConfig.description,
      images: [
        {
          url: "/images/og.svg",
        },
      ],
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html suppressHydrationWarning lang={locale}>
      <head />
      <body
        className={clsx(
          "min-h-screen text-foreground bg-background font-sans antialiased",
          robotoMono.variable,
          fontSans.variable
        )}
      >
        <NextIntlClientProvider locale={locale}>
          <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
            <div className="relative flex flex-col h-screen">
              <NavbarWrapper />
              <main className="container mx-auto max-w-[1536px] flex-grow">
                {children}
              </main>
              <Footer />
            </div>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
