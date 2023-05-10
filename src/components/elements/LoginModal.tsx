"use client";

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import { Formik } from "formik";
import { useState } from "react";

import { YupSchemas } from "@/app-constants";
import { LoginForm, Modal, RealButton } from "@/components";
import { useSignIn } from "@/hooks";

export interface LoginFormValues {
  email: string;
  password: string;
}

interface Props {
  title?: string;
  type?: "text" | "button" | "sidebarButton";
}

export const LoginModal = ({ title, type = "button" }: Props) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { mutate: signIn } = useSignIn();

  const [initialValues] = useState<LoginFormValues>({
    email: "",
    password: "",
  });

  const openModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeModal = () => {
    setIsLoginModalOpen(false);
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
      <Formik
        initialValues={initialValues}
        validationSchema={YupSchemas.Login}
        validateOnChange={true}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);

          const { email, password } = values;

          signIn({ email, password });

          setSubmitting(false);
        }}
      >
        {({ isValid, handleSubmit }) => {
          return (
            <LoginForm closeModal={closeModal} isValid={isValid} handleSubmit={handleSubmit} />
          );
        }}
      </Formik>
    </Modal>
  );
};
