import { cn } from "../../../lib";

interface Props {
  touched: boolean;
  error: string | undefined;
  className?: string;
  /** Lets the field point at this text with aria-describedby */
  id?: string;
}

export const InputErrorText = ({ touched, error, className, id }: Props) => (
  <>
    {touched && error && (
      <p id={id} className={cn("text-sm font-medium text-red-500", className)}>
        {error}
      </p>
    )}
  </>
);
