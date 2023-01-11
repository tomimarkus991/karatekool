/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { FormikInput, Button } from "@redlotus/ui";
import clsx from "clsx";
import { Formik, Form } from "formik";
import { useState } from "react";
import { HiEyeOff, HiEye } from "react-icons/hi";
import { Link } from "react-router-dom";

import { yupSchemas } from "app-constants";
import { DefaultPageWrapper, LoginFormValues } from "components";
import { useSignIn } from "hooks";
import { definedRoutes } from "routes";

export const LoginPage = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { mutate: signIn } = useSignIn();

  const [initialValues] = useState<LoginFormValues>({
    email: "",
    password: "",
  });
  return (
    <DefaultPageWrapper>
      <div className="max-w-[25rem] m-auto">
        <div className="p-6 bg-white rounded-xl">
          <Formik
            initialValues={initialValues}
            validationSchema={yupSchemas.LoginYupSchema}
            validateOnChange={true}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              setSubmitting(true);

              const { email, password } = values;

              signIn({ email, password });

              resetForm();
              setSubmitting(false);
            }}
          >
            {({ isValid, handleSubmit }) => {
              return (
                <Form className={clsx("flex flex-col")}>
                  <div className="pl-3">
                    <p className="text-xl font-bold">Logi sisse</p>
                  </div>
                  <div className={clsx("flex items-center flex-col py-2 px-3")}>
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
                      <Link to={definedRoutes.forgotPassword}>
                        <p className="mt-2 text-sm font-semibold text-center cursor-pointer text-secondary">
                          Unustasid parooli?
                        </p>
                      </Link>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center">
                    <Button
                      variant="red"
                      className="w-[20rem] text-xl bg-primary"
                      type="submit"
                      isValid={isValid}
                      onClick={handleSubmit as any}
                    >
                      Logi sisse
                    </Button>
                    <Link to={definedRoutes.register}>
                      <p className="mt-2 text-sm font-semibold cursor-pointer text-secondary">
                        Mul pole veel kasutajat. Registreeri
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
