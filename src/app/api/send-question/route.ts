import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";
import { ValidationError } from "yup";

import { YupSchemas } from "../../../app-constants";
import { SendSupportQuestionEmailTemplate } from "../../../components/emails/SendSupportQuestion";
import { sendToClub } from "../../../lib/mailer";

// Allow 5 questions per email per day
const rateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "1 d"),
  analytics: true,
  // The default in-memory cache of blocked emails outlives the E2E reset, which only clears Redis
  ephemeralCache: process.env.E2E === "1" ? false : undefined,
});

export async function POST(req: Request) {
  try {
    const { email, name, question } = await YupSchemas.SendQuestionForm.validate(await req.json(), {
      stripUnknown: true,
    });

    const { success } = await rateLimit.limit(email.toLowerCase());
    if (!success) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const { data, error } = await sendToClub({
      replyTo: email,
      subject: `Küsimus ${name}`,
      react: SendSupportQuestionEmailTemplate({ email, name, question }),
    });
    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }

    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
