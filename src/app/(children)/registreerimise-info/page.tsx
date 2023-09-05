import { Metadata } from "next";

import { RegistreerimiseInfoPageComponent } from "./RegistreerimiseInfoPageComponent";

export const metadata: Metadata = {
  title: "Registreerimise info",
  description: `Treeningud ALGKLASSIDE LASTELE, VHK spordisaal (Vene 22)
    L-grupp
TEISIPÄEVAL kell 15:00 – 16:00
KOLMAPÄEVAL kell 15:00 – 16:00
REEDEL kell 15:00 – 16:00

Treeningud noortele ja täiskasvanutele, VHK spordisaal (Vene 22)

C-grupp
TEISIPÄEVAL kell 17:45 – 19:00
NELJAPÄEVAL kell 17:45 – 19:00
LAUPÄEVAL (vastavalt treeninggraafikule)
`,
};

export default function Page() {
  return <RegistreerimiseInfoPageComponent />;
}
