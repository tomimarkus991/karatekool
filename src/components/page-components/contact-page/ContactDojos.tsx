import { Tab } from "@headlessui/react";
import clsx from "clsx";
import { AnimatePresence, motion, Variants } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

import { ContactAddress, ContactDojosTab, ContactGeneralInfo, ContactHeading } from "@/components";

import vhkDoorPic from "../../../../public/general/vhk_door_arrow.jpg";

const dojoContentVariants: Variants = {
  hidden: {
    opacity: 0.3,
    y: 0,
  },
  active: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
  exit: {
    opacity: 0,
    y: -5,
    transition: {
      duration: 0.6,
    },
  },
};

export const ContactDojos = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const tabVariant: Variants = {
    active: {
      left: "0%",
      transition: {
        ease: "easeOut",
        duration: 0.6,
      },
    },
    inactive: {
      left: "50%",
      transition: {
        ease: "easeOut",
        duration: 0.6,
      },
    },
  };
  return (
    <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
      <Tab.List
        className={clsx(
          "flex flex-row relative px-1 w-full flex-1 mb-6 bg-stone-100 rounded-2xl max-w-md m-auto md:mb-12"
        )}
      >
        <ContactDojosTab selectedIndex={selectedIndex} index={0}>
          VHK võimla Vanalinnas
        </ContactDojosTab>
        <ContactDojosTab selectedIndex={selectedIndex} index={1}>
          KSG Spordisaal Sikupillis
        </ContactDojosTab>
        <motion.div
          variants={tabVariant}
          animate={selectedIndex === 0 ? "active" : "inactive"}
          className="bg-white absolute inset-0 w-[50%] rounded-2xl"
        />
      </Tab.List>
      <Tab.Panels>
        <AnimatePresence>
          <Tab.Panel
            as={motion.div}
            initial="hidden"
            animate="active"
            exit="exit"
            variants={dojoContentVariants}
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
              <iframe
                title="vhk-map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2028.672626802986!2d24.746469916527637!3d59.438534381697195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46929354254d21ff%3A0xaae636211ac67099!2sKarate-DO%20Klubi%20N%C3%9CKE!5e0!3m2!1sen!2see!4v1671877034130!5m2!1sen!2see"
                height="450"
                className="w-full"
                loading="lazy"
              />
              <p className="mt-6 mb-3 text-[0.9rem] md:text-base">
                Trenni tulija peaks sisenema sellest hooviväravast, kust peale sisenemist paistab
                kohe ka võimla. Kollase koolimaja peaukse kaudu trenni ei pääse!
              </p>

              <Image src={vhkDoorPic} alt="vhk-door" className="object-cover aspect-auto" />
            </div>
          </Tab.Panel>

          <Tab.Panel
            as={motion.div}
            initial="hidden"
            animate="active"
            exit="exit"
            variants={dojoContentVariants}
            key={"panel 2"}
          >
            <ContactAddress
              title="KSG Spordisaal Sikupillis"
              address="Kivimurru 9, 11411 Tallinn"
              directionsLink="https://goo.gl/maps/W68nS57PaPRRruiJ8"
            />
            <div className="flex flex-col max-w-4xl m-auto">
              <ContactGeneralInfo />

              <iframe
                title="ksg-map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d590.3914104429309!2d24.78825216698169!3d59.4278017231875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x469293b833065b57%3A0x191a22794b1c9d1f!2sKSG%20M%C3%A4e%20maja!5e0!3m2!1sen!2see!4v1671876698031!5m2!1sen!2see"
                className="w-full"
                height="450"
                loading="lazy"
              />
            </div>
          </Tab.Panel>
        </AnimatePresence>
      </Tab.Panels>
    </Tab.Group>
  );
};
