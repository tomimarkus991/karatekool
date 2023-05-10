"use client";

import { HiLogout } from "react-icons/hi";

import { AnimationWrapper, animations } from "../../components";
import { useSignOut } from "../../hooks";

export default function Page() {
  const { mutate: signOut } = useSignOut();
  return (
    <div className="flex justify-center items-center flex-col">
      <AnimationWrapper variants={animations.smallScale}>
        <button onClick={() => signOut()} className="flex flex-row items-center cursor-pointer">
          <HiLogout className="w-8 h-8 mr-3 fill-text-primary" />
          <p className="text-xl font-semibold">Logi välja</p>
        </button>
      </AnimationWrapper>
    </div>
  );
}
