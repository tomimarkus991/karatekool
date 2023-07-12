import { ApplyToClubFormValues } from "../../app-constants";

export const ApplyToClubEmailTemplate = ({ email, group, reason, name }: ApplyToClubFormValues) => (
  <div>
    <h1>{name} küsis luba</h1>
    <p>Grupp: {group}</p>
    <p>Email: {email}</p>
    <p>Miks taotled: {reason}</p>
  </div>
);
