import clsx from "clsx";

import { useSidebar } from "@/context";
import { cn } from "@/lib";

interface Props {
  /**
   * Main content
   */
  children: React.ReactNode;
  Sidebar?: React.ReactNode;
  MobileContent: React.ReactNode;
  /**
   * Column on the right side of the screen
   */
  RightSide?: React.ReactNode;
}

export const PartialPageWrapper = ({ children, RightSide, Sidebar, MobileContent }: Props) => {
  const { sidebarState } = useSidebar();

  return (
    <>
      <div className="hidden sm2:block">
        <div id="main-content" className="flex w-full min-h-screen">
          <div className={clsx("w-full flex flex-col py-0 justify-between relative")}>
            {children}
          </div>
          {RightSide && <>{RightSide}</>}
        </div>
      </div>
      {/* mobile */}
      <div className="sm2:hidden">
        <div
          id="main-content"
          className={cn(
            "flex min-h-screen min-w-full justify-center",
            sidebarState === "mobile" && "h-full overflow-hidden",
            "pt-28"
          )}
        >
          <div className="flex flex-col justify-between w-full">{MobileContent}</div>
        </div>
        {Sidebar}
      </div>
    </>
  );
};
