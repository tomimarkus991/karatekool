"use client";

import { MotionConfig } from "framer-motion";
import { HiX } from "react-icons/hi";

import { AnimationWrapper, Modal, ResizablePanel, animations } from "@/components";

import { EventCreationTabs } from ".";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  button: React.ReactNode;
}

const transition = { type: "ease", ease: "easeInOut", duration: 1 };

export const CalendarEventCreationModal = ({ isModalOpen, setIsModalOpen, button }: Props) => {
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      open={isModalOpen}
      setOpen={setIsModalOpen}
      maxWidth="2xl"
      closeOnOverlayClick={false}
      modalButton={button}
    >
      <>
        <MotionConfig transition={transition}>
          <div className="relative overflow-hidden">
            <ResizablePanel duration={transition.duration}>
              <div className="flex flex-row items-center justify-between pt-6 px-7">
                <p className="text-xl font-bold">Loo trenn</p>
                <div role="button" tabIndex={0} onClick={closeModal}>
                  <AnimationWrapper key="sub-modal-x-icon" variants={animations.rotate360}>
                    <HiX className="w-8 h-8 fill-stone-700 hover:fill-stone-800" />
                  </AnimationWrapper>
                </div>
              </div>
              <div className="p-10">
                <EventCreationTabs />
              </div>
            </ResizablePanel>
          </div>
        </MotionConfig>
      </>
    </Modal>
  );
};
