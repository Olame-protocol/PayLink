import React, { ComponentProps } from "react";

function LoadingSpinner(props: ComponentProps<"svg">) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="68" height="68" viewBox="0 0 68 68" fill="none">
      <circle cx="33.5" cy="33.5" r="32" transform="matrix(-0.36408 -0.931368 -0.931368 0.36408 77 53.4016)" stroke="url(#paint0_linear_2448_287)" stroke-width="3" />
      <defs>
        <linearGradient id="paint0_linear_2448_287" x1="33.5" y1="0" x2="33.5" y2="67" gradientUnits="userSpaceOnUse">
          <stop stop-color="#54616B" stop-opacity="0" />
          <stop offset="1" stop-color="#D9FC99" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default LoadingSpinner;
