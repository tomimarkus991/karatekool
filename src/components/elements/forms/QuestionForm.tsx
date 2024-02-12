"use client";

import { Form, Formik } from "formik";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { HiX } from "react-icons/hi";

import { SendQuestionFormValues, YupSchemas } from "@/app-constants";
import {
  AnimationWrapper,
  FormikInput,
  FormikTextArea,
  RealButton,
  ResizablePanel,
  animations,
  defaultTransition,
} from "@/components";
import { cn } from "@/lib";

import { LoadingSpinner } from "../LoadingSpinner";

interface Props {
  requestSuccess: boolean;
  setRequestSuccess: (requestSuccess: boolean) => void;
  setIsModalOpen?: (isModalOpen: boolean) => void;
}

export const QuestionForm = ({ requestSuccess, setRequestSuccess, setIsModalOpen }: Props) => {
  const [initialValues] = useState<SendQuestionFormValues>({
    name: "",
    email: "",
    question: "",
  });

  return (
    <MotionConfig transition={defaultTransition}>
      <div className="max-w-[25rem] m-auto p-6 bg-white rounded-xl overflow-hidden relative">
        <ResizablePanel duration={defaultTransition.duration}>
          <Formik
            initialValues={initialValues}
            validationSchema={YupSchemas.SendQuestionForm}
            validateOnChange={true}
            onSubmit={async (formData, { setSubmitting }) => {
              setSubmitting(true);

              const applicationSent = await fetch("/api/send-question", {
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
            {({ isValid, isSubmitting, handleSubmit }) => (
              <Form>
                <AnimatePresence mode="popLayout">
                  {!requestSuccess ? (
                    <motion.div
                      exit={{ opacity: 0 }}
                      transition={{
                        ...defaultTransition,
                        duration: defaultTransition.duration / 1.5,
                      }}
                      key="form"
                    >
                      <Form className={cn("flex flex-col")}>
                        {setIsModalOpen ? (
                          <div className="flex flex-row items-center justify-between pl-3">
                            <p className="text-xl font-bold">Saada küsimus</p>
                            <div role="button" tabIndex={0} onClick={() => setIsModalOpen(false)}>
                              <AnimationWrapper
                                key="sub-modal-x-icon"
                                variants={animations.rotate360}
                              >
                                <HiX className="size-8 fill-stone-700 hover:fill-stone-800" />
                              </AnimationWrapper>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-start justify-start pl-3">
                            <p className="text-xl font-bold">Saada küsimus</p>
                          </div>
                        )}

                        <div className={cn("flex items-center flex-col py-2 px-3")}>
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
                            <FormikTextArea
                              required
                              className="w-full"
                              label="Küsimus?"
                              placeholder="Küsimus?"
                              name="question"
                            />
                          </div>
                        </div>
                        <p className="mb-4 font-semibold text-center">
                          Uute liikmete vastuvõtt klubisse toimub taas Septembris!
                        </p>
                        <div className="flex justify-center pb-8">
                          <RealButton
                            variant="red"
                            size="md"
                            onClick={handleSubmit as any}
                            isValid={isValid}
                          >
                            {isSubmitting ? <LoadingSpinner size={20} /> : "Saada küsimus"}
                          </RealButton>
                        </div>
                      </Form>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        ...defaultTransition,
                        duration: defaultTransition.duration,
                        delay: defaultTransition.duration,
                      }}
                      key="success"
                    >
                      <div className="flex flex-col items-center justify-center">
                        <CheckCircle2 size={42} className="mb-3 text-green-600" />
                        <p className="text-lg font-semibold">Küsimus saadetud!</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Form>
            )}
          </Formik>
        </ResizablePanel>
      </div>
    </MotionConfig>
  );
};
