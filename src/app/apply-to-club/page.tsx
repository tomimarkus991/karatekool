"use client";

import clsx from "clsx";
import { Formik, Form } from "formik";
import { useState } from "react";

import { YupSchemas } from "@/app-constants";
import { FormikInput, RealButton } from "@/components";

interface FormValues {
  name: string;
  group: string;
  email: string;
  reason: string;
}

export default function Page() {
  const [initialValues] = useState<FormValues>({
    name: "",
    group: "",
    email: "",
    reason: "",
  });

  return (
    <div className="max-w-[25rem] m-auto">
      <div className="p-6 bg-white rounded-xl">
        <Formik
          initialValues={initialValues}
          validationSchema={YupSchemas.ApplyToClub}
          validateOnChange={true}
          onSubmit={async (_, { setSubmitting }) => {
            setSubmitting(true);

            // he sends to Nüke
            // const sentFrom = new Sender(email, name);

            // const recipients = [new Recipient("tomimarkusalber@gmail.com", "Nüke")];

            setSubmitting(false);
          }}
        >
          {({ isValid, handleSubmit }) => {
            return (
              <Form className={clsx("flex flex-col")}>
                <div className="flex flex-row items-center justify-between pl-3">
                  <p className="text-xl font-bold">Taotle luba</p>
                </div>
                <div className={clsx("flex items-center flex-col py-2 mb-5 px-3")}>
                  <div className="w-full mt-3 space-y-2">
                    <FormikInput className="w-full" placeholder="Nimi" name="name" />
                    <FormikInput className="w-full" placeholder="Grupp" name="group" />
                    <FormikInput className="w-full" placeholder="Email" name="email" />
                    <FormikInput className="w-full" placeholder="Miks taotled?" name="reason" />
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center">
                  <RealButton
                    variant="red"
                    type="submit"
                    onClick={handleSubmit as any}
                    isValid={isValid}
                  >
                    Saada taotlus
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
