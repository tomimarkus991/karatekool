"use client";

import { MotionConfig } from "framer-motion";
import { HiX } from "react-icons/hi";

import { AnimationWrapper, Modal, ResizablePanel, animations } from "@/components";

import { EventCreationTabs } from ".";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  button: React.ReactNode;
  /**
   * The date user selected when pressing on calendar date
   */
  openDate: Date;
}

const transition = { type: "ease", ease: "easeInOut", duration: 1 };

export const CalendarEventCreationModal = ({
  isModalOpen,
  setIsModalOpen,
  button,
  openDate,
}: Props) => {
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      open={isModalOpen}
      setOpen={setIsModalOpen}
      maxWidth="3xl"
      closeOnOverlayClick={false}
      modalButton={button}
    >
      <MotionConfig transition={transition}>
        <div className="relative scrollbar-overflow xs2:overflow-x-hidden">
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
              <EventCreationTabs openDate={openDate} />
            </div>
          </ResizablePanel>
        </div>
      </MotionConfig>
    </Modal>
  );
};
