"use client";

import clsx from "clsx";
import { Formik, Form } from "formik";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";

import { YupSchemas } from "@/app-constants";
import { RealButton, FormikInput, ResizablePanel } from "@/components";
import { useSendPasswordResetEmail } from "@/hooks";

interface FormValues {
  email: string;
}

const transition = { type: "ease", ease: "easeInOut", duration: 1 };

export default function Page() {
  const {
    mutate: sendPasswordResetEmail,
    isError,
    isLoading,
    isSuccess,
  } = useSendPasswordResetEmail();

  const [initialValues] = useState<FormValues>({
    email: "",
  });

  return (
    <>
      {/* gives all children same config */}
      <MotionConfig transition={transition}>
        <div className="max-w-[25rem] mx-auto overflow-hidden relative p-6 bg-white rounded-xl">
          <ResizablePanel duration={transition.duration}>
            <Formik
              initialValues={initialValues}
              validationSchema={YupSchemas.ForgotPassword}
              validateOnChange={true}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);

                const { email } = values;
                sendPasswordResetEmail({ email });

                setSubmitting(false);
              }}
            >
              {({ isValid, handleSubmit }) => {
                return (
                  <AnimatePresence mode="popLayout">
                    {isLoading || !isSuccess || isError ? (
                      <Form className={clsx("flex flex-col")}>
                        <motion.div
                          exit={{ opacity: 0 }}
                          transition={{
                            ...transition,
                            duration: transition.duration / 1.5,
                          }}
                          key="form"
                        >
                          <div className="flex flex-row items-center justify-between pl-3">
                            <p className="text-xl font-bold">Taasta salasõna</p>
                          </div>
                          <div className={clsx("flex items-center flex-col py-2 mb-5 px-3")}>
                            <div className="w-full mt-2">
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
                              <>
                                {isLoading ? (
                                  <Loader2 size={24} className="animate-spinner" />
                                ) : (
                                  "Saada"
                                )}
                              </>
                            </RealButton>
                          </div>
                        </motion.div>
                      </Form>
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
                          <p className="text-lg font-semibold">
                            Email saadetud! Vaata enda meili, et jätkata
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                );
              }}
            </Formik>
          </ResizablePanel>
        </div>
      </MotionConfig>
    </>
  );
}
