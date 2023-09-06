import { Listbox, RadioGroup } from "@headlessui/react";
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
import { useGetGroups, useUpdateProfile, useUser } from "@/hooks";
import { cn, groupLetterColorMapper } from "@/lib";
import { GroupLetters } from "@/types";

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
        Muuda avatari
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
    calendarType: user?.calendar_type || "",
    group: user?.group || "",
  });

  const { data } = useGetGroups();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={YupSchemas.UpdateProfile}
      validateOnChange={true}
      onSubmit={async ({ avatar, name, calendarType, group }, { setSubmitting }) => {
        setSubmitting(true);

        updateProfile({
          name: name as string,
          avatar: avatar as string,
          calendarType: calendarType as string,
          group: group as string,
        });

        setSubmitting(false);
      }}
    >
      {({ values, setFieldValue, submitForm }) => {
        const { avatar } = values;

        return (
          <Form className="flex flex-col items-center justify-center">
            <AvatarPicker
              avatar={avatar as string}
              setFieldValue={setFieldValue}
              userAvatar={user?.avatar || ""}
              submitForm={submitForm}
            />
            <FormikInput label="Nimi" placeholder={user?.username || "Nimi"} name="name" />

            <Listbox value={values.group} onChange={value => setFieldValue("group", value)}>
              <Listbox.Options
                static
                className="relative px-2 py-3 mt-6 text-base bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              >
                <div className="grid items-center justify-center grid-cols-6 grid-rows-2 gap-1">
                  {data?.groups.map(group => {
                    return (
                      <Listbox.Option
                        className={cn("flex flex-row justify-self-center")}
                        key={group.letter}
                        value={group.letter}
                      >
                        {({ selected }) => (
                          <div
                            className={cn(
                              "flex flex-row justify-self-center border rounded-lg p-1 font-semibold cursor-pointer select-none",
                              selected ? "border-secondary" : "border-transparent",
                            )}
                            key={group.id}
                          >
                            <p
                              className={cn(
                                groupLetterColorMapper(group?.letter as GroupLetters),
                                "text-lg",
                              )}
                            >
                              {group.letter}
                            </p>
                          </div>
                        )}
                      </Listbox.Option>
                    );
                  })}
                </div>
              </Listbox.Options>
            </Listbox>

            <Listbox
              value={values.calendarType}
              onChange={value => setFieldValue("calendarType", value)}
            >
              <Listbox.Options
                static
                className="relative px-2 py-3 mt-6 mb-3 text-base bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              >
                <div className="grid items-center justify-center grid-cols-2 grid-rows-1 gap-1">
                  {["Kuu", "Päev"].map(calendarType => {
                    return (
                      <Listbox.Option
                        className={cn("flex flex-row justify-self-center")}
                        key={calendarType}
                        value={calendarType}
                      >
                        {({ selected }) => (
                          <div
                            className={cn(
                              "flex flex-row justify-self-center border rounded-lg p-1 font-semibold cursor-pointer select-none",
                              selected ? "border-secondary" : "border-transparent",
                            )}
                            key={calendarType}
                          >
                            <p className={cn("text-lg")}>{calendarType}</p>
                          </div>
                        )}
                      </Listbox.Option>
                    );
                  })}
                </div>
              </Listbox.Options>
            </Listbox>

            <RealButton
              // disabled={name === "" ||user?.group ? true : false}
              size="sm"
              className={cn("mt-4 disabled:cursor-not-allowed disabled:opacity-80")}
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
