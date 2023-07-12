"use client";

import { Switch } from "@headlessui/react";
import { useField } from "formik";

import { NormalEventIsHighlightedFormValues } from "../../app-constants";

import { Tooltip } from "./Tooltip";

interface Props {
  pressed: boolean;
  setPressed: React.Dispatch<React.SetStateAction<boolean>>;
  tooltip?: string;
}

export const Toggle = ({ pressed, setPressed, tooltip }: Props) => (
  <Switch
    checked={pressed}
    onChange={setPressed}
    className={`${pressed ? "bg-secondary" : "bg-secondary-light"}
          relative group inline-flex h-[25px] w-[58px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
  >
    {tooltip && <Tooltip tooltip={tooltip} />}
    <span className="sr-only">Use setting</span>
    <span
      aria-hidden="true"
      className={`${pressed ? "translate-x-[32.8px]" : "translate-x-0"}
            pointer-events-none inline-block h-[22px] w-[22px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
    />
  </Switch>
);

interface FormikToggleProps {
  name: string;
  tooltip?: string;
}

export const FormikToggle = ({ tooltip, name }: FormikToggleProps) => {
  const [field, { value }, { setValue }] = useField<NormalEventIsHighlightedFormValues>(name);
  return (
    <Switch
      {...(field as any)}
      checked={value}
      onChange={setValue}
      className={`${value ? "bg-secondary" : "bg-secondary-light"}
          relative group inline-flex h-[25px] w-[58px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
    >
      {tooltip && <Tooltip tooltip={tooltip} />}
      <span className="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        className={`${value ? "translate-x-[32.8px]" : "translate-x-0"}
            pointer-events-none inline-block h-[22px] w-[22px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
      />
    </Switch>
  );
};
