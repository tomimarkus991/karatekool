import { Calendar, DefaultPageWrapper, GlowButton } from "components";

export const KaratekaPage = () => {
  return (
    <DefaultPageWrapper>
      <div className="px-4 mb-10">
        <h1 className="font-semibold text-xl font-catamaran mb-3">Õppematerjalid</h1>
        <p className="font-light text-lg font-catamaran mb-2">
          Õppematerjalide nägemiseks palun logi sisse või loo kasutaja.
        </p>
        <div className="flex flex-row space-x-5 mb-4">
          <GlowButton>logi sisse</GlowButton>
          <GlowButton variant="orange">loo kasutaja</GlowButton>
        </div>
      </div>
      <Calendar />
    </DefaultPageWrapper>
  );
};
