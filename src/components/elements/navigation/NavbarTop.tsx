import { NavbarTopLink, Logo, LoginModal } from "@/components";
import { useUser } from "@/hooks";
import { definedRoutes } from "@/routes";

export const NavbarTop = () => {
  const routes = [
    [definedRoutes.home, "kodu"],
    [definedRoutes.newcomer, "uustulnukale"],
    [definedRoutes.aboutClub, "klubist"],
    [definedRoutes.karateka, "karateka"],
    [definedRoutes.contact, "kontakt"],
  ];

  const { data: user } = useUser();

  return (
    <div className="max-w-5xl pl-2 pr-4 m-auto mt-4 xl:max-w-6xl 2xl:max-w-7xl">
      <div className="flex justify-between">
        <div className="flex flex-row items-center space-x-1 lg:space-x-3">
          <Logo className="scale-[0.8] lg:scale-[0.9]" />
          <div className="font-semibold">
            <p className="md:text-2xl lg:text-3xl">nüke</p>
            <p className="md:text-base lg:text-lg">karate-do klubi</p>
          </div>
        </div>
        <div className="flex flex-row items-center gap-3 font-normal lg:gap-5">
          {routes.map(([to, label], index) => (
            <NavbarTopLink to={to} index={index}>
              {label}
            </NavbarTopLink>
          ))}
          {user ? (
            <>
              <img className="h-14 w-14" alt="user" src={`/avatars/${user?.avatar}`} />
            </>
          ) : (
            <>
              <div className="z-10 lg:hidden">
                <LoginModal />
              </div>
              <div className="z-10 max-lg:hidden lg:block">
                <LoginModal />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
