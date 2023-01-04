import clsx from "clsx";
import { HTMLProps } from "react";
import { NavLink } from "react-router-dom";

interface SidebarItemProps {
  children?: string;
  to?: string;
}

interface ContentProps {
  isActive?: boolean;
  children?: string;
}

type Props = SidebarItemProps & HTMLProps<HTMLDivElement>;

const Content = ({ children, isActive }: ContentProps) => {
  return (
    <div
      className={clsx(
        isActive ? "text-primary" : "text-text-primary",
        "group flex cursor-pointer lg:text-lg items-center rounded-md py-3 font-catamaran font-semibold",
        "transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-200 hover:text-primary"
      )}
    >
      {children}
    </div>
  );
};

export const NavbarTopLink = ({ children, to, ...props }: Props) => {
  return (
    <div role="button" tabIndex={0} {...props}>
      {to ? (
        <NavLink to={to} end>
          {({ isActive }) => <Content isActive={isActive}>{children}</Content>}
        </NavLink>
      ) : (
        <Content>{children}</Content>
      )}
    </div>
  );
};
