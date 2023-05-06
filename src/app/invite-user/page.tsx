"use client";

import clsx from "clsx";
import { Formik, Form } from "formik";
import { useState } from "react";

import { YupSchemas } from "@/app-constants";
import { FormikInput, RealButton } from "@/components";
import { useSendInviteEmail } from "@/hooks";

interface FormValues {
  email: string;
}
export default function Page() {
  const { mutate: sendInviteEmail } = useSendInviteEmail();

  const [initialValues] = useState<FormValues>({
    email: "",
  });
  return (
    <div className="max-w-[25rem] m-auto">
      <div className="p-6 bg-white rounded-xl">
        <Formik
          initialValues={initialValues}
          validationSchema={YupSchemas.ForgotPassword}
          validateOnChange={true}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);

            const { email } = values;
            sendInviteEmail({ email });

            setSubmitting(false);
          }}
        >
          {({ isValid, handleSubmit }) => {
            return (
              <Form className={clsx("flex flex-col")}>
                <div className="flex flex-row items-center justify-between pl-3">
                  <p className="text-xl font-bold">Saada kutse</p>
                </div>
                <div className={clsx("flex items-center flex-col py-2 mb-5 px-3")}>
                  <div className="w-full mt-3 space-y-2">
                    <FormikInput className="w-full" placeholder="Email" name="email" />
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center">
                  <RealButton
                    variant="red"
                    type="submit"
                    onClick={handleSubmit as any}
                    isValid={isValid}
                  >
                    Saada
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
