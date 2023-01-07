import { Calendar, DefaultPageWrapper, GlowButton } from "components";

export const KaratekaPage = () => {
  return (
    <DefaultPageWrapper>
      <div className="px-4 mb-10 2xl:px-[15%]">
        <h1 className="mb-3 text-xl font-semibold font-catamaran">Õppematerjalid</h1>
        <p className="mb-2 text-lg font-light font-catamaran">
          Õppematerjalide nägemiseks palun logi sisse või loo kasutaja.
        </p>
        <div className="flex flex-row mb-4 space-x-5">
          <GlowButton>logi sisse</GlowButton>
          <GlowButton variant="orange">loo kasutaja</GlowButton>
        </div>
      </div>
      <Calendar />
    </DefaultPageWrapper>
  );
};
