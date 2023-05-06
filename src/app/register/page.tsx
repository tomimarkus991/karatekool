"use client";

import { Formik } from "formik";
import { useState } from "react";

import { YupSchemas } from "@/app-constants";
import { RegisterForm, ResizablePanel } from "@/components";
import { useSignUp } from "@/hooks";

export interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export default function Page() {
  const { mutate: signUp } = useSignUp();

  const [initialValues] = useState<RegisterFormValues>({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  return (
    <div className="p-6 bg-white rounded-xl overflow-hidden max-w-[25rem] m-auto">
      <ResizablePanel duration={1}>
        <Formik
          initialValues={initialValues}
          validationSchema={YupSchemas.Register}
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
            return <RegisterForm isValid={isValid} handleSubmit={handleSubmit} />;
          }}
        </Formik>
      </ResizablePanel>
    </div>
  );
}
