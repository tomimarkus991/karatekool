import { Formik } from "formik";
import { useState } from "react";

import { YupSchemas } from "app-constants";
import { DefaultPageWrapper, LoginForm, LoginFormValues } from "components";
import { useSignIn } from "hooks";

export const LoginPage = () => {
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
            validationSchema={YupSchemas.Login}
            validateOnChange={true}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              setSubmitting(true);

              const { email, password } = values;

              signIn({ email, password });

              resetForm();
              setSubmitting(false);
            }}
          >
            {({ isValid }) => {
              return <LoginForm isValid={isValid} />;
            }}
          </Formik>
        </div>
      </div>
    </DefaultPageWrapper>
  );
};
