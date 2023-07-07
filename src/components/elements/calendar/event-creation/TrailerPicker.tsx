import { Listbox } from "@headlessui/react";
import { useField } from "formik";
import { useState } from "react";

import { NormalEventTrailerFormValues } from "@/app-constants";
import { useGetTrailers } from "@/hooks";
import { cn } from "@/lib";

import { ResizablePanel } from "../../ResizablePanel";

interface Props {
  name: string;
}

export const TrailerPicker = ({ name }: Props) => {
  const [field, { value }, { setValue }] = useField<NormalEventTrailerFormValues>(name);
  const [memorySelect, setMemorySelect] = useState<NormalEventTrailerFormValues | null>(null);

  const { data: trailers } = useGetTrailers();

  if (!trailers) return null;

  const handleChange = (trailer: NormalEventTrailerFormValues) => {
    console.log(trailer);
    setMemorySelect(trailer);

    if (trailer === memorySelect) {
      setValue({});
      setMemorySelect(null);
      return;
    }
    setValue(trailer);
  };

  return (
    <>
      <Listbox {...field} value={value} onChange={handleChange}>
        <Listbox.Options
          static
          className="relative px-2 py-3 mt-2 text-base bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          <ResizablePanel>
            <div className="flex flex-row space-x-4">
              <div className="grid items-center justify-center grid-cols-3 gap-1">
                {trailers.map(trailer => {
                  return (
                    <Listbox.Option
                      className={cn("flex flex-row justify-self-center")}
                      key={trailer.id}
                      value={trailer}
                    >
                      {({ selected }) => {
                        return (
                          <div
                            className={cn(
                              "flex flex-row justify-self-center border rounded-lg p-1 font-semibold cursor-pointer select-none",
                              selected ? "border-secondary" : "border-transparent"
                            )}
                            key={trailer.id}
                          >
                            <p>{trailer.text}</p>
                          </div>
                        );
                      }}
                    </Listbox.Option>
                  );
                })}
              </div>
            </div>
          </ResizablePanel>
        </Listbox.Options>
      </Listbox>
    </>
  );
};
