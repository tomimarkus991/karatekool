"use client";

import { ContactDojos } from "./ContactDojos";
import { ContactHeading } from "./ContactUtils";

export const KontaktPageComponent = () => {
  return (
    <>
      <div className="mb-4 md:hidden">
        <ContactHeading>Kontakt</ContactHeading>
        <div className="space-y-2 text-[0.9rem]">
          <p>(+372) 57 50 17 33</p>
          <p>info@karatekool.ee</p>
          <p>MTÜ Karate-do klubi Nüke</p>
          <p>EE 2310 1022 0004 3840 13</p>
        </div>
      </div>
      <ContactDojos />
    </>
  );
};
