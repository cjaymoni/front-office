import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { ProgressBar } from "primereact/progressbar";
export const CardWithProgressBar = () => {
  return (
    <div className="h-full p-4 bg-white rounded-md ">
      <div className="flex justify-between items-center mb-3">
        <div className="flex text-gray-400">Operational Effect</div>
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
      <div className="text-left mb-3 text-2xl text-black">78%</div>
      <div className="flex flex-row text-[14px] mb-2 h-[50px] place-items-end">
        <div className="w-full bg-gray-200 rounded-full h-2.5 align-baseline dark:bg-gray-700">
          <div
            className="bg-primary h-2.5 rounded-full"
            style={{ width: "78%" }}
          ></div>
        </div>{" "}
      </div>

      <hr className="mt-2" />
      <div className="flex flex-row mt-2 text-[14px]">
        <span className="mr-4 text-gray-600">Daily Sales</span>
        <span className="text-black">$12,423</span>
      </div>
    </div>
  );
};
