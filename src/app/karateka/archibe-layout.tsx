"use client";

import { NextLayoutProps } from "@/types";

export default function KaratekaLayout({ children }: NextLayoutProps) {
  return (
    // <div className="flex flex-col justify-between min-h-screen">
    //   <NavbarTop />
    //   <div className="px-0 pb-16 sm2:px-4 pt-28 sm2:pt-0 lg:px-8 xl:px-20 sm2:w-full">
    //     {children}
    //   </div>
    //   <Sidebar />
    //   <Footer />
    // </div>
    <div className="px-0 pb-16 sm2:px-4 pt-28 sm2:pt-0 lg:px-8 xl:px-20 sm2:w-full">{children}</div>
  );
}
