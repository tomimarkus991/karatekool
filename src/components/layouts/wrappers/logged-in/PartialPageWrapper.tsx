import { useSidebar, useIsMobile } from "@redlotus/ui";
import clsx from "clsx";

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
              "flex min-h-screen min-w-full justify-center bg-surface-bg",
              sidebarState === "mobile" && "h-full overflow-hidden",
              "py-28 pb-[6.5rem]"
            )}
          >
            <div className="flex flex-col w-full h-full">{MobileContent}</div>
          </div>
          {Sidebar}
        </>
      ) : (
        <div id="main-content" className="flex w-full min-h-screen bg-surface-bg">
          <div
            className={clsx(
              "w-full py-0 px-10 lg:px-6",
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
