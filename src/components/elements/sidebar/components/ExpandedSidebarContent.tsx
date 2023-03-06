import { HiX } from "react-icons/hi";

import { AnimationWrapper, SidebarLink, animations } from "@/components";
import { useIsMobile, useModifySidebarBasedOnDevice } from "@/hooks";
import { Router } from "@/types";

import { Icons } from "../../../icons/Icons";

interface Props {
  routes: Router[];
  BottomContent?: React.ReactNode;
}

export const ExpandedSidebarContent = ({ routes, BottomContent }: Props) => {
  const { modifyOnClick } = useModifySidebarBasedOnDevice();
  const { isMobile } = useIsMobile();

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row justify-between px-3">
          <div className="min-h-[3.5rem] min-w-[3.5rem]">
            {/* <Image width="0" height="0" className="h-14 w-14" src={} alt="icon" /> */}
            <Icons.logo className="h-14 w-14" />
          </div>
          <button onClick={modifyOnClick}>
            <AnimationWrapper key="expanded-sidebar-x-icon" variants={animations.scaleAndRotation}>
              <HiX className="w-12 h-12 fill-slate-700 hover:fill-slate-800" />
            </AnimationWrapper>
          </button>
        </div>
        <div className="h-full mt-8 space-y-4">
          {routes.map(({ bigIcon, href, routeName }) => {
            return (
              <>
                {isMobile ? (
                  <SidebarLink key={`${href} mobile`} href={href} icon={bigIcon}>
                    {routeName}
                  </SidebarLink>
                ) : (
                  <SidebarLink key={`${href} pc`} href={href} icon={bigIcon}>
                    {routeName}
                  </SidebarLink>
                )}
              </>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col space-y-4">{BottomContent}</div>
    </>
  );
};
