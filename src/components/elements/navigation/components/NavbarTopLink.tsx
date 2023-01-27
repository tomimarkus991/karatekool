import { AnimationWrapper } from "@redlotus/ui";
import clsx from "clsx";
import { AnimatePresence, ForwardRefComponent, HTMLMotionProps, motion } from "framer-motion";
import { useState } from "react";
import { NavLink } from "react-router-dom";

interface SidebarItemProps {
  to: string;
  index: number;
  children?: string;
}

type Props = SidebarItemProps &
  Omit<ForwardRefComponent<HTMLDivElement, HTMLMotionProps<"div">>, "$$typeof">;

export const NavbarTopLink = ({ children, to, index, ...props }: Props) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <motion.div
      key={to}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      className="relative px-4 py-1 -mx-3 cursor-pointer group lg:px-6"
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
      <AnimationWrapper key={`ntl ${to}`} child>
        <NavLink to={to} end>
          {({ isActive }) => (
            <p
              className={clsx(
                isActive ? "text-primary" : "text-text-primary",
                "relative z-10 flex",
                "lg:text-lg items-center py-3 font-semibold",
                "transition ease-in-out duration-200 delay-150",
                "group-hover:-translate-y-1 group-hover:scale-110 group-hover:text-primary group-hover:delay-[0ms]",
                "group-active:translate-y-0 group-active:scale-100"
              )}
            >
              {children}
            </p>
          )}
        </NavLink>
      </AnimationWrapper>
    </motion.div>
  );
};
