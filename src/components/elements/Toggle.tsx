"use client";

import { Switch } from "@headlessui/react";

import { Tooltip } from "./Tooltip";

interface Props {
  pressed: boolean;
  setPressed: React.Dispatch<React.SetStateAction<boolean>>;
  tooltip?: string;
}

export const Toggle = ({ pressed, setPressed, tooltip }: Props) => {
  return (
    <Switch
      checked={pressed}
      onChange={setPressed}
      className={`${pressed ? "bg-secondary" : "bg-secondary-light"}
          relative group inline-flex h-[26px] w-[58px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
    >
      {tooltip && <Tooltip tooltip={tooltip} />}
      <span className="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        className={`${pressed ? "translate-x-[1.62rem]" : "translate-x-0"}
            pointer-events-none inline-block h-[22px] w-[22px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
      />
    </Switch>
  );
};
