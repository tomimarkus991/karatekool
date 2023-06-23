import { RadioGroup } from "@headlessui/react";
import { Formik, Form } from "formik";
import Image from "next/image";
import { useState } from "react";

import { UpdateProfileFormValues, YupSchemas, avatars } from "@/app-constants";
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

interface AvatarPickerProps {
  avatar: string;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
  userAvatar: string | undefined;
  submitForm: (() => Promise<void>) & (() => Promise<any>);
}

const AvatarPicker = ({ avatar, setFieldValue, userAvatar, submitForm }: AvatarPickerProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Modal
      open={isModalOpen}
      setOpen={setIsModalOpen}
      maxWidth="md"
      modalButton={
        <AnimationWrapper
          onClick={() => setIsModalOpen(true)}
          variants={animations.button}
          key="ntm-user-icon"
          className="cursor-pointer"
        >
          <Image
            width="0"
            height="0"
            className="h-14 w-14"
            alt="user"
            src={`/avatars/${userAvatar}`}
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
                animate={userAvatar === avatarSelect ? { scale: 1.25 } : { scale: 1 }}
                className={cn("flex justify-self-center self-center flex-grow")}
                onClick={submitForm}
              >
                <Image
                  className="bg-transparent rounded-full cursor-pointer w-14 h-14 md:w-20 md:h-20"
                  width="0"
                  height="0"
                  src={`/avatars/${avatarSelect}`}
                  onClick={() => {
                    setFieldValue("avatar", avatarSelect);
                    setIsModalOpen(false);
                  }}
                  alt="avatar"
                />
              </AnimationWrapper>
            )}
          </RadioGroup.Option>
        ))}
      </RadioGroup>

      <ModalFooterContainer>
        <RealButton variant="orange" onClick={() => setIsModalOpen(false)}>
          Cancel
        </RealButton>
      </ModalFooterContainer>
    </Modal>
  );
};

export const UpdateProfileForm = () => {
  const { mutate: updateProfile } = useUpdateProfile();
  const { data: user } = useUser();

  const [initialValues] = useState<UpdateProfileFormValues>({
    name: "",
    avatar: "",
  });
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={YupSchemas.UpdateProfile}
      validateOnChange={true}
      onSubmit={async ({ avatar, name }, { setSubmitting, resetForm }) => {
        setSubmitting(true);

        updateProfile({
          name: name as string,
          avatar: avatar as string,
        });

        resetForm();

        setSubmitting(false);
      }}
    >
      {({ values, setFieldValue, submitForm }) => {
        const { avatar, name } = values;

        return (
          <Form className="flex flex-col items-center justify-center">
            <AvatarPicker
              avatar={avatar as string}
              setFieldValue={setFieldValue}
              userAvatar={user?.avatar || ""}
              submitForm={submitForm}
            />
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
  );
};
