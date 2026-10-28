import { NormalEventSelectedGroupsFormValues } from "@/app-constants";
import { cn, groupLetterColorMapper } from "@/lib";

interface MapGroupLetterProps {
  groups: NormalEventSelectedGroupsFormValues;
  /** A Named Training's name, shown where its Groups go */
  name?: string | null;
  dayView?: boolean;
}

const className = (dayView: boolean) =>
  cn(
    "font-number font-semibold",
    dayView
      ? "text-lg"
      : "text-[0.6rem] ml-[0.05rem] xs:ml-[0.1rem] xs:text-xs sm:text-sm md:text-base sm:ml-[0.15rem]",
  );
// const className = (overflowX: boolean) =>
//   cn("font-quicksand font-semibold", overflowX ? "text-base ml-[0.1rem]" : "text-lg ml-1");

export const MapGroupLetter = ({ groups, name, dayView = false }: MapGroupLetterProps) => (
  <>
    {groups.map(group => (
      <p
        id="normal-event"
        className={cn(groupLetterColorMapper(group?.letter), className(dayView))}
        key={group?.letter}
      >
        {group?.letter}
      </p>
    ))}
    {name && (
      <p
        id="normal-event"
        // Line height after the size: Tailwind's text sizes carry their own, and the last one wins
        className={cn("text-primary text-left", className(dayView), "leading-none")}
      >
        {name}
      </p>
    )}
  </>
);
