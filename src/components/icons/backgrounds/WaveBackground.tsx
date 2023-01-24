import clsx from "clsx";

export const WaveBackground = () => (
  <img
    alt="waves"
    src="/general/waves.svg"
    className={clsx(
      "w-full absolute bottom-0 left-0 bg-center bg-no-repeat bg-cover bg-waves",
      "waves-aspect"
    )}
  />
);
