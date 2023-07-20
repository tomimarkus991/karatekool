"use client";

import { EmailSender } from "../../components/elements/navigation/EmailSender";
import { Footer } from "../../components/elements/navigation/Footer";
import { NavbarTop } from "../../components/elements/navigation/NavbarTop";
import { Sidebar } from "../../components/elements/sidebar/Sidebar";

export default function ChildrenLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col justify-between min-h-screen bg-surface-bg">
      <NavbarTop />
      <div className="px-4 pt-36 sm2:pt-8">{children}</div>
      <Sidebar />
      <Footer />
      <EmailSender />
    </div>
  );
}
