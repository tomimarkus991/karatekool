/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
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
import { useNavigate, Link } from "react-router-dom";

import { YupSchemas } from "app-constants";
import { GlowButton } from "components";
import { useSignIn } from "hooks";
import { definedRoutes } from "routes";

export interface LoginFormValues {
  email: string;
  password: string;
}

interface Props {
  sidebar?: boolean;
}

export const LoginModal = ({ sidebar }: Props) => {
  const navigate = useNavigate();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { mutate: signIn } = useSignIn();

  const [initialValues] = useState<LoginFormValues>({
    email: "",
    password: "",
  });
  return (
    <Modal
      open={isLoginModalOpen}
      setOpen={setIsLoginModalOpen}
      maxWidth="sm"
      modalButton={
        <>
          {sidebar ? (
            <GlowButton className="w-[13rem]" onClick={() => setIsLoginModalOpen(true)}>
              logi sisse
            </GlowButton>
          ) : (
            <GlowButton onClick={() => setIsLoginModalOpen(true)}>logi sisse</GlowButton>
          )}
        </>
      }
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
        {({ isValid }) => {
          return (
            <Form className={clsx("flex flex-col")}>
              <div className="flex flex-row items-center justify-between pt-6 px-7">
                <p className="text-xl font-bold">Logi sisse</p>
                <div role="button" tabIndex={0} onClick={() => setIsLoginModalOpen(false)}>
                  <AnimationWrapper key="sub-modal-x-icon" variants={animations.rotate360}>
                    <HiX className="w-8 h-8 fill-stone-700 hover:fill-stone-800" />
                  </AnimationWrapper>
                </div>
              </div>
              <div
                className={clsx(
                  "scrollbar-hide",
                  "flex overflow-y-auto items-center flex-col pt-2 px-3"
                )}
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
                          <HiEyeOff className="w-5 h-5 fill-stone-600" />
                        ) : (
                          <HiEye className="w-5 h-5 fill-stone-600" />
                        )}
                      </div>
                    }
                  />
                  <p
                    onClick={() => navigate(definedRoutes.forgotPassword)}
                    className="mt-4 text-sm font-semibold text-center cursor-pointer text-secondary"
                  >
                    Unustasid parooli?
                  </p>
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
                    Logi sisse
                  </Button>
                  <Link to={definedRoutes.register}>
                    <p className="mt-5 text-sm font-semibold cursor-pointer text-secondary">
                      Mul pole veel kasutajat. Registreeri
                    </p>
                  </Link>
                </div>
              </ModalFooterContainer>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
};
