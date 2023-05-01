import clsx from "clsx";

import { useSidebar } from "@/context";

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
      <div className="hidden md:block">
        <div id="main-content" className="flex w-full min-h-screen">
          <div className={clsx("w-full flex flex-col py-0 justify-between relative")}>
            {children}
          </div>
          {RightSide && <>{RightSide}</>}
        </div>
      </div>
      <div className="md:hidden">
        <div
          id="main-content"
          className={clsx(
            "flex min-h-screen min-w-full justify-center",
            sidebarState === "mobile" && "h-full overflow-hidden"
          )}
        >
          <div className="flex flex-col justify-between w-full">{MobileContent}</div>
        </div>
        {Sidebar}
      </div>
    </>
  );
};
