import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { useSupabase } from "@/context";

interface Props {
  name: string;
  avatar: string;
  group: string;
  calendarType: string;
}

interface UpdatedFields {
  username?: string;
  avatar?: string;
  group?: string;
  calendar_type?: string;
}

export const useUpdateProfile = () => {
  const { supabase } = useSupabase();
  const queryClient = useQueryClient();

  const execute = async ({ avatar, name, calendarType, group }: Props) => {
    const updatedFields: UpdatedFields = {};

    if (name) {
      updatedFields.username = name;
    }

    if (avatar) {
      updatedFields.avatar = avatar;
    }

    if (group) {
      updatedFields.group = group;
    }

    if (calendarType) {
      updatedFields.calendar_type = calendarType;
    }

    const res = await supabase
      .from("profile")
      .update(updatedFields)
      .match({ id: (await supabase.auth.getUser()).data.user?.id });

    if (res.error) {
      toast.error(res.error.message);
      throw new Error(res.error.message);
    }

    return res;
  };

  return useMutation({
    mutationFn: (user: Props) => execute(user),
    onSuccess: () => {
      toast.success("Profiil uuendatud");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};
