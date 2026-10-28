import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { api } from "@/lib";

interface Props {
  title: string;
}

export const useCreateMultiDayEventPreset = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ title }: Props) =>
      api<{ id: number; title: string }>("/presets", { method: "POST", body: { title } }),
    onSuccess: () => {
      toast.success("Uus mitme päeva üritus on loodud");
      queryClient.invalidateQueries({ queryKey: ["multi_day_event_presets"] });
    },
    onError: error => {
      toast.error(error.message);
    },
  });
};
