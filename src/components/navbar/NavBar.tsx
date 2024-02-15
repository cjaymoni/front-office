import { Badge } from "primereact/badge";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { OverlayPanel } from "primereact/overlaypanel";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

export function NavBar({ showSideBar, setShowSidebar }) {
  const op = useRef(null);
  const po = useRef(null);

  const navigate = useNavigate();
  return (
    <div className="bg-white border-b flex justify-between h-auto p-3">
      <div className="lg:hidden block">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-10 h-10 cursor-pointer"
          style={{ color: "#f59331" }}
          onClick={() => setShowSidebar(!showSideBar)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
          />
        </svg>
      </div>
      <div className="w-3/5">
        <form className="flex items-center space-x-2 border rounded-lg p-2 bg-slate-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 flex-none text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            className="w-full outline-none appearance-none placeholder-gray-500 bg-inherit text-gray-500 sm:w-auto"
            type="text"
            placeholder="Search"
          />
        </form>
      </div>

      <div>
        <div className="flex flex-row gap-6">
          {" "}
          <i
            className="pi pi-bell p-overlay-badge text-black cursor-pointer mt-2"
            style={{ fontSize: "2rem" }}
            onClick={(e) => op.current.toggle(e)}
          >
            <Badge value="2"></Badge>
          </i>
          <i
            onClick={(e) => po.current.toggle(e)}
            className="fa fa-circle-user text-[#f59331] cursor-pointer"
            style={{ fontSize: "2.5rem" }}
          ></i>{" "}
          <OverlayPanel
            ref={op}
            className="h-2/4 sm:w-1/4 w-full absolute left-0"
          >
            <NotificationItem />
            <Divider className="bg-gray-300 h-[1px] w-full" />
            <NotificationItem />
            <Divider className="bg-gray-300 h-[1px] w-full" />
          </OverlayPanel>
          <OverlayPanel ref={po} className="h-1/4  w-[15rem] absolute left-0">
            <Link to="/user-profile" className="text-black cursor-pointer">
              <i
                className="fa fa-circle-user mr-2 text-[#f59331] cursor-pointer"
                style={{ fontSize: "2.5rem" }}
              ></i>
              User Profile
            </Link>{" "}
            <Divider className="bg-gray-300 h-[1px] w-full" />
            <span
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
              className="cursor-pointer hover:text-blue-300"
            >
              <i
                className="fa fa-sign-out mr-2 text-[#f59331] cursor-pointer"
                style={{ fontSize: "2.5rem" }}
              ></i>
              Log Out
            </span>
          </OverlayPanel>
        </div>
      </div>
    </div>
  );
}

const NotificationItem = (notification) => {
  return (
    <div className="flex flex-row gap-3  p-3 cursor-pointer">
      <i className="pi pi-bell text-[#f59331]" style={{ fontSize: "2.3rem" }} />
      <div className="flex flex-col -mb-5">
        <span className="italic text-gray-400">Task Update</span>
        <span className="font-bold text-lg">Task assigned to you</span>
        <span className="text-slate-500">Aye yo, do this thing yea</span>
        <span className="text-gray-400 italic">2 hours ago</span>
        <span className="cursor-pointer text-[#f59331]">Mark as Read</span>
      </div>
    </div>
  );
};
