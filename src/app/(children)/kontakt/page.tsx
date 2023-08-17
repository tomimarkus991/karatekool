import { Metadata } from "next";

import { KontaktPageComponent } from "./KontaktPageComponent";

export const metadata: Metadata = {
  title: "Kontakt ja Klubid",
  description:
    "Võta ühendust Nüke Klubiga või külasta meid meie võimlates Vanalinnas ja Sikupillis.",
};

export default function Page() {
  return <KontaktPageComponent />;
}
