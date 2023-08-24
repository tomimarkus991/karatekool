import { Tab } from "@headlessui/react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { Fragment } from "react";

import { animations, AnimationWrapper } from "@/components";
import { Icons } from "@/components/icons/Icons";
import { cn } from "@/lib";

import { LetterDecryptor } from "../../../components/elements/LetterDecryptor";

interface ContactHeadingProps {
  children: string;
}

export const ContactHeading = ({ children }: ContactHeadingProps) => (
  <p className="self-start text-[#393939] text-lg md:text-xl font-semibold md:self-center">
    {children}
  </p>
);
const ContactAddressHeading = ({ children }: ContactHeadingProps) => (
  <p className="self-start text-[#393939] text-lg md:text-2xl lg:text-3xl font-semibold md:self-center">
    <LetterDecryptor letterAmount={3}>{children}</LetterDecryptor>
  </p>
);

interface ContactDojosTabProps {
  children: React.ReactNode;
  selectedIndex: number;
  index: number;
}

export const ContactDojosTab = ({ children, selectedIndex, index }: ContactDojosTabProps) => {
  const tabVariant: Variants = {
    active: {
      color: "#E50815",
      transition: {
        ease: "easeOut",
        duration: 0.6,
      },
    },
    inactive: {
      transition: {
        ease: "easeOut",
        duration: 0.6,
      },
    },
  };

  return (
    <AnimationWrapper
      className="z-10 w-full my-auto text-center"
      variants={animations.smallScaleXs}
    >
      <Tab as={Fragment}>
        {({ selected }) => (
          <motion.button
            variants={tabVariant}
            animate={selectedIndex === index ? "active" : "inactive"}
            className={cn(
              "rounded-xl mx-[0.2rem] text-[0.8rem] md:text-base font-semibold px-1 py-3",
              selected ? "opacity-100" : "opacity-20 hover:opacity-100",
              "focus:ring-0 ring-white ring-opacity-0 ring-offset-2 ring-offset-transparent focus:outline-none",
            )}
          >
            <p>{children}</p>
          </motion.button>
        )}
      </Tab>
    </AnimationWrapper>
  );
};

interface ContactAddressProps {
  title: string;
  address: string;
  directionsLink: string;
}

export const ContactAddress = ({ title, address, directionsLink }: ContactAddressProps) => (
  <>
    <div className="flex flex-row justify-between max-w-4xl m-auto mb-5">
      <div className="flex flex-row md:hidden">
        <div className="flex flex-col items-center justify-start mr-2">
          <ContactAddressHeading>{title}</ContactAddressHeading>
          <p className="text-[0.9rem] self-start">{address}</p>
          <Link className="self-start" href="/registreerimise-info">
            <p className="self-start mt-4 text-lg underline text-secondary">Registreerimise info</p>
          </Link>
        </div>
        <Icons.directionsButton onClick={() => window.open(directionsLink, "_blank")} />
      </div>
      <div className="hidden md:block">
        <div className="flex flex-row items-center justify-center space-x-4">
          <ContactAddressHeading>{title}</ContactAddressHeading>
          <Icons.directionsButton onClick={() => window.open(directionsLink, "_blank")} />
        </div>
        <p className="text-lg leading-[0.5rem]">{address}</p>
        <Link href="/registreerimise-info">
          <p className="mt-4 text-xl underline text-secondary md:text-2xl">Registreerimise info</p>
        </Link>
      </div>
      <div className="hidden space-y-2 text-lg md:text-base md:block">
        <ContactHeading>Kontakt</ContactHeading>
        <p>(+372) 57 50 17 33</p>
        <p>info@karatekool.ee</p>
        <p>MTÜ Karate-do klubi Nüke</p>
        <p>EE 2310 1022 0004 3840 13</p>
      </div>
    </div>
  </>
);

export const ContactGeneralInfo = () => (
  <div className="mb-4">
    <ContactHeading>Üldine info</ContactHeading>
    <ul className="md:ml-10 ml-6 text-[0.9rem] md:text-base list-disc">
      <li>
        <p>Esimesse trenni tuleb kaasa võtta tavalised spordiriided ja hea tuju.</p>
      </li>
      <li>
        <p>Varustust (kimono ja vööd) pole alguses vaja, kuid kui on olemas võib kaasa võtta.</p>
      </li>
    </ul>
  </div>
);
