export const RecentLeaveCard = () => {
  return (
    <div className="p-4 bg-white">
      <div className="mb-2 flex justify-between items-center">
        <h4 className="font-normal">Recent Leave</h4>{" "}
        <a href="/leaves" className="p-1 text-sm rounded-sm bg-gray-50">
          <svg
            className="w-6 h-6 fill-current text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="m13.172 12-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z"></path>
          </svg>
        </a>
      </div>{" "}
      <div className="relative overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <thead className="text-xs uppercase text-gray-700 dark:text-gray-400 text-gray-700">
            <tr>
              <th
                className="px-6 py-3 px-3 py-3 md:px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                scope="col"
              >
                Remark
              </th>{" "}
              <th
                className="px-6 py-3 px-3 py-3 md:px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                scope="col"
              >
                Date
              </th>
            </tr>
          </thead>{" "}
          <tbody>
            <tr className="border-b last:border-b-0 bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700 hover:bg-orange-50">
              <td className="px-6 py-4 whitespace-nowrap font-normal text-gray-900 dark:text-white">
                Aperiam optio r
              </td>{" "}
              <td className="px-6 py-4 whitespace-nowrap font-normal text-gray-900 dark:text-white">
                Dec 18, 2022
              </td>{" "}
            </tr>
            <tr className="border-b last:border-b-0 bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700 hover:bg-orange-50">
              <td className="px-6 py-4 whitespace-nowrap font-normal text-gray-900 dark:text-white">
                Aperiam dolorem
              </td>{" "}
              <td className="px-6 py-4 whitespace-nowrap font-normal text-gray-900 dark:text-white">
                Apr 7, 2023
              </td>{" "}
            </tr>
            <tr className="border-b last:border-b-0 bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700 hover:bg-orange-50">
              <td className="px-6 py-4 whitespace-nowrap font-normal text-gray-900 dark:text-white">
                Veritatis odio{" "}
              </td>{" "}
              <td className="px-6 py-4 whitespace-nowrap font-normal text-gray-900 dark:text-white">
                May 13, 2023
              </td>{" "}
            </tr>
            <tr className="border-b last:border-b-0 bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700 hover:bg-orange-50">
              <td className="px-6 py-4 whitespace-nowrap font-normal text-gray-900 dark:text-white">
                Sint consequatu
              </td>{" "}
              <td className="px-6 py-4 whitespace-nowrap font-normal text-gray-900 dark:text-white">
                Aug 12, 2022
              </td>{" "}
            </tr>
            <tr className="border-b last:border-b-0 bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700 hover:bg-orange-50">
              <td className="px-6 py-4 whitespace-nowrap font-normal text-gray-900 dark:text-white">
                Perspiciatis au
              </td>{" "}
              <td className="px-6 py-4 whitespace-nowrap font-normal text-gray-900 dark:text-white">
                Nov 22, 2022
              </td>{" "}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
