import { Formik } from "formik";
import { useState } from "react";

import { YupSchemas } from "@/app-constants";
import { DefaultPageWrapper, RegisterForm } from "@/components";
import { useSignUp } from "@/hooks";

export interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export const RegisterPage = () => {
  const { mutate: signUp } = useSignUp();

  const [initialValues] = useState<RegisterFormValues>({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  return (
    <DefaultPageWrapper>
      <div className="max-w-[25rem] m-auto">
        <div className="p-6 bg-white rounded-xl">
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
        </div>
      </div>
    </DefaultPageWrapper>
  );
};
