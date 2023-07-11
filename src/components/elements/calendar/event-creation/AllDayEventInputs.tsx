import { useField } from "formik";

import { cn } from "@/lib";

interface Props extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  name: string;
}

export const AllDayEventInput = ({ name, className, ...props }: Props) => {
  const [field] = useField(name);
  return (
    <textarea
      {...props}
      {...field}
      className={cn(
        className,
        "text-center outline-none resize-none h-full scrollbar-overflow focus:border-0 focus:ring-0"
      )}
      name={name}
      autoComplete="off"
    />
  );
};
