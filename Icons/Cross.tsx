import * as React from 'react';
import { SVGProps } from 'react';
const SvgCross = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    fill="none"
    viewBox="0 0 32 32"
    {...props}
  >
    <path
      fill="#fff"
      d="M18.828 16 31.414 3.415A2 2 0 0 0 28.585.586L16 13.172 3.415.586a2 2 0 1 0-2.829 2.83L13.172 16 .586 28.585a2 2 0 1 0 2.83 2.83L16 18.827l12.585 12.586a2 2 0 0 0 2.83-2.829L18.827 16Z"
    />
  </svg>
);
export default SvgCross;
