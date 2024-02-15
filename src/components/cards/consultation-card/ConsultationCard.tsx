export const ConsultationCard = (props: { handleEditClick: () => void }) => {
  return (
    <div className="h-50 w-full rounded bg-white border  ">
      {/* -- Header  */}
      <div className="flex items-center justify-between">
        <div className="p-3 text-gray-700 text-lg font-bold">Title</div>
        <div className="p-3 flex">
          <button
            className="text-slate-800 hover:text-[#f59331] mr-1 text-sm bg-white hover:border-[#f59331]  hover:bg-slate-100 border border-[#f59331] rounded-l-lg font-medium px-4 py-2 inline-flex space-x-1 items-center"
            onClick={() => props.handleEditClick()}
          >
            {" "}
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </span>
            <span>Edit</span>
          </button>
          <button className="text-slate-800 hover:text-[#f59331] hover:border-[#f59331]  text-sm bg-white hover:bg-slate-100 border border-[#f59331]  rounded-r-lg font-medium px-4 py-2 inline-flex space-x-1 items-center">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </span>
            <span>Delete</span>
          </button>
        </div>
      </div>
      <div className="p-3 text-lg text-gray-600 italic text-left">
        Description
      </div>
      <div className="p-3 text-md text-gray-600 italic text-left">Category</div>
      <div className="p-3  text-sm italic text-gray-500 flex justify-between">
        <div className="flex">
          <span>
            <i className="pi pi-user mr-1"></i> Client
          </span>
        </div>
        <div className="flex">
          <span>Date here</span>
        </div>
      </div>
    </div>
  );
};
