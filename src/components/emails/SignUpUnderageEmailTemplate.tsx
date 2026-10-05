import { ParentFormValues, SignUpUnderageFormValues } from "../../app-constants";

const sportTypeLabels: Record<string, string> = {
  main: "Põhiala",
  secondary: "Kõrvalala",
};

const ParentInfo = ({ title, parent }: { title: string; parent?: ParentFormValues }) => (
  <>
    <h2>{title}</h2>
    <p>Nimi: {parent?.name || "-"}</p>
    <p>Telefon: {parent?.phone || "-"}</p>
    <p>Email: {parent?.email || "-"}</p>
  </>
);

export const SignUpUnderageEmailTemplate = ({
  firstName,
  lastName,
  personalCode,
  phone,
  email,
  address,
  school,
  grade,
  sportType,
  mother,
  father,
  infoEmail,
  familyMembers,
}: SignUpUnderageFormValues) => (
  <div>
    <h1>
      Uus registreerimine (laps): {firstName} {lastName}
    </h1>
    <p>Isikukood: {personalCode}</p>
    <p>Lapse telefon: {phone}</p>
    <p>Lapse email: {email}</p>
    <p>Kodune aadress: {address}</p>
    <p>Kool: {school}</p>
    <p>Klass: {grade}</p>
    <p>Karate on: {sportTypeLabels[sportType] ?? sportType}</p>
    <ParentInfo title="Ema" parent={mother} />
    <ParentInfo title="Isa" parent={father} />
    <h2>Info email</h2>
    <p>{infoEmail}</p>
    <h2>Trennis käivad pereliikmed</h2>
    <p>{familyMembers || "-"}</p>
  </div>
);
