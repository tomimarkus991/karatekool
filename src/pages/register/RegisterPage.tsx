/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { FormikInput, Button } from "@redlotus/ui";
import clsx from "clsx";
import { Formik, Form } from "formik";
import { useState } from "react";
import { HiEyeOff, HiEye } from "react-icons/hi";
import { Link } from "react-router-dom";

import { yupSchemas } from "app-constants";
import { DefaultPageWrapper } from "components";
import { useSignUp } from "hooks";
import { definedRoutes } from "routes";

export interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export const RegisterPage = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const { mutate: signUp } = useSignUp();

  const [initialValues] = useState<RegisterFormValues>({
    name: "test",
    email: "test@gmail.com",
    password: "test1234",
    passwordConfirmation: "test1234",
  });

  return (
    <DefaultPageWrapper>
      <div className="max-w-[25rem] m-auto">
        <div className="p-6 bg-white rounded-xl">
          <Formik
            initialValues={initialValues}
            validationSchema={yupSchemas.RegisterYupSchema}
            validateOnChange={true}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setSubmitting(true);

              const { email, name, password } = values;
              signUp({ email, password, username: name });

              resetForm();

              setSubmitting(false);
            }}
          >
            {({ isValid, handleSubmit }) => {
              return (
                <Form className={clsx("flex flex-col")}>
                  <div className="flex flex-row items-center justify-between pl-3">
                    <p className="text-xl font-bold">Registreeri</p>
                  </div>
                  <div
                    className={clsx(
                      "scrollbar-hide",
                      "flex overflow-y-auto items-center flex-col py-2 px-3 h-[27vh] min-h-[15rem]"
                    )}
                  >
                    <Link to={definedRoutes.apply}>
                      <p className="mt-2 text-sm font-semibold cursor-pointer text-secondary">
                        Kui sa pole veel luba taotlenud, vajuta siia
                      </p>
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
                    <Button
                      variant="red"
                      className="w-[20rem] text-xl bg-primary"
                      type="submit"
                      onClick={handleSubmit as any}
                      isValid={isValid}
                    >
                      Registreeri
                    </Button>
                    <Link to={definedRoutes.login}>
                      <p className="mt-2 text-sm font-semibold cursor-pointer text-secondary">
                        Mul juba on kasutaja. Logi sisse
                      </p>
                    </Link>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </DefaultPageWrapper>
  );
};
