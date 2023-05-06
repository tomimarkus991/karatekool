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

export const metadata: Metadata = {
  title: "Karateklubi Nüke",
  description: "Tere tulemast nüke kodulehele!",
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

export default function RootLayout({ children }: NextLayoutProps) {
  return (
    <html
      className="scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 scrollbar-track-transparent scrollbar-thin scrollbar-thumb-rounded-full"
      lang="et"
      suppressHydrationWarning
    >
      <head />

      <body
        className={cn(
          "min-h-screen bg-surface-bg font-catamaran antialiased flex flex-col",
          catamaran.variable,
          rubik.variable,
          quicksand.variable
        )}
      >
        <AppWrapper>
          <div className="flex flex-col justify-between min-h-screen">
            <NavbarTop />
            <div className="px-4 pt-36 sm2:pt-8">{children}</div>
            <Sidebar />
            <Footer />
          </div>
        </AppWrapper>
      </body>
    </html>
  );
}
