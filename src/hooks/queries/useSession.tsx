import { useQuery } from "@tanstack/react-query";

import { supabase } from "@/lib";

export const useSession = () => {
  const getSession = async () => {
    const { data } = await supabase.auth.getSession();

    return data.session;
  };

  return useQuery(["session"], () => getSession());
};
