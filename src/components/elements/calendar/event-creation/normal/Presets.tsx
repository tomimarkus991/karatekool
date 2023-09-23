"use client";

import { parseISO } from "date-fns";
import { useState } from "react";
import { HiPencil, HiTrash, HiX } from "react-icons/hi";

import { NormalEventFormValues, NormalEventSelectedGroupsFormValues } from "@/app-constants";
import { AnimationWrapper, Modal, RealButton, animations } from "@/components";
import { useGetEventPresets, useDeleteEventPreset } from "@/hooks";

import { NormalEventDisplay } from "../../events";

interface Props {
  setValues: (data: NormalEventFormValues) => any;
}

export const Presets = ({ setValues }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: eventPresets } = useGetEventPresets();
  const { mutate: deletePreset } = useDeleteEventPreset();

  return (
    <Modal
      open={isModalOpen}
      setOpen={setIsModalOpen}
      maxWidth="lg"
      modalButton={
        <RealButton type="button" variant="orange" size="xs" onClick={() => setIsModalOpen(true)}>
          Vali valmis üritus
        </RealButton>
      }
    >
      <div className="p-4">
        <div className="flex flex-row items-center justify-between pl-3">
          <div className="flex flex-row">
            {isEditing ? (
              <p className="text-xl font-bold">Vali milline üritus kustutada</p>
            ) : (
              <p className="text-xl font-bold">Valmis üritused</p>
            )}

            <AnimationWrapper className="ml-2 cursor-pointer" variants={animations.smallScaleXs}>
              <HiPencil className="w-6 h-6 text-red-600" onClick={() => setIsEditing(!isEditing)} />
            </AnimationWrapper>
          </div>
          <div
            role="button"
            tabIndex={0}
            onClick={() => {
              setIsModalOpen(false);
              setIsEditing(false);
            }}
          >
            <AnimationWrapper key="sub-modal-x-icon" variants={animations.rotate360}>
              <HiX className="w-8 h-8 fill-stone-700 hover:fill-stone-800" />
            </AnimationWrapper>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 my-3">
          {eventPresets?.map(preset => {
            const selectedGroups = [
              ...preset.groups,
              ...preset.highlightedGroups,
            ] as NormalEventSelectedGroupsFormValues;

            return (
              <>
                {isEditing ? (
                  <button
                    key={preset.id}
                    className="flex flex-col mx-auto scale-125 opacity-50 cursor-pointer w-fit hover:opacity-100"
                    onClick={() => {
                      deletePreset({ id: preset.id });
                    }}
                  >
                    <NormalEventDisplay
                      description={preset.description}
                      event={{
                        is_highlighted: preset.is_highlighted,
                        start: preset.start,
                      }}
                      eventTrailer={preset.trailer}
                      groups={preset.groups}
                      highlightedGroups={preset.highlightedGroups}
                    />
                    <HiTrash className="self-center w-4 h-4 text-red-600" />
                  </button>
                ) : (
                  <button
                    key={preset.id}
                    className="mx-auto cursor-pointer w-fit"
                    onClick={() => {
                      setValues({
                        isHighlighted: preset.is_highlighted,
                        selectedGroups,
                        trailer: preset.trailer,
                        selectedStartDates: [],
                        startTime: preset.start ? parseISO(preset.start) : new Date(),
                        description: preset?.description || "",
                      });
                      setIsModalOpen(false);
                    }}
                  >
                    <AnimationWrapper
                      className="scale-125 cursor-pointer"
                      variants={animations.smallScale}
                    >
                      <NormalEventDisplay
                        description={preset.description}
                        event={{
                          is_highlighted: preset.is_highlighted,
                          start: preset.start,
                        }}
                        eventTrailer={preset.trailer}
                        groups={preset.groups}
                        highlightedGroups={preset.highlightedGroups}
                      />
                    </AnimationWrapper>
                  </button>
                )}
              </>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};
