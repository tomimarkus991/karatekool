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
      className={clsx("group flex cursor-pointer rounded-md py-3 px-5", isActive && "bg-primary")}
    >
      <AnimationWrapper
        variants={animations.smallScale}
        key="sidebar-link"
        child
        className={clsx("fill-text-primary flex justify-between flex-1")}
      >
        <div className="flex items-center">
          {icon}
          <div className="flex flex-row items-center text-center justify-center">
            <p className={clsx("text-xl font-medium", isActive && "text-white")}>{children}</p>
          </div>
        </div>

        {/* {isActive && <div className="w-3 h-3 bg-primary rounded-full" />} */}
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
