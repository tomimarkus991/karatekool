/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import { Formik } from "formik";
import { useState } from "react";

import { YupSchemas } from "@/app-constants";
import { Modal, RealButton, RegisterForm } from "@/components";
import { useSignUp } from "@/hooks";

export interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

interface Props {
  title?: string;
  type?: "text" | "button" | "sidebarButton";
}

export const RegisterModal = ({ title, type = "button" }: Props) => {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const { mutate: signUp } = useSignUp();

  const [initialValues] = useState<RegisterFormValues>({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const openModal = () => {
    setIsRegisterModalOpen(true);
  };

  const closeModal = () => {
    setIsRegisterModalOpen(false);
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
      <Formik
        initialValues={initialValues}
        validationSchema={YupSchemas.Register}
        validateOnChange={true}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);

          const { email, name, password } = values;
          signUp({ email, password, username: name });

          setSubmitting(false);
        }}
      >
        {({ isValid, handleSubmit }) => {
          return (
            <RegisterForm closeModal={closeModal} isValid={isValid} handleSubmit={handleSubmit} />
          );
        }}
      </Formik>
    </Modal>
  );
};
