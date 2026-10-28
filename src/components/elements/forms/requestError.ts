import { ApiError } from "@/lib";

/** What a form shows when the API does not accept it; 429 means the daily limit is reached */
export const requestErrorMessage = (error: unknown, failedMessage: string) =>
  error instanceof ApiError && error.status === 429
    ? "Tänane saatmise limiit on täis. Proovi homme uuesti või kirjuta aadressil info@karatekool.ee"
    : failedMessage;
