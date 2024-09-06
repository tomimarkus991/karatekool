import { useState } from "react";
import { HiPencil, HiTrash, HiX } from "react-icons/hi";

import { AnimationWrapper, CalendarEventCreationModal, animations } from "@/components";
import { useUser } from "@/hooks";
import { EventData, EventTypes } from "@/types";

import { PopoverClose, PopoverContent } from "../../Popover";

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
        {user?.role === "admin" && (
          <AnimationWrapper
            className="self-center mr-4 cursor-pointer"
            variants={animations.smallScaleXs}
          >
            <HiTrash onClick={() => deleteEvent()} className="text-red-600 size-4 md:size-5" />
          </AnimationWrapper>
        )}

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
                  className="mt-3 cursor-pointer size-6 text-secondary"
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
            <HiX className="self-center cursor-pointer size-4 md:size-5 text-stone-800" />
          </AnimationWrapper>
        </PopoverClose>
      </div>
    </PopoverContent>
  );
};
