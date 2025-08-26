import { Metadata } from "next";

import { RegistreerimiseInfoPageComponent } from "./RegistreerimiseInfoPageComponent";

export const metadata: Metadata = {
  title: "Registreerimise info",
  description: `
Treeningud ALGKLASSIDE LASTELE, VHK spordisaal (Vene 22)
V-grupp
TEISIPÄEVAL kell 15:00 – 16:00
KOLMAPÄEVAL kell 16:30 – 17:30
REEDEL kell 15:00 – 16:00

Treeningud NOORTELE ja TÄISKASVANUTELE, VHK spordisaal (Vene 22)
S-grupp
ESMASPÄEVAL kell 18:45 – 20:00
KOLMAPÄEVAL kell 18:45 – 20:00
`,
};

export default function Page() {
  return <RegistreerimiseInfoPageComponent />;
}
