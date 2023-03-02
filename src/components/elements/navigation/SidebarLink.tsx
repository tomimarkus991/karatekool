import clsx from "clsx";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HTMLProps, ReactNode } from "react";

import { AnimationWrapper, animations } from "@/components";
import { useSidebar } from "@/context";

interface SidebarItemProps {
  icon: ReactNode;
  children?: string;
  href?: string;
}

interface ContentProps {
  icon: ReactNode;
  isActive?: boolean;
  children?: string;
}

type Props = SidebarItemProps & HTMLProps<HTMLDivElement>;

const Content = ({ children, icon, isActive }: ContentProps) => {
  return (
    <motion.div
      whileHover="whileHover"
      whileTap="whileTap"
      className={clsx(
        isActive ? "bg-red-600 hover:bg-red-700" : "hover:bg-red-600",
        "group flex cursor-pointer items-center rounded-md py-3 px-5"
      )}
    >
      <AnimationWrapper
        variants={animations.smallScale}
        key="sidebar-link"
        child
        className={clsx(
          isActive ? "fill-white" : "fill-text-primary group-hover:fill-white",
          "flex items-center"
        )}
      >
        {icon}
        <div className="flex flex-row items-center">
          <p
            className={clsx("text-xl font-medium group-hover:text-white", isActive && "text-white")}
          >
            {children}
          </p>
        </div>
      </AnimationWrapper>
    </motion.div>
  );
};

export const SidebarLink = ({ children, href, icon, ...props }: Props) => {
  const { setSidebarState, sidebarState } = useSidebar();
  const pathname = usePathname();
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => {
        if (sidebarState === "mobile") {
          setSidebarState("closed");
        }
      }}
      {...props}
    >
      {href ? (
        <Link href={href}>
          {/* @todo :: fix this */}
          <Content icon={icon} isActive={pathname === href ? true : false}>
            {children}
          </Content>
        </Link>
      ) : (
        <Content icon={icon}>{children}</Content>
      )}
    </div>
  );
};
