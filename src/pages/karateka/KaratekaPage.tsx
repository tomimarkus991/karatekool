import { useIsMobile } from "@redlotus/ui";
import { Link } from "react-router-dom";

import { Calendar, DefaultPageWrapper, GlowButton, LoginModal, RegisterModal } from "components";
import { definedRoutes } from "routes";

export const KaratekaPage = () => {
  const { isMobile } = useIsMobile();
  return (
    <DefaultPageWrapper>
      <div className="px-4 mb-10 2xl:px-[20%]">
        <h1 className="mb-3 text-xl font-semibold font-catamaran">Õppematerjalid</h1>
        <p className="mb-2 text-lg font-light font-catamaran">
          Õppematerjalide nägemiseks palun logi sisse või loo kasutaja.
        </p>
        <div className="flex flex-row mb-4 space-x-5">
          {isMobile ? (
            <>
              <Link to={definedRoutes.login}>
                <GlowButton>logi sisse</GlowButton>
              </Link>
              <Link to={definedRoutes.register}>
                <GlowButton variant="orange">loo kasutaja</GlowButton>
              </Link>
            </>
          ) : (
            <>
              <LoginModal />
              <RegisterModal />
            </>
          )}
        </div>
      </div>
      <Calendar />
    </DefaultPageWrapper>
  );
};
