"use client";

/* eslint-disable jsx-a11y/no-static-element-interactions */

import { Formik, Form } from "formik";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { CheckCircle2, Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";

import { ResetPasswordFormValues, YupSchemas } from "@/app-constants";
import { FormikInput, RealButton, ResizablePanel } from "@/components";
import { useResetPassword } from "@/hooks";
import { cn } from "@/lib";

const transition = { type: "ease", ease: "easeInOut", duration: 1 };

// @todo add animation to success panel when password is reset
export default function Page() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const { mutate: resetPassword, isPending, isError, isSuccess } = useResetPassword();

  const [initialValues] = useState<ResetPasswordFormValues>({
    password: "",
    passwordConfirmation: "",
  });
  return (
    // {/* gives all children same config */}
    <MotionConfig transition={transition}>
      <div className="max-w-[25rem] mx-auto p-6 bg-white rounded-xl overflow-hidden relative">
        <ResizablePanel duration={transition.duration}>
          <Formik
            initialValues={initialValues}
            validationSchema={YupSchemas.ResetPassword}
            validateOnChange={true}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);

              const { password, passwordConfirmation } = values;
              resetPassword({ password, passwordConfirmation });

              setSubmitting(false);
            }}
          >
            {({ isValid, handleSubmit }) => (
              <>
                <AnimatePresence mode="popLayout">
                  {isPending || !isSuccess || isError ? (
                    <motion.div
                      exit={{ opacity: 0 }}
                      transition={{
                        ...transition,
                        duration: transition.duration / 1.5,
                      }}
                      key="form"
                    >
                      <Form className={cn("flex flex-col")}>
                        <div className="flex flex-row items-center justify-between pl-3">
                          <p className="text-xl font-bold">Uuenda salasõna</p>
                        </div>
                        <div className={cn("flex items-center flex-col py-2 mb-5 px-3")}>
                          <div className="w-full mt-3 space-y-2">
                            <FormikInput
                              className="w-full"
                              placeholder="Salasõna"
                              label="Salasõna"
                              required
                              name="password"
                              type={isPasswordVisible ? "text" : "password"}
                              inputAfterfix={
                                <div
                                  className="cursor-pointer"
                                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                                >
                                  {isPasswordVisible ? (
                                    <EyeOff className="w-5 h-5 fill-stone-600" />
                                  ) : (
                                    <Eye className="w-5 h-5 fill-stone-600" />
                                  )}
                                </div>
                              }
                            />
                            <FormikInput
                              className="w-full"
                              placeholder="Korda salasõna"
                              label="Korda salasõna"
                              required
                              name="passwordConfirmation"
                              type={isConfirmPasswordVisible ? "text" : "password"}
                              inputAfterfix={
                                <div
                                  className="cursor-pointer"
                                  onClick={() =>
                                    setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                                  }
                                >
                                  {isConfirmPasswordVisible ? (
                                    <EyeOff className="w-5 h-5 fill-stone-600" />
                                  ) : (
                                    <Eye className="w-5 h-5 fill-stone-600" />
                                  )}
                                </div>
                              }
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
                            <>
                              {isPending ? (
                                <Loader2 size={24} className="animate-spinner" />
                              ) : (
                                "Uuenda"
                              )}
                            </>
                          </RealButton>
                        </div>
                      </Form>
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
                        <p className="text-lg font-semibold">Parooli muutmine õnnestus!</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}
          </Formik>
        </ResizablePanel>
      </div>
    </MotionConfig>
  );
}
