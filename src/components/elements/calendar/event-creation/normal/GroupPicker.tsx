import { Listbox } from "@headlessui/react";
import { useField } from "formik";

import { NormalEventSelectedGroupsFormValues } from "@/app-constants";
import { useGetGroups } from "@/hooks";
import { cn, groupLetterColorMapper } from "@/lib";
import { GroupLetters } from "@/types";

import { InputErrorText } from "../../../forms";

interface Props {
  name: string;
  pressed: boolean;
}

export const GroupPicker = ({ name }: Props) => {
  const [field, { value, error, touched }, { setValue }] =
    useField<NormalEventSelectedGroupsFormValues>(name);

  const { data } = useGetGroups();

  if (!data) return null;

  const { groups, highlightedGroups } = data;

  return (
    <>
      <Listbox {...field} multiple value={value} onChange={setValue}>
        <Listbox.Options
          static
          className="relative px-2 py-3 mt-2 text-base bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          <div className="flex flex-row flex-shrink space-x-4">
            <div className="grid items-center justify-center grid-cols-4 grid-rows-2 gap-1">
              {groups.map(group => {
                const isGroupDisabled = value?.some(
                  selectedGroup =>
                    selectedGroup.letter === group.letter && selectedGroup.highlighted === true,
                );

                return (
                  <Listbox.Option
                    className={cn("flex flex-row justify-self-center")}
                    key={group.id}
                    value={group}
                    disabled={isGroupDisabled}
                  >
                    {({ selected }) => (
                      <div
                        className={cn(
                          "flex flex-row justify-self-center border rounded-lg p-1 font-semibold cursor-pointer select-none",
                          selected ? "border-secondary" : "border-transparent",
                          isGroupDisabled && "group cursor-not-allowed opacity-20",
                        )}
                        key={group.id}
                      >
                        <p className={cn(groupLetterColorMapper(group?.letter as GroupLetters))}>
                          {group.letter}
                        </p>
                      </div>
                    )}
                  </Listbox.Option>
                );
              })}
            </div>

            <div className="grid items-center justify-center grid-cols-4 grid-rows-2 gap-1">
              {highlightedGroups.map(group => {
                const isGroupDisabled = value?.some(
                  selectedGroup =>
                    selectedGroup.letter === group.letter && selectedGroup.highlighted === false,
                );
                return (
                  <Listbox.Option
                    className={cn("flex flex-row justify-self-center")}
                    key={group.id}
                    value={group}
                    disabled={isGroupDisabled}
                  >
                    {({ selected }) => (
                      <div
                        className={cn(
                          "flex flex-row justify-self-center border rounded-lg p-1 select-none cursor-pointer font-semibold",
                          selected ? "border-secondary" : "border-transparent",
                          isGroupDisabled && "group opacity-20 cursor-not-allowed",
                        )}
                        key={group.id}
                      >
                        <p
                          className={cn(
                            "underline decoration-red-500",
                            groupLetterColorMapper(group?.letter as GroupLetters),
                          )}
                        >
                          {group.letter}
                        </p>
                        <p className="text-red-500 ml-[0.06rem]">!</p>
                      </div>
                    )}
                  </Listbox.Option>
                );
              })}
            </div>
          </div>
        </Listbox.Options>
      </Listbox>
      <InputErrorText className="mt-3" touched={touched} error={error} />
    </>
  );
};
