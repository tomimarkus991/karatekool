"use client";

import { useState } from "react";

import { Modal, RealButton, RegisterForm } from "@/components";

interface Props {
  title?: string;
  type?: "text" | "button" | "sidebarButton";
}

export const RegisterModal = ({ title, type = "button" }: Props) => {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const openModal = () => {
    setIsRegisterModalOpen(true);
  };

  const closeModal = () => {
    setIsRegisterModalOpen(false);
  };

  const modalButton = () => {
    if (type === "text") {
      return (
        <button className="text-sm font-semibold cursor-pointer text-secondary" onClick={openModal}>
          {title}
        </button>
      );
    }
    if (type === "sidebarButton") {
      return (
        <RealButton variant="orange" className="px-6" onClick={openModal}>
          Loo kasutaja
        </RealButton>
      );
    }
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
