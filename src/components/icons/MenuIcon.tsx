import { SVGProps } from "react";

export const MenuIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={44} height={32} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <line x1="3" y1="3" x2="41" y2="3" stroke="#393939" strokeWidth="6" strokeLinecap="round" />
    <line x1="3" y1="16" x2="41" y2="16" stroke="#393939" strokeWidth="6" strokeLinecap="round" />
    <line x1="3" y1="29" x2="41" y2="29" stroke="#393939" strokeWidth="6" strokeLinecap="round" />
  </svg>
);
