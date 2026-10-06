import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";
import { Resend } from "resend";

import { SendQuestionFormValues } from "../../../app-constants";
import { SendSupportQuestionEmailTemplate } from "../../../components/emails/SendSupportQuestion";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

// Allow 5 questions per email per day
const rateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "1 d"),
  analytics: true,
});

export async function POST(req: Request) {
  try {
    const requestBodyJson = (await req.json()) as SendQuestionFormValues;
    const { email, name, question } = requestBodyJson;

    const { success } = await rateLimit.limit(email.toLowerCase());
    if (!success) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const { data, error } = await resend.emails.send({
      from: "Karatekool <noreply@karatekool.ee>",
      to: ["info@karatekool.ee"],
      reply_to: email,
      subject: `Küsimus ${name}`,
      react: SendSupportQuestionEmailTemplate({ email, name, question }),
    });
    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
