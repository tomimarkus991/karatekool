import {
  AnimationWrapper,
  animations,
  useIsMobile,
  useModifySidebarBasedOnDevice,
  Router,
} from "@redlotus/ui";
import { HiX } from "react-icons/hi";

import { Logo, SidebarLink } from "components";

interface Props {
  routes: Router[];
  BottomContent?: React.ReactNode;
}

export const MobileSidebarContent = ({ routes, BottomContent }: Props) => {
  const { modifyOnClick } = useModifySidebarBasedOnDevice();
  const { isMobile } = useIsMobile();

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row justify-between px-3">
          <div className="scale-[.8]">
            <Logo />
          </div>
          <button onClick={modifyOnClick}>
            <AnimationWrapper key="expanded-sidebar-x-icon" variants={animations.scaleAndRotation}>
              <HiX className="w-12 h-12 fill-text-primary hover:fill-gray-800" />
            </AnimationWrapper>
          </button>
        </div>
        <div className="h-full mt-8 space-y-4">
          {routes.map(({ bigIcon, to, routeName }, index) => {
            return (
              <>
                {isMobile ? (
                  <SidebarLink key={`${to} mobile ${index}`} to={to} icon={bigIcon}>
                    {routeName}
                  </SidebarLink>
                ) : (
                  <SidebarLink key={`${to} desktop ${index}`} to={to} icon={bigIcon}>
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
