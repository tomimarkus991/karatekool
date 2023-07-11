import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { useSupabase } from "@/context";

interface Props {
  title: string;
  subTitle: string;
  start: string;
}

export const useCreateCalendarAllDayEvent = () => {
  const { supabase } = useSupabase();
  const queryClient = useQueryClient();

  const execute = async ({ title, subTitle, start }: Props) => {
    const createAllDayEventRes = await supabase
      .from("all_day_event")
      .insert({
        title,
        sub_title: subTitle,
      })
      .select()
      .single();

    const res = await supabase.from("event").insert({
      start,
      event_type: "ALL_DAY",
      all_day_event: createAllDayEventRes.data?.id,
    });

    if (res.error) {
      toast.error(res.error.message);
      throw new Error(res.error.message);
    }

    return res;
  };

  return useMutation((user: Props) => execute(user), {
    onSuccess: () => {
      toast.success("Uus päeva üritus on loodud");
      queryClient.invalidateQueries({
        queryKey: ["get_calendar_events"],
        stale: true,
      });
    },
  });
};
