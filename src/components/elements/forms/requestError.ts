/** What a form shows when the site does not accept it; 429 means the daily limit is reached */
export const requestErrorMessage = (response: Response | undefined, failedMessage: string) =>
  response?.status === 429
    ? "Tänane saatmise limiit on täis. Proovi homme uuesti või kirjuta aadressil info@karatekool.ee"
    : failedMessage;
