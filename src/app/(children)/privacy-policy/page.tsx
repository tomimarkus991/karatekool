import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privaatsuspoliitika",
  description: "Kuidas Karate-do klubi Nüke veebileht isikuandmeid kogub ja kasutab.",
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="space-y-3">
    <h2 className="text-xl font-semibold md:text-2xl text-secondary">{title}</h2>
    {children}
  </section>
);

export default function Page() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 text-base md:text-lg">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold md:text-4xl text-secondary">Privaatsuspoliitika</h1>
        <p className="text-sm text-text-caption">Viimati uuendatud 28.10.2026</p>
      </div>

      <Section title="Kes andmeid töötleb">
        <p>
          Andmete vastutav töötleja on MTÜ Karate-do klubi Nüke. Küsimuste korral kirjuta
          info@karatekool.ee või helista (+372) 57 50 17 33.
        </p>
      </Section>

      <Section title="Registreerimine ja küsimused">
        <p>
          Trenni registreerimisel küsime osaleja nime, sünniaega või isikukoodi, telefoni, e-posti
          ja lapse puhul ka kooli, klassi, aadressi ning vanemate kontakte. Küsimuse saatmisel
          küsime nime, e-posti ja küsimust.
        </p>
        <p>
          Need andmed saadetakse e-kirjana klubi postkasti info@karatekool.ee ja neid kasutatakse
          ainult trenni registreerimiseks ja sinuga ühenduse võtmiseks. Veebileht ise neid ei
          salvesta. Liiga paljude kirjade vältimiseks jätame meelde ainult saatja e-posti aadressi
          ja saatmise aja ning kustutame need ööpäeva möödudes.
        </p>
      </Section>

      <Section title="Sisselogimine">
        <p>
          Sisse saavad logida klubi liikmed, kelle e-post on klubi nimekirjas. Sisselogimiseks
          kasutatakse Google&apos;i kontot. Google&apos;ilt saame sinu nime, e-posti aadressi ja
          konto tunnuse. Lisaks salvestame sinu valitud grupi, kalendrivaate ja avatari.
        </p>
        <p>
          Sisselogimise tõend hoitakse sinu brauseris (localStorage) ja see kustub väljalogimisel.
          Me ei kasuta reklaami- ega jälgimisküpsiseid.
        </p>
      </Section>

      <Section title="Teised teenused">
        <p>
          Andmeid töötlevad meie nimel Google (sisselogimine), Resend (e-kirjade saatmine) ja
          serveri majutaja. Lehele on lisatud YouTube&apos;i videod ja Google Mapsi kaardid, mis
          võivad kasutada oma küpsiseid vastavalt Google&apos;i privaatsuspoliitikale.
        </p>
      </Section>

      <Section title="Sinu õigused">
        <p>
          Sul on õigus küsida, milliseid andmeid sinu kohta hoiame, ning paluda neid parandada või
          kustutada. Kirjuta selleks info@karatekool.ee. Kui leiad, et sinu andmeid on töödeldud
          valesti, võid pöörduda Andmekaitse Inspektsiooni poole (www.aki.ee).
        </p>
      </Section>
    </div>
  );
}
