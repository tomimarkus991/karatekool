import Image from "next/image";
import Link from "next/link";
import { HiLogout } from "react-icons/hi";
import { IoMdSettings } from "react-icons/io";

import { useSignOut } from "../../../hooks";
import { AnimationWrapper, animations } from "../../animations";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover";

interface Props {
  avatar: string;
  username: string;
  role: string;
}

export const UserProfile = ({ avatar, username, role }: Props) => {
  const { mutate: signOut } = useSignOut();
  return (
    <Popover>
      <PopoverTrigger>
        <AnimationWrapper variants={animations.button} key="ntm-user-icon">
          <Image
            width="0"
            height="0"
            className="h-14 w-14 ml-6"
            alt="user"
            src={`/avatars/${avatar}`}
          />
        </AnimationWrapper>
      </PopoverTrigger>
      <PopoverContent>
        <div className="w-60 flex flex-col">
          <div className="flex flex-row mb-3 ml-4">
            <Image
              width="0"
              height="0"
              className="h-12 w-12 mr-4"
              alt="user"
              src={`/avatars/${avatar}`}
            />
            <div className="flex justify-center flex-col">
              <p className="font-semibold mb-0 text-lg text-[#636363]">{username}</p>
              {role === "admin" && <p className="text-sm text-[#b4b4b4]">Roll: {role}</p>}
            </div>
          </div>

          <Link href="/profiil">
            <AnimationWrapper variants={animations.buttonGhost}>
              <div className="flex items-center justify-start py-2 hover:bg-gray-100 rounded-lg pl-4">
                <IoMdSettings className="w-4 h-4 ml-4 mr-8 fill-[#b4b4b4]" />
                <p className="text-sm text-semibold text-[#818181]">Seaded</p>
              </div>
            </AnimationWrapper>
          </Link>

          <AnimationWrapper variants={animations.buttonGhost} className="cursor-pointer">
            <div className="flex items-center justify-start py-2 hover:bg-gray-100 rounded-lg pl-4">
              <button onClick={() => signOut()} className="flex flex-row items-center">
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
