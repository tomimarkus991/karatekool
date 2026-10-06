"use client";

import { Field, Form, Formik } from "formik";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";

import { SignUpUnderageFormValues, YupSchemas } from "@/app-constants";
import {
  FormikInput,
  FormikTextArea,
  InputErrorText,
  RealButton,
  ResizablePanel,
  defaultTransition,
} from "@/components";
import { cn } from "@/lib";

import { LoadingSpinner } from "../LoadingSpinner";

const sportTypeOptions = [
  { value: "main", label: "Põhiala" },
  { value: "secondary", label: "Kõrvalala" },
];

const parents = [
  { key: "mother", title: "Ema" },
  { key: "father", title: "Isa" },
] as const;

export const SignUpFormUnderage = () => {
  const [requestSuccess, setRequestSuccess] = useState(false);
  const [requestError, setRequestError] = useState(false);
  const [initialValues] = useState<SignUpUnderageFormValues>({
    firstName: "",
    lastName: "",
    personalCode: "",
    phone: "",
    email: "",
    school: "",
    grade: "",
    address: "",
    infoEmail: "",
    sportType: "" as SignUpUnderageFormValues["sportType"],
    mother: { name: "", phone: "", email: "" },
    father: { name: "", phone: "", email: "" },
    familyMembers: "",
  });

  return (
    <MotionConfig transition={defaultTransition}>
      <div className="max-w-[40rem] m-auto p-6 bg-white rounded-xl overflow-hidden relative">
        <ResizablePanel duration={defaultTransition.duration}>
          <Formik
            initialValues={initialValues}
            validationSchema={YupSchemas.SignUpUnderage}
            validateOnChange={true}
            onSubmit={async (formData, { setSubmitting }) => {
              setSubmitting(true);
              setRequestError(false);

              const applicationSent = await fetch("/api/sign-up", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ type: "underage", ...formData }),
              }).catch(() => undefined);
              if (applicationSent?.ok) {
                setRequestSuccess(true);
              } else {
                setRequestError(true);
              }

              setSubmitting(false);
            }}
          >
            {({ isValid, isSubmitting, handleSubmit, errors, touched, submitCount, values }) => (
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
                        <p className="px-3 font-semibold text-center text-primary">
                          Laps (7–19 aastat) – vorm on mõeldud täitmiseks lapsevanemale.
                        </p>

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
                              label="Isikukood"
                              placeholder="Isikukood"
                              name="personalCode"
                              inputMode="numeric"
                              maxLength={11}
                            />
                            <FormikInput
                              required
                              className="w-full"
                              label="Lapse kontakttelefon"
                              placeholder="+372 5555 5555"
                              name="phone"
                              type="tel"
                            />
                            <div className="sm:col-span-2">
                              <FormikInput
                                required
                                className="w-full"
                                label="Lapse email"
                                placeholder="Email"
                                name="email"
                                type="email"
                              />
                            </div>
                            <div className="sm:col-span-2">
                              <FormikInput
                                required
                                className="w-full"
                                label="Kodune aadress"
                                placeholder="Kodune aadress"
                                name="address"
                              />
                            </div>
                            <FormikInput
                              required
                              className="w-full"
                              label="Kool"
                              placeholder="Kool"
                              name="school"
                            />
                            <FormikInput
                              required
                              className="w-full"
                              label="Klass"
                              placeholder="Klass"
                              name="grade"
                            />
                          </div>

                          <div className="w-full mt-4">
                            <div className="ml-1">
                              <p className="text-xs sm:text-sm text-stone-400">
                                Kas karate on lapse põhiala või kõrvalala?
                                <span className="ml-1 text-red-500">*</span>
                              </p>
                            </div>
                            <div role="radiogroup" className="flex flex-row gap-3 mt-1">
                              {sportTypeOptions.map(option => (
                                <label
                                  key={option.value}
                                  className={cn(
                                    "flex items-center gap-2 px-4 py-2 font-semibold border-2 cursor-pointer rounded-xl border-secondary",
                                    values.sportType === option.value && "border-orange-400",
                                  )}
                                >
                                  <Field
                                    type="radio"
                                    name="sportType"
                                    value={option.value}
                                    className="accent-orange-400"
                                  />
                                  {option.label}
                                </label>
                              ))}
                            </div>
                            <InputErrorText
                              className="mt-1 ml-1"
                              touched={!!touched.sportType || submitCount > 0}
                              error={errors.sportType}
                            />
                          </div>

                          <div className="w-full mt-4">
                            <p className="ml-1 font-semibold">Lapsevanemate andmed</p>
                            <p className="ml-1 text-xs text-stone-500">
                              Vähemalt ühe vanema kõik andmed peavad olema täidetud.
                            </p>
                            {parents.map(parent => (
                              <div key={parent.key} className="mt-3">
                                <p className="ml-1 text-sm font-semibold">{parent.title}</p>
                                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                                  <FormikInput
                                    className="w-full"
                                    label="Nimi"
                                    placeholder="Nimi"
                                    name={`${parent.key}.name`}
                                  />
                                  <FormikInput
                                    className="w-full"
                                    label="Telefon"
                                    placeholder="Telefon"
                                    name={`${parent.key}.phone`}
                                    type="tel"
                                  />
                                  <div className="sm:col-span-2">
                                    <FormikInput
                                      className="w-full"
                                      label="Email"
                                      placeholder="Email"
                                      name={`${parent.key}.email`}
                                      type="email"
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
                            <InputErrorText
                              className="mt-2 ml-1"
                              touched={submitCount > 0}
                              error={(errors as Record<string, string | undefined>).parentInfo}
                            />
                          </div>

                          <div className="w-full p-4 mt-4 border-2 border-orange-400 bg-orange-50 rounded-xl">
                            <p className="ml-1 font-semibold">Info email</p>
                            <p className="mb-2 ml-1 text-sm text-stone-600">
                              Sellele aadressile saadame lapsevanematele jooksvalt infot trennide,
                              ürituste ja muudatuste kohta. Palun sisesta aadress, mida jälgid
                              regulaarselt.
                            </p>
                            <FormikInput
                              required
                              className="w-full"
                              label="Info email"
                              placeholder="Email"
                              name="infoEmail"
                              type="email"
                            />
                          </div>

                          <div className="w-full mt-4">
                            <FormikTextArea
                              className="w-full"
                              label="Trennis käivad pereliikmed (valikuline)"
                              placeholder="Nt. Mari Maasikas (õde), Jüri Maasikas (isa)"
                              name="familyMembers"
                            />
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
