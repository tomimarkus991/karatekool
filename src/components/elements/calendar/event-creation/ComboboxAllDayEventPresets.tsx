import { Combobox as HeadlessCombobox, Transition } from "@headlessui/react";
import { useField } from "formik";
import { CheckIcon } from "lucide-react";
import { Fragment, useState } from "react";
import { MultiDayEventEventFormik } from "../../../../app-constants";
import { RealButton } from "../../button";
import { InputErrorText } from "../../forms";

interface Props {
  name: string;
}

const allDayPresets = [
  "VHK spordisaalis on kooli üritus",
  "Nüke võistlus KATA E-, S-, M- ja N-grupp",
  "VHK PK jõulupidu!",
  "CORPORE CUP PÄRNU",
  "TALLINN OPEN",
  "FALCO CUP TARTU",
];

export const ComboboxAllDayEventPresets = ({ name }: Props) => {
  const [query, setQuery] = useState("");

  const [field, { value, touched, error }, { setValue }] =
    useField<typeof allDayPresets>(name);

  const filteredData =
    query === ""
      ? allDayPresets
      : allDayPresets.filter((item) =>
          item
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <HeadlessCombobox
      {...field}
      multiple={false}
      value={value}
      onChange={setValue}
    >
      <div className="relative w-full mt-1">
        <div className="relative w-full overflow-hidden text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none sm:text-sm">
          <HeadlessCombobox.Button
            as="div"
            className="flex items-center min-w-[12rem]"
          >
            <HeadlessCombobox.Input
              className="w-full px-3 py-2 text-sm leading-5 border-none rounded-lg ring-0 focus:ring-0 focus:border-none focus:outline-secondary"
              displayValue={(item: string) => item}
              placeholder="Vali üritus või vajuta paremal Pealkiri"
              onChange={(event) => setQuery(event.target.value)}
            />
          </HeadlessCombobox.Button>
        </div>
        <InputErrorText className="mt-2" error={error} touched={touched} />
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
        >
          <HeadlessCombobox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg ring-0 focus:outline-none sm:text-sm">
            {filteredData.length === 0 && query !== "" ? (
              <p className="relative px-4 select-none py-2cursor-default">
                Midagi ei leitud
              </p>
            ) : (
              filteredData.map((item) => (
                <HeadlessCombobox.Option
                  key={item}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-secondary text-white" : "text-gray-900"
                    }`
                  }
                  value={item}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {item}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? "text-white" : "text-secondary"
                          }`}
                        >
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </HeadlessCombobox.Option>
              ))
            )}
          </HeadlessCombobox.Options>
        </Transition>
      </div>
    </HeadlessCombobox>
  );
};
