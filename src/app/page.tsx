import { Metadata } from "next";

import { MainComponent } from "./(home_components)/HomepageComponents";

export const metadata: Metadata = {
  title: "Nüke Karatekool",
  description:
    "Nüke on Eesti kõige pikema traditsiooniga karateklubi. Lahedad treeningud Eestis Tallinn, Vanalinn. Karate-do väärtused, isikupõhine lähenemine, pühendunud treenerid ja palju muud.",
};

export default function Page() {
  return (
    <>
      <MainComponent />
    </>
  );
}
