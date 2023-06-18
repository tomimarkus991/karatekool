import { format, subDays, subMonths, subWeeks } from "date-fns";
import { Dispatch, SetStateAction } from "react";

interface PreviousTimeFrameProps {
  setCurrentString: Dispatch<SetStateAction<string>>;
  setDirection: Dispatch<SetStateAction<number | undefined>>;
  isAnimating: boolean;
  setIsAnimating: Dispatch<SetStateAction<boolean>>;
  subFunction: typeof subDays | typeof subWeeks | typeof subMonths;
  fetchEvents?: () => void;
  current: Date;
  currentType: string;
  /**
   *  this is only for day and week views, because we want to fetch month at a time
   * @default false
   */
  fetchEventsOnlyWhenMonthChanges?: boolean;
}

export const previousTimeFrame = ({
  setCurrentString,
  setDirection,
  isAnimating,
  setIsAnimating,
  subFunction,
  fetchEvents,
  fetchEventsOnlyWhenMonthChanges = false,
  current,
  currentType,
}: PreviousTimeFrameProps) => {
  if (isAnimating) return;

  setDirection(-1);
  setIsAnimating(true);

  const previous = subFunction(current, 1);

  if (fetchEventsOnlyWhenMonthChanges) {
    const prevMonth = current.getMonth();
    const newMonth = previous.getMonth();

    if (prevMonth !== newMonth && fetchEvents) {
      fetchEvents();
    }
  }

  setCurrentString(format(previous, currentType));
};

interface NextTimeFrameProps {
  setCurrentString: Dispatch<SetStateAction<string>>;
  setDirection: Dispatch<SetStateAction<number | undefined>>;
  isAnimating: boolean;
  setIsAnimating: Dispatch<SetStateAction<boolean>>;
  addFunction: typeof subDays | typeof subWeeks | typeof subMonths;
  fetchEvents?: () => void;
  current: Date;
  currentType: string;
  /**
   *  this is only for day and week views, because we want to fetch month at a time
   * @default false
   */
  fetchEventsOnlyWhenMonthChanges?: boolean;
}

export const nextTimeFrame = ({
  setCurrentString,
  setDirection,
  isAnimating,
  setIsAnimating,
  addFunction,
  fetchEvents,
  fetchEventsOnlyWhenMonthChanges = false,
  current,
  currentType,
}: NextTimeFrameProps) => {
  if (isAnimating) return;

  setDirection(1);
  setIsAnimating(true);

  const next = addFunction(current, 1);

  if (fetchEventsOnlyWhenMonthChanges) {
    const prevMonth = current.getMonth();
    const newMonth = next.getMonth();

    if (prevMonth !== newMonth && fetchEvents) {
      fetchEvents();
    }
  }

  setCurrentString(format(next, currentType));
};
