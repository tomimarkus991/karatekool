"use client";

/* eslint-disable jsx-a11y/no-static-element-interactions */

import clsx from "clsx";
import { Formik, Form } from "formik";
import { useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";

import { YupSchemas } from "@/app-constants";
import { FormikInput, RealButton } from "@/components";
import { useResetPassword } from "@/hooks";

interface FormValues {
  password: string;
  passwordConfirmation: string;
}

// @todo add animation to success panel when password is reset
export default function Page() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const { mutate: resetPassword } = useResetPassword();

  const [initialValues] = useState<FormValues>({
    password: "",
    passwordConfirmation: "",
  });
  return (
    <div className="max-w-[25rem] m-auto">
      <div className="p-6 bg-white rounded-xl">
        <Formik
          initialValues={initialValues}
          validationSchema={YupSchemas.ResetPassword}
          validateOnChange={true}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);

            const { password, passwordConfirmation } = values;
            resetPassword({ password, passwordConfirmation });

            setSubmitting(false);
          }}
        >
          {({ isValid, handleSubmit }) => {
            return (
              <Form className={clsx("flex flex-col")}>
                <div className="flex flex-row items-center justify-between pl-3">
                  <p className="text-xl font-bold">Uuenda salasõna</p>
                </div>
                <div className={clsx("flex items-center flex-col py-2 mb-5 px-3")}>
                  <div className="w-full mt-3 space-y-2">
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

                <div className="flex flex-col items-center justify-center">
                  <RealButton
                    variant="red"
                    type="submit"
                    onClick={handleSubmit as any}
                    isValid={isValid}
                  >
                    Uuenda
                  </RealButton>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}
