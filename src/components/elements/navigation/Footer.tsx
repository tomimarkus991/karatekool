import { animations, AnimationWrapper } from "@redlotus/ui";
import clsx from "clsx";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";

import { LogoWhite, WaveBackground } from "@/components";
import { definedRoutes } from "@/routes";

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
            "grow flex flex-row items-center justify-center sm:justify-between space-x-4 text-white xs:px-10 mt-8",
            "max-w-3xl xl:max-w-6xl 2xl:max-w-7xl px-2 xs3:px-4"
          )}
        >
          <div className="flex flex-col items-center">
            <LogoWhite />
            <p className="mt-2 text-sm text-center text-white">© 2023 nüke karate-do klubi</p>
            <Link className="sm:hidden" to={definedRoutes.contact}>
              <p className="mt-3 text-lg text-center text-white">Kontakt</p>
            </Link>
            <div className="flex flex-row items-center justify-center mt-5 space-x-2">
              <Link to="https://www.instagram.com/karatekoolnyke/">
                <AnimationWrapper variants={animations.smallScale}>
                  <FaInstagram className="w-[32px] h-[32px]" />
                </AnimationWrapper>
              </Link>
              <Link to="https://www.facebook.com/karatekool/">
                <AnimationWrapper variants={animations.smallScale}>
                  <FaFacebook className="w-8 h-8" />
                </AnimationWrapper>
              </Link>
            </div>
          </div>

          <div className="hidden space-y-2 text-base sm:block">
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
