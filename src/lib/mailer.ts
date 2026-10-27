// Server-only. Not exported from "@/lib" so nodemailer stays out of client bundles.
import { render } from "@react-email/render";
import { createTransport } from "nodemailer";
import { Resend } from "resend";

const from = "Karatekool <noreply@karatekool.ee>";
const to = ["info@karatekool.ee"];

/** An email to the club's inbox, e.g. an Application or a Question. */
export interface ClubMail {
  replyTo: string;
  subject: string;
  react: React.ReactElement;
}

type SendResult = { data: { id: string } | null; error: unknown };

const sendWithResend = async ({ replyTo, subject, react }: ClubMail): Promise<SendResult> =>
  new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY).emails.send({
    from,
    to,
    reply_to: replyTo,
    subject,
    react,
  });

// Resend cannot be pointed at a local server, so E2E runs deliver over SMTP to Mailpit instead
const sendWithSmtp = async ({ replyTo, subject, react }: ClubMail): Promise<SendResult> => {
  const transport = createTransport({
    host: process.env.SMTP_HOST ?? "localhost",
    port: Number(process.env.SMTP_PORT ?? 1025),
  });

  try {
    const { messageId } = await transport.sendMail({
      from,
      to,
      replyTo,
      subject,
      html: render(react),
      text: render(react, { plainText: true }),
    });
    return { data: { id: messageId }, error: null };
  } catch (error) {
    return { data: null, error: String(error) };
  }
};

export const sendToClub = (mail: ClubMail) =>
  process.env.E2E === "1" ? sendWithSmtp(mail) : sendWithResend(mail);
