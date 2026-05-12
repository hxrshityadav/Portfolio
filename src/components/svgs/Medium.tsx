import React from 'react';

export default function Medium(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 256 256"
      {...props}
    >
      <path d="M136,128A64,64,0,1,1,72,64,64.07,64.07,0,0,1,136,128Zm64,0c0,35.35-14.33,64-32,64s-32-28.65-32-64,14.33-64,32-64S200,92.65,200,128Zm48,0c0,31.81-4.3,57.6-9.6,57.6S228.8,159.81,228.8,128s4.3-57.6,9.6-57.6S248,96.19,248,128Z" />
    </svg>
  );
}
