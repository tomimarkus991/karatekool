import {
  add,
  eachDayOfInterval,
  eachWeekOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfToday,
  startOfWeek,
} from "date-fns";
import { useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

import { days } from "app-constants";
import { useGetCurrentMonthEvents } from "hooks";

import { CalendarDate, CalendarFilterButtons } from ".";

export const Calendar = () => {
  const { data: events = [] } = useGetCurrentMonthEvents();

  const today = add(startOfToday(), { days: 0 });

  const [currentMonth] = useState(format(today, "MMMM yyyy"));

  const weeks = eachWeekOfInterval({
    start: startOfWeek(startOfMonth(today)),
    end: endOfWeek(endOfMonth(today)),
  });

  // const reorder = (result: DropResult, provided: ResponderProvided) => {
  //   console.log("12345", result);
  //   console.log("123456", provided);

  //   if (!result.destination) return;

  //   const items = Array.from(events);
  //   const [removed] = items.splice(result.source.index, 1);

  //   // put it back in the right place
  //   items.splice(result.destination.index, 0, removed);
  // };

  console.log("events", events);

  return (
    <div className="p-4 select-none">
      <CalendarFilterButtons />
      <div className="flex justify-center items-center mt-2 mb-3">
        <div className="px-5 py-3 bg-white flex flex-row my-4 justify-center space-x-3 items-center max-w-fit rounded-lg border-b-4">
          <HiChevronLeft className="text-gray-600 text-3xl cursor-pointer transition-all duration-300 hover:-translate-y-[0.05rem]" />
          <p className="first-letter:uppercase font-catamaran font-semibold text-lg">
            {currentMonth}
          </p>
          <HiChevronRight className="text-gray-600 text-3xl cursor-pointer transition-all duration-300 hover:-translate-y-[0.05rem]" />
        </div>
      </div>

      <div className="grid grid-cols-7 font-semibold font-catamaran">
        {days.long.map(day => (
          <div key={day} className="flex justify-center">
            <p>{day}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-rows-5 overflow-hidden bg-white">
        {weeks.map(week => {
          const daysForWeek = eachDayOfInterval({
            start: startOfWeek(week),
            end: endOfWeek(week),
          });
          return (
            <div
              id="week"
              key={week.toISOString()}
              className="grid grid-cols-7 last:border-b border-t border-gray-200 h-36"
            >
              {daysForWeek.map(day => {
                return <CalendarDate key={day.toISOString()} events={events} date={day} />;
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
