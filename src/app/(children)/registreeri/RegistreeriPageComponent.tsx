"use client";

import { useState } from "react";

import { SignUpFormAdult, SignUpFormUnderage } from "@/components";
import { cn } from "@/lib";

type SignUpType = "underage" | "adult";

const signUpTypeOptions: { value: SignUpType; label: string }[] = [
  { value: "underage", label: "Laps (7–19 a)" },
  { value: "adult", label: "Täiskasvanu" },
];

export const RegistreeriPageComponent = () => {
  const [signUpType, setSignUpType] = useState<SignUpType>("underage");

  return (
    <div className="flex flex-col items-center gap-6 pb-12">
      <div className="flex flex-col items-center gap-3">
        <p className="text-2xl font-bold">Registreeri trenni</p>
        <div className="max-w-[40rem] space-y-1 text-center text-stone-600">
          <p>Vali allpool, kelle andmeid registreerid.</p>
          <p>
            <span className="font-semibold">Laps (7–19 aastat)</span> – vorm on mõeldud täitmiseks
            lapsevanemale.
          </p>
          <p>
            <span className="font-semibold">Täiskasvanu</span> – vorm on mõeldud täitmiseks trenni
            tulijale endale.
          </p>
        </div>
        <div role="tablist" className="flex flex-row gap-1 p-1 bg-white rounded-xl">
          {signUpTypeOptions.map(option => (
            <button
              key={option.value}
              type="button"
              role="tab"
              aria-selected={signUpType === option.value}
              onClick={() => setSignUpType(option.value)}
              className={cn(
                "px-5 py-2 text-lg font-semibold rounded-lg transition-colors",
                signUpType === option.value
                  ? "bg-orange-400 text-white"
                  : "text-stone-600 hover:bg-stone-100",
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full">
        {signUpType === "underage" ? <SignUpFormUnderage /> : <SignUpFormAdult />}
      </div>
    </div>
  );
};
