"use client";

import { Tab } from "@headlessui/react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import Image from "next/image";
import { Suspense, useState } from "react";
import { FaSpinner } from "react-icons/fa";

import { TwoElementMovingBox } from "@/components";
import { cn } from "@/lib";

import {
  ContactDojosTab,
  ContactAddress,
  ContactGeneralInfo,
  ContactHeading,
} from "./ContactUtils";
import KsgMap from "./KsgMap";
import VhkMap from "./VhkMap";

const duration = 0.4;

const dojoContentVariants = (toLeft: boolean) => {
  const variant: Variants = {
    hidden: {
      x: toLeft ? 20 : -20,
      opacity: 0,
    },
    active: {
      x: 0,
      opacity: 1,
      transition: {
        duration,
      },
    },
  };
  return variant;
};

export const ContactDojos = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
      <Tab.List
        className={cn(
          "flex flex-row relative px-1 w-full flex-1 mb-6 bg-stone-100 rounded-2xl max-w-md mx-auto md:mb-12",
          "shadow-lg ring-1 ring-stone-400 ring-opacity-5"
        )}
      >
        <ContactDojosTab selectedIndex={selectedIndex} index={0}>
          VHK võimla Vanalinnas
        </ContactDojosTab>
        <ContactDojosTab selectedIndex={selectedIndex} index={1}>
          KSG Spordisaal Sikupillis
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
            <ContactAddress
              title="VHK võimla Vanalinnas"
              address="Vene 22, 10123 Tallinn"
              directionsLink="https://goo.gl/maps/gD7T4aTC7Xx55HMZ6"
            />
            <div className="flex flex-col max-w-4xl m-auto">
              <ContactGeneralInfo />
              <div className="mb-4">
                <ContactHeading>Trenni tulek</ContactHeading>
                <p className="mb-3 text-[0.9rem] md:text-base">
                  Vene tänav asub Tallinna vanalinna tasulises parkimistsoonis, soodsaim variant on
                  tulla ühistranspordiga. VHK võimla on meeldiva jalutuskäigu kaugusel mitmetest
                  Tallinna kesklinna ühistranspordi sõlmedest (Viru Keskus, Vabaduse väljak, Balti
                  jaam).
                </p>
                <p className="text-[0.9rem] md:text-base">
                  Isikliku autoga tulija peab arvestama, et ukse ees Vene tänaval parkimise hind on
                  1,15 EUR 15 minuti eest. Lähimad Europarki parklad on aadressidel Aia 18 ja Aia 7
                  (3,20 EUR tund). Ka kesklinna tasulise parkimise tsoon ei asu kaugel, kuid
                  odavamas parkimistsoonis (nt. Mere pst. ääres) parkimiskoha leidmine võib nõuda
                  palju aega.
                </p>
              </div>
              <Suspense fallback={<FaSpinner />}>
                <VhkMap />
              </Suspense>
              <p className="mt-6 mb-3 text-[0.9rem] md:text-base">
                Trenni tulija peaks sisenema sellest hooviväravast, kust peale sisenemist paistab
                kohe ka võimla. Kollase koolimaja peaukse kaudu trenni ei pääse!
              </p>

              <div className="relative object-cover aspect-auto">
                <Image
                  width={2000}
                  height={2000}
                  src="/general/vhk_door_arrow.jpg"
                  alt="vhk-door"
                  className="rounded-xl"
                />
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
            <ContactAddress
              title="KSG Spordisaal Sikupillis"
              address="Kivimurru 9, 11411 Tallinn"
              directionsLink="https://goo.gl/maps/W68nS57PaPRRruiJ8"
            />
            <div className="flex flex-col max-w-4xl m-auto">
              <ContactGeneralInfo />
              <Suspense fallback={<FaSpinner />}>
                <KsgMap />
              </Suspense>
            </div>
          </Tab.Panel>
        </AnimatePresence>
      </Tab.Panels>
    </Tab.Group>
  );
};
