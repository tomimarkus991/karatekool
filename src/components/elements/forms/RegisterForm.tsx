/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { animations, AnimationWrapper, FormikInput, ModalFooterContainer } from "@redlotus/ui";
import clsx from "clsx";
import { Form } from "formik";
import { useState } from "react";
import { HiEye, HiEyeOff, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";

import { GlowButton, LoginModal } from "@/components";
import { definedRoutes } from "@/routes";

interface Props {
  isValid: boolean;
  handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
  closeModal?: () => void;
}

export const RegisterForm = ({ closeModal, isValid, handleSubmit }: Props) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const title = "Mul juba on kasutaja. Logi sisse";

  return (
    <Form className={clsx("flex flex-col")}>
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
        className={clsx("scrollbar-hide", "flex overflow-y-auto items-center flex-col py-2 px-3")}
      >
        <Link to={definedRoutes.apply}>
          <AnimationWrapper variants={animations.smallScaleXs}>
            <p className="text-base font-semibold cursor-pointer text-secondary">
              Kui sa pole veel luba taotlenud, vajuta siia
            </p>
          </AnimationWrapper>
        </Link>
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
          <GlowButton
            variant="red"
            className="w-[13rem] mb-4 text-xl bg-primary"
            type="submit"
            isValid={isValid}
            onClick={handleSubmit as any}
          >
            Registreeri
          </GlowButton>

          {closeModal ? (
            <AnimationWrapper variants={animations.smallScaleXs}>
              <LoginModal type="text" title={title} />
            </AnimationWrapper>
          ) : (
            <Link to={definedRoutes.login}>
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
