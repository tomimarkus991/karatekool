"use client";

import { RadioGroup } from "@headlessui/react";
import { Formik, Form } from "formik";
import Image from "next/image";
import { useState } from "react";

import { YupSchemas, avatars } from "@/app-constants";
import {
  AnimationWrapper,
  FormikInput,
  Modal,
  ModalFooterContainer,
  ModalHeader,
  RealButton,
  animations,
} from "@/components";
import { useUpdateProfile, useUser } from "@/hooks";
import { cn } from "@/lib";

interface FormValues {
  name: string;
  avatar: string;
}

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate: updateProfile } = useUpdateProfile();
  const { data: user } = useUser();

  const [initialValues] = useState<FormValues>({
    name: "",
    avatar: "",
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Formik
        initialValues={initialValues}
        validationSchema={YupSchemas.UpdateProfile}
        validateOnChange={true}
        onSubmit={async ({ avatar, name }, { setSubmitting, resetForm }) => {
          setSubmitting(true);

          updateProfile({
            name,
            avatar,
          });

          resetForm();

          setSubmitting(false);
        }}
      >
        {({ values, setFieldValue, submitForm }) => {
          const { avatar, name } = values;

          return (
            <Form className="flex flex-col items-center justify-center">
              <Modal
                open={isModalOpen}
                setOpen={setIsModalOpen}
                maxWidth="md"
                modalButton={
                  <AnimationWrapper
                    onClick={openModal}
                    variants={animations.button}
                    key="ntm-user-icon"
                    className="cursor-pointer"
                  >
                    <Image
                      width="0"
                      height="0"
                      className="h-14 w-14"
                      alt="user"
                      src={`/avatars/${user?.avatar}`}
                    />
                  </AnimationWrapper>
                }
              >
                <ModalHeader setOpen={setIsModalOpen} type="close">
                  Change avatar
                </ModalHeader>

                <RadioGroup
                  className="grid grid-cols-5 gap-4 px-4 pb-3"
                  value={avatar}
                  onChange={value => {
                    setFieldValue("avatar", value);
                  }}
                >
                  {avatars.map(avatarSelect => (
                    <RadioGroup.Option value={avatarSelect} key={avatarSelect}>
                      {() => (
                        <AnimationWrapper
                          whileHover={{
                            scale: [1, 1.13],
                          }}
                          whileTap={{ scale: 0.9 }}
                          transition={{
                            duration: 0.2,
                            ease: "easeIn",
                          }}
                          animate={user?.avatar === avatarSelect ? { scale: 1.25 } : { scale: 1 }}
                          className={cn("flex justify-self-center self-center flex-grow")}
                          onClick={submitForm}
                        >
                          <Image
                            className="w-20 h-20 bg-transparent rounded-full cursor-pointer"
                            width="0"
                            height="0"
                            src={`/avatars/${avatarSelect}`}
                            onClick={() => {
                              setFieldValue("avatar", avatarSelect);
                              closeModal();
                            }}
                            alt="avatar"
                          />
                        </AnimationWrapper>
                      )}
                    </RadioGroup.Option>
                  ))}
                </RadioGroup>

                <ModalFooterContainer>
                  <RealButton variant="orange" onClick={closeModal}>
                    Cancel
                  </RealButton>
                </ModalFooterContainer>
              </Modal>

              <FormikInput label="Nimi" placeholder={user?.username || "Nimi"} name="name" />

              <RealButton
                disabled={name === "" ? true : false}
                size="sm"
                className={cn("mt-4", name === "" ? "cursor-not-allowed opacity-80" : "")}
                variant="orange"
                onClick={submitForm}
              >
                Salvesta
              </RealButton>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
