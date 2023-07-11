"use client";

import { toast } from "react-hot-toast";

import { Calendar, LoginModal, RegisterModal } from "@/components";
import { useGetMaterials, useUser } from "@/hooks";

import { useSupabase } from "../../context";

export default function Page() {
  const { data: user } = useUser();
  const { data: materials } = useGetMaterials();
  const { supabase } = useSupabase();

  return (
    <div className="flex flex-col max-w-5xl mx-auto">
      <div className="px-0 mb-10">
        <h1 className="mb-3 text-xl font-semibold">Õppematerjalid</h1>
        {user ? (
          <>
            {materials?.map((material) => {
              return (
                <button
                  key={material.id}
                  onClick={async () => {
                    const { data, error } = await supabase.storage
                      .from("materials")
                      .download(material.name);

                    if (error) {
                      toast.error(`Faili allalaadmise viga: ${error.message}`);
                      return;
                    }
                    const url = URL.createObjectURL(data);
                    const link = document.createElement("a");
                    link.href = url;
                    link.setAttribute("download", material.name);
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                  }}
                >
                  <p>{material.name}</p>
                </button>
              );
            })}
          </>
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
    </div>
  );
}
