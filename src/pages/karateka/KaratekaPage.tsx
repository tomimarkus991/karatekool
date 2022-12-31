import { Calendar, DefaultPageWrapper, GlowButton } from "components";

export const KaratekaPage = () => {
  return (
    <DefaultPageWrapper>
      <h1>Õppematerjalid</h1>
      <p>Õppematerjalide nägemiseks palun logi sisse või loo kasutaja.</p>
      <GlowButton>logi sisse</GlowButton>
      <GlowButton variant="orange">loo kasutaja</GlowButton>
      <h1>Treeninggraafikud</h1>
      <Calendar />
    </DefaultPageWrapper>
  );
};
