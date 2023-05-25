import * as React from 'react';
import { SVGProps } from 'react';
const SvgMsiteNavBtn = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    fill="none"
    viewBox="0 0 26 24"
    {...props}
  >
    <path fill="#fff" d="M0 0h26v4H0V0Zm0 10h26v4H0v-4Zm0 10h26v4H0v-4Z" />
  </svg>
);
export default SvgMsiteNavBtn;
