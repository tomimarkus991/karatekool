import { Metadata } from "next";

import { KlubistPageComponent } from "./KlubistPageComponent";

export const metadata: Metadata = {
  title: "Klubist, Treenerist",
  description:
    "Info Nüke karateklubi kohta. Karateklubi Nüke on Eesti kõige pikema traditsiooniga karatekool. Nüke loodi 1978. aastal.",
};

export default function Page() {
  return <KlubistPageComponent />;
}
