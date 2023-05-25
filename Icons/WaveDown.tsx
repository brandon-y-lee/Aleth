import * as React from 'react';
import { SVGProps } from 'react';
const SvgWaveDown = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1440 320"
    width="100%"
    height="100%"
    {...props}
  >
    <path
      fill="#001"
      d="m0 224 60-32c60-32 180-96 300-128s240-32 360-10.7c120 21.7 240 63.7 360 64 120-.3 240-42.3 300-64l60-21.3V0H0Z"
    />
  </svg>
);
export default SvgWaveDown;
