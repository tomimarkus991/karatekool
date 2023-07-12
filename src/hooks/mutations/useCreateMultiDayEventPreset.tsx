import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { useSupabase } from "@/context";

interface Props {
  title: string;
}

export const useCreateMultiDayEventPreset = () => {
  const { supabase } = useSupabase();
  const queryClient = useQueryClient();

  const execute = async ({ title }: Props) => {
    const res = await supabase.from("multi_day_event").insert({ title }).select().single();

    if (res.error) {
      toast.error(res.error.message);
      throw new Error(res.error.message);
    }

    return res;
  };

  return useMutation((user: Props) => execute(user), {
    onSuccess: () => {
      toast.success("Uus mitme päeva üritus on loodud");
      queryClient.invalidateQueries({ queryKey: ["multi_day_event_presets"] });
    },
  });
};
