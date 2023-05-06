"use client";

import clsx from "clsx";
import { Formik, Form } from "formik";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { YupSchemas } from "@/app-constants";
import { RealButton, FormikInput, ResizablePanel } from "@/components";
import { useSendPasswordResetEmail } from "@/hooks";

interface FormValues {
  email: string;
}

const Spinner = ({ className, ...rest }: any) => {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`${className} h-full w-auto animate-spin`}
      style={{
        animationTimingFunction: "steps(8, end)",
        animationDuration: ".75s",
      }}
      {...rest}
    >
      <rect style={{ opacity: 0.4 }} x={11} y={2} width={2} height={6} rx={1} fill="#f7f8fa" />
      <rect
        style={{ opacity: 0.4 }}
        x={18.364}
        y={4.22183}
        width={2}
        height={6}
        rx={1}
        transform="rotate(45 18.364 4.222)"
        fill="#f7f8fa"
      />
      <rect
        x={22}
        y={11}
        width={2}
        style={{ opacity: 0.4 }}
        height={6}
        rx={1}
        transform="rotate(90 22 11)"
        fill="#f7f8fa"
      />
      <rect
        x={19.7782}
        y={18.364}
        width={2}
        style={{ opacity: 0.4 }}
        height={6}
        rx={1}
        transform="rotate(135 19.778 18.364)"
        fill="#f7f8fa"
      />
      <rect
        x={13}
        y={22}
        width={2}
        style={{ opacity: 0.4 }}
        height={6}
        rx={1}
        transform="rotate(-180 13 22)"
        fill="#f7f8fa"
      />
      <rect
        x={5.63603}
        y={19.7782}
        width={2}
        style={{ opacity: 0.6 }}
        height={6}
        rx={1}
        transform="rotate(-135 5.636 19.778)"
        fill="#f7f8fa"
      />
      <rect
        x={2}
        y={13}
        width={2}
        style={{ opacity: 0.8 }}
        height={6}
        rx={1}
        transform="rotate(-90 2 13)"
        fill="#f7f8fa"
      />
      <rect
        x={4.22183}
        y={5.63603}
        width={2}
        height={6}
        rx={1}
        transform="rotate(-45 4.222 5.636)"
        fill="#f7f8fa"
      />
    </svg>
  );
};

const transition = { type: "ease", ease: "easeInOut", duration: 1 };

export default function Page() {
  const {
    mutate: sendPasswordResetEmail,
    isError,
    isLoading,
    isSuccess,
  } = useSendPasswordResetEmail();
  const [status, setStatus] = useState<"success" | "error" | "idle" | "loading">("idle");

  const [initialValues] = useState<FormValues>({
    email: "",
  });

  useEffect(() => {
    if (isError) {
      setStatus("error");
    } else if (isSuccess) {
      setStatus("success");
    } else if (isLoading) {
      setStatus("loading");
    }
  }, [isError, isSuccess, isLoading]);

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
              onSubmit={(values, { setSubmitting, resetForm }) => {
                setSubmitting(true);

                const { email } = values;
                sendPasswordResetEmail({ email });

                resetForm();

                setSubmitting(false);
              }}
            >
              {({ isValid, handleSubmit }) => {
                return (
                  <Form className={clsx("flex flex-col")}>
                    <div className="flex flex-row items-center justify-between pl-3">
                      <p className="text-xl font-bold">Taasta salasõna</p>
                    </div>
                    <AnimatePresence mode="popLayout">
                      {isLoading || status !== "success" || isError ? (
                        <motion.div
                          exit={{ opacity: 0 }}
                          transition={{
                            ...transition,
                            duration: transition.duration / 1.5,
                          }}
                          key="form"
                        >
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
                                {status === "loading" ? <Spinner className="w-6 h-6" /> : "Saada"}
                              </>
                            </RealButton>
                          </div>
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
                          <p className="pl-3 mt-3">Email saadetud! Vaata enda meili, et jätkata</p>
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
    </>
  );
}
