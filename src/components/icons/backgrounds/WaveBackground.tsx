import clsx from "clsx";
import Image from "next/image";

export const WaveBackground = () => (
  <Image
    width="0"
    height="0"
    alt="waves"
    src="/general/waves.svg"
    className={clsx(
      "w-full absolute bottom-0 left-0 bg-center bg-no-repeat bg-cover bg-waves",
      "waves-aspect"
    )}
  />
);
