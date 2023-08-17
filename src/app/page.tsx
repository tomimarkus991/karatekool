import { Metadata } from "next";

import { MainComponent } from "./(home_components)/HomepageComponents";

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
