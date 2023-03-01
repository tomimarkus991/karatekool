/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Modal } from "@redlotus/ui";
import { Formik } from "formik";
import { useState } from "react";

import { YupSchemas } from "@/app-constants";
import { GlowButton, LoginForm } from "@/components";
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
        <GlowButton className="w-[13rem]" onClick={openModal}>
          logi sisse
        </GlowButton>
      );
    }
    return <GlowButton onClick={openModal}>logi sisse</GlowButton>;
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
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);

          const { email, password } = values;

          signIn({ email, password });

          resetForm();

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
