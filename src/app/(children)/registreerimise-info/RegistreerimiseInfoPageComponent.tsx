"use client";

import { Tab } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { AnimationWrapper, TwoElementMovingBox, animations } from "@/components";
import { cn } from "@/lib";

import { dojoContentVariants } from "../kontakt/ContactDojos";
import { ContactDojosTab } from "../kontakt/ContactUtils";

export const TrainingsTab = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
      <Tab.List
        className={cn(
          "flex flex-row relative px-1 w-full flex-1 mb-6 bg-stone-100 rounded-xl max-w-md mx-auto md:mb-12",
          "shadow-lg ring-1 ring-stone-400 ring-opacity-5",
        )}
      >
        <ContactDojosTab selectedIndex={selectedIndex} index={0}>
          Treeningud ALGKLASSIDE LASTELE
        </ContactDojosTab>
        <ContactDojosTab selectedIndex={selectedIndex} index={1}>
          Treeningud noortele ja täiskasvanutele
        </ContactDojosTab>
        <TwoElementMovingBox selectedIndex={selectedIndex} />
      </Tab.List>
      <Tab.Panels>
        <AnimatePresence>
          <Tab.Panel
            as={motion.div}
            initial="hidden"
            animate="active"
            exit="exit"
            variants={dojoContentVariants(true)}
            key={"panel 1"}
          >
            <div className="space-y-8">
              <div>
                <li className="mb-2 font-semibold list-disc md:text-xl text-secondary">
                  Treeningud ALGKLASSIDE LASTELE, VHK spordisaal (Vene 22)
                </li>

                <div className="">
                  <p className="text-lg font-bold underline md:text-xl">L-grupp</p>
                  <div className="font-semibold md:text-lg">
                    <p>TEISIPÄEVAL kell 15:00 – 16:00</p>
                    <p>KOLMAPÄEVAL kell 15:00 – 16:00</p>
                    <p>REEDEL kell 15:00 – 16:00</p>
                  </div>
                </div>
              </div>

              <div>
                <li className="mb-2 font-semibold list-disc md:text-xl text-secondary">
                  KLUBISSE REGISTREERUMINE
                </li>
                <p className="mb-1 text-xl font-semibold text-primary">
                  Kiirustage, kuna kohtade arv on piiratud!
                </p>
                <p className="md:text-lg">
                  Kõigil karatehuvilistel on võimalik registreerida ennast Nüke treeningutele (lapse
                  nimi, isikukood, kool, klass) aadressil{" "}
                  <span className="text-blue-500 underline">info@karatekool.ee</span>
                </p>
              </div>

              <div>
                <li className="mb-2 font-semibold list-disc md:text-xl text-secondary">
                  ESIMESED TREENINGUD TOIMUVAD
                </li>
                <p className="font-semibold md:text-lg text-primary">
                  juba TEISIPÄEVAL (5. sept.), KOLMAPÄEVAL (6. sept.), REEDEL (8. sept.)
                </p>
                <p className="mt-2 font-semibold md:text-lg">Selga tavalised spordiriided!</p>
              </div>
            </div>
          </Tab.Panel>

          <Tab.Panel
            as={motion.div}
            initial="hidden"
            animate="active"
            exit="exit"
            variants={dojoContentVariants(false)}
            key={"panel 2"}
          >
            <div className="space-y-8">
              <div>
                <li className="mb-2 font-semibold list-disc md:text-xl text-secondary">
                  Treeningud noortele ja täiskasvanutele, VHK spordisaal (Vene 22)
                </li>

                <div className="">
                  <p className="text-lg font-bold underline md:text-xl">C-grupp</p>
                  <div className="font-semibold md:text-lg">
                    <p>TEISIPÄEVAL kell 17:45 – 19:00</p>
                    <p>NELJAPÄEVAL kell 17:45 – 19:00</p>
                    <p>
                      LAUPÄEVAL{" "}
                      <Link href={"/karateka"}>
                        <span className="underline">vastavalt treeninggraafikule</span>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <li className="mb-2 font-semibold list-disc md:text-xl text-secondary">
                  KLUBISSE REGISTREERUMINE
                </li>
                <p className="mb-1 text-xl font-semibold text-primary">
                  Kiirustage, kuna kohtade arv on piiratud!
                </p>
                <p className="md:text-lg">
                  Kõigil karatehuvilistel on võimalik registreerida ennast Nüke treeningutele
                  aadressil <span className="text-blue-500 underline">info@karatekool.ee</span>{" "}
                  (11.-19. aastastel – nimi, isikukood, kool, klass) ja (20.a. ja vanemad – nimi ja
                  vanus)
                </p>
              </div>

              <div>
                <li className="mb-2 font-semibold list-disc md:text-xl text-secondary">
                  ESIMESED TREENINGUD TOIMUVAD
                </li>
                <p className="font-semibold md:text-lg text-primary">
                  juba TEISIPÄEVAL (5. sept.), NELJAPÄEVAL (7. sept.)
                </p>
                <p className="mt-2 font-semibold md:text-lg">Selga tavalised spordiriided!</p>
              </div>
            </div>
          </Tab.Panel>
        </AnimatePresence>
      </Tab.Panels>
    </Tab.Group>
  );
};

export const RegistreerimiseInfoPageComponent = () => {
  const router = useRouter();
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <div className="space-y-3">
          <p className="font-sans text-lg font-semibold md:text-2xl">
            INFO UUSLIIKMETELE ja LASTEVANEMATELE
          </p>
          <p className="text-lg text-secondary">Nüke 35-õppeaasta!</p>
          <p className="text-xl font-semibold">“KARATEGA JULGEKS, TARGAKS JA HOOLIVAKS!”</p>
        </div>
        <div>
          <p className="mt-5 text-xl font-bold text-center font-sans sm:max-w-[15rem] text-primary sm:mt-0">
            SEPTEMBRI TREENINGUD ON TASUTA!
          </p>
        </div>
      </div>

      <p className="my-6 text-lg font-semibold">
        Karate-do klubi Nüke missioon on terve, targa, heasoovliku, tugeva iseloomuga ja sportliku
        eluhoiakuga inimese kasvatamine karate-do ja spordi kaudu.
      </p>

      <div className="space-y-3">
        <p>
          Me kõik tahame, et meie lastest sirguksid sportlikud, terved, targad, julged ning teistest
          hoolivad inimesed. Selleks tuleb meil motiveerida ning suunata oma lapsi lisaks
          koolitükkide õppimisele ka aktiivselt liikuma ja sporti tegema ning selle kaudu oma
          iseloomu ja väärtushoiakuid kujundama.
        </p>
        <p>
          Parim aeg karatetreeningute alustamiseks on lastel noorem kooliiga – siis on trennis
          kergem hakkama saada. Normaalseks kehaliseks ja vaimseks arenguks, tervise tugevdamiseks
          ning sportliku huvi ja tubliduse kujundamiseks vajab iga laps vähemalt 3 korda nädalas
          1–1,5 tundi sportlikku liikumist.
        </p>
        <p>
          Kui nädala sisse mahuvad karatetreeningud, hakkab lastel ka koolis ladusamalt minema.
          Karate treeningutel õpitakse keskenduma, pingutama, ennast kontrollima, teistega hästi
          läbi saama, lastel kasvab enesekindlus ja julgus.
        </p>
        <p>
          Kui laps tunneb karate trennist ja liikumisest rõõmu, sirgub temast kehaliselt aktiivne
          inimene, kellel ei tule mõttessegi spordist eemale hoida, ning saab varakult aru, mida
          teha selleks, et olla terve ja sportlik. See on füüsiline ja vaimne pagas kogu eluks.
          Laste huvi ning harjumuste kujunemisel sportliku tegevuse vastu sõltub väga palju ka
          lastevanemate hoiakutest ja suhtumisest. Trennis käivatele lastele on lastevanemate toetus
          ning tunnustus väga oluline!
        </p>
        <AnimationWrapper className="!mt-0 w-fit" variants={animations.subtleScale}>
          <button
            className="text-lg cursor-pointer text-secondary"
            onClick={() => {
              router.push("/klubist#treener-herik");
            }}
          >
            Karateõpetaja Herik Tölpt
          </button>
        </AnimationWrapper>
      </div>
      <p className="my-4 text-lg font-semibold text-primary">2023/2024 hooaja TREENINGUD</p>

      <TrainingsTab />

      <p className="mt-10 text-xl text-secondary">
        Kõigile L- ja C-grupi registreerunutele saadetakse täpsem info e-maili teel!
      </p>
    </div>
  );
};
