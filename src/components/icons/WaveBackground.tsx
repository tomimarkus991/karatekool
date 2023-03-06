import clsx from "clsx";
import Image from "next/image";

export const WaveBackground = () => (
  <div className="absolute bottom-0 left-0 w-full bg-center bg-no-repeat bg-cover bg-waves">
    <Image
      width={50000}
      height={5000}
      alt="waves"
      src="/general/waves.svg"
      // src="./waves.svg"
      className={clsx("waves-aspect")}
    />
  </div>
);
