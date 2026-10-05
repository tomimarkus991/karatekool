import { SignUpAdultFormValues } from "../../app-constants";

export const SignUpAdultEmailTemplate = ({
  firstName,
  lastName,
  birthDate,
  phone,
  email,
  familyMembers,
}: SignUpAdultFormValues) => (
  <div>
    <h1>
      Uus registreerimine (täiskasvanu): {firstName} {lastName}
    </h1>
    <p>Sünnikuupäev: {birthDate}</p>
    <p>Telefon: {phone}</p>
    <p>Email: {email}</p>
    <h2>Trennis käivad pereliikmed</h2>
    <p>{familyMembers || "-"}</p>
  </div>
);
