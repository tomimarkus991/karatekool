import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { useSupabase } from "@/context";

interface Props {
  id: number;
}

export const useDeleteCalendarMultiDayEvent = () => {
  const { supabase } = useSupabase();
  const queryClient = useQueryClient();

  const execute = async ({ id }: Props) => {
    const res = await supabase.from("event").delete().match({ multi_day_event: id });

    if (res.error) {
      toast.error(res.error.message);
      throw new Error(res.error.message);
    }

    return res;
  };

  return useMutation((user: Props) => execute(user), {
    onSuccess: () => {
      toast.success("Üritus kustutatud");
      queryClient.invalidateQueries({
        queryKey: ["get_calendar_events"],
        stale: true,
      });
    },
  });
};
