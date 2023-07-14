import { HiTrash, HiX } from "react-icons/hi";

import { AnimationWrapper, RealButton, animations } from "@/components";
import { useUser } from "@/hooks";

import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "../../Popover";

interface Props {
  children: React.ReactNode;
  deleteEvent: () => void;
}

export const DeleteEventPopoverContent = ({ children, deleteEvent }: Props) => {
  const { data: user } = useUser();
  return (
    <PopoverContent className="max-w-xs lg:max-w-sm">
      <div className="flex flex-row">
        <Popover>
          <PopoverTrigger>
            {user?.role === "admin" && (
              <AnimationWrapper
                className="self-center mr-2 cursor-pointer"
                variants={animations.smallScaleXs}
              >
                <HiTrash className="w-6 h-6 text-red-600" />
              </AnimationWrapper>
            )}
          </PopoverTrigger>
          <PopoverContent className="z-50 p-4 mt-5">
            <div className="flex flex-col">
              <p className="mb-4 text-sm font-semibold text-center md:text-xl">
                Oled kindel, et soovid seda kustutada?
              </p>
              <div className="flex flex-row items-center justify-center">
                <PopoverClose>
                  <RealButton className="px-3 ml-4 text-xs md:text-base md:px-6" variant="orange">
                    Tagasi
                  </RealButton>
                </PopoverClose>
                <RealButton
                  className="px-3 ml-4 text-xs md:text-base md:px-6"
                  variant="red"
                  onClick={() => deleteEvent()}
                >
                  Kustuta
                </RealButton>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {children}

        <PopoverClose>
          <AnimationWrapper
            className="self-center ml-2 cursor-pointer"
            variants={animations.smallScaleXs}
          >
            <HiX className="self-center w-8 h-8 cursor-pointer text-stone-800" />
          </AnimationWrapper>
        </PopoverClose>
      </div>
    </PopoverContent>
  );
};
