/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import clsx from "clsx";
import { Form } from "formik";
import Link from "next/link";
import { useState } from "react";
import { HiEye, HiEyeOff, HiX } from "react-icons/hi";

import {
  AnimationWrapper,
  FormikInput,
  GlowButton,
  ModalFooterContainer,
  RegisterModal,
  animations,
} from "@/components";

interface Props {
  isValid: boolean;
  closeModal?: () => void;
  handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
}

export const LoginForm = ({ closeModal, isValid, handleSubmit }: Props) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const title = "Mul pole veel kasutajat. Registreeri";

  return (
    <Form className={clsx("flex flex-col")}>
      {closeModal ? (
        <div className="flex flex-row items-center justify-between pt-6 px-7">
          <p className="text-xl font-bold">Logi sisse</p>
          <div role="button" tabIndex={0} onClick={closeModal}>
            <AnimationWrapper key="sub-modal-x-icon" variants={animations.rotate360}>
              <HiX className="w-8 h-8 fill-stone-700 hover:fill-stone-800" />
            </AnimationWrapper>
          </div>
        </div>
      ) : (
        <div className="flex flex-row items-center justify-start pl-4">
          <p className="text-xl font-bold">Logi sisse</p>
        </div>
      )}

      <div
        className={clsx("scrollbar-hide", "flex overflow-y-auto items-center flex-col pt-2 px-3")}
      >
        <div className="w-full m-auto mt-3 space-y-2">
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
          <Link href="/forgotPassword">
            <AnimationWrapper variants={animations.smallScaleXs}>
              <p className="mt-4 text-sm font-semibold text-center text-secondary">
                Unustasid parooli?
              </p>
            </AnimationWrapper>
          </Link>
        </div>
      </div>
      <ModalFooterContainer>
        <div className="flex flex-col items-center justify-center">
          <GlowButton
            variant="red"
            className="w-[13rem] mb-4 text-xl bg-primary"
            type="submit"
            isValid={isValid}
            onClick={handleSubmit as any}
          >
            Logi sisse
          </GlowButton>
          {closeModal ? (
            <AnimationWrapper variants={animations.smallScaleXs}>
              <RegisterModal type="text" title={title} />
            </AnimationWrapper>
          ) : (
            <Link href="/register">
              <AnimationWrapper variants={animations.smallScaleXs}>
                <p className="text-sm font-semibold cursor-pointer text-secondary">{title}</p>
              </AnimationWrapper>
            </Link>
          )}
        </div>
      </ModalFooterContainer>
    </Form>
  );
};
