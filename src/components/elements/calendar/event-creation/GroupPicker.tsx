import { Listbox } from "@headlessui/react";
import { useState } from "react";
import { toast } from "react-hot-toast";

import { IHighlightedAndGroup, useGetGroups } from "@/hooks";
import { cn } from "@/lib";

import { ResizablePanel } from "../../ResizablePanel";

interface Props {
  pressed: boolean;
}

export const GroupPicker = ({ pressed }: Props) => {
  const [selectedGroup, setSelectedGroup] = useState<IHighlightedAndGroup[]>();
  // used to check if user is trying to add the same group twice
  const [selectedGroupMemory, setSelectedGroupMemory] = useState<IHighlightedAndGroup[]>();

  const { data } = useGetGroups();

  if (!data) return null;

  const { groups, highlightedGroups } = data;

  const handleChange = (changedGroups: IHighlightedAndGroup[]) => {
    const lastAddedGroup = changedGroups.slice(-1)[0];
    setSelectedGroupMemory(changedGroups);
    // check if array already contains a group with that letter if it does alert user
    if (selectedGroupMemory?.some(group => group.letter === lastAddedGroup.letter)) {
      toast.error("Sa ei saa lisada sama gruppi mitu korda!");
      return;
    }
    setSelectedGroup(changedGroups);
  };

  return (
    <>
      <Listbox multiple value={selectedGroup} onChange={handleChange}>
        <Listbox.Options
          static
          className="relative py-1 mt-2 text-base bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          <ResizablePanel>
            {pressed ? (
              <div className="grid items-center justify-center grid-cols-4 grid-rows-2">
                {highlightedGroups.map(highlightedGroup => (
                  <Listbox.Option
                    className={cn("flex flex-row justify-self-center")}
                    key={highlightedGroup.id}
                    value={highlightedGroup}
                  >
                    {({ selected }) => {
                      return (
                        <div
                          className={cn(
                            "flex flex-row justify-self-center border rounded-lg p-1",
                            selected ? "border-secondary" : "border-transparent"
                          )}
                          key={highlightedGroup.id}
                        >
                          <p
                            className={cn(
                              "cursor-pointer select-none underline decoration-red-500"
                            )}
                          >
                            {highlightedGroup.letter}
                          </p>
                          <p className="text-red-500 ml-[0.06rem]">!</p>
                        </div>
                      );
                    }}
                  </Listbox.Option>
                ))}
              </div>
            ) : (
              <div className="grid items-center justify-center grid-cols-4 grid-rows-2">
                {groups.map(group => (
                  <Listbox.Option
                    className={cn("flex flex-row justify-self-center")}
                    key={group.id}
                    value={group}
                  >
                    {({ selected }) => {
                      return (
                        <div
                          className={cn(
                            "flex flex-row justify-self-center border rounded-lg p-1",
                            selected ? "border-secondary" : "border-transparent"
                          )}
                          key={group.id}
                        >
                          <p className={cn("cursor-pointer select-none")}>{group.letter}</p>
                        </div>
                      );
                    }}
                  </Listbox.Option>
                ))}
              </div>
            )}
          </ResizablePanel>
        </Listbox.Options>
      </Listbox>
    </>
  );
};
