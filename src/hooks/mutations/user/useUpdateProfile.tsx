import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { api, ApiGroup } from "@/lib";

interface Props {
  avatar: string;
  /** A Group letter */
  group: string;
  calendarType: string;
}

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  const execute = async ({ avatar, calendarType, group }: Props) => {
    const groups = group ? await api<ApiGroup[]>("/groups") : [];

    // Left out fields stay as they are
    await api("/me", {
      method: "PATCH",
      body: {
        avatar: avatar || undefined,
        groupId: groups.find(g => g.letter === group)?.id,
        calendarView: { Kuu: "MONTH", Päev: "DAY" }[calendarType],
      },
    });
  };

  return useMutation({
    mutationFn: (user: Props) => execute(user),
    onSuccess: () => {
      toast.success("Profiil uuendatud");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: error => {
      toast.error(error.message);
    },
  });
};
