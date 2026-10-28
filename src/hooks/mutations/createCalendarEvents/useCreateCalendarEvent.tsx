import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { api } from "@/lib";

interface Props {
  /** Set when changing a saved Training */
  id?: number;
  isHighlighted?: boolean;
  trailerId?: number;
  description?: string;
  groupIds?: number[];
  selectedStartDates: string[];
}

export const useCreateCalendarEvent = () => {
  const queryClient = useQueryClient();

  const execute = async ({
    id,
    selectedStartDates,
    isHighlighted = false,
    trailerId,
    description,
    groupIds = [],
  }: Props) => {
    const training = { groupIds, highlighted: isHighlighted, description, trailerId };

    // A change replaces the whole Training; a new one is saved once per start
    if (id) {
      await api(`/trainings/${id}`, {
        method: "PUT",
        body: { ...training, start: selectedStartDates[0] },
      });
    } else {
      await api("/trainings", {
        method: "POST",
        body: { ...training, starts: selectedStartDates },
      });
    }
  };

  return useMutation({
    mutationFn: (user: Props) => execute(user),
    onSuccess: (_, { id }) => {
      toast.success(id ? "Üritus on uuendatud" : "Uus üritus on loodud");
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
