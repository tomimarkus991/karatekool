"use client";

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import { Form, Formik, useFormikContext } from "formik";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
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
import { useSignUp, useGetEmailWhitelist } from "@/hooks";
import { cn } from "@/lib";

interface Props {
  closeModal?: () => void;
}

interface FormObserverProps {
  whitelistedEmails: string[];
  setIsAllowedToRegister: (isAllowedToRegister: boolean) => void;
}

const FormObserver = ({ whitelistedEmails, setIsAllowedToRegister }: FormObserverProps) => {
  const { values } = useFormikContext();
  const typedValues = values as RegisterFormValues;

  useEffect(() => {
    const startTime = Date.now();
    const interval1 = setInterval(() => {
      const elapsedTime = Date.now() - startTime;

      if (elapsedTime > 2000) {
        if (!whitelistedEmails.includes(typedValues.email) && typedValues.email !== "") {
          setIsAllowedToRegister(false);
          toast.error("Teil ei ole lubatud registreerida. Palun taotle luba");
          clearInterval(interval1);
        } else if (typedValues.email === "") {
          setIsAllowedToRegister(false);
          clearInterval(interval1);
        } else {
          setIsAllowedToRegister(true);
          toast.success("Te saate registreerida");
          clearInterval(interval1);
        }
      }
    }, 2000);

    return () => {
      clearInterval(interval1);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typedValues.email]);

  return null;
};

export const RegisterForm = ({ closeModal }: Props) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const { closeSidebarIfMobile } = useSidebar();

  const [isAllowedToRegister, setIsAllowedToRegister] = useState(true);
  const { mutate: signUp } = useSignUp();

  const [initialValues] = useState<RegisterFormValues>({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const { data: whitelistedEmails = [] } = useGetEmailWhitelist();

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
          <FormObserver
            whitelistedEmails={whitelistedEmails}
            setIsAllowedToRegister={setIsAllowedToRegister}
          />
          <ResizablePanel duration={1}>
            {closeModal ? (
              <div className="flex flex-row items-center justify-between pt-6 px-7">
                <p className="text-xl font-bold">Registreeri</p>
                <div role="button" tabIndex={0} onClick={closeModal}>
                  <AnimationWrapper key="sub-modal-x-icon" variants={animations.rotate360}>
                    <HiX className="w-8 h-8 fill-stone-700 hover:fill-stone-800" />
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
              <Link
                onClick={() => {
                  if (closeModal) closeModal();

                  closeSidebarIfMobile();
                }}
                href="/apply-to-club"
              >
                <AnimationWrapper variants={animations.smallScaleXs}>
                  <p
                    className={cn(
                      "font-semibold text-secondary text-center",
                      isAllowedToRegister ? "hidden" : "text-base",
                    )}
                  >
                    Kui sa pole veel luba taotlenud, vajuta siia
                  </p>
                </AnimationWrapper>
              </Link>
              <Link href={"/question"}>
                <AnimationWrapper variants={animations.smallScaleXs}>
                  <p className="mt-2 font-semibold text-primary">
                    NB! Kui soovid hoopis küsimust küsida vajuta siia!
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
                          <HiEyeOff className="w-5 h-5 fill-stone-600" />
                        </AnimationWrapper>
                      ) : (
                        <AnimationWrapper variants={animations.smallScale}>
                          <HiEye className="w-5 h-5 fill-stone-600" />
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
                          <HiEyeOff className="w-5 h-5 fill-stone-600" />
                        </AnimationWrapper>
                      ) : (
                        <AnimationWrapper variants={animations.smallScale}>
                          <HiEye className="w-5 h-5 fill-stone-600" />
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
