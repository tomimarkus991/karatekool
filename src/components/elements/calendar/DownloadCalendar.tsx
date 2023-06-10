"use client";

import { MutableRefObject } from "react";
import { HiDownload } from "react-icons/hi";
import { createFileName, useScreenshot } from "use-react-screenshot";

import { useCalendarFilters } from "@/context";

import { RealButton } from "../button";

interface Props {
  currentMonthString: string;
  calendarRef: MutableRefObject<never>;
}

export const DownloadCalendar = ({ currentMonthString, calendarRef }: Props) => {
  const { letter } = useCalendarFilters();

  const [, takeScreenShot] = useScreenshot({
    type: "image/png",
    quality: 1.0,
  });

  const download = (picture: any) => {
    if (typeof window !== "undefined") {
      const a = document.createElement("a");
      a.href = picture;
      a.download = createFileName(
        "png",
        `kalender-${letter}-${currentMonthString.replaceAll(" ", "-")}`
      );
      a.click();
    }
  };

  const downloadScreenshot = async () => {
    const data = await takeScreenShot(calendarRef.current);
    return download(data);
  };
  return (
    <RealButton size="icon" className="px-0 sm:px-3" onClick={downloadScreenshot}>
      <HiDownload className="w-6 h-6 text-white" />
    </RealButton>
  );
};
