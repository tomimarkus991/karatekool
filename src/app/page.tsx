import { Metadata } from "next";

// import { LetterDecryptor } from "../components/elements/LetterDecryptor";

// import { Footer } from "@/components/elements/navigation/Footer";
// import { NavbarTop } from "@/components/elements/navigation/NavbarTop";

// import { Sidebar } from "../components/elements/sidebar/Sidebar";

export const metadata: Metadata = {
  title: "Nüke Kodu",
  description: "Tere tulemast nüke kodulehele!",
};

export default function Page() {
  return (
    <div>
      <p className="text-3xl font-semibold text-center">
        {/* <LetterDecryptor>Coming soon</LetterDecryptor> */}
      </p>
    </div>
  );
}
