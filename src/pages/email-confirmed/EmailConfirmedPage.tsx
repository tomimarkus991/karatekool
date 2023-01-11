import clsx from "clsx";
import { Link } from "react-router-dom";

import { DefaultPageWrapper, GlowButton } from "components";
import { definedRoutes } from "routes";

export const EmailConfirmedPage = () => {
  return (
    <DefaultPageWrapper>
      <div className="max-w-[25rem] m-auto">
        <div className="p-6 bg-white rounded-xl">
          <div className="pl-3">
            <p className="text-xl font-bold text-center">Email on kinnitatud</p>
          </div>
          <div className={clsx("flex items-center flex-col py-2 px-3")}>
            <div className="w-full m-auto mt-3 space-y-2 max-w-fit">
              <Link to={definedRoutes.login}>
                <GlowButton className="w-[7rem]">logi sisse</GlowButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DefaultPageWrapper>
  );
};
