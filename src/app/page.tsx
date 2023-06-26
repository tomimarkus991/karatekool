import { Metadata } from "next";

import { Section1 } from "./HomepageComponents";

export const metadata: Metadata = {
  title: "Nüke Kodu",
  description: "Tere tulemast nüke kodulehele!",
};

export default function Page() {
  return (
    <div className="flex flex-col items-center">
      <Section1 />
    </div>
  );
}
