const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api/v1").replace(
  /\/$/,
  "",
);

/** Where the signed-in person's API token lives; the E2E suite signs people in by setting it */
const TOKEN_KEY = "karatekool-token";

export const getToken = () =>
  typeof window === "undefined" ? null : window.localStorage.getItem(TOKEN_KEY);

export const setToken = (token: string) => window.localStorage.setItem(TOKEN_KEY, token);

export const clearToken = () => window.localStorage.removeItem(TOKEN_KEY);

export class ApiError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message);
  }
}

/** A call to the Spring API with the signed-in person's token. Throws ApiError when refused. */
export const api = async <T = void>(
  path: string,
  { method = "GET", body }: { method?: string; body?: unknown } = {},
): Promise<T> => {
  const token = getToken();
  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      ...(body === undefined ? {} : { "Content-Type": "application/json" }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  if (!response.ok) {
    // The API always answers errors as { "error": "..." }
    const { error } = await response.json().catch(() => ({ error: response.statusText }));
    throw new ApiError(response.status, error ?? response.statusText);
  }
  return response.status === 204 ? (undefined as T) : response.json();
};

export interface ApiGroup {
  id: number;
  letter: string;
}

export interface ApiEvent {
  id: number;
  kind: "TRAINING" | "ALL_DAY" | "MULTI_DAY";
  start: string;
  end: string | null;
  highlighted: boolean;
  description: string | null;
  trailer: { id: number; text: string } | null;
  title: string | null;
  subtitle: string | null;
  preset: { id: number; title: string } | null;
  groups: ApiGroup[];
}

export interface ApiUser {
  id: number;
  email: string;
  name: string;
  admin: boolean;
  group: ApiGroup | null;
  calendarView: "MONTH" | "DAY" | null;
  avatar: string;
}
