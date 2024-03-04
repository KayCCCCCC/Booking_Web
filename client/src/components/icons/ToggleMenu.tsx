import React from "react";

const ToggleMenu: React.FC = () => {
  return (
    <div className="rounded-full border-[1.5px] p-[2px] border-collapse border-gray-500 last:">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
      >
        <g clip-path="url(#clip0_184_16340)">
          <path
            d="M3.5 18H21.5V16H3.5V18ZM3.5 13H21.5V11H3.5V13ZM3.5 6V8H21.5V6H3.5Z"
            fill="#7d8caf"
          />
        </g>
        <defs>
          <clipPath id="clip0_184_16340">
            <rect
              width="24"
              height="24"
              fill="white"
              transform="translate(0.5)"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default ToggleMenu;
