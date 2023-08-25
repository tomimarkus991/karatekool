"use client";

import { useState } from "react";
import { MdEmail } from "react-icons/md";

import { AnimationWrapper, Modal, QuestionForm, animations } from "@/components";

export const EmailSender = () => {
  const [requestSuccess, setRequestSuccess] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Modal
      open={isModalOpen}
      setOpen={setIsModalOpen}
      maxWidth="md"
      closeOnOverlayClick={true}
      modalButton={
        <div className="fixed z-10 md:bottom-[3rem] md:right-[3rem] bottom-[1rem] right-[1rem]">
          <AnimationWrapper variants={animations.smallScaleXs}>
            <button
              onClick={() => {
                setIsModalOpen(true);
                setRequestSuccess(false);
              }}
              className="p-2 m-auto bg-red-600 rounded-full cursor-pointer md:p-4"
            >
              <MdEmail className="w-5 h-5 text-white md:w-8 md:h-8" />
            </button>
          </AnimationWrapper>
        </div>
      }
    >
      <QuestionForm
        requestSuccess={requestSuccess}
        setRequestSuccess={setRequestSuccess}
        setIsModalOpen={setIsModalOpen}
      />
    </Modal>
  );
};
