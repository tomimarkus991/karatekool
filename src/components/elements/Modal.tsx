/* eslint-disable jsx-a11y/no-static-element-interactions */
"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, ReactNode, useRef } from "react";
import { HiArrowLeft, HiX } from "react-icons/hi";

import { animations, AnimationWrapper } from "@/components";
import { cn } from "@/lib";

export const ModalFooterContainer = ({ children }: { children: ReactNode }) => (
  <div className="sticky bottom-0 z-40 flex min-h-[4rem] w-full items-center justify-center rounded-b-xl bg-white py-3 px-6">
    {children}
  </div>
);

export const ModalTitle = ({ children }: { children: ReactNode }) => (
  <h3 className="text-xl font-semibold leading-6 text-center text-gray-700">{children}</h3>
);

const ModalHeaderContainer = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-row items-center justify-between w-full p-4">{children}</div>
);

interface ModalHeaderProps {
  children: ReactNode;
  setOpen: (value: React.SetStateAction<boolean>) => void;
  type: "back" | "close";
}

export const ModalHeader = ({ children, setOpen, type }: ModalHeaderProps) => (
  <ModalHeaderContainer>
    {type === "back" ? (
      <div role="button" tabIndex={0} onClick={() => setOpen(false)}>
        <AnimationWrapper key="modal-header-left-arrow-icon" variants={animations.rotate360}>
          <HiArrowLeft className="w-8 h-8 fill-slate-700 hover:fill-slate-800" />
        </AnimationWrapper>
      </div>
    ) : (
      <HiArrowLeft className="w-8 h-8 opacity-0" />
    )}

    <ModalTitle>{children}</ModalTitle>
    {type === "close" ? (
      <div role="button" tabIndex={0} onClick={() => setOpen(false)}>
        <AnimationWrapper key="modal-header-x-icon" variants={animations.rotate360}>
          <HiX className="w-8 h-8 fill-stone-700 hover:fill-stone-800" />
        </AnimationWrapper>
      </div>
    ) : (
      <HiX className="w-8 h-8 opacity-0" />
    )}
  </ModalHeaderContainer>
);

const modalMaxWidth = {
  xs: "sm:w-[20rem]",
  sm: "sm:w-[24rem]",
  md: "sm:w-[28rem]",
  lg: "sm:w-[32rem]",
  xl: "sm:w-[36rem]",
  "2xl": "sm:w-[42rem]",
  "3xl": "md:w-[50rem]",
};

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  modalButton: ReactNode;
  closeOnOverlayClick?: boolean;
  children?: ReactNode;
  maxWidth?: keyof typeof modalMaxWidth;
}

export const Modal = ({
  children,
  modalButton,
  open,
  closeOnOverlayClick = true,
  setOpen,
  maxWidth = "xl",
}: Props) => {
  const initialFocusRef = useRef(null);
  return (
    <>
      {modalButton}
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          initialFocus={initialFocusRef}
          className="fixed inset-0 z-[1300] flex select-none items-center justify-center"
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className="fixed inset-0 transition-opacity bg-gray-500 opacity-40"
              onClick={() => setOpen(!closeOnOverlayClick)}
            />
          </Transition.Child>

          <button
            id="button-to-remove-autofocus"
            ref={initialFocusRef}
            className="absolute inset-0 hidden"
          />
          <Transition.Child
            as={Fragment}
            enter="ease-in duration-200"
            enterFrom="opacity-0 scale-90"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel
              className={cn(
                "minscreen:min-w-[20rem] rounded-xl bg-white z-[10]",
                modalMaxWidth[maxWidth],
              )}
            >
              {children}
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
    </>
  );
};
