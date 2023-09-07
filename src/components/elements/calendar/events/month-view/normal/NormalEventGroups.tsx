import { NormalEventSelectedGroupsFormValues } from "@/app-constants";
import { cn, groupLetterColorMapper } from "@/lib";

interface MapGroupLetterProps {
  groups: NormalEventSelectedGroupsFormValues;
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

export const MapGroupLetter = ({ groups, dayView = false }: MapGroupLetterProps) => (
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
  </>
);

interface MapHighlightedGroupLetterProps {
  highlightedGroups: NormalEventSelectedGroupsFormValues;
  dayView?: boolean;
}

export const MapHighLightedGroupLetter = ({
  highlightedGroups,
  dayView = false,
}: MapHighlightedGroupLetterProps) => (
  <>
    {highlightedGroups.map(highlightedGroup => (
      <div id="normal-event" className={cn("flex flex-row")} key={highlightedGroup?.letter}>
        <p
          id="normal-event"
          className={cn(
            "underline decoration-red-500",
            groupLetterColorMapper(highlightedGroup?.letter),
            className(dayView),
          )}
        >
          {highlightedGroup?.letter}
        </p>
        <p
          id="normal-event"
          className={cn(
            "text-red-500 ml-[0.06rem] md:text-base xs:text-xs xs:ml-[0.1rem] font-bold font-number text-[0.6rem] sm:text-sm flex justify-center items-center",
            className,
          )}
        >
          !
        </p>
      </div>
    ))}
  </>
);
