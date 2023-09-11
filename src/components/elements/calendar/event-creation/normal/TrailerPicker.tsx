import { Listbox } from "@headlessui/react";
import { useField } from "formik";
import { useState } from "react";

import { NormalEventTrailerFormValues } from "@/app-constants";
import { useGetTrailers } from "@/hooks";
import { cn } from "@/lib";

interface Props {
  name: string;
}

export const TrailerPicker = ({ name }: Props) => {
  const [field, { value }, { setValue }] = useField<NormalEventTrailerFormValues>(name);
  const [memorySelect, setMemorySelect] = useState<NormalEventTrailerFormValues | null>(null);

  const { data: trailers } = useGetTrailers();

  if (!trailers) return null;

  const handleChange = (trailer: NormalEventTrailerFormValues) => {
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
          className="flex flex-row py-3 mt-5 space-x-4 text-sm bg-white rounded-md shadow-lg px-7 max-w-fit ring-1 ring-gray-100 focus:outline-none"
        >
          {trailers.map(trailer => (
            <Listbox.Option key={trailer.id} value={trailer}>
              {({ selected }) => (
                <div
                  className={cn(
                    "border rounded-lg p-1 font-semibold cursor-pointer select-none",
                    selected ? "border-secondary" : "border-transparent",
                  )}
                  key={trailer.id}
                >
                  <p className="text-primary">{trailer.text}</p>
                </div>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </>
  );
};
