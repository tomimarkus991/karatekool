import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { api } from "@/lib";

interface Props {
  title: string;
  subTitle: string;
  start: string;
}

export const useCreateCalendarAllDayEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ title, subTitle, start }: Props) =>
      api("/all-day-events", { method: "POST", body: { start, title, subtitle: subTitle } }),
    onSuccess: () => {
      toast.success("Uus päeva üritus on loodud");
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: ["get_calendar_events"],
        });
      }, 200);
    },
    onError: error => {
      toast.error(error.message);
    },
  });
};
