"use client";

import Image from "next/image";
import { useState } from "react";
import { HiLogout, HiX } from "react-icons/hi";

import {
  AnimationWrapper,
  animations,
  LoginModal,
  RegisterModal,
  Modal,
  ModalHeader,
} from "@/components";
import { Icons } from "@/components/icons/Icons";
import { routes } from "@/config";
import { useSidebar } from "@/context";
import { useSignOut, useUser } from "@/hooks";

import { LoadingSpinner } from "../LoadingSpinner";
import { UpdateProfileForm } from "../user/UpdateProfile";

import { SidebarLink } from ".";

export const MobileSidebarContent = () => {
  const { data: user } = useUser();
  const { mutate: signOut, isLoading: isSigningOut } = useSignOut();
  const { setSidebarState } = useSidebar();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col mb-8">
        <div className="flex flex-row justify-between px-3">
          <div className="scale-[.8]">
            <Icons.logo />
          </div>
          <button onClick={() => setSidebarState("closed")}>
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

      <div className="flex flex-col">
        {user ? (
          <div className="flex flex-col mt-4">
            <Modal
              open={isModalOpen}
              setOpen={setIsModalOpen}
              maxWidth="sm"
              modalButton={
                <AnimationWrapper
                  variants={animations.buttonMobile}
                  animateOnMobile
                  onClick={() => setIsModalOpen(true)}
                >
                  <div className="flex flex-row mb-5 ml-4">
                    <Image
                      width="0"
                      height="0"
                      className="w-12 h-12 mr-4"
                      alt="user"
                      src={`/avatars/${user?.avatar}`}
                    />
                    <div className="flex flex-col justify-center">
                      <p className="font-semibold mb-0 text-lg text-[#636363]">{user?.username}</p>
                      {user?.role === "admin" && (
                        <p className="text-sm text-[#b4b4b4]">Roll: {user?.role}</p>
                      )}
                    </div>
                  </div>
                </AnimationWrapper>
              }
            >
              <ModalHeader setOpen={setIsModalOpen} type="close">
                Muuda profiili
              </ModalHeader>
              <div className="py-6">
                <UpdateProfileForm />
              </div>
            </Modal>

            {isSigningOut ? (
              <div className="flex items-center justify-center">
                <LoadingSpinner />
              </div>
            ) : (
              <AnimationWrapper variants={animations.buttonMobile} animateOnMobile>
                <div className="flex items-center justify-start py-2 pl-4 rounded-lg hover:bg-gray-100">
                  <button
                    onClick={() => {
                      signOut();
                    }}
                    className="flex flex-row items-center"
                  >
                    <HiLogout className="w-4 h-4 ml-4 mr-8 fill-[#b4b4b4]" />
                    <p className="text-sm text-semibold text-[#818181]">Logi välja</p>
                  </button>
                </div>
              </AnimationWrapper>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center flex-1 space-y-2">
            {isSigningOut ? (
              <LoadingSpinner />
            ) : (
              <>
                <LoginModal type="sidebarButton" />
                <RegisterModal type="sidebarButton" />
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};
