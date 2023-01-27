import { Calendar, DefaultPageWrapper, LoginModal, RegisterModal } from "components";
import { useUser } from "hooks";

export const KaratekaPage = () => {
  const { data: user } = useUser();
  return (
    <DefaultPageWrapper>
      <div className="px-4 mb-10 2xl:px-[20%]">
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
    </DefaultPageWrapper>
  );
};
