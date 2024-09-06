"use client";

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import { Form, Formik } from "formik";
import Link from "next/link";
import { useState } from "react";
import { HiEye, HiEyeOff, HiX } from "react-icons/hi";

import { RegisterFormValues, YupSchemas } from "@/app-constants";
import {
  AnimationWrapper,
  FormikInput,
  ModalFooterContainer,
  RealButton,
  ResizablePanel,
  animations,
} from "@/components";
import { useSidebar } from "@/context";
import { useSignUp } from "@/hooks";
import { cn } from "@/lib";

interface Props {
  closeModal?: () => void;
}

export const RegisterForm = ({ closeModal }: Props) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const { closeSidebarIfMobile } = useSidebar();

  const { mutate: signUp } = useSignUp();

  const [initialValues] = useState<RegisterFormValues>({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const title = "Mul juba on kasutaja. Logi sisse";

  return (
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
      {({ isValid, handleSubmit }) => (
        <Form className="relative flex flex-col">
          <ResizablePanel duration={1}>
            {closeModal ? (
              <div className="flex flex-row items-center justify-between pt-6 px-7">
                <p className="text-xl font-bold">Registreeri</p>
                <div role="button" tabIndex={0} onClick={closeModal}>
                  <AnimationWrapper key="sub-modal-x-icon" variants={animations.rotate360}>
                    <HiX className="size-8 fill-stone-700 hover:fill-stone-800" />
                  </AnimationWrapper>
                </div>
              </div>
            ) : (
              <div className="flex flex-row items-center justify-start pl-4">
                <p className="text-xl font-bold">Registreeri</p>
              </div>
            )}
            <div
              className={cn(
                "scrollbar-hide",
                "flex overflow-y-auto items-center flex-col py-2 px-3",
              )}
            >
              <Link href={"/question"}>
                <AnimationWrapper variants={animations.smallScaleXs}>
                  <p className="mt-2 font-semibold text-primary">
                    NB! Kui soovid esitada küsimust, vajuta siia.
                  </p>
                </AnimationWrapper>
              </Link>
              <div className="w-full mt-3 space-y-2">
                <FormikInput
                  label="Nimi"
                  required
                  className="w-full"
                  placeholder="Nimi"
                  name="name"
                />
                <FormikInput
                  label="Email"
                  required
                  className="w-full"
                  placeholder="Email"
                  name="email"
                />
                <FormikInput
                  label="Salasõna"
                  required
                  className="w-full"
                  placeholder="******"
                  name="password"
                  type={isPasswordVisible ? "text" : "password"}
                  inputAfterfix={
                    <div
                      className="cursor-pointer"
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    >
                      {isPasswordVisible ? (
                        <AnimationWrapper variants={animations.smallScale}>
                          <HiEyeOff className="size-5 fill-stone-600" />
                        </AnimationWrapper>
                      ) : (
                        <AnimationWrapper variants={animations.smallScale}>
                          <HiEye className="size-5 fill-stone-600" />
                        </AnimationWrapper>
                      )}
                    </div>
                  }
                />
                <FormikInput
                  label="Korda salasõna"
                  required
                  className="w-full"
                  placeholder="******"
                  name="passwordConfirmation"
                  type={isConfirmPasswordVisible ? "text" : "password"}
                  inputAfterfix={
                    <div
                      className="cursor-pointer"
                      onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                    >
                      {isConfirmPasswordVisible ? (
                        <AnimationWrapper variants={animations.smallScale}>
                          <HiEyeOff className="size-5 fill-stone-600" />
                        </AnimationWrapper>
                      ) : (
                        <AnimationWrapper variants={animations.smallScale}>
                          <HiEye className="size-5 fill-stone-600" />
                        </AnimationWrapper>
                      )}
                    </div>
                  }
                />
              </div>
            </div>
            <ModalFooterContainer>
              <div className="flex flex-col items-center justify-center">
                <RealButton
                  variant="orange"
                  className="mb-4"
                  type="submit"
                  isValid={isValid}
                  onClick={handleSubmit as any}
                >
                  Loo kasutaja
                </RealButton>

                <Link
                  onClick={() => {
                    if (closeModal) closeModal();

                    closeSidebarIfMobile();
                  }}
                  href="/login"
                >
                  <AnimationWrapper variants={animations.smallScaleXs}>
                    <p className="text-sm font-semibold cursor-pointer text-secondary">{title}</p>
                  </AnimationWrapper>
                </Link>
              </div>
            </ModalFooterContainer>
          </ResizablePanel>
        </Form>
      )}
    </Formik>
  );
};
