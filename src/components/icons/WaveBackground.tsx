import Image from "next/image";

import { cn } from "@/lib";

export const WaveBackground = () => (
  <div className="absolute bottom-0 left-0 w-full bg-center bg-no-repeat bg-cover bg-waves">
    <Image
      width={50000}
      height={5000}
      alt="waves"
      src="/general/waves.svg"
      priority
      className={cn("waves-aspect")}
    />
  </div>
);
