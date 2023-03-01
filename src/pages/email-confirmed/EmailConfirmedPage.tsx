import clsx from "clsx";

import { DefaultPageWrapper, LoginModal } from "@/components";

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
              <LoginModal />
            </div>
          </div>
        </div>
      </div>
    </DefaultPageWrapper>
  );
};
