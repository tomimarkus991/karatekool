/* eslint-disable jsx-a11y/no-static-element-interactions */
import {
  animations,
  AnimationWrapper,
  Button,
  FormikInput,
  Modal,
  ModalFooterContainer,
} from "@redlotus/ui";
import clsx from "clsx";
import { Formik, Form } from "formik";
import { useState } from "react";
import { HiEye, HiEyeOff, HiX } from "react-icons/hi";

import { YupSchemas } from "app-constants";
import { GlowButton } from "components";
import { useSignUp } from "hooks";

export interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

interface Props {
  sidebar?: boolean;
}

export const RegisterModal = ({ sidebar }: Props) => {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const { mutate: signUp } = useSignUp();

  const [initialValues] = useState<RegisterFormValues>({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  return (
    <Modal
      open={isRegisterModalOpen}
      setOpen={setIsRegisterModalOpen}
      maxWidth="sm"
      modalButton={
        <>
          {sidebar ? (
            <GlowButton
              variant="orange"
              className="w-[13rem]"
              onClick={() => setIsRegisterModalOpen(true)}
            >
              loo kasutaja
            </GlowButton>
          ) : (
            <GlowButton variant="orange" onClick={() => setIsRegisterModalOpen(true)}>
              loo kasutaja
            </GlowButton>
          )}
        </>
      }
    >
      <Formik
        initialValues={initialValues}
        validationSchema={YupSchemas.Register}
        validateOnChange={true}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);

          const { email, name, password } = values;
          signUp({ email, password, username: name });

          resetForm();

          setSubmitting(false);
        }}
      >
        {({ isValid }) => {
          return (
            <Form className={clsx("flex flex-col")}>
              <div className="flex flex-row items-center justify-between pt-6 px-7">
                <p className="text-xl font-bold">Registreeri</p>
                <div role="button" tabIndex={0} onClick={() => setIsRegisterModalOpen(false)}>
                  <AnimationWrapper key="sub-modal-x-icon" variants={animations.rotate360}>
                    <HiX className="w-8 h-8 fill-stone-700 hover:fill-stone-800" />
                  </AnimationWrapper>
                </div>
              </div>
              <div
                className={clsx(
                  "scrollbar-hide",
                  "flex overflow-y-auto items-center flex-col py-2 px-3"
                )}
              >
                <p className="mt-2 text-sm font-semibold cursor-pointer text-secondary">
                  Kui sa pole veel luba taotlenud, vajuta siia
                </p>
                <div className="w-full mt-3 space-y-2">
                  <FormikInput className="w-full" placeholder="Nimi" name="name" />
                  <FormikInput className="w-full" placeholder="Email" name="email" />
                  <FormikInput
                    className="w-full"
                    placeholder="Salasõna"
                    name="password"
                    type={isPasswordVisible ? "text" : "password"}
                    inputAfterfix={
                      <div
                        className="cursor-pointer"
                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                      >
                        {isPasswordVisible ? (
                          <HiEyeOff className="w-5 h-5 fill-stone-600" />
                        ) : (
                          <HiEye className="w-5 h-5 fill-stone-600" />
                        )}
                      </div>
                    }
                  />
                  <FormikInput
                    className="w-full"
                    placeholder="Korda salasõna"
                    name="passwordConfirmation"
                    type={isConfirmPasswordVisible ? "text" : "password"}
                    inputAfterfix={
                      <div
                        className="cursor-pointer"
                        onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                      >
                        {isConfirmPasswordVisible ? (
                          <HiEyeOff className="w-5 h-5 fill-stone-600" />
                        ) : (
                          <HiEye className="w-5 h-5 fill-stone-600" />
                        )}
                      </div>
                    }
                  />
                </div>
              </div>
              <ModalFooterContainer>
                <div className="flex flex-col items-center justify-center">
                  <Button
                    variant="red"
                    className="w-[20rem] text-xl bg-primary"
                    type="submit"
                    isValid={isValid}
                  >
                    Registreeri
                  </Button>
                  <p className="mt-5 text-sm font-semibold cursor-pointer text-secondary">
                    Mul juba on kasutaja. Logi sisse
                  </p>
                </div>
              </ModalFooterContainer>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
};
