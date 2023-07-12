"use client";

import { Formik } from "formik";
import { useState } from "react";

import { YupSchemas, LoginFormValues } from "@/app-constants";
import { LoginForm } from "@/components";
import { useSignIn } from "@/hooks";

export default function Page() {
  const { mutate: signIn } = useSignIn();

  const [initialValues] = useState<LoginFormValues>({
    email: "",
    password: "",
  });
  return (
    <div className="max-w-[25rem] m-auto">
      <div className="p-6 bg-white rounded-xl">
        <Formik
          initialValues={initialValues}
          validationSchema={YupSchemas.Login}
          validateOnChange={true}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);

            const { email, password } = values;

            signIn({ email, password });

            setSubmitting(false);
          }}
        >
          {({ isValid, handleSubmit, isSubmitting }) => (
            <LoginForm isValid={isValid} isLoggingIn={isSubmitting} handleSubmit={handleSubmit} />
          )}
        </Formik>
      </div>
    </div>
  );
}
