/* eslint-disable jsx-a11y/no-autofocus */
import clsx from "clsx";
import { useField } from "formik";
import { ReactNode } from "react";

import { InputErrorText } from "@/components";

const sizes = {
  sm: "py-2 px-4 text-md rounded-xl",
  md: "py-2 px-4 text-lg font-semibold rounded-xl",
  lg: "py-3 px-4 text-xl font-semibold rounded-xl",
};

const variants = {
  // regular --> hover --> active --> dark
  unstyled: "",
  default: `bg-white text-text-primary border-[2px] border-stone-100 focus:outline-none focus:border-blue-500`,
  green: `bg-lime-500 text-[#f3f2f0] border-lime-600
  hover:text-white`,
  dark: `bg-gray-700 text-[#f3f2f0] border-gray-900
    hover:text-white`,
  blue: `bg-blue-700 text-[#f3f2f0] border-blue-900
    hover:text-white`,
};

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label?: string | ReactNode;
  inputPrefix?: ReactNode;
  inputAfterfix?: ReactNode;
  variant?: keyof typeof variants;
  inputSize?: keyof typeof sizes;
};

export const FormikInput = ({
  label,
  name,
  className = "appearance-none",
  inputSize = "md",
  inputPrefix,
  inputAfterfix,
  variant = "default",
  ...props
}: Props) => {
  const [field, { touched, error }] = useField(name);

  return (
    <>
      {label && (
        <div className="mb-2">
          <label htmlFor={props.id || name}>{label}</label>
        </div>
      )}

      <div className="relative">
        {/* <div className="absolute inset-0 rounded-lg scale-105 bg-blue-200" /> */}
        {inputPrefix && (
          <div className="absolute z-[1] inset-y-0 left-0 flex items-center pl-3">
            <span>{inputPrefix}</span>
          </div>
        )}
        <input
          className={clsx(
            className,
            sizes[inputSize],
            variants[variant],
            error && "input-error",
            inputPrefix && "pl-8",
            inputAfterfix && "pr-9",
            "placeholder:text-stone-500 relative"
          )}
          autoFocus={false}
          autoComplete="off"
          {...field}
          {...props}
        />
        {inputAfterfix && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <span>{inputAfterfix}</span>
          </div>
        )}
      </div>
      <InputErrorText touched={touched} error={error} />
    </>
  );
};
