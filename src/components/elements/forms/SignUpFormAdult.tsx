"use client";

import { Form, Formik } from "formik";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";

import { SignUpAdultFormValues, YupSchemas } from "@/app-constants";
import {
  FormikInput,
  FormikTextArea,
  RealButton,
  ResizablePanel,
  defaultTransition,
} from "@/components";
import { cn } from "@/lib";

import { LoadingSpinner } from "../LoadingSpinner";

export const SignUpFormAdult = () => {
  const [requestSuccess, setRequestSuccess] = useState(false);
  const [requestError, setRequestError] = useState(false);
  const [initialValues] = useState<SignUpAdultFormValues>({
    firstName: "",
    lastName: "",
    birthDate: "",
    phone: "",
    email: "",
    familyMembers: "",
  });

  return (
    <MotionConfig transition={defaultTransition}>
      <div className="max-w-[40rem] m-auto p-6 bg-white rounded-xl overflow-hidden relative">
        <ResizablePanel duration={defaultTransition.duration}>
          <Formik
            initialValues={initialValues}
            validationSchema={YupSchemas.SignUpAdult}
            validateOnChange={true}
            onSubmit={async (formData, { setSubmitting }) => {
              setSubmitting(true);
              setRequestError(false);

              const applicationSent = await fetch("/api/sign-up", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ type: "adult", ...formData }),
              }).catch(() => undefined);
              if (applicationSent?.ok) {
                setRequestSuccess(true);
              } else {
                setRequestError(true);
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
                      <div className="flex flex-col">
                        <div className={cn("flex items-center flex-col py-2 mb-5 px-3")}>
                          <div className="grid w-full grid-cols-1 gap-2 mt-3 sm:grid-cols-2">
                            <FormikInput
                              required
                              className="w-full"
                              label="Eesnimi"
                              placeholder="Eesnimi"
                              name="firstName"
                            />
                            <FormikInput
                              required
                              className="w-full"
                              label="Perekonnanimi"
                              placeholder="Perekonnanimi"
                              name="lastName"
                            />
                            <FormikInput
                              required
                              className="w-full"
                              label="Sünnikuupäev"
                              name="birthDate"
                              type="date"
                            />
                            <FormikInput
                              required
                              className="w-full"
                              label="Kontakttelefon"
                              placeholder="+372 5555 5555"
                              name="phone"
                              type="tel"
                            />
                            <div className="sm:col-span-2">
                              <FormikInput
                                required
                                className="w-full"
                                label="Email"
                                placeholder="Email"
                                name="email"
                                type="email"
                              />
                              <p className="mt-1 ml-1 text-xs text-stone-500">
                                Sellele aadressile saadame jooksvalt infot trennide ja ürituste
                                kohta.
                              </p>
                            </div>
                            <div className="sm:col-span-2">
                              <FormikTextArea
                                className="w-full"
                                label="Trennis käivad pereliikmed (valikuline)"
                                placeholder="Nt. Mari Maasikas (poeg), Jüri Maasikas (abikaasa)"
                                name="familyMembers"
                              />
                            </div>
                          </div>
                        </div>
                        {requestError && (
                          <p className="px-3 mb-4 text-sm font-medium text-center text-red-500">
                            Registreerimise saatmine ebaõnnestus. Palun proovi uuesti või kirjuta
                            aadressil info@karatekool.ee
                          </p>
                        )}
                        <div className="flex justify-center pb-8">
                          <RealButton
                            variant="red"
                            size="md"
                            className="text-lg lg:text-lg"
                            onClick={handleSubmit as any}
                            isValid={isValid}
                          >
                            {isSubmitting ? <LoadingSpinner size={20} /> : "Registreeri"}
                          </RealButton>
                        </div>
                      </div>
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
                        <p className="text-lg font-semibold">Registreerimine saadetud!</p>
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
