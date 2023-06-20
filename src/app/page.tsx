import { Metadata } from "next";
import { BsChevronCompactDown } from "react-icons/bs";

import { LetterDecryptor } from "../components/elements/LetterDecryptor";
import { cn } from "../lib";

// import { Footer } from "@/components/elements/navigation/Footer";
// import { NavbarTop } from "@/components/elements/navigation/NavbarTop";

// import { Sidebar } from "../components/elements/sidebar/Sidebar";

export const metadata: Metadata = {
  title: "Nüke Kodu",
  description: "Tere tulemast nüke kodulehele!",
};

export default function Page() {
  return (
    <div className="relative flex items-center justify-center">
      <p className="text-3xl font-semibold text-center">
        <LetterDecryptor>Coming soon</LetterDecryptor>
      </p>
      <div
        className={cn(
          "border-2 rounded-2xl w-6 h-11 fixed bottom-[30%] z-50 border-stone-800",
          "before:h-2 before:w-1 before:bg-stone-800 before:rounded-sm before:absolute before:top-1 before:left-[43%]",
          "before:animate-scrollwheel-move-down before:ease-out before:delay-300",
          "hidden md:block"
        )}
      />
      <BsChevronCompactDown
        className={cn(
          "fixed z-50 w-20 h-20 md:hidden bottom-[30%] border-stone-700 rounded-2xl",
          "animate-mobile-move-down ease-in-out"
        )}
      />
    </div>
  );
}
