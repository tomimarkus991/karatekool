"use client";
import { useQuery } from "@tanstack/react-query";

import { api, ApiError, ApiUser, clearToken, getToken } from "@/lib";

/** The signed-in person, or null when nobody is */
export const useUser = () => {
  const getQuery = async () => {
    if (!getToken()) {
      return null;
    }

    try {
      const user = await api<ApiUser>("/me");
      return {
        id: user.id,
        email: user.email,
        username: user.name,
        avatar: user.avatar,
        role: user.admin ? "admin" : null,
        group: user.group?.letter ?? null,
        calendar_type: user.calendarView && { MONTH: "Kuu", DAY: "Päev" }[user.calendarView],
      };
    } catch (error) {
      // An expired token, or someone taken off the Whitelist: they are signed out
      if (error instanceof ApiError && (error.status === 401 || error.status === 403)) {
        clearToken();
        return null;
      }
      throw error;
    }
  };

  return useQuery({ queryKey: ["user"], queryFn: () => getQuery() });
};
