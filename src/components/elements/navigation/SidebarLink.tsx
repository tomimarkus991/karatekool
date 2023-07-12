import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HTMLProps, ReactNode } from "react";

import { AnimationWrapper, animations } from "@/components";
import { useSidebar } from "@/context";
import { cn } from "@/lib";

interface SidebarItemProps {
  icon: ReactNode;
  children?: string;
  href?: any;
}

interface ContentProps {
  icon: ReactNode;
  isActive?: boolean;
  children?: string;
}

type Props = SidebarItemProps & HTMLProps<HTMLDivElement>;

const Content = ({ children, icon, isActive }: ContentProps) => (
  <motion.div
    whileHover="whileHover"
    whileTap="whileTap"
    className={cn("group flex cursor-pointer rounded-md py-1 px-5", isActive && "bg-primary")}
  >
    <AnimationWrapper
      variants={animations.smallScale}
      key="sidebar-link"
      child
      className={cn("fill-text-primary flex justify-between flex-1")}
    >
      <div className="flex items-center">
        {icon}
        <div className="flex flex-row items-center justify-center text-center">
          <p className={cn("text-xl font-medium", isActive && "text-white")}>{children}</p>
        </div>
      </div>

      {/* {isActive && <div className="w-3 h-3 rounded-full bg-primary" />} */}
    </AnimationWrapper>
  </motion.div>
);

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
