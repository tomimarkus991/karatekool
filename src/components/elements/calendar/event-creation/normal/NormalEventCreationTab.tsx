"use client";

import { format, parseISO } from "date-fns";
import { Form, Formik } from "formik";
import { useState } from "react";
import { HiPencil, HiTrash, HiX } from "react-icons/hi";

import {
  NormalEventFormValues,
  NormalEventSelectedGroupsFormValues,
  YupSchemas,
} from "@/app-constants";
import {
  AnimationWrapper,
  FormikInput,
  FormikToggle,
  MapGroupLetter,
  MapHighLightedGroupLetter,
  Modal,
  MultiDatePicker,
  NormalEventDisplay,
  NormalEventTime,
  RealButton,
  TimePicker,
  Toggle,
  animations,
} from "@/components";
import {
  useCreateCalendarEvent,
  useCreateEventPreset,
  useDeleteEventPreset,
  useGetEventPresets,
} from "@/hooks";
import { cn } from "@/lib";
import { SGroup } from "@/types";

import { GroupPicker, TrailerPicker } from ".";

const mergeDateAndTime = (startDate: Date, startTime: Date): Date => {
  const result = new Date(startDate.getTime());

  result.setHours(startTime.getHours());
  result.setMinutes(startTime.getMinutes());
  result.setSeconds(startTime.getSeconds());

  return result;
};

interface PresetsModalProps {
  setValues: (data: NormalEventFormValues) => any;
}

const PresetsModal = ({ setValues }: PresetsModalProps) => {
  const [isEventPresetModalOpen, setIsEventPresetModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { data: eventPresets } = useGetEventPresets();
  const { mutate: deletePreset } = useDeleteEventPreset();

  return (
    <Modal
      open={isEventPresetModalOpen}
      setOpen={setIsEventPresetModalOpen}
      maxWidth="lg"
      modalButton={
        <RealButton
          type="button"
          variant="orange"
          size="xs"
          onClick={() => setIsEventPresetModalOpen(true)}
        >
          Vali valmis üritus
        </RealButton>
      }
      closeOnOverlayClick={false}
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
              setIsEventPresetModalOpen(false);
              setIsEditing(false);
            }}
          >
            <AnimationWrapper key="sub-modal-x-icon" variants={animations.rotate360}>
              <HiX className="w-8 h-8 fill-stone-700 hover:fill-stone-800" />
            </AnimationWrapper>
          </div>
        </div>

        <div className="grid grid-cols-4 mt-6 mb-4">
          {eventPresets?.map(preset => {
            const displayGroups = preset.groups?.map(group => {
              return {
                letter: group.letter as SGroup["letter"],
              } satisfies SGroup;
            });

            const displayHighlightedGroups = preset.highlightedGroups?.map(group => {
              return {
                letter: group.letter as SGroup["letter"],
              } satisfies SGroup;
            });

            const selectedGroups = [
              ...preset.groups,
              ...preset.highlightedGroups,
            ] as NormalEventSelectedGroupsFormValues;

            return (
              <>
                {isEditing ? (
                  <button
                    key={preset.id}
                    className="flex flex-col mx-auto opacity-50 cursor-pointer w-fit hover:opacity-100"
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
                      event_trailer={preset.trailer}
                      groups={displayGroups}
                      highlighted_group={displayHighlightedGroups}
                    />
                    <HiTrash className="self-center w-6 h-6 text-red-600" />
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

                      setIsEventPresetModalOpen(false);
                    }}
                  >
                    <AnimationWrapper className="cursor-pointer" variants={animations.smallScale}>
                      <NormalEventDisplay
                        description={preset.description}
                        event={{
                          is_highlighted: preset.is_highlighted,
                          start: preset.start,
                        }}
                        event_trailer={preset.trailer}
                        groups={displayGroups}
                        highlighted_group={displayHighlightedGroups}
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

interface Props {
  openDate: Date;
}

export const NormalEventCreationTab = ({ openDate }: Props) => {
  const [normalEventInitialValues] = useState<NormalEventFormValues>({
    startTime: new Date(),
    selectedStartDates: [openDate],
    selectedGroups: [],
    trailer: {},
    description: "",
    isHighlighted: false,
    // this will not be implemented yet
    endTime: undefined,
  });

  const [advancedOptionsPressed, setAdvancedOptionsPressed] = useState(false);
  const [highlightGroupPressed] = useState(false);

  const { mutate: createNewNormalCalendarEvent } = useCreateCalendarEvent();

  const { mutate: createEventPreset } = useCreateEventPreset();
  return (
    <Formik
      initialValues={normalEventInitialValues}
      validationSchema={YupSchemas.Events.NormalEvent}
      validateOnMount
      validateOnChange
      onSubmit={(
        {
          startTime,
          endTime,
          selectedGroups,
          description,
          trailer,
          isHighlighted,
          selectedStartDates,
        },
        { setSubmitting },
      ) => {
        setSubmitting(true);

        const groupIds =
          selectedGroups?.filter(group => !group.highlighted).map(group => group.id as number) ||
          [];

        const highlightedGroupIds =
          selectedGroups?.filter(group => group.highlighted).map(group => group.id as number) || [];

        const startDates = selectedStartDates.map(date => {
          return mergeDateAndTime(date as Date, startTime).toISOString();
        });

        createNewNormalCalendarEvent({
          normalEventEnd: endTime,
          groupIds,
          highlightedGroupIds,
          description,
          trailerId: trailer.id,
          isHighlighted,
          selectedStartDates: startDates,
        });

        setSubmitting(false);
      }}
    >
      {/* normal */}
      {({ values, isValid, setValues }) => {
        const filteredGroups = values.selectedGroups
          .filter(group => !group.highlighted)
          .map(
            group =>
              ({
                letter: group.letter as SGroup["letter"],
              }) satisfies SGroup,
          );

        const filteredHighlightedGroups = values.selectedGroups
          ?.filter(group => group.highlighted)
          .map(
            group =>
              ({
                letter: group.letter as SGroup["letter"],
              }) satisfies SGroup,
          );

        return (
          <Form>
            <div className="flex flex-row justify-between pb-4">
              <div className="flex flex-col items-start justify-start">
                <div className="flex flex-col mb-3">
                  <p className="text-sm text-stone-600">Vali valmis üritus</p>
                  <PresetsModal setValues={setValues} />
                </div>
                <div className="flex flex-row">
                  <div className="flex flex-col">
                    <p className="text-sm text-stone-600">Vali trenni kellaaeg</p>
                    <div className="pt-2">
                      <TimePicker name="startTime" />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-sm text-stone-600">Vali trenni kuupäevad</p>
                    <MultiDatePicker name="selectedStartDates" />
                  </div>
                </div>

                <GroupPicker name="selectedGroups" pressed={highlightGroupPressed} />

                <div className="flex flex-col pt-5">
                  <p className="text-xs text-stone-600">Näita veel parameetreid</p>
                  <Toggle pressed={advancedOptionsPressed} setPressed={setAdvancedOptionsPressed} />
                  {advancedOptionsPressed && (
                    <div className="flex flex-col mt-4 ml-4 space-y-3">
                      {/* <div className="flex flex-col">
                                  <p className="text-xs text-stone-600">Vali millal trenn lõppeb</p>
                                  <TimePicker name="endTime" />
                                </div> */}

                      <div className="flex flex-col">
                        <p className="text-xs text-stone-600">Tõsta trenn esile</p>
                        <FormikToggle name="isHighlighted" />
                      </div>
                      <FormikInput
                        inputSize="sm"
                        label="Mis trennis toimub?"
                        placeholder="karate seminar"
                        name="description"
                      />
                      <TrailerPicker name="trailer" />
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col justify-center ml-6 sm:ml-0">
                <p className="self-center font-semibold justify-self-center text-stone-500">
                  {values.selectedStartDates[0]
                    ? format(values.selectedStartDates[0], "EEEE")
                    : "Esmaspäev"}
                </p>
                <div className="flex flex-col self-center mt-2 border border-t-0 h-52 w-36 border-stone-100">
                  <div className="flex flex-col items-center justify-center">
                    <div className="text-xs font-medium font-number sm:text-sm md:text-base text-text-primary">
                      {values.selectedStartDates[0]
                        ? format(values.selectedStartDates[0], "dd")
                        : "1"}
                    </div>
                  </div>
                  <div className="flex flex-col justify-center flex-grow ml-2 text-center">
                    <div className="flex flex-col justify-start rounded-lg">
                      <div id="normal-event" className="flex flex-row items-center justify-start">
                        <NormalEventTime
                          start={values.startTime}
                          isHighlighted={values.isHighlighted}
                        />
                        <div id="normal-event" className={cn("flex justify-center items-center")}>
                          <MapGroupLetter
                            groups={
                              filteredGroups.length === 0 && filteredHighlightedGroups.length === 0
                                ? [{ letter: "S" }, { letter: "K" }]
                                : filteredGroups
                            }
                          />
                          <MapHighLightedGroupLetter
                            highlightedGroups={
                              filteredGroups.length === 0 && filteredHighlightedGroups.length === 0
                                ? [{ letter: "N" }]
                                : filteredHighlightedGroups
                            }
                          />
                          {values.trailer && (
                            <p
                              id="normal-event"
                              className="text-red-500 ml-1 lg:text-xs xl:text-sm sm:ml-[0.1rem] text-[0.5rem] whitespace-nowrap sm:text-[0.55rem] font-number font-semibold text-center"
                            >
                              {values.trailer.text}
                            </p>
                          )}
                        </div>
                      </div>
                      {values.description && (
                        <p className="text-[0.4rem] xs:text-[0.6rem] sm:text-[0.71rem] font-semibold text-left -mt-[0.2rem]">
                          {values.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <RealButton type="submit" isValid={isValid} className="mt-8" variant="orange">
                  Loo
                </RealButton>

                <RealButton
                  className="mt-4"
                  variant="light"
                  onClick={() => {
                    const groupIds = values.selectedGroups
                      .filter(group => !group.highlighted)
                      .map(group => group.id as number);

                    const highlightedGroupIds = values.selectedGroups
                      .filter(group => group.highlighted)
                      .map(group => group.id as number);

                    createEventPreset({
                      description: values.description || null,
                      group_ids: groupIds,
                      highlighted_group_ids: highlightedGroupIds,
                      start: mergeDateAndTime(
                        values.selectedStartDates[0] || new Date(),
                        values.startTime,
                      ).toISOString(),
                      trailer_id: values.trailer.id || null,
                      is_highlighted: values.isHighlighted,
                    });
                  }}
                >
                  Loo preset
                </RealButton>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
