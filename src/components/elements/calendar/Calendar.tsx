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
import { DragDropContext, DropResult, ResponderProvided } from "react-beautiful-dnd";

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

  const reorder = (result: DropResult, provided: ResponderProvided) => {
    console.log("12345", result);
    console.log("123456", provided);

    if (!result.destination) return;

    const items = Array.from(events);
    const [removed] = items.splice(result.source.index, 1);

    // put it back in the right place
    items.splice(result.destination.index, 0, removed);
  };
  console.log("events", events);

  return (
    <div className="max-w-[60rem] m-auto bg-white rounded-lg p-4 select-none">
      <CalendarFilterButtons />
      <DragDropContext onDragEnd={reorder}>
        <p className="pt-2">{currentMonth}</p>
        <div className="grid grid-cols-7 mb-2">
          {days.short.map(day => (
            <div key={day} className="flex justify-center">
              <p>{day}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-rows-5 overflow-hidden">
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
      </DragDropContext>
    </div>
  );
};
