export interface SendApplication {
  name: string;
  email: string;
  group: string;
  reason: string;
}

export const ApplyToClubEmail = ({ email, group, reason, name }: SendApplication) => (
  <div>
    <h1>{name} küsis luba</h1>
    <p>Grupp: {group}</p>
    <p>Email: {email}</p>
    <p>Miks taotled: {reason}</p>
  </div>
);
