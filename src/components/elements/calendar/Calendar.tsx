import {
  add,
  eachDayOfInterval,
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

import { CalendarDate } from ".";

// should mark current day as red on number
//

export const Calendar = () => {
  const { data: events = [] } = useGetCurrentMonthEvents();
  const today = add(startOfToday(), { days: 0 });
  // const [selectedDate, setSelectedDate] = useState(today);
  const [currentMonth] = useState(format(today, "MMMM yyyy"));

  // const firstDayOfCurrentMonth = parse(today, "MMM-yyyy", new Date());

  // console.log("ff 1234", firstDayOfCurrentMonth);

  const dates = eachDayOfInterval({
    start: startOfWeek(startOfMonth(today)),
    end: endOfWeek(endOfMonth(today)),
  });

  // const convertDaysToText = (day: number) => {
  //   return days.short[day];
  // };

  // TODO: Add events to days
  // unix timestamp today at 13:00 = 1620000000 and at 14:00 = 1620003600

  const reorder = (result: DropResult, provided: ResponderProvided) => {
    console.log("12345", result);
    console.log("123456", provided);

    if (!result.destination) return;

    const items = Array.from(events);
    const [removed] = items.splice(result.source.index, 1);

    // put it back in the right place
    items.splice(result.destination.index, 0, removed);
  };

  return (
    <div className="w-[80%] m-auto bg-white rounded-lg px-4">
      <DragDropContext onDragEnd={reorder}>
        <p className="pt-2">{currentMonth}</p>
        <div className="grid grid-cols-7">
          {days.short.map(day => (
            <div key={day} className="flex w-24 justify-end p-2">
              <p>{day}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {dates.map(date => {
            return <CalendarDate key={date.toISOString()} events={events} date={date} />;
          })}
        </div>
      </DragDropContext>
    </div>
  );
};
