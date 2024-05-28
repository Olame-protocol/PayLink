import React, { ComponentProps } from "react";

function WalletIcon(props: ComponentProps<"svg">) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M1.813 3.72802L12.813 0.585016C13.1851 0.478671 13.5768 0.46016 13.9573 0.530942C14.3377 0.601723 14.6966 0.759864 15.0055 0.99291C15.3145 1.22596 15.5651 1.52755 15.7377 1.87393C15.9102 2.22031 16 2.60203 16 2.98902V4.00002C16.5304 4.00002 17.0391 4.21073 17.4142 4.5858C17.7893 4.96088 18 5.46958 18 6.00002V16C18 16.5304 17.7893 17.0392 17.4142 17.4142C17.0391 17.7893 16.5304 18 16 18H2C1.46957 18 0.960859 17.7893 0.585786 17.4142C0.210714 17.0392 0 16.5304 0 16V6.00002C0 4.95502 0.835 4.00702 1.813 3.72802ZM13.363 2.50802C13.4373 2.48684 13.5156 2.48318 13.5915 2.49733C13.6675 2.51148 13.7392 2.54305 13.8009 2.58956C13.8626 2.63607 13.9127 2.69626 13.9473 2.76539C13.9818 2.83453 13.9999 2.91073 14 2.98802V4.00002H8.14L13.363 2.50802ZM2 6.00002H16V16H2V6.00002Z"
        fill="#0E3A36"
      />
    </svg>
  );
}

export default WalletIcon;
