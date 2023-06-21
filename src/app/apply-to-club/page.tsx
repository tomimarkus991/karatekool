"use client";

import clsx from "clsx";
import { Formik, Form, useFormikContext } from "formik";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { ApplyToClubFormValues, YupSchemas } from "@/app-constants";
import {
  AnimationWrapper,
  FormikInput,
  RealButton,
  ResizablePanel,
  animations,
} from "@/components";

import { useGetEmailWhitelist } from "../../hooks";

interface FormObserverProps {
  whitelistedEmails: string[];
  setIsEmailWhitelisted: (isEmailWhitelisted: boolean) => void;
}

const FormObserver = ({ whitelistedEmails, setIsEmailWhitelisted }: FormObserverProps) => {
  const { values, resetForm } = useFormikContext();
  const typedValues = values as ApplyToClubFormValues;
  useEffect(() => {
    if (whitelistedEmails.includes(typedValues.email)) {
      setIsEmailWhitelisted(true);
      resetForm();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typedValues.email]);

  return null;
};

const transition = { type: "ease", ease: "easeInOut", duration: 1 };

export default function Page() {
  const [initialValues] = useState<ApplyToClubFormValues>({
    name: "",
    group: "",
    email: "",
    reason: "",
  });

  const { data: whitelistedEmails = [] } = useGetEmailWhitelist();

  const [isEmailWhitelisted, setIsEmailWhitelisted] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState(false);

  return (
    <MotionConfig transition={transition}>
      <div className="max-w-[25rem] m-auto p-6 bg-white rounded-xl overflow-hidden relative">
        <ResizablePanel duration={transition.duration}>
          <Formik
            initialValues={initialValues}
            validationSchema={YupSchemas.ApplyToClub}
            validateOnChange={true}
            onSubmit={async (formData, { setSubmitting }) => {
              setSubmitting(true);

              if (whitelistedEmails.includes(formData.email) && formData.email !== "") {
                setIsEmailWhitelisted(true);
              }

              const applicationSent = await fetch("/api/send-application", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
              });
              if (applicationSent.ok) {
                setRequestSuccess(true);
              }

              setSubmitting(false);
            }}
          >
            {({ isValid, handleSubmit }) => {
              return (
                <Form>
                  <FormObserver
                    whitelistedEmails={whitelistedEmails}
                    setIsEmailWhitelisted={setIsEmailWhitelisted}
                  />
                  <AnimatePresence mode="popLayout">
                    {!requestSuccess ? (
                      <motion.div
                        exit={{ opacity: 0 }}
                        transition={{
                          ...transition,
                          duration: transition.duration / 1.5,
                        }}
                        key="form"
                      >
                        {isEmailWhitelisted ? (
                          <div className="flex flex-col items-center justify-center">
                            <CheckCircle2 size={42} className="mb-3 text-green-600" />
                            <div className="flex items-center justify-center">
                              <p className="text-lg font-semibold">
                                Sul on juba luba olemas, et registreerida
                              </p>
                            </div>
                            <Link href="/register">
                              <AnimationWrapper variants={animations.smallScaleXs}>
                                <p className="mt-4 text-lg font-semibold cursor-pointer text-secondary">
                                  Registreeri
                                </p>
                              </AnimationWrapper>
                            </Link>

                            <AnimationWrapper
                              variants={animations.smallScaleXs}
                              onClick={() => {
                                setIsEmailWhitelisted(false);
                              }}
                            >
                              <p className="mt-4 font-semibold cursor-pointer text-secondary">
                                Taotle ikka
                              </p>
                            </AnimationWrapper>
                          </div>
                        ) : (
                          <Form className={clsx("flex flex-col")}>
                            <div className="flex flex-row items-center justify-between pl-3">
                              <p className="text-xl font-bold">Taotle luba</p>
                            </div>
                            <div className={clsx("flex items-center flex-col py-2 mb-5 px-3")}>
                              <div className="w-full mt-3 space-y-2">
                                <FormikInput
                                  required
                                  className="w-full"
                                  label="Email"
                                  placeholder="Email"
                                  name="email"
                                />
                                <FormikInput
                                  required
                                  className="w-full"
                                  label="Nimi"
                                  placeholder="Nimi"
                                  name="name"
                                />
                                <FormikInput
                                  required
                                  className="w-full"
                                  label="Grupp"
                                  placeholder="Grupp"
                                  name="group"
                                />
                                <FormikInput
                                  required
                                  className="w-full"
                                  label="Miks taotled?"
                                  placeholder="Miks taotled?"
                                  name="reason"
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
                                Saada taotlus
                              </RealButton>
                            </div>
                          </Form>
                        )}
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                          ...transition,
                          duration: transition.duration,
                          delay: transition.duration,
                        }}
                        key="success"
                      >
                        <div className="flex flex-col items-center justify-center">
                          <CheckCircle2 size={42} className="mb-3 text-green-600" />
                          <p className="text-lg font-semibold">Taotlus saadetud!</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Form>
              );
            }}
          </Formik>
        </ResizablePanel>
      </div>
    </MotionConfig>
  );
}
