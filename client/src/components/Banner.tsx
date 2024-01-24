import { useState } from "react";

const images: { id: number; url: string }[] = [
  {
    id: 1,
    url: "./pexels-andrei-tanase-1271619.jpg",
  },
  {
    id: 2,
    url: "./pexels-photo-1285625.jpeg",
  },
  {
    id: 3,
    url: "./pexels-pixabay-38238.jpg",
  },
];
const Banner = () => {
  const [show, setShow] = useState(0);
  const handleNext = () => {
    return setShow((pre) => {
      if (pre + 1 > 2) {
        return 0;
      }
      return pre + 1;
    });
  };
  const handlePrev = () => {
    return setShow((pre) => {
      if (pre - 1 < 0) {
        return 2;
      }
      return pre - 1;
    });
  };
  return (
    <div className="w-[1000px] items-center justify-center h-[400px] relative">
      <img
        src={images[show].url}
        alt="@banner"
        key={images[show].id}
        className="flex relative lg:h-[500px] object-contain "
      />
      <button
        type="button"
        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-prev
        onClick={()=> handlePrev()}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg
            className="w-4 h-4 text-black dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
        </span>
      </button>
      <button
        type="button"
        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-next
        onClick={()=> handleNext()}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg
            className="w-4 h-4 text-black dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
        </span>
      </button>
    </div>
  );
};

export default Banner;
