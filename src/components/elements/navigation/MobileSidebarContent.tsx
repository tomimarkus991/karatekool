import { HiX } from "react-icons/hi";

import { AnimationWrapper, Logo, SidebarLink, animations } from "@/components";
import { routes } from "@/config";
import { useModifySidebarBasedOnDevice } from "@/hooks";

interface Props {
  BottomContent?: React.ReactNode;
}

export const MobileSidebarContent = ({ BottomContent }: Props) => {
  const { modifyOnClick } = useModifySidebarBasedOnDevice();

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
          {routes.map(({ bigIcon, href, routeName }, index) => (
            <SidebarLink key={`${href} mobile ${index}`} href={href} icon={bigIcon}>
              {routeName}
            </SidebarLink>
          ))}
        </div>
      </div>

      <div className="flex flex-col space-y-4">{BottomContent}</div>
    </>
  );
};
