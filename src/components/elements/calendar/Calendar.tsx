import { useIsMobile } from "@redlotus/ui";
import {
  add,
  eachDayOfInterval,
  eachWeekOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  formatISO9075,
  parse,
  startOfToday,
  startOfWeek,
} from "date-fns";
import { useEffect, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

import { days } from "app-constants";
import { useGetCurrentMonthEvents } from "hooks";

import { CalendarDate, CalendarFilterButtons } from ".";

export const Calendar = () => {
  const today = startOfToday();
  const { isMobile } = useIsMobile();

  const [currentMonth, setCurrentMonth] = useState(format(today, "MMMM yyyy"));
  const firstDayOfCurrentMonth = parse(currentMonth, "MMMM yyyy", today);
  const firstDayOfCalendarMonth = startOfWeek(firstDayOfCurrentMonth);
  const lastDayOfCalendarMonth = endOfWeek(endOfMonth(firstDayOfCurrentMonth));

  const { data: events = [], refetch: fetchEvents } = useGetCurrentMonthEvents(
    formatISO9075(firstDayOfCalendarMonth),
    formatISO9075(lastDayOfCalendarMonth)
  );

  console.log(events);

  const weeks = eachWeekOfInterval({
    start: firstDayOfCalendarMonth,
    end: lastDayOfCalendarMonth,
  });

  const nextMonth = () => {
    const firstDayNextMonth = add(firstDayOfCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMMM yyyy"));
  };

  const prevMonth = () => {
    const firstDayPrevMonth = add(firstDayOfCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayPrevMonth, "MMMM yyyy"));
  };

  useEffect(() => {
    fetchEvents();
  }, []);
  useEffect(() => {
    fetchEvents();
  }, [currentMonth]);

  return (
    <div className="lg:p-4 select-none">
      <CalendarFilterButtons />
      <div className="flex justify-center items-center mt-2 mb-3">
        <div className="px-5 py-3 bg-white flex flex-row my-4 justify-center items-center max-w-fit rounded-lg border-b-4 min-w-[16rem]">
          <HiChevronLeft
            onClick={prevMonth}
            className="text-gray-600 mr-3 text-3xl cursor-pointer transition-all duration-300 hover:-translate-y-[0.05rem]"
          />
          <p className="min-w-[8rem] text-center first-letter:uppercase font-catamaran font-semibold text-lg">
            {currentMonth}
          </p>
          <HiChevronRight
            onClick={nextMonth}
            className="text-gray-600 ml-3 text-3xl cursor-pointer transition-all duration-300 hover:-translate-y-[0.05rem]"
          />
        </div>
      </div>

      <div className="grid grid-cols-7 font-semibold font-catamaran">
        {isMobile ? (
          <>
            {days.short.map(day => (
              <div key={day} className="flex justify-center">
                <p>{day}</p>
              </div>
            ))}
          </>
        ) : (
          <>
            {days.long.map(day => (
              <div key={day} className="flex justify-center">
                <p>{day}</p>
              </div>
            ))}
          </>
        )}
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
// const reorder = (result: DropResult, provided: ResponderProvided) => {
//   console.log("12345", result);
//   console.log("123456", provided);

//   if (!result.destination) return;

//   const items = Array.from(events);
//   const [removed] = items.splice(result.source.index, 1);

//   // put it back in the right place
//   items.splice(result.destination.index, 0, removed);
// };
