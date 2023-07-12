import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";
import { Resend } from "resend";

import { SendQuestionFormValues } from "../../../app-constants";
import { SendSupportQuestionEmailTemplate } from "../../../components/emails/SendSupportQuestion";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

// Create a rate limiter that allows 1 request per day
const rateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "1 d"),
  analytics: true,
});

export async function POST(req: Request) {
  const requestBodyJson = (await req.json()) as SendQuestionFormValues;
  const { email, name, question } = requestBodyJson;
  try {
    const { success } = await rateLimit.limit(email.toLowerCase());

    if (!success) throw new Error("Too many requests");

    if (success) {
      const data = await resend.emails.send({
        from: "onboarding@resend.dev",
        // @launch on launch change to info@karatekool.ee
        to: ["tomimarkusalber@gmail.com"],
        subject: `Küsimus ${name}`,
        react: SendSupportQuestionEmailTemplate({ email, name, question }),
      });
      return NextResponse.json(data);
    }
  } catch (error) {
    return NextResponse.json({ error });
  }

  return NextResponse.json({ error: "Something went wrong" });
}
