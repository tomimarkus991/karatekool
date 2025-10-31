"use client";

import { Popover, Transition } from "@headlessui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useRef } from "react";
import { HiChevronDown, HiFilm, HiMap, HiUserGroup, HiLibrary } from "react-icons/hi";

import { cn } from "@/lib";

const routes = [
  {
    name: "Klubist",
    description: "Rohkem meie klubist",
    href: "/klubist",
    icon: HiUserGroup,
  },
  // {
  //   name: "Karate-do",
  //   description: "Rohkem karate-do kunstist",
  //   href: "/karate-do",
  //   icon: HiFire,
  // },
  {
    name: "Videod",
    description: "Videod meie trennidest",
    href: "/videod",
    icon: HiFilm,
  },
  {
    name: "Ajalugu",
    description: "Meie lühiajalugu",
    href: "/ajalugu",
    icon: HiLibrary,
  },
  // {
  //   name: "Pildid",
  //   description: "Vaata karateklubi Nüke pilte",
  //   href: "/pildid",
  //   icon: HiPhotograph,
  // },
  {
    name: "Buklet",
    description: "Vaata meie lahedat Bukletti",
    href: "/buklet",
    icon: HiMap,
  },
  // {
  //   name: "Viimased sündmused",
  //   description: "Millega meie karatekad tegelevad",
  //   href: "/last-events",
  //   icon: HiPaperClip,
  // },
];
interface Props {
  href: any;
  bg?: string;
  index?: number;
}

const timeoutDuration = 120;
export const NavbarFlyoutMenu = ({ href }: Props) => {
  const pathname = usePathname();
  const triggerRef: any = useRef();
  const timeOutRef: any = useRef();

  const handleEnter = (isOpen: boolean) => {
    clearTimeout(timeOutRef.current);
    !isOpen && triggerRef.current?.click();
  };

  const handleLeave = (isOpen: boolean) => {
    timeOutRef.current = setTimeout(() => {
      isOpen && triggerRef.current?.click();
    }, timeoutDuration);
  };

  return (
    <Popover className="relative">
      {({ open }) => {
        return (
          <>
            <div onMouseEnter={() => handleEnter(open)} onMouseLeave={() => handleLeave(open)}>
              <Popover.Button
                ref={triggerRef}
                className={cn(
                  pathname === href ? "text-primary" : "text-text-primary",
                  "relative flex group",
                  "lg:text-lg items-center py-3 font-semibold",
                  "transition ease-in-out duration-200",
                  "group-hover:-translate-y-1 group-hover:scale-110 group-hover:text-primary",
                  "group-active:translate-y-0 group-active:scale-100",
                  "focus:outline-none focus-visible:ring-0 focus-visible:ring-transparent",
                )}
              >
                Klubist
                <HiChevronDown
                  className={cn(
                    "w-5 h-5",
                    "ease-in-out transition duration-200",
                    open && "rotate-180 text-primary",
                  )}
                  aria-hidden="true"
                />
              </Popover.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute z-10 flex w-screen px-4 mt-5 -translate-x-1/2 left-1/2 max-w-max">
                  <div className="flex-auto w-screen max-w-md overflow-hidden text-sm leading-6 bg-white shadow-lg rounded-3xl ring-1 ring-gray-900/5 lg:max-w-md">
                    <div className="grid grid-cols-1 p-4 gap-x-6 gap-y-1 lg:grid-cols-1">
                      {routes.map(item => (
                        <div
                          key={item.name}
                          className="relative flex p-4 rounded-lg group gap-x-6 hover:bg-gray-50"
                        >
                          <div className="flex items-center justify-center flex-none mt-1 rounded-lg size-11 bg-gray-50 group-hover:bg-white">
                            <item.icon
                              className="text-gray-600 duration-300 ease-in size-6 group-hover:text-secondary"
                              aria-hidden="true"
                            />
                          </div>
                          <div>
                            <Link href={item.href as any} className="font-semibold text-gray-900">
                              {item.name}
                              <span className="absolute inset-0" />
                            </Link>
                            <p className="mt-1 text-gray-600">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </div>
          </>
        );
      }}
    </Popover>
  );
};
