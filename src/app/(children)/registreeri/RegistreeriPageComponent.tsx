"use client";

import { Tab } from "@headlessui/react";
import { useState } from "react";

import { SignUpFormAdult, SignUpFormUnderage, TwoElementMovingBox } from "@/components";
import { Icons } from "@/components/icons/Icons";
import { cn } from "@/lib";

import { ContactDojosTab } from "../kontakt/ContactUtils";

type SignUpType = "underage" | "adult";

const signUpTypeOptions: { value: SignUpType; label: string }[] = [
  { value: "underage", label: "Laps (7–19 a)" },
  { value: "adult", label: "Täiskasvanu" },
];

export const RegistreeriPageComponent = () => {
  const [signUpType, setSignUpType] = useState<SignUpType>("underage");
  const selectedIndex = signUpTypeOptions.findIndex(option => option.value === signUpType);

  return (
    <div className="flex flex-col items-center gap-6 pb-12">
      <div className="flex flex-col items-center w-full gap-3">
        <div className="flex flex-row items-center gap-2">
          <p className="mb-4 text-3xl font-bold">Tule karate trenni</p>
          <Icons.karateka className="w-12 h-12 mb-4" />
        </div>
        <Tab.Group
          selectedIndex={selectedIndex}
          onChange={index => setSignUpType(signUpTypeOptions[index].value)}
        >
          <Tab.List
            className={cn(
              "flex flex-row relative px-1 w-full bg-stone-100 rounded-xl max-w-md mx-auto",
              "shadow-lg ring-1 ring-stone-400 ring-opacity-5 mb-4",
            )}
          >
            {signUpTypeOptions.map((option, index) => (
              <ContactDojosTab key={option.value} selectedIndex={selectedIndex} index={index}>
                {option.label}
              </ContactDojosTab>
            ))}
            <TwoElementMovingBox selectedIndex={selectedIndex} />
          </Tab.List>
        </Tab.Group>
      </div>

      <div className="w-full">
        {signUpType === "underage" ? <SignUpFormUnderage /> : <SignUpFormAdult />}
      </div>
    </div>
  );
};
