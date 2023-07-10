// import "server-only";

/* eslint-disable import/no-duplicates */
/* eslint-disable import/order */
import "@/index.css";

import { AppWrapper } from "./AppWrapper";

import { Metadata } from "next";

import { Catamaran, Quicksand, Rubik } from "next/font/google";
import { NextLayoutProps } from "@/types";

import { cn } from "@/lib";
import { Footer } from "../components/elements/navigation/Footer";
import { NavbarTop } from "../components/elements/navigation/NavbarTop";
import { Sidebar } from "../components/elements/sidebar/Sidebar";
import SupabaseListener from "../components/supabase/supabaseListener";
import { SupabaseProvider } from "@/context/SupabaseContext";
import { createServerClient } from "../lib/supabaseServer";
import { Three3DLayout } from "@/three/components/Three3DLayout";

const APP_NAME = "Karatekool Nüke";
const APP_DEFAULT_TITLE = "Karatekool Nüke";
const APP_TITLE_TEMPLATE = "%s - Karatekool Nüke";
const APP_DESCRIPTION = "Karatekool nüke koduleht!";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  themeColor: "#FFFFFF",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
  },
  icons: {
    shortcut: "/favicon.ico",
  },

  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  formatDetection: {
    telephone: false,
  },
};

const catamaran = Catamaran({
  variable: "--main-font",
  subsets: ["latin"],
});
const rubik = Rubik({
  variable: "--rubik-font",
  subsets: ["latin"],
});
const quicksand = Quicksand({
  variable: "--quicksand-font",
  subsets: ["latin"],
});

export default async function RootLayout({ children }: NextLayoutProps) {
  const supabase = createServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html
      className="scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 scrollbar-track-transparent scrollbar-thin scrollbar-thumb-rounded-full"
      lang="et"
      suppressHydrationWarning
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>

      <body
        className={cn(
          "min-h-screen bg-surface-bg font-catamaran antialiased flex flex-col",
          catamaran.variable,
          rubik.variable,
          quicksand.variable
        )}
      >
        <Three3DLayout>
        <SupabaseProvider session={session}>
          <SupabaseListener serverAccessToken={session?.access_token} />
          <AppWrapper>
            <div className="flex flex-col justify-between min-h-screen">
              <NavbarTop />
              <div className="px-4 pt-36 sm2:pt-8">{children}</div>
              <Sidebar />
              <Footer />
            </div>
          </AppWrapper>
        </SupabaseProvider>
        </Three3DLayout>
      </body>
    </html>
  );
}
