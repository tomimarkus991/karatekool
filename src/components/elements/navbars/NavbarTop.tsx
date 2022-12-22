import { Logo } from "../Logo";

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
        <div>kodu</div>
        <div>uustulnukale</div>
        <div>klubist</div>
        <div>karateka</div>
        <div>kontakt</div>
        <button className="bg-primary py-1 px-3 rounded-3xl">
          <p className="text-white">logi sisse</p>
        </button>
      </div>
    </div>
  );
};
