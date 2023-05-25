import * as React from 'react';
import { SVGProps } from 'react';
const SvgEmailIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    fill="none"
    viewBox="0 0 148 148"
    {...props}
  >
    <g filter="url(#email-icon_svg__a)">
      <circle cx={74} cy={74} r={24} fill="url(#email-icon_svg__b)" />
    </g>
    <path
      fill="#000"
      d="M82.21 70.82 76 64.78a2.83 2.83 0 0 0-3.9 0l-6.21 6a2.6 2.6 0 0 0-.89 1.93v8.58A2.75 2.75 0 0 0 67.78 84h12.44A2.75 2.75 0 0 0 83 81.29v-8.58a2.672 2.672 0 0 0-.79-1.89Zm-8.77-4.6a.83.83 0 0 1 1.12 0L80 71.5l-5.47 5.28a.83.83 0 0 1-1.12 0L68 71.5l5.44-5.28ZM81 81.29a.76.76 0 0 1-.78.71H67.78a.76.76 0 0 1-.78-.71v-7.94l4.05 3.9-1.66 1.6a1 1 0 0 0 0 1.41 1 1 0 0 0 .72.31 1 1 0 0 0 .69-.28l1.77-1.7a2.8 2.8 0 0 0 2.92 0l1.77 1.7a1 1 0 0 0 .69.28.999.999 0 0 0 .72-.31 1 1 0 0 0 0-1.41L77 77.25l4-3.9v7.94Z"
    />
    <defs>
      <linearGradient
        id="email-icon_svg__b"
        x1={49.2}
        x2={92.4}
        y1={34}
        y2={120.4}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0.327} stopColor="#C5FFC6" />
        <stop offset={0.927} stopColor="#04F90C" />
      </linearGradient>
      <filter
        id="email-icon_svg__a"
        width={148}
        height={148}
        x={0}
        y={0}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset />
        <feGaussianBlur stdDeviation={25} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 1 0 0 0 0 0.032258 0 0 0 1 0" />
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_328_3153"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_328_3153"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
export default SvgEmailIcon;
