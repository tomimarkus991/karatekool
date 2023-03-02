import clsx from "clsx";

import { useSidebar } from "@/context";
import { useIsMobile } from "@/hooks";

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
  const { isMobile } = useIsMobile();
  const { sidebarState } = useSidebar();

  return (
    <>
      {isMobile ? (
        <>
          <div
            id="main-content"
            className={clsx(
              "flex min-h-screen min-w-full justify-center",
              sidebarState === "mobile" && "h-full overflow-hidden",
              "pt-28"
            )}
          >
            <div className="flex flex-col justify-between w-full">{MobileContent}</div>
          </div>
          {Sidebar}
        </>
      ) : (
        <div id="main-content" className="flex w-full min-h-screen">
          <div
            className={clsx(
              "w-full flex flex-col py-0 justify-between relative",
              (sidebarState === "expanded" || sidebarState === "small") && "ml-[6.5rem]"
            )}
          >
            {children}
          </div>
          {RightSide && <>{RightSide}</>}
        </div>
      )}
    </>
  );
};
