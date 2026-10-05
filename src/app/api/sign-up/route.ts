import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { ValidationError } from "yup";

import { SignUpRequestBody, YupSchemas } from "../../../app-constants";
import { SignUpAdultEmailTemplate } from "../../../components/emails/SignUpAdultEmailTemplate";
import { SignUpUnderageEmailTemplate } from "../../../components/emails/SignUpUnderageEmailTemplate";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

// Allow 5 sign-ups per email per day
const rateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "1 d"),
  analytics: true,
});

const buildEmail = async (body: SignUpRequestBody) => {
  if (body.type === "underage") {
    const values = await YupSchemas.SignUpUnderage.validate(body, { stripUnknown: true });

    return {
      rateLimitKey: values.infoEmail,
      subject: `Registreerimine (laps) ${values.firstName} ${values.lastName}`,
      react: SignUpUnderageEmailTemplate(values),
    };
  }

  if (body.type === "adult") {
    const values = await YupSchemas.SignUpAdult.validate(body, { stripUnknown: true });

    return {
      rateLimitKey: values.email,
      subject: `Registreerimine (täiskasvanu) ${values.firstName} ${values.lastName}`,
      react: SignUpAdultEmailTemplate(values),
    };
  }

  throw new ValidationError("Tundmatu registreerimise tüüp");
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as SignUpRequestBody;
    const { rateLimitKey, subject, react } = await buildEmail(body);

    const { success } = await rateLimit.limit(`sign-up:${rateLimitKey.toLowerCase()}`);
    if (!success) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["info@karatekool.ee"],
      subject,
      react,
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
