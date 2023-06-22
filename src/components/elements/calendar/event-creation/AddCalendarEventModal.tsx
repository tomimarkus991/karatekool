"use client";

import { useState } from "react";

import { Modal, RealButton, RegisterForm } from "@/components";

interface Props {
  title?: string;
}

export const AddCalendarEventModal = ({ title }: Props) => {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const openModal = () => {
    setIsRegisterModalOpen(true);
  };

  const closeModal = () => {
    setIsRegisterModalOpen(false);
  };

  const modalButton = () => {
    return (
      <RealButton variant="orange" className="px-5" onClick={openModal}>
        Loo kasutaja
      </RealButton>
    );
  };

  return (
    <Modal
      open={isRegisterModalOpen}
      setOpen={setIsRegisterModalOpen}
      maxWidth="sm"
      modalButton={modalButton()}
    >
      <RegisterForm closeModal={closeModal} />
    </Modal>
  );
};
