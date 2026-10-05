import { Metadata } from "next";

import { RegistreeriPageComponent } from "./RegistreeriPageComponent";

export const metadata: Metadata = {
  title: "Registreeri trenni",
  description: "Registreeri laps või täiskasvanu karatetrenni.",
};

export default function Page() {
  return <RegistreeriPageComponent />;
}
