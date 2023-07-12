"use client";

import { AnimatePresence, ForwardRefComponent, HTMLMotionProps, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { AnimationWrapper } from "@/components";
import { cn } from "@/lib";

interface SidebarItemProps {
  href: any;
  index: number;
  children?: string;
}

type Props = SidebarItemProps &
  Omit<ForwardRefComponent<HTMLDivElement, HTMLMotionProps<"div">>, "$$typeof">;

export const NavbarTopLink = ({ children, href, index, ...props }: Props) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const pathname = usePathname();

  return (
    <motion.div
      key={href}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      className="relative px-4 py-1 -mx-3 cursor-pointer group xl:px-6"
      {...props}
    >
      <AnimatePresence>
        {hoveredIndex === index && (
          <motion.span
            className="absolute inset-0 bg-[#f0f2f4] rounded-xl"
            layoutId="hoverBackground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.15 } }}
            exit={{
              opacity: 0,
              transition: { duration: 0.15, delay: 0.15 },
            }}
          />
        )}
      </AnimatePresence>
      <AnimationWrapper key={`ntl ${href}`} child>
        <Link href={href}>
          <p
            // @todo :: fix this
            className={cn(
              pathname === href ? "text-primary" : "text-text-primary",
              "relative z-10 flex",
              "lg:text-lg items-center py-3 font-semibold",
              "transition ease-in-out duration-200 delay-150",
              "group-hover:-translate-y-1 group-hover:scale-110 group-hover:text-primary group-hover:delay-[0ms]",
              "group-active:translate-y-0 group-active:scale-100",
            )}
          >
            {children}
          </p>
        </Link>
      </AnimationWrapper>
    </motion.div>
  );
};
