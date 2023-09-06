import Image from "next/image";
import { useState } from "react";
import { HiLogout } from "react-icons/hi";
import { IoMdSettings } from "react-icons/io";

import { useSignOut } from "../../../hooks";
import { AnimationWrapper, animations } from "../../animations";
import { Modal, ModalHeader } from "../Modal";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover";

import { UpdateProfileForm } from "./UpdateProfile";

interface Props {
  avatar: string;
  username: string;
  role: string;
  group: string | null;
}

export const UserProfile = ({ avatar, username, role, group }: Props) => {
  const { mutate: signOut } = useSignOut();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Popover>
      <PopoverTrigger>
        <AnimationWrapper variants={animations.button} key="ntm-user-icon">
          <Image
            width="0"
            height="0"
            className="ml-6 h-14 w-14"
            alt="user"
            src={`/avatars/${avatar}`}
          />
        </AnimationWrapper>
      </PopoverTrigger>

      <PopoverContent>
        <div className="flex flex-col w-60">
          <div className="flex flex-row mb-3 ml-4">
            <Image
              width="0"
              height="0"
              className="w-12 h-12 mr-4"
              alt="user"
              src={`/avatars/${avatar}`}
            />
            <div className="flex flex-col justify-center">
              <p className="font-semibold mb-0 text-lg text-[#636363]">{username}</p>
              {role === "admin" && <p className="text-sm text-[#b4b4b4]">{role}</p>}
              {group && <p className="text-sm text-[#b4b4b4]">{group} grupp</p>}
            </div>
          </div>

          <Modal
            open={isModalOpen}
            setOpen={setIsModalOpen}
            maxWidth="sm"
            modalButton={
              <AnimationWrapper
                variants={animations.buttonGhost}
                className="cursor-pointer"
                onClick={() => {
                  setIsModalOpen(true);
                }}
              >
                <div className="flex items-center justify-start py-2 pl-4 rounded-lg hover:bg-gray-100">
                  <IoMdSettings className="w-4 h-4 ml-4 mr-8 fill-[#b4b4b4]" />
                  <p className="text-sm text-semibold text-[#818181]">Seaded</p>
                </div>
              </AnimationWrapper>
            }
          >
            <ModalHeader setOpen={setIsModalOpen} type="close">
              Muuda profiili
            </ModalHeader>
            <div className="py-6">
              <UpdateProfileForm />
            </div>
          </Modal>

          <AnimationWrapper
            variants={animations.buttonGhost}
            className="cursor-pointer"
            onClick={() => signOut()}
          >
            <div className="flex items-center justify-start py-2 pl-4 rounded-lg hover:bg-gray-100">
              <button className="flex flex-row items-center">
                <HiLogout className="w-4 h-4 ml-4 mr-8 fill-[#b4b4b4]" />
                <p className="text-sm text-semibold text-[#818181]">Logi välja</p>
              </button>
            </div>
          </AnimationWrapper>
        </div>
      </PopoverContent>
    </Popover>
  );
};
