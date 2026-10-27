import type { Mail } from "./port";

/**
 * The test services from e2e/docker-compose.yml that every backend shares: Mailpit catches the
 * site's email and serverless-redis-http stands in for Upstash. playwright.config.ts sets the URLs.
 */

const localUrl = (name: string) => {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not set; see e2e/README.md`);
  // reset() wipes these, so never point them at a real service
  const { hostname } = new URL(value);
  if (hostname !== "localhost" && hostname !== "127.0.0.1") {
    throw new Error(`Refusing to run E2E against non-local ${name} ${value}`);
  }
  return value.replace(/\/$/, "");
};

const call = async (url: string, init?: RequestInit) => {
  const response = await fetch(url, init).catch(error => {
    throw new Error(`${url} is unreachable; are the E2E services running? (${error})`);
  });
  if (!response.ok) throw new Error(`${init?.method ?? "GET"} ${url}: ${response.status}`);
  // Mailpit answers a delete with a plain "ok"
  const isJson = response.headers.get("content-type")?.includes("application/json");
  return isJson ? response.json() : response.text();
};

interface MailpitAddress {
  Address: string;
}

export const mailpit = () => {
  const api = `${localUrl("MAILPIT_URL")}/api/v1`;

  return {
    clear: () => call(`${api}/messages`, { method: "DELETE" }),

    async lastMailTo(address: string): Promise<Mail | undefined> {
      // Search results are newest first
      const query = encodeURIComponent(`to:"${address}"`);
      const { messages } = await call(`${api}/search?query=${query}&limit=1`);
      if (messages.length === 0) return undefined;

      const message = await call(`${api}/message/${messages[0].ID}`);
      return {
        subject: message.Subject,
        to: message.To.map((a: MailpitAddress) => a.Address),
        replyTo: message.ReplyTo.map((a: MailpitAddress) => a.Address),
        body: message.Text,
      };
    },
  };
};

/** The rate limiter's store, through the same Upstash REST protocol the site uses. */
export const rateLimitStore = () => {
  const url = localUrl("UPSTASH_REDIS_REST_URL");

  return {
    clear: () =>
      call(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(["FLUSHALL"]),
      }),
  };
};
