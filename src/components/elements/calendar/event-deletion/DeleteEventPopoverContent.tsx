import { useState } from "react";
import { HiPencil, HiTrash, HiX } from "react-icons/hi";

import { AnimationWrapper, CalendarEventCreationModal, RealButton, animations } from "@/components";
import { useUser } from "@/hooks";
import { EventData, EventTypes } from "@/types";

import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "../../Popover";

interface Props {
  children: React.ReactNode;
  deleteEvent: () => void;
  event?: EventData;
}

export const DeleteEventPopoverContent = ({ children, deleteEvent, event }: Props) => {
  const { data: user } = useUser();
  const [isEventCreationModalOpen, setIsEventCreationModalOpen] = useState(false);

  const openIndex = () => {
    if (event?.event_type === EventTypes.NORMAL) {
      return 0;
    }
    if (event?.event_type === EventTypes.ALL_DAY) {
      return 1;
    }
    return 2;
  };

  if (!user || user?.role !== "admin") {
    return <></>;
  }

  return (
    <PopoverContent className="max-w-xs lg:max-w-sm">
      <div className="flex flex-row">
        <Popover>
          <PopoverTrigger>
            {user?.role === "admin" && (
              <AnimationWrapper
                className="self-center mr-4 cursor-pointer"
                variants={animations.smallScaleXs}
              >
                <HiTrash className="w-4 h-4 text-red-600 md:w-5 md:h-5" />
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

        <div className="flex flex-col items-center justify-center">
          {children}
          {event && user?.role === "admin" && (
            <CalendarEventCreationModal
              isModalOpen={isEventCreationModalOpen}
              setIsModalOpen={setIsEventCreationModalOpen}
              openDate={new Date(event.start)}
              selectedTab={openIndex()}
              event={event}
              button={
                <HiPencil
                  className="w-6 h-6 mt-3 cursor-pointer text-secondary"
                  onClick={() => setIsEventCreationModalOpen(true)}
                />
              }
            />
          )}
        </div>

        <PopoverClose>
          <AnimationWrapper
            className="self-center ml-4 cursor-pointer"
            variants={animations.smallScaleXs}
          >
            <HiX className="self-center w-4 h-4 cursor-pointer md:w-5 md:h-5 text-stone-800" />
          </AnimationWrapper>
        </PopoverClose>
      </div>
    </PopoverContent>
  );
};
