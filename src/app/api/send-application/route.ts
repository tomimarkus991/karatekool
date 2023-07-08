import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";
import { Resend } from "resend";

import { ApplyToClubEmail, SendApplication } from "../../apply-to-club/EmailTemplate";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

// Create a rate limiter that allows 1 request per day
const rateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(1, "1 d"),
  analytics: true,
});

export async function POST(req: Request) {
  const requestBodyJson = (await req.json()) as SendApplication;
  const { email, group, name, reason } = requestBodyJson;
  try {
    const { success } = await rateLimit.limit(email);

    if (!success) throw new Error("Too many requests");

    if (success) {
      const data = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: "tomimarkusalber@gmail.com",
        subject: `Taotlus ${name}`,
        react: ApplyToClubEmail({ email, group, name, reason }),
      });
      return NextResponse.json(data);
    }
  } catch (error) {
    return NextResponse.json({ error });
  }

  return NextResponse.json({ error: "Something went wrong" });
}
