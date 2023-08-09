import classNames from "classnames";

export const DashboardCard = (props: IDashboardCardProps) => {
  return (
    <div className="p-4 bg-gray-50">
      <div className="h-full p-4 bg-white rounded-md">
        <div className="flex items-center justify-between">
          <h4>{props.title}</h4>
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M4.5 10.5c-.825 0-1.5.675-1.5 1.5s.675 1.5 1.5 1.5S6 12.825 6 12s-.675-1.5-1.5-1.5zm15 0c-.825 0-1.5.675-1.5 1.5s.675 1.5 1.5 1.5S21 12.825 21 12s-.675-1.5-1.5-1.5zm-7.5 0c-.825 0-1.5.675-1.5 1.5s.675 1.5 1.5 1.5 1.5-.675 1.5-1.5-.675-1.5-1.5-1.5z"></path>
          </svg>
        </div>{" "}
        <div className="mt-12 w-full flex items-center justify-between font-medium text-xs">
          <p>Total</p> <p>{props.totalValue}</p>
        </div>{" "}
        <div className="my-2 w-full h-1 flex items-center bg-gray-200 rounded-md overflow-hidden">
          <div
            className={classNames("h-full", props.dividendColor)}
            style={{ width: "67%" }}
          ></div>
          <div
            className={classNames("h-full", props.remainderColor)}
            style={{ width: "33%" }}
          ></div>
        </div>{" "}
        <div className="w-full flex items-center justify-between text-gray-500 text-xs">
          <p>0%</p> <p>100%</p>
        </div>{" "}
        <div className="mt-8 text-xs text-gray-500">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-pink-400"></div>{" "}
              <p className="ml-4 ">Taken</p>
            </div>{" "}
            <div className="flex items-center">
              <p>20</p> <p className="ml-4">67%</p>
            </div>{" "}
          </div>
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-lime-400"></div>{" "}
              <p className="ml-4 ">Remaining</p>
            </div>{" "}
            <div className="flex items-center">
              <p>10</p> <p className="ml-4">33%</p>
            </div>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

interface IDashboardCardProps {
  title: string;
  totalValue: number;
  dividend: string;
  remainder: string;
  dividendColor: string;
  remainderColor: string;
}
