import { Metadata } from "next";
import Image from "next/image";

import { MobileScroller, Scroller } from "../components/elements/home-page/Scrollers";
import { LetterDecryptor } from "../components/elements/LetterDecryptor";

// import { Footer } from "@/components/elements/navigation/Footer";
// import { NavbarTop } from "@/components/elements/navigation/NavbarTop";

// import { Sidebar } from "../components/elements/sidebar/Sidebar";

export const metadata: Metadata = {
  title: "Nüke Kodu",
  description: "Tere tulemast nüke kodulehele!",
};

export default function Page() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row mt-[10rem]">
        <div className="min-w-[30rem] self-center">
          <p className="mr-10 text-3xl font-semibold text-center">
            <LetterDecryptor>Tule õpi karated!</LetterDecryptor>
          </p>
        </div>
        <div className="animate-in slide-in-from-right">
          <Image
            width={1439}
            height={751}
            priority
            className="max-w-lg rounded-xl"
            alt="house"
            src="/general/home/parnu-front.png"
          />
        </div>
      </div>
      <div id="second" className="flex flex-row mt-[30rem]">
        <div className="animate-in slide-in-from-left">
          <Image
            width={1439}
            height={751}
            priority
            className="max-w-lg rounded-xl"
            alt="house"
            src="/general/home/big-group-janeda.png"
          />
        </div>
        <div className="min-w-[30rem] self-center">
          <p className="mr-10 text-3xl font-semibold text-center">
            <LetterDecryptor>Tule õpi karated!</LetterDecryptor>
          </p>
        </div>
      </div>
      <Scroller />
      <MobileScroller />
    </div>
  );
}
