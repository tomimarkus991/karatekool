import { Metadata } from "next";

import { MainComponent } from "./(home_components)/HomepageComponents";

export const metadata: Metadata = {
  title: "Nüke Karatekool",
  description:
    "Nüke on Eesti kõige pikema traditsiooniga karateklubi. Karate do lahedad treeningud Eesti Tallinn. Karate trenn lastele tallinnas. Karate trennid.",
};

export default function Page() {
  return (
    <>
      <MainComponent />
    </>
  );
}
