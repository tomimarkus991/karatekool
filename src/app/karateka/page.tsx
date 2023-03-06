"use client";

import { Calendar, DefaultPageWrapper, LoginModal, RegisterModal } from "@/components";
import { useUser } from "@/hooks";

export default function Page() {
  const { data: user } = useUser();
  return (
    <DefaultPageWrapper>
      <div className="flex flex-col max-w-5xl mx-auto">
        <div className="px-6 mb-10 md:px-0">
          <h1 className="mb-3 text-xl font-semibold">Õppematerjalid</h1>
          {user ? (
            <p className="mb-2 text-lg font-light">Praegu õppematerjale pole</p>
          ) : (
            <>
              <p className="mb-2 text-lg font-light">
                Õppematerjalide nägemiseks palun logi sisse või loo kasutaja.
              </p>
              <div className="flex flex-row mb-4 space-x-5">
                <LoginModal />
                <RegisterModal />
              </div>
            </>
          )}
        </div>
        <Calendar />
      </div>
    </DefaultPageWrapper>
  );
}
