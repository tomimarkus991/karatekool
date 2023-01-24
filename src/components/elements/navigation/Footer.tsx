import clsx from "clsx";

import { LogoWhite, WaveBackground } from "components";

export const Footer = () => {
  return (
    <div className="relative mt-12 waves-aspect">
      <div
        className={clsx(
          "absolute z-10 flex bottom-0 left-0 w-full h-full justify-center items-center"
        )}
      >
        <div
          className={clsx(
            "grow flex flex-row items-center justify-between space-x-4 text-white xs:px-10 mt-8",
            "max-w-3xl xl:max-w-6xl 2xl:max-w-7xl px-2 xs3:px-4"
          )}
        >
          <div className="flex flex-col items-center">
            <LogoWhite />
            <p className="mt-2 text-lg text-center text-white">Made with love by Redlotus</p>
            <p className="mt-6 text-xs text-center text-white">© 2023 nüke karate-do klubi</p>
          </div>

          <div className="space-y-2 text-base">
            <p className="text-white">(+372) 57 50 17 33</p>
            <p className="text-white">info@karatekool.ee</p>
            <p className="text-white">MTÜ Karate-do klubi Nüke</p>
            <p className="text-white">EE 2310 1022 0004 3840 13</p>
          </div>
        </div>
      </div>
      <WaveBackground />
    </div>
  );
};
