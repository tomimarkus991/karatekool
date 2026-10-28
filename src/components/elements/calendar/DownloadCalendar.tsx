"use client";

import { MutableRefObject } from "react";
import { HiDownload } from "react-icons/hi";
import { useScreenshot } from "use-react-screenshot";

import { useCalendarFilters } from "@/context";
import { filterLabel, isNamedTrainingFilter } from "@/lib";

import { RealButton } from "../button";
import { Tooltip } from "../Tooltip";

interface Props {
  currentMonthString: string;
  calendarRef: MutableRefObject<never>;
}

export const DownloadCalendar = ({ currentMonthString, calendarRef }: Props) => {
  // The image is the calendar as shown, so it follows the same filter
  const { filter } = useCalendarFilters();

  const [, takeScreenShot] = useScreenshot({
    type: "image/png",
    quality: 1.0,
  });

  const download = (picture: any) => {
    const link = document.createElement("a");
    link.href = picture;
    link.setAttribute(
      "download",
      `kalender-${filterLabel(filter).replaceAll(" ", "-")}-${currentMonthString.replaceAll(
        " ",
        "-",
      )}.png`,
    );
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const downloadScreenshot = async () => {
    const data = await takeScreenShot(calendarRef.current);
    return download(data);
  };
  return (
    <RealButton
      size="icon"
      disabled={filter === "none"}
      className="px-0 md2:px-3 disabled:opacity-75 disabled:cursor-not-allowed group"
      onClick={downloadScreenshot}
    >
      <Tooltip
        tooltip={
          filter === "all" ? (
            `Lae kõikide gruppide kalender alla`
          ) : filter === "none" ? (
            "Vali ennem grupp, mille kalender alla laadida"
          ) : isNamedTrainingFilter(filter) ? (
            <div className="whitespace-nowrap">{`Lae "${filter.name}" trennide kalender alla`}</div>
          ) : (
            <div className="whitespace-nowrap">
              Lae <span className="!uppercase text-white">{filter}</span> grupi kalender alla
            </div>
          )
        }
      />
      <HiDownload className="w-6 h-6 text-white" />
    </RealButton>
  );
};
