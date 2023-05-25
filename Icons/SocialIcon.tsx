import * as React from 'react';
import { SVGProps } from 'react';
const SvgSocialIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    fill="none"
    viewBox="0 0 148 148"
    {...props}
  >
    <g filter="url(#social-icon_svg__a)">
      <circle cx={74} cy={74} r={24} fill="url(#social-icon_svg__b)" />
    </g>
    <path
      fill="#000"
      d="M83 64H65a1 1 0 0 0-1 1v18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V65a1 1 0 0 0-1-1ZM70 82h-4v-4h4v4Zm0-6h-4v-4h4v4Zm0-6h-4v-4h4v4Zm6 12h-4v-4h4v4Zm0-6h-4v-4h4v4Zm0-6h-4v-4h4v4Zm6 12h-4v-4h4v4Zm0-6h-4v-4h4v4Zm0-6h-4v-4h4v4Z"
    />
    <defs>
      <linearGradient
        id="social-icon_svg__b"
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
        id="social-icon_svg__a"
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
          result="effect1_dropShadow_328_3166"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_328_3166"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
export default SvgSocialIcon;
