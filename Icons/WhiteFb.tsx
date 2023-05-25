import * as React from 'react';
import { SVGProps } from 'react';
const SvgWhiteFb = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M13.635 20.727v-7.961h2.723l.409-3.104h-3.132v-1.98c0-.899.253-1.511 1.568-1.511h1.674V3.393a23.142 23.142 0 0 0-2.44-.121c-2.415 0-4.07 1.446-4.07 4.1v2.29h-2.73v3.103h2.73v7.961h3.268Z"
      clipRule="evenodd"
    />
    <mask
      id="white-fb_svg__a"
      width={10}
      height={18}
      x={7}
      y={3}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'luminance',
      }}
    >
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M13.635 20.727v-7.961h2.723l.409-3.104h-3.132v-1.98c0-.899.253-1.511 1.568-1.511h1.674V3.393a23.142 23.142 0 0 0-2.44-.121c-2.415 0-4.07 1.446-4.07 4.1v2.29h-2.73v3.103h2.73v7.961h3.268Z"
        clipRule="evenodd"
      />
    </mask>
  </svg>
);
export default SvgWhiteFb;
