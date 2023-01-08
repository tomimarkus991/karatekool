import { SVGProps } from "react";

export const Logo = (props: SVGProps<SVGSVGElement>) => (
  <svg width={80} height={80} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx={11.322} cy={22.893} r={5.702} fill="#0B0B0B" />
    <circle cx={68.512} cy={22.893} r={5.702} fill="#0B0B0B" />
    <circle cx={40.083} cy={73.471} r={5.702} fill="#0B0B0B" />
    <circle cx={40} cy={40} r={38} stroke="#0B0B0B" strokeWidth={4} />
    <g className="animate-spin-slow origin-center">
      <path
        d="M61.847 27.73c6.434 10.75-.033 26.77-9.956 33.162-.236.153-.494-.123-.346-.364 5.642-9.143 4.84-14.345 3.156-18.38a10.222 10.222 0 0 1-6.74-.802c-5.114-2.502-7.236-8.693-4.74-13.827 2.496-5.133 8.666-7.267 13.78-4.764a10.274 10.274 0 0 1 4.846 4.976Z"
        fill="url(#a)"
      />
      <path
        d="M48.065 45.526c-3.58-3.212-9.035-3.59-13.044-.631a10.22 10.22 0 0 0-3.823 5.608c-4.356-.37-9.341-2.06-14.846-11.286a.311.311 0 0 0-.03-.042c-.159-.188-.477-.082-.453.18.953 10.284 9.664 21.625 20.206 23.801 1.506.311 3.049.435 4.612.342a10.274 10.274 0 0 0 6.651-2c4.582-3.381 5.538-9.84 2.137-14.424a10.42 10.42 0 0 0-1.41-1.548Z"
        fill="url(#b)"
      />
      <path
        d="M19.316 26.927c6.093-10.948 23.2-13.356 33.697-7.96.25.129.14.49-.143.482a46.416 46.416 0 0 0-1.937-.017c-9.309.116-13.071 3.216-15.558 6.475a10.226 10.226 0 0 1 2.675 6.237c.39 5.68-3.91 10.614-9.604 11.019-5.694.405-10.627-3.871-11.017-9.552a10.274 10.274 0 0 1 1.887-6.684Z"
        fill="url(#c)"
      />
    </g>
    <defs>
      <radialGradient
        id="a"
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="matrix(10.66077 12.1665 -10.9174 9.56625 53.025 39.312)"
      >
        <stop offset={0.052} stopColor="#F12324" />
        <stop offset={0.302} stopColor="#FF0001" />
        <stop offset={1} stopColor="#C72425" />
      </radialGradient>
      <radialGradient
        id="b"
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="matrix(17.07805 7.58233 -5.0909 11.46647 33.25 50.052)"
      >
        <stop offset={0.052} stopColor="#F12324" />
        <stop offset={0.302} stopColor="#FF0001" />
        <stop offset={1} stopColor="#C72425" />
      </radialGradient>
      <radialGradient
        id="c"
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="matrix(17.12754 8.3709 -5.97846 12.2324 34.837 28.311)"
      >
        <stop offset={0.052} stopColor="#F12324" />
        <stop offset={0.302} stopColor="#FF0001" />
        <stop offset={1} stopColor="#C72425" />
      </radialGradient>
    </defs>
  </svg>
);
