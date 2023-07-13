import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { useSupabase } from "@/context";

interface Props {
  start: string | null;
  description: string | null;
  group_ids: number[] | null;
  highlighted_group_ids: number[] | null;
  is_highlighted: boolean;
  trailer_id: number | null;
}

export const useCreateEventPreset = () => {
  const { supabase } = useSupabase();
  const queryClient = useQueryClient();

  const execute = async ({
    start,
    description,
    group_ids,
    highlighted_group_ids,
    is_highlighted = false,
    trailer_id,
  }: Props) => {
    const res = await supabase
      .from("event_preset")
      .insert({ start, description, group_ids, highlighted_group_ids, is_highlighted, trailer_id })
      .select()
      .single();

    if (res.error) {
      toast.error(res.error.message);
      throw new Error(res.error.message);
    }

    return res;
  };

  return useMutation((user: Props) => execute(user), {
    onSuccess: () => {
      toast.success("Uus preset loodud!");
      queryClient.invalidateQueries({ queryKey: ["event_presets"] });
    },
  });
};
