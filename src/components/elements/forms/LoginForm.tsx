"use client";

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
  RealButton,
  ModalFooterContainer,
  animations,
} from "@/components";

import { LoadingSpinner } from "../LoadingSpinner";

interface Props {
  isValid: boolean;
  isLoggingIn: boolean;
  handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
  closeModal?: () => void;
}

export const LoginForm = ({ closeModal, isValid, isLoggingIn, handleSubmit }: Props) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const title = "Mul pole veel kasutajat. Registreeri";
  console.log("is1234", isLoggingIn);

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
          <FormikInput
            label="Email"
            required
            className="w-full"
            placeholder="info@karatekool.ee"
            name="email"
          />
          <FormikInput
            required
            label="Salasõna"
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
          <Link onClick={closeModal} href="/forgot-password">
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
          <RealButton
            variant="red"
            className="mb-4"
            type="submit"
            isValid={isValid}
            onClick={handleSubmit as any}
          >
            {isLoggingIn ? <LoadingSpinner size={20} /> : "Logi sisse"}
          </RealButton>
          <Link onClick={closeModal} href="/register">
            <AnimationWrapper variants={animations.smallScaleXs}>
              <p className="text-sm font-semibold cursor-pointer text-secondary">{title}</p>
            </AnimationWrapper>
          </Link>
        </div>
      </ModalFooterContainer>
    </Form>
  );
};
