import { NavbarTopLink } from "components";
import { definedRoutes } from "routes";

import { Logo } from "..";

export const NavbarTop = () => {
  return (
    <div className="flex justify-between">
      <div className="flex flex-row items-center space-x-4">
        <Logo />
        <div>
          <div>nüke</div>
          <div>karate-do klubi</div>
        </div>
      </div>
      <div className="flex flex-row space-x-4 items-center font-normal">
        <NavbarTopLink to={definedRoutes.home}>kodu</NavbarTopLink>
        <NavbarTopLink to={definedRoutes.newcomer}>uustulnukale</NavbarTopLink>
        <NavbarTopLink to={definedRoutes.aboutClub}>klubist</NavbarTopLink>
        <NavbarTopLink to={definedRoutes.karateka}>karateka</NavbarTopLink>
        <NavbarTopLink to={definedRoutes.contact}>kontakt</NavbarTopLink>
        <button className="bg-primary py-1 px-3 rounded-3xl">
          <p className="text-white">logi sisse</p>
        </button>
      </div>
    </div>
  );
};
