import React from "react";

export default function PesoSign({
  ...props
}: React.JSX.IntrinsicElements["svg"]) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.8184 4.04102V5.22266H3V4.04102H12.8184ZM12.8184 5.80273V6.98438H3V5.80273H12.8184ZM8.04883 9.02539H5.42773V7.84375H8.04883C8.63607 7.84375 9.10156 7.7417 9.44531 7.5376C9.79264 7.32992 10.0397 7.04883 10.1865 6.69434C10.3369 6.33626 10.4121 5.93164 10.4121 5.48047C10.4121 5.0293 10.3369 4.63184 10.1865 4.28809C10.0361 3.94076 9.78727 3.67041 9.43994 3.47705C9.09261 3.28011 8.62175 3.18164 8.02734 3.18164H5.68555V13H4.35352V2H8.02734C8.88672 2 9.58854 2.15397 10.1328 2.46191C10.6771 2.76628 11.0781 3.18164 11.3359 3.70801C11.5938 4.23079 11.7227 4.82161 11.7227 5.48047C11.7227 6.13932 11.5938 6.7373 11.3359 7.27441C11.0781 7.80794 10.6789 8.23405 10.1382 8.55273C9.59749 8.86784 8.90104 9.02539 8.04883 9.02539Z"
        fill="black"
      />
    </svg>
  );
}
