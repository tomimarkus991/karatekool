import { Metadata } from "next";

import { MainComponent } from "./HomepageComponents";

export const metadata: Metadata = {
  title: "Nüke Kodu",
  description: "Tere tulemast nüke kodulehele!",
};

export default function Page() {
  return (
    <>
      <MainComponent />
    </>
  );
}
