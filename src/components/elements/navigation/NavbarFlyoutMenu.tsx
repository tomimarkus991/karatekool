"use client";

import { Popover, Transition } from "@headlessui/react";
import { usePathname } from "next/navigation";
import { Fragment, useRef } from "react";
import { HiChartPie, HiChevronDown } from "react-icons/hi";

import { cn } from "@/lib";

const solutions = [
  {
    name: "Klubist",
    description: "Get a better understanding of your traffic",
    href: "/klubist",
    icon: HiChartPie,
  },
  {
    name: "Karate-do",
    description: "Speak directly to your customers",
    href: "/karate-do",
    icon: HiChartPie,
  },
  {
    name: "Videod",
    description: "Your customers' data will be safe and secure",
    href: "/videod",
    icon: HiChartPie,
  },
  {
    name: "Pildid",
    description: "Connect with third-party tools",
    href: "/pildid",
    icon: HiChartPie,
  },
  {
    name: "Buklet",
    description: "Build strategic funnels that will convert",
    href: "/buklet",
    icon: HiChartPie,
  },
  {
    name: "Viimased sündmused",
    description: "Build strategic funnels that will convert",
    href: "/viimased-sündmused",
    icon: HiChartPie,
  },
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
        console.log(open);

        return (
          <>
            <div onMouseEnter={() => handleEnter(open)} onMouseLeave={() => handleLeave(open)}>
              <Popover.Button
                ref={triggerRef}
                className={cn(
                  pathname === href ? "text-primary" : "text-text-primary",
                  "relative flex group",
                  "lg:text-lg items-center py-3 font-semibold",
                  "transition ease-in-out duration-200 delay-150",
                  "group-hover:-translate-y-1 group-hover:scale-110 group-hover:text-primary group-hover:delay-[0ms]",
                  "group-active:translate-y-0 group-active:scale-100",
                  "focus:outline-none focus-visible:ring-0 focus-visible:ring-transparent",
                )}
              >
                Klubist
                <HiChevronDown className="w-5 h-5" aria-hidden="true" />
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
                  <div className="flex-auto w-screen max-w-md overflow-hidden text-sm leading-6 bg-white shadow-lg rounded-3xl ring-1 ring-gray-900/5 lg:max-w-3xl">
                    {/* <AnimationWrapper variants={animations.navigationMenu} custom={open ? 1 : -1}> */}
                    <div className="grid grid-cols-1 p-4 gap-x-6 gap-y-1 lg:grid-cols-2">
                      {solutions.map(item => (
                        <div
                          key={item.name}
                          className="relative flex p-4 rounded-lg group gap-x-6 hover:bg-gray-50"
                        >
                          <div className="flex items-center justify-center flex-none mt-1 rounded-lg h-11 w-11 bg-gray-50 group-hover:bg-white">
                            <item.icon
                              className="w-6 h-6 text-gray-600 duration-300 ease-in group-hover:text-secondary"
                              aria-hidden="true"
                            />
                          </div>
                          <div>
                            <a href={item.href} className="font-semibold text-gray-900">
                              {item.name}
                              <span className="absolute inset-0" />
                            </a>
                            <p className="mt-1 text-gray-600">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="px-8 py-6 bg-gray-50">
                      <div className="flex items-center gap-x-3">
                        <h3 className="text-sm font-semibold leading-6 text-gray-900">
                          Registreerimise info
                        </h3>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-gray-600">
                        Empower your entire team with even more advanced tools.
                      </p>
                    </div>
                    {/* </AnimationWrapper> */}
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
