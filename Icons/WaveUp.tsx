import * as React from 'react';
import { SVGProps } from 'react';
const SvgWaveUp = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1440 320"
    width="100%"
    height="100%"
    {...props}
  >
    <path d="M0 224h60c60 0 180 0 300 10.7C480 245 600 267 720 240c120-27 240-101 360-96s240 91 300 133.3l60 42.7H0Z" />
  </svg>
);
export default SvgWaveUp;
