import { Metadata } from "next";

import { UustulnukalePageComponent } from "./UustulnukalePageComponent";

export const metadata: Metadata = {
  title: "Miks valida Nüke klubi? | Nüke Klubi eelised",
  description:
    "Avasta Nüke Klubi eelised: Väga hea asukoht Tallinn, Vanalinn. Eesti vanim karateklubi, meil on professionaalsed treenerid, karate-do väärtused, isikupõhine lähenemine ja palju muud. Nüke Klubis on ruumi kõigile - lastest täiskasvanuteni.",
};

export default function Page() {
  return <UustulnukalePageComponent />;
}
