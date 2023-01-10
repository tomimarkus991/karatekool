/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { FormikInput, Button } from "@redlotus/ui";
import clsx from "clsx";
import { Formik, Form } from "formik";
import { useState } from "react";
import { HiEyeOff, HiEye } from "react-icons/hi";
import { Link } from "react-router-dom";

import { yupSchemas } from "app-constants";
import { LoginFormValues } from "components";
import { definedRoutes } from "routes";

export const LoginPage = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [initialValues] = useState<LoginFormValues>({
    email: "",
    password: "",
  });
  return (
    <div className="flex w-full m-auto items-center justify-center h-[70vh] max-w-md">
      <div className="">
        <Formik
          initialValues={initialValues}
          validationSchema={yupSchemas.LoginYupSchema}
          validateOnChange={true}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setSubmitting(true);

            //   const { email, name, password } = values;

            resetForm();

            setSubmitting(false);
          }}
        >
          {({ isValid }) => {
            return (
              <Form className={clsx("flex flex-col")}>
                <div className="flex flex-row items-center justify-between pt-6 px-7">
                  <p className="text-xl font-bold">Logi sisse</p>
                </div>
                <div
                  className={clsx(
                    "scrollbar-hide",
                    "flex overflow-y-auto items-center flex-col py-2 px-3 h-[10vh] min-h-[10rem]"
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
  );
};
