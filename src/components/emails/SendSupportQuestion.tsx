import { SendQuestionFormValues } from "../../app-constants";

export const SendSupportQuestionEmailTemplate = ({
  email,
  name,
  question,
}: SendQuestionFormValues) => (
  <div>
    <h1>Nimi: {name}</h1>
    <p>Email: {email}</p>
    <p>{question}</p>
  </div>
);
