import { Listbox } from "@headlessui/react";
import { useField } from "formik";

import { NormalEventTrailerFormValues } from "@/app-constants";
import { useGetTrailers } from "@/hooks";
import { cn } from "@/lib";

interface Props {
  name: string;
}

export const TrailerPicker = ({ name }: Props) => {
  const [field, { value }, { setValue }] = useField<NormalEventTrailerFormValues>(name);

  const { data: trailers } = useGetTrailers();

  if (!trailers) return null;

  // Picking the picked trailer again removes it
  const handleChange = (trailer: NormalEventTrailerFormValues) => {
    setValue(trailer.id === value.id ? {} : trailer);
  };

  return (
    <>
      <Listbox {...field} value={value} by="id" onChange={handleChange}>
        <Listbox.Options
          static
          aria-label="Treilerid"
          className="flex flex-row py-3 space-x-4 text-sm bg-white rounded-md shadow-md px-7 focus:outline-none"
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
