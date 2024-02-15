export const RecentAppraisalCard = () => {
  return (
    <div className="mt-8 p-4 lg:mt-0 bg-white">
      <div className="mb-2 flex justify-between items-center">
        <h4 className="font-normal">Recent Appraisals</h4>{" "}
        <a href="/appraisals" className="p-1 text-sm rounded-sm bg-gray-50">
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
                Name
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
                Shany O'Kon
              </td>{" "}
              <td className="px-6 py-4 whitespace-nowrap font-normal text-gray-900 dark:text-white">
                Jan 19, 2023
              </td>{" "}
            </tr>
            <tr className="border-b last:border-b-0 bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700 hover:bg-orange-50">
              <td className="px-6 py-4 whitespace-nowrap font-normal text-gray-900 dark:text-white">
                Kareem Hamill
              </td>{" "}
              <td className="px-6 py-4 whitespace-nowrap font-normal text-gray-900 dark:text-white">
                Nov 14, 2022
              </td>{" "}
            </tr>
            <tr className="border-b last:border-b-0 bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700 hover:bg-orange-50">
              <td className="px-6 py-4 whitespace-nowrap font-normal text-gray-900 dark:text-white">
                Johan Hagenes
              </td>{" "}
              <td className="px-6 py-4 whitespace-nowrap font-normal text-gray-900 dark:text-white">
                Nov 25, 2022
              </td>{" "}
            </tr>
            <tr className="border-b last:border-b-0 bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700 hover:bg-orange-50">
              <td className="px-6 py-4 whitespace-nowrap font-normal text-gray-900 dark:text-white">
                Maybelle Conroy
              </td>{" "}
              <td className="px-6 py-4 whitespace-nowrap font-normal text-gray-900 dark:text-white">
                Feb 11, 2023
              </td>{" "}
            </tr>
            <tr className="border-b last:border-b-0 bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700 hover:bg-orange-50">
              <td className="px-6 py-4 whitespace-nowrap font-normal text-gray-900 dark:text-white">
                Lane Jenkins
              </td>{" "}
              <td className="px-6 py-4 whitespace-nowrap font-normal text-gray-900 dark:text-white">
                Oct 11, 2022
              </td>{" "}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
