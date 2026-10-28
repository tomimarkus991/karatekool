import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { api } from "@/lib";

interface Props {
  /** The Event's id, whatever its kind */
  id: number;
}

export const useDeleteCalendarEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: Props) => api(`/events/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      toast.success("Üritus kustutatud");
      queryClient.invalidateQueries({
        queryKey: ["get_calendar_events"],
      });
    },
    onError: error => {
      toast.error(error.message);
    },
  });
};
