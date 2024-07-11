import React, { ComponentProps } from "react";

const CheckIcon = (props: ComponentProps<"svg">) => {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
      <g clipPath="url(#clip0_2366_68)">
        <path
          d="M24.9994 4.16663C13.4993 4.16663 4.16602 13.5 4.16602 25C4.16602 36.5 13.4993 45.8333 24.9994 45.8333C36.4994 45.8333 45.8327 36.5 45.8327 25C45.8327 13.5 36.4994 4.16663 24.9994 4.16663ZM19.3535 33.9375L11.8743 26.4583C11.0618 25.6458 11.0618 24.3333 11.8743 23.5208C12.6868 22.7083 13.9993 22.7083 14.8118 23.5208L20.8327 29.5208L35.166 15.1875C35.9785 14.375 37.291 14.375 38.1035 15.1875C38.916 16 38.916 17.3125 38.1035 18.125L22.291 33.9375C21.4993 34.75 20.166 34.75 19.3535 33.9375Z"
          fill="#C4FF80"
        />
      </g>
      <defs>
        <clipPath id="clip0_2366_68">
          <rect width="50" height="50" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default CheckIcon;
