export const DashboardCardv2 = () => {
  return (
    <div className="h-full p-4 bg-white rounded-md ">
      <div className="flex justify-between items-center mb-3">
        <div className="flex text-gray-400">Total Sales</div>
        <div className="flex text-gray-400">
          <i
            aria-label="icon: info-circle-o"
            className="anticon anticon-info-circle-o"
          >
            <svg
              viewBox="64 64 896 896"
              className=""
              data-icon="info-circle"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
              <path d="M464 336a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
            </svg>
          </i>{" "}
        </div>
      </div>
      <div className="text-left mb-3 text-2xl text-black">$126,5000</div>
      <div className="flex flex-row text-[14px] mb-2 text-gray-600">
        <span className="flex flex-row mr-2">WoW Change</span>
        <span className="mr-3 text-black ">
          12%{" "}
          <i
            aria-label="icon: caret-up"
            className="fa-solid fa-caret-up text-red-700"
          ></i>
        </span>
      </div>
      <div className="flex flex-row text-[14px] mb-2 text-gray-600">
        <span className="mr-2">DoD Change</span>
        <span className="mr-3 text-black">
          11%{" "}
          <i
            aria-label="icon: caret-down"
            className="fa-solid fa-caret-down text-green-700"
          ></i>
        </span>
      </div>
      <hr className="mt-2" />
      <div className="flex flex-row mt-2 text-[14px]">
        <span className="mr-4 text-gray-600">Daily Sales</span>
        <span className="text-black">$12,423</span>
      </div>
    </div>
  );
};
