"use client";

import { GoogleSignInButton } from "@/components";

export default function Page() {
  return (
    <div className="max-w-[25rem] m-auto">
      <div className="flex flex-col items-center p-6 space-y-4 bg-white rounded-xl">
        <h1 className="text-xl font-semibold">Logi sisse</h1>
        <GoogleSignInButton />
      </div>
    </div>
  );
}
