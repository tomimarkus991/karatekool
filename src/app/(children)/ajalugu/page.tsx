import { Metadata } from "next";

import { AjaluguPageComponents } from "./AjaluguPageComponents";

export const metadata: Metadata = {
  title: "Karate-Do klubi Nüke lühiajalugu ja missioon",
  description: `Karate-Do klubi Nüke ajalugu käsitledes võib tõmmata paralleele kogu Eesti karate ajalooga. Nüket võib julgelt pidada Eesti kõige pikema traditsiooniga karateklubiks.
Karateklubi Nüke loojaks oli Mart Rosmann (1943-2023), kes ise alustas karate õpinguid 1968 aastal esimeses teada olevas karategrupis Eestis. 
See esimene entusiastide grupp, ammutas karate teadmisi ühest jaapani raamatust, mida jupikaupa tõlgiti. Karatehuvilised vedasid raamatust näpuga järge ja kõik nähtu püüti kohe praktikasse viia. See grupp pani aluse ja hoo sisse kogu Eesti karate liikumisele.
Esimesed karate võistlused peeti 1972 aastal, mille võitjaks osutus Nüke klubi looja Mart Rosmann. See oli sügav Nõukogude – vene okupatsiooni aeg, kus kõik oli range kontrolli all. 
`,
};

export default function Page() {
  return <AjaluguPageComponents />;
}
