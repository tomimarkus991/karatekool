"use client";

import { Form, Formik } from "formik";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { HiX } from "react-icons/hi";
import { MdEmail } from "react-icons/md";

import { SendQuestionFormValues, YupSchemas } from "@/app-constants";
import {
  AnimationWrapper,
  FormikInput,
  FormikTextArea,
  Modal,
  RealButton,
  ResizablePanel,
  animations,
  defaultTransition,
} from "@/components";
import { cn } from "@/lib";

import { LoadingSpinner } from "../LoadingSpinner";

export const EmailSender = () => {
  const [initialValues] = useState<SendQuestionFormValues>({
    name: "",
    email: "",
    question: "",
  });
  const [requestSuccess, setRequestSuccess] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Modal
      open={isModalOpen}
      setOpen={setIsModalOpen}
      maxWidth="md"
      closeOnOverlayClick={true}
      modalButton={
        <div className="fixed z-10 md:bottom-[3rem] md:right-[3rem] bottom-[1rem] right-[1rem]">
          <button
            onClick={() => {
              setIsModalOpen(true);
              setRequestSuccess(false);
            }}
            className="p-2 m-auto bg-red-600 rounded-full cursor-pointer md:p-4"
          >
            <MdEmail className="w-5 h-5 text-white md:w-8 md:h-8" />
          </button>
        </div>
      }
    >
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
                          <div className="flex flex-row items-center justify-between pl-3">
                            <p className="text-xl font-bold">Taotle luba</p>
                            <div role="button" tabIndex={0} onClick={() => setIsModalOpen(false)}>
                              <AnimationWrapper
                                key="sub-modal-x-icon"
                                variants={animations.rotate360}
                              >
                                <HiX className="w-8 h-8 fill-stone-700 hover:fill-stone-800" />
                              </AnimationWrapper>
                            </div>
                          </div>
                          <div className={cn("flex items-center flex-col py-2 mb-5 px-3")}>
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
    </Modal>
  );
};
