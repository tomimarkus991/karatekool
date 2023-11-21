import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { useSupabase } from "@/context";

interface Props {
  id: number;
}

export const useDeleteCalendarAllDayEvent = () => {
  const { supabase } = useSupabase();
  const queryClient = useQueryClient();

  const execute = async ({ id }: Props) => {
    const deleteFromEventRes = await supabase.from("event").delete().match({ all_day_event: id });

    if (deleteFromEventRes.error) {
      toast.error(deleteFromEventRes.error.message);
      throw new Error(deleteFromEventRes.error.message);
    }

    const res = await supabase.from("all_day_event").delete().match({ id });

    if (res.error) {
      toast.error(res.error.message);
      throw new Error(res.error.message);
    }

    return true;
  };

  return useMutation({
    mutationFn: (user: Props) => execute(user),
    onSuccess: () => {
      toast.success("Üritus kustutatud");
      queryClient.invalidateQueries({
        queryKey: ["get_calendar_events"],
        stale: true,
      });
    },
  });
};
