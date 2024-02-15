import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const Menu = (props) => {
  const { children, items } = props;
  const [isOpened, setIsOpened] = useState(false);
  return (
    <div className="ring-transparent focus:ring-transparent">
      <button
        className="w-full flex items-center justify-between bg-inherit hover:text-orange-500 text-white p-2 rounded-lg  hover:bg-[#bad6f9]  duration-150 ring-0 focus:ring-transparent"
        onClick={() => setIsOpened(!isOpened)}
      >
        <div className="flex items-center gap-x-2 ">{children}</div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`w-5 h-5 duration-150 ${isOpened ? "rotate-180" : ""}`}
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpened ? (
        <ul className="mx-4 mt-2 p-2 border-none rounded-lg text-sm font-medium bg-[#bad6f9]">
          {items.map((item, idx) => (
            <li key={idx}>
              <Link
                to={item.href}
                className={`flex items-center gap-x-2 text-gray-600 p-2 rounded-lg  hover:bg-gray-50 duration-150 mb-2 ${
                  location.pathname.includes(item.href)
                    ? "bg-gray-50 text-orange-500"
                    : ""
                }`}
              >
                {item.icon ? (
                  <div className="text-inherit">{item.icon}</div>
                ) : (
                  ""
                )}
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        ""
      )}
    </div>
  );
};
const bgImg = "/motor.svg";

export const FrontOfficeLayout = () => {
  const visitsMenu = [
    {
      href: "/visit-entry",
      name: "Visit Entries",
      icon: (
        <svg
          className="w-5 h-5 lg:w-6 lg:h-6 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path d="M3 2.992C3 2.444 3.445 2 3.993 2h16.014a1 1 0 0 1 .993.992v18.016a.993.993 0 0 1-.993.992H3.993A1 1 0 0 1 3 21.008V2.992zM19 11V4H5v7h14zm0 2H5v7h14v-7zM9 6h6v2H9V6zm0 9h6v2H9v-2z"></path>
        </svg>
      ),
    },
    {
      href: "/visit-category",
      name: "Visit Category",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
          />
        </svg>
      ),
    },
    {
      href: "/visit-status",
      name: "Visit Status",
      icon: (
        <svg
          className="w-5 h-5 lg:w-6 lg:h-6 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path d="M12 7a8 8 0 1 1 0 16 8 8 0 0 1 0-16zm0 2a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm0 1.5 1.323 2.68 2.957.43-2.14 2.085.505 2.946L12 17.25l-2.645 1.39.505-2.945-2.14-2.086 2.957-.43L12 10.5zM18 2v3l-1.363 1.138A9.935 9.935 0 0 0 13 5.049V2h5zm-7-.001v3.05a9.935 9.935 0 0 0-3.636 1.088L6 5V2l5-.001z"></path>
        </svg>
      ),
    },
    {
      href: "/expected-visitors",
      name: "Expected Visitors",
      icon: (
        <svg
          className="w-5 h-5 lg:w-6 lg:h-6 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path d="M17 2h3a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h3V0h2v2h6V0h2v2zm0 2v2h-2V4H9v2H7V4H5v16h14V4h-2zM7 8h10v2H7V8zm0 4h10v2H7v-2z"></path>
        </svg>
      ),
    },
  ];
  const dispatchMenu = [
    {
      href: "/incoming-dispatch",
      name: "Incoming Dispatches",
      icon: <img src={bgImg} className="w-5 h-5 lg:w-6 lg:h-6 fill-current" />,
    },
    {
      href: "/outgoing-dispatch",
      name: "Outgoing Dispatches",
      icon: (
        <svg
          className="w-5 h-5 lg:w-6 lg:h-6 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path d="M5 2h14a1 1 0 0 1 1 1v19.143a.5.5 0 0 1-.766.424L12 18.03l-7.234 4.536A.5.5 0 0 1 4 22.143V3a1 1 0 0 1 1-1zm13 2H6v15.432l6-3.761 6 3.761V4z"></path>
        </svg>
      ),
    },
  ];
  const navigation = [
    {
      href: "/dashboard",
      name: "Dashboard",
      icon: (
        <svg
          className="w-5 h-5 lg:w-6 lg:h-6 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path d="M13 21V11h8v10h-8zM3 13V3h8v10H3zm6-2V5H5v6h4zM3 21v-6h8v6H3zm2-2h4v-2H5v2zm10 0h4v-6h-4v6zM13 3h8v6h-8V3zm2 2v2h4V5h-4z"></path>
        </svg>
      ),
    },
    {
      href: "/visits",
      name: "Visits",
      icon: (
        <svg
          className="w-5 h-5 lg:w-6 lg:h-6 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path d="m20.083 15.2 1.202.721a.5.5 0 0 1 0 .858l-8.77 5.262a1 1 0 0 1-1.03 0l-8.77-5.262a.5.5 0 0 1 0-.858l1.202-.721L12 20.05l8.083-4.85zm0-4.7 1.202.721a.5.5 0 0 1 0 .858L12 17.65l-9.285-5.571a.5.5 0 0 1 0-.858l1.202-.721L12 15.35l8.083-4.85zm-7.569-9.191 8.771 5.262a.5.5 0 0 1 0 .858L12 13 2.715 7.429a.5.5 0 0 1 0-.858l8.77-5.262a1 1 0 0 1 1.03 0zM12 3.332 5.887 7 12 10.668 18.113 7 12 3.332z"></path>
        </svg>
      ),
      isMenu: true,
      items: visitsMenu,
    },

    {
      href: "/office-areas",
      name: "Office Areas",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
          />
        </svg>
      ),
    },

    {
      href: "/incoming-dispatches",
      name: "Dispatches",
      icon: (
        <svg
          className="w-5 h-5 lg:w-6 lg:h-6 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path d="M16 20V4H4v15a1 1 0 0 0 1 1h11zm3 2H5a3 3 0 0 1-3-3V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v7h4v9a3 3 0 0 1-3 3zm-1-10v7a1 1 0 0 0 2 0v-7h-2zM6 6h6v6H6V6zm2 2v2h2V8H8zm-2 5h8v2H6v-2zm0 3h8v2H6v-2z"></path>
        </svg>
      ),
      isMenu: true,
      items: dispatchMenu,
    },
  ];

  const navsFooter = [
    {
      href: "/help",
      name: "Help",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
          />
        </svg>
      ),
    },
  ];

  const [showSideBar, setShowSidebar] = useState<boolean>(false);
  const location = useLocation();

  return (
    <div className="w-screen h-screen flex flex-row">
      {/* sidebar */}
      <div className="lg:block hidden w-1/5 h-screen  bg-blue-500">
        <div className=" h-full text-white ">
          <div className="flex flex-col h-full">
            <div className="h-20 flex items-center px-8 ">
              mbra Front Office
            </div>
            <div className="flex-1 flex flex-col h-full overflow-auto">
              <ul className="px-4 text-sm font-medium flex-1">
                {navigation.map((item, idx) => {
                  if (item.isMenu) {
                    return (
                      <li key={idx} className="mb-3">
                        <Menu items={item.items}>
                          {item.icon}

                          {item.name}
                        </Menu>
                      </li>
                    );
                  } else {
                    return (
                      <li key={idx} className="mb-3">
                        <Link
                          to={item.href}
                          className={`flex items-center gap-x-2 font-normal hover:text-orange-500 text-white p-2 rounded-lg hover:bg-[#bad6f9] ${
                            location.pathname.includes(item.href)
                              ? "bg-[#bad6f9] text-orange-500"
                              : ""
                          } duration-150`}
                        >
                          <div className="text-inherit">{item.icon}</div>
                          {item.name}
                        </Link>
                      </li>
                    );
                  }
                })}
              </ul>
              <div className="pt-2 mt-2 border-t border-gray-500">
                <ul className="px-4 pb-4 text-sm font-medium">
                  {navsFooter.map((item, idx) => (
                    <li key={idx}>
                      <a
                        href={item.href}
                        className="flex items-center gap-x-2 text-white p-2 rounded-lg  hover:bg-[#bad6f9] hover:text-orange-500 active:bg-gray-100 duration-150"
                      >
                        <div className="text-inherit">{item.icon}</div>
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:w-4/5 w-full flex-1 overflow-y-auto">
        {/* navbar */}
        <div className="bg-white border-b flex justify-between h-auto p-3">
          <div className="lg:hidden block">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-10 h-10 cursor-pointer"
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-12 h-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
        </div>
        <div className="mt-auto relative">
          <Outlet></Outlet>
        </div>
      </div>

      {/* overlay */}
      {showSideBar && (
        <div className="bg-blue-500 text-white w-6/12 lg:w-3/5 fixed h-full left-0 top-0 z-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-8 float-right cursor-pointer"
            onClick={() => setShowSidebar(!showSideBar)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          <div className="flex flex-col h-full">
            <div className="h-20 flex items-center px-8">mbra Hr</div>
            <div className="flex-1 flex flex-col h-full overflow-auto">
              <ul className="px-4 text-sm font-medium flex-1">
                {navigation.map((item, idx) => {
                  if (item.isMenu) {
                    return (
                      <li key={idx} className="mb-3">
                        <Menu items={item.items}>
                          {item.icon}

                          {item.name}
                        </Menu>
                      </li>
                    );
                  } else {
                    return (
                      <li key={idx} className="mb-3">
                        <Link
                          to={item.href}
                          className={`flex items-center gap-x-2 font-normal hover:text-orange-500 text-white p-2 rounded-lg hover:bg-[#bad6f9] ${
                            location.pathname.includes(item.href)
                              ? "bg-[#bad6f9] text-orange-500"
                              : ""
                          } duration-150`}
                        >
                          <div className="text-inherit">{item.icon}</div>
                          {item.name}
                        </Link>
                      </li>
                    );
                  }
                })}
              </ul>
              <div>
                <ul className="px-4 pb-4 text-sm font-medium">
                  {navsFooter.map((item, idx) => (
                    <li key={idx}>
                      <a
                        href={item.href}
                        className="flex items-center gap-x-2 text-white p-2 rounded-lg  hover:bg-[#bad6f9] hover:text-orange-500 active:bg-gray-100 duration-150"
                      >
                        <div className="text-inherit">{item.icon}</div>
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
