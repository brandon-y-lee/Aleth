import * as React from 'react';
import { SVGProps } from 'react';
const SvgPhoneIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    fill="none"
    viewBox="0 0 148 148"
    {...props}
  >
    <g filter="url(#phone-icon_svg__a)">
      <circle cx={74} cy={74} r={24} fill="url(#phone-icon_svg__b)" />
    </g>
    <path
      fill="#000"
      d="M81.41 75c-.22 0-.45-.07-.67-.12-.445-.1-.883-.23-1.31-.39a2 2 0 0 0-2.48 1l-.22.46a13.17 13.17 0 0 1-2.67-2 13.167 13.167 0 0 1-2-2.67l.46-.21a2 2 0 0 0 1-2.48c-.159-.431-.289-.872-.39-1.32-.05-.22-.09-.45-.12-.67a3 3 0 0 0-3-2.49H67a2.998 2.998 0 0 0-2.24 1 3 3 0 0 0-.73 2.4 19.07 19.07 0 0 0 5.41 11 19.07 19.07 0 0 0 11 5.41c.13.01.26.01.39 0a3 3 0 0 0 2.74-1.773c.172-.386.26-.804.26-1.227v-3A3 3 0 0 0 81.41 75Zm.49 6a1.002 1.002 0 0 1-1.15.99 17.16 17.16 0 0 1-9.87-4.84 17.16 17.16 0 0 1-4.88-9.9 1 1 0 0 1 .59-1.065A1 1 0 0 1 67 66.1h3a1 1 0 0 1 1 .78c0 .27.09.55.15.82.116.524.27 1.039.46 1.54l-1.4.66a1 1 0 0 0-.52.56 1 1 0 0 0 0 .76 14.49 14.49 0 0 0 7 7 1 1 0 0 0 .76 0 1 1 0 0 0 .56-.52l.63-1.4a12.41 12.41 0 0 0 2.39.61 1 1 0 0 1 .78 1L81.9 81ZM76 64h-.7a1.003 1.003 0 1 0 .17 2H76a6 6 0 0 1 6 6v.53a1 1 0 0 0 .91 1.08h.08a1 1 0 0 0 1-.91V72A8 8 0 0 0 76 64Zm2 8a1 1 0 1 0 2 0 4 4 0 0 0-4-4 1 1 0 0 0 0 2 2 2 0 0 1 2 2Z"
    />
    <defs>
      <linearGradient
        id="phone-icon_svg__b"
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
        id="phone-icon_svg__a"
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
          result="effect1_dropShadow_328_3160"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_328_3160"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
export default SvgPhoneIcon;
