import * as React from 'react';
import { SVGProps } from 'react';
const SvgLinkedinIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    fill="none"
    viewBox="0 0 30 30"
    {...props}
  >
    <path
      fill="#3AA06F"
      d="M27 0H3C1.35 0 0 1.35 0 3v24c0 1.65 1.35 3 3 3h24c1.65 0 3-1.35 3-3V3c0-1.65-1.35-3-3-3ZM9 25.5H4.5V12H9v13.5ZM6.75 9.45c-1.5 0-2.7-1.2-2.7-2.7 0-1.5 1.2-2.7 2.7-2.7 1.5 0 2.7 1.2 2.7 2.7 0 1.5-1.2 2.7-2.7 2.7ZM25.5 25.5H21v-7.95c0-1.2-1.05-2.25-2.25-2.25s-2.25 1.05-2.25 2.25v7.95H12V12h4.5v1.8c.75-1.2 2.4-2.1 3.75-2.1 2.85 0 5.25 2.4 5.25 5.25v8.55Z"
    />
  </svg>
);
export default SvgLinkedinIcon;
