/* eslint-disable jsx-a11y/no-static-element-interactions */
import { HiLogout, HiX } from "react-icons/hi";

import { AnimationWrapper, SidebarLink, animations, LoginModal, RegisterModal } from "@/components";
import { Icons } from "@/components/icons/Icons";
import { routes } from "@/config";
import { useModifySidebarBasedOnDevice, useSignOut, useUser } from "@/hooks";

export const MobileSidebarContent = () => {
  const { modifyOnClick } = useModifySidebarBasedOnDevice();
  const { data: user } = useUser();
  const { mutate: signOut } = useSignOut();

  return (
    <>
      <div className="flex flex-col mb-12">
        <div className="flex flex-row justify-between px-3">
          <div className="scale-[.8]">
            <Icons.logo />
          </div>
          <button onClick={modifyOnClick}>
            <AnimationWrapper key="expanded-sidebar-x-icon" variants={animations.scaleAndRotation}>
              <HiX className="w-12 h-12 fill-text-primary hover:fill-gray-800" />
            </AnimationWrapper>
          </button>
        </div>
        <div className="h-full mt-8 space-y-3">
          {routes.map(({ bigIcon, href, routeName }, index) => (
            <SidebarLink key={`${href} mobile ${index}`} href={href} icon={bigIcon}>
              {routeName}
            </SidebarLink>
          ))}
        </div>
      </div>

      <div className="flex flex-col space-y-4">
        {user ? (
          <div className="flex items-center justify-start ml-4">
            <AnimationWrapper variants={animations.smallScale}>
              <div onClick={() => signOut()} className="flex flex-row items-center cursor-pointer">
                <HiLogout className="w-8 h-8 mr-3 fill-text-primary" />
                <p className="text-lg font-semibold">Logi välja</p>
              </div>
            </AnimationWrapper>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center flex-1 space-y-3">
            <LoginModal type="sidebarButton" />
            <RegisterModal type="sidebarButton" />
          </div>
        )}
      </div>
    </>
  );
};
