"use client";

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import { useState } from "react";

import { Modal, ModalHeader, RealButton } from "@/components";

import { GoogleSignInButton } from "./GoogleSignInButton";

interface Props {
  title?: string;
  type?: "text" | "button" | "sidebarButton";
}

export const LoginModal = ({ title, type = "button" }: Props) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openModal = () => {
    setIsLoginModalOpen(true);
  };

  const modalButton = () => {
    if (type === "text") {
      return (
        <p className="text-sm font-semibold cursor-pointer text-secondary" onClick={openModal}>
          {title}
        </p>
      );
    }
    if (type === "sidebarButton") {
      return (
        <RealButton variant="red" className="px-9" onClick={openModal}>
          Logi sisse
        </RealButton>
      );
    }
    return (
      <RealButton variant="red" className="px-6" onClick={openModal}>
        Logi sisse
      </RealButton>
    );
  };

  return (
    <Modal
      open={isLoginModalOpen}
      setOpen={setIsLoginModalOpen}
      maxWidth="sm"
      modalButton={modalButton()}
    >
      <ModalHeader setOpen={setIsLoginModalOpen} type="close">
        Logi sisse
      </ModalHeader>
      <div className="flex flex-col items-center py-8 space-y-4">
        <p className="text-center">Logi sisse oma Google&apos;i kontoga.</p>
        <GoogleSignInButton />
      </div>
    </Modal>
  );
};
