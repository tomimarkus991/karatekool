"use client";

import Link from "next/link";

import { Calendar, LoginModal, RegisterModal } from "@/components";
import { useUser } from "@/hooks";

export default function Page() {
  const { data: user } = useUser();

  return (
    <div className="flex flex-col max-w-5xl mx-auto">
      <div className="px-0 mb-10">
        <h1 className="mb-3 text-xl font-semibold">Õppematerjalid</h1>
        {user ? (
          <p className="mb-2 text-lg font-light">Praegu õppematerjale pole</p>
        ) : (
          <div>
            <p className="mb-2 text-lg font-light">
              Õppematerjalide nägemiseks palun logi sisse või loo kasutaja.
            </p>
            <div className="flex flex-row mb-4 space-x-5">
              <LoginModal />
              <RegisterModal />
            </div>
          </div>
        )}
      </div>
      {user?.role === "admin" && (
        <Link href="loo-trenn">
          <p className="text-lg font-semibold">Loo trenn</p>
        </Link>
      )}
      <Calendar />
    </div>
  );
}
