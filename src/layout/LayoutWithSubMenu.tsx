import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import React from "react";

interface ISidebarItem {
  href: string;
  name: string;
  icon: React.ReactElement;
  isMenu?: boolean;
  menuItems?: Array<any>;
}
const Menu = (props) => {
  const { children, items } = props;
  const [isOpened, setIsOpened] = useState(false);
  return (
    <div className="ring-transparent focus:ring-transparent">
      <button
        className="w-full flex items-center justify-between bg-inherit hover:text-[#bad6f9] text-black p-2 rounded-lg  hover:bg-[#2f2f2f]  duration-150 ring-0 focus:ring-transparent"
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
        <ul className="mx-4 mt-2 p-2 border-none rounded-lg text-sm font-medium bg-[#2f2f2f]">
          {items.map((item, idx) => {
            if (item.isMenu) {
              return (
                <li key={idx} className="mb-3">
                  <SubMenu key={idx} items={item.menuItems}>
                    {item.icon}
                    {item.name}
                  </SubMenu>
                </li>
              );
            } else {
              return (
                <li key={idx}>
                  <Link
                    to={item.href}
                    className={`flex items-center gap-x-2 text-[#f59331] p-2 rounded-lg  hover:bg-gray-50 duration-150 mb-2 ${
                      location.pathname.includes(item.href)
                        ? "bg-gray-50 text-[#f59331]"
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
              );
            }
          })}
        </ul>
      ) : (
        ""
      )}
    </div>
  );
};

const SubMenu = (props) => {
  const { children, items } = props;
  const [isOpened, setIsOpened] = useState(false);
  return (
    <div className="ring-transparent focus:ring-transparent">
      <button
        className="w-full flex items-center justify-between hover:bg-inherit text-[#f59331] hover:text-gray-600 p-2 rounded-lg  bg-[#2f2f2f]  duration-150 ring-0 focus:ring-transparent"
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
        <ul className="mx-4 mt-2 p-2 border-none rounded-lg text-sm font-medium bg-[#4d5055]">
          {items.map((item, idx) => (
            <li key={idx}>
              <Link
                to={item.href}
                className={`flex items-center text-[#3998d2] gap-x-2 hover:text-[#f59331] p-2 rounded-lg  hover:bg-gray-50 duration-150 mb-2 ${
                  location.pathname.includes(item.href)
                    ? "bg-gray-50 text-[#f59331]"
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

export const LayoutWithSubMenu = () => {
  const appraisalMenu = [
    {
      href: "/firm-targets",
      name: "Firm Targets",
      icon: (
        <svg
          fill="#f59331"
          className="w-6 h-6"
          viewBox="0 0 256 256"
          id="Flat"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M231.99951,208a8.00039,8.00039,0,0,1-8,8h-192a8.00039,8.00039,0,0,1-8-8V48a8,8,0,0,1,16,0v94.37305L90.73486,97.97949a7.99914,7.99914,0,0,1,10.06739-.37939l58.8125,44.10888,59.12011-51.72949a7.99962,7.99962,0,1,1,10.53516,12.041l-64,56a7.99913,7.99913,0,0,1-10.06738.37939L96.39014,114.291l-56.39063,49.3413V200h184A8.00039,8.00039,0,0,1,231.99951,208Z" />
        </svg>
      ),
    },
    {
      href: "/staff-targets",
      name: "Staff Targets",
      icon: (
        <svg
          version="1.0"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          className="w-5 h-5 lg:w-6 lg:h-6 fill-current"
          viewBox="0 0 64 64"
          enable-background="new 0 0 64 64"
          xmlSpace="preserve"
        >
          <path
            fill="#f59331"
            d="M32,0c-8.477,0-16.178,3.302-21.903,8.683L9,7.586V5c0-0.168-0.051-0.318-0.124-0.457
	C8.862,4.48,8.827,4.412,8.747,4.332L4.708,0.293H4.707C4.526,0.111,4.276,0,4,0C3.447,0,3,0.447,3,1v2H1C0.447,3,0,3.447,0,4
	c0,0.276,0.112,0.526,0.293,0.707v0.001l3.999,3.998c0.001,0.001,0.001,0.001,0.002,0.002l0.04,0.04
	c0.08,0.08,0.147,0.115,0.21,0.129C4.682,8.949,4.833,9,5,9h2.586l1.097,1.097C3.302,15.822,0,23.523,0,32c0,17.673,14.327,32,32,32
	s32-14.327,32-32S49.673,0,32,0z M7,7H5.415L3.418,5.004L5,5l0.012-1.574L7,5.414V7z M32,62C15.432,62,2,48.568,2,32
	c0-7.924,3.078-15.127,8.097-20.489l2.828,2.828C8.629,18.977,6,25.18,6,32c0,14.359,11.641,26,26,26s26-11.641,26-26S46.359,6,32,6
	c-6.82,0-13.023,2.629-17.661,6.925l-2.828-2.828C16.874,5.078,24.075,2,32,2c16.568,0,30,13.432,30,30S48.568,62,32,62z
	 M17.185,18.599C13.973,22.146,12,26.837,12,32c0,11.046,8.954,20,20,20s20-8.954,20-20s-8.954-20-20-20
	c-5.163,0-9.854,1.973-13.401,5.185l-2.846-2.845C20.028,10.404,25.732,8,32,8c13.255,0,24,10.745,24,24S45.255,56,32,56
	S8,45.255,8,32c0-6.268,2.405-11.973,6.339-16.246L17.185,18.599z M21.427,22.841C19.298,25.297,18,28.494,18,32
	c0,7.732,6.268,14,14,14s14-6.268,14-14s-6.268-14-14-14c-3.506,0-6.703,1.298-9.159,3.427l-2.828-2.828
	C23.197,15.748,27.39,14,32,14c9.941,0,18,8.059,18,18s-8.059,18-18,18s-18-8.059-18-18c0-4.61,1.748-8.803,4.599-11.987
	L21.427,22.841z M25.686,27.1C24.633,28.455,24,30.151,24,32c0,4.418,3.582,8,8,8s8-3.582,8-8s-3.582-8-8-8
	c-1.849,0-3.545,0.633-4.9,1.686l-2.844-2.844C26.347,21.072,29.047,20,32,20c6.627,0,12,5.373,12,12s-5.373,12-12,12
	s-12-5.373-12-12c0-2.953,1.072-5.653,2.842-7.744L25.686,27.1z M31.293,32.707c0.391,0.391,1.023,0.391,1.414,0
	s0.391-1.023,0-1.414l-4.18-4.18C29.508,26.415,30.704,26,32,26c3.313,0,6,2.687,6,6s-2.687,6-6,6s-6-2.687-6-6
	c0-1.295,0.415-2.492,1.113-3.473L31.293,32.707z"
          />
        </svg>
      ),
    },
    {
      href: "/department-targets",
      name: "Department Targets",
      icon: (
        <svg
          version="1.0"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          className="w-6 h-6"
          viewBox="0 0 64 64"
          enable-background="new 0 0 64 64"
          xmlSpace="preserve"
        >
          <g>
            <path
              fill="#f59331"
              d="M51.603,33.865C51.855,34.529,52,35.248,52,36c0,3.314-2.686,6-6,6s-6-2.686-6-6
		c0-0.795,0.158-1.553,0.439-2.247l-15.93-9.804C23.41,25.205,21.8,26,20,26c-1.296,0-2.493-0.414-3.474-1.113L0,41.322V60
		c0,2.211,1.789,4,4,4h56c2.211,0,4-1.789,4-4V26.646L51.603,33.865z"
            />
            <circle fill="#f59331" cx="46" cy="36" r="4" />
            <path
              fill="#f59331"
              d="M15.112,23.473C14.414,22.492,14,21.296,14,20c0-3.314,2.686-6,6-6s6,2.686,6,6
		c0,0.796-0.158,1.553-0.439,2.248l15.93,9.803C42.59,30.796,44.2,30,46,30c1.844,0,3.49,0.832,4.591,2.141L64,24.244V4
		c0-2.211-1.789-4-4-4H4C1.789,0,0,1.789,0,4v34.713L15.112,23.473z"
            />
            <circle fill="#f59331" cx="20" cy="20" r="4" />
          </g>
        </svg>
      ),
    },

    {
      href: "/review-period",
      name: "Review Period",
      icon: (
        <svg
          viewBox="0 0 1024 1024"
          className="w-6 h-6"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M406.162286 94.061714l12.653714 65.316572a365.933714 365.933714 0 0 0-267.264 501.540571l-61.220571 25.892572a432.420571 432.420571 0 0 1 315.830857-592.749715z m-193.828572 757.028572l42.569143-51.2a364.105143 364.105143 0 0 0 233.764572 84.48c87.771429 0 170.642286-31.012571 236.251428-86.528l43.008 50.761143A430.665143 430.665143 0 0 1 488.594286 950.857143a430.665143 430.665143 0 0 1-276.260572-99.766857z m426.422857-666.331429a135.68 135.68 0 1 1 7.753143-68.754286 432.713143 432.713143 0 0 1 268.873143 332.8c1.462857 9.069714 2.706286 21.065143 3.803429 35.986286a31.451429 31.451429 0 0 1-31.451429 33.718857 34.889143 34.889143 0 0 1-34.816-32.329143 366.153143 366.153143 0 0 0-214.162286-301.348571z m-126.464 29.403429a78.555429 78.555429 0 1 0 0-157.037715 78.555429 78.555429 0 0 0 0 157.037715z m-320.658285 672.914285a135.68 135.68 0 1 1 0-271.286857 135.68 135.68 0 0 1 0 271.36z m0-57.051428a78.555429 78.555429 0 1 0 0-157.110857 78.555429 78.555429 0 0 0 0 157.110857z m640.731428 57.051428a135.68 135.68 0 1 1 0-271.286857 135.68 135.68 0 0 1 0 271.36z m0-57.051428a78.555429 78.555429 0 1 0 0-157.110857 78.555429 78.555429 0 0 0 0 157.110857z"
            fill="#f59331"
          />
        </svg>
      ),
    },

    {
      href: "/staff-appraisals",
      name: "Staff Appraisal",
      icon: (
        <svg
          className="w-5 h-5 lg:w-6 lg:h-6 fill-current"
          viewBox="0 0 24 24"
          fill="#f59331"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M18.5207 10.186C18.6221 10.0845 18.7883 10.0889 18.8809 10.1986C20.1907 11.7522 20.9398 13.7085 20.9965 15.7498C21.0003 15.8878 20.8881 15.9998 20.75 15.9998H16.2449C16.1069 15.9998 15.9957 15.8878 15.9871 15.75C15.9415 15.0221 15.6977 14.3235 15.2864 13.7284C15.2147 13.6247 15.2229 13.4838 15.3119 13.3947L18.5207 10.186ZM17.8008 9.11866C17.9106 9.21118 17.915 9.37738 17.8135 9.47887L14.6048 12.6876C14.5157 12.7767 14.3747 12.7848 14.2711 12.7132C13.8049 12.3911 13.2753 12.1717 12.7178 12.0699C12.5939 12.0473 12.5 11.9418 12.5 11.8158V7.278C12.5 7.13447 12.6206 7.02009 12.7636 7.03226C14.6177 7.19008 16.3782 7.91926 17.8008 9.11866ZM11.5 7.278C11.5 7.13447 11.3793 7.02009 11.2363 7.03226C9.38222 7.19008 7.62177 7.91926 6.1991 9.11868C6.08937 9.21119 6.08493 9.3774 6.18642 9.47888L9.39518 12.6876C9.48425 12.7767 9.62522 12.7848 9.72886 12.7132C10.195 12.3911 10.7247 12.1717 11.2821 12.0699C11.4061 12.0473 11.5 11.9418 11.5 11.8158V7.278ZM8.71361 13.7284C8.78524 13.6247 8.7771 13.4838 8.68802 13.3947L5.47929 10.186C5.37781 10.0845 5.21161 10.0889 5.11909 10.1986C3.80923 11.7522 3.06012 13.7085 3.00345 15.7498C2.99962 15.8878 3.11191 15.9998 3.24998 15.9998H7.75504C7.89311 15.9998 8.00422 15.8878 8.01285 15.75C8.05843 15.0221 8.30226 14.3235 8.71361 13.7284Z"
            fill="#f59331"
            fill-opacity="0.24"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12.5 11.8056C12.5 11.9316 12.594 12.0371 12.7179 12.0597C13.278 12.1617 13.8101 12.3821 14.2782 12.706C14.3819 12.7776 14.5229 12.7695 14.612 12.6804L18.5228 8.76961C18.6239 8.66851 18.6199 8.5031 18.5114 8.41C16.8974 7.02517 14.8828 6.19071 12.7623 6.02867C12.6198 6.01778 12.5 6.13194 12.5 6.27491V11.8056Z"
            fill="#f59331"
          />
        </svg>
      ),
    },
  ];
  const staffMenu = [
    {
      href: "/staff",
      name: "Staff List",
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
    //appraisal
    {
      href: "/appraisal",
      name: "Appraisal",
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
      isMenu: true,
      menuItems: appraisalMenu,
    },

    //leaves
    {
      href: "/leaves",
      name: "Leaves",
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
    },
    {
      href: "/departments",
      name: "Departments",
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
      href: "/sectors",
      name: "Sectors",
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
            d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"
          />
        </svg>
      ),
    },
    {
      href: "/practice-areas",
      name: "Practice Areas",
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
            d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3"
          />
        </svg>
      ),
    },
    {
      href: "/designations",
      name: "Designations",
      icon: (
        <svg
          className="w-5 h-5 lg:w-6 lg:h-6 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path d="M7 5V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4zM4 16v3h16v-3H4zm0-2h16V7H4v7zM9 3v2h6V3H9zm2 8h2v2h-2v-2z"></path>
        </svg>
      ),
    },
  ];
  const visitsMenu = [
    {
      href: "/front-office/visit-entry",
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
      href: "/front-office/visit-category",
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
      href: "/front-office/visit-status",
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
      href: "/front-office/expected-visitors",
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
      href: "/front-office/incoming-dispatch",
      name: "Incoming Dispatches",
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
            d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25"
          />
        </svg>
      ),
    },
    {
      href: "/front-office/outgoing-dispatch",
      name: "Outgoing Dispatches",
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
            d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
          />
        </svg>
      ),
    },
  ];

  const frontOfficeMenu = [
    //office areas
    {
      href: "/front-office/office-areas",
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
      href: "/front-office/visits",
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
      menuItems: visitsMenu,
    },
    {
      href: "/front-office/incoming-dispatches",
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
      menuItems: dispatchMenu,
    },
  ];

  const crmMenu = [
    //leads
    {
      href: "/crm/leads",
      name: "Leads",
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
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
          />
        </svg>
      ),
    },
    //clients
    {
      href: "/crm/clients",
      name: "Clients",
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
            d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
          />
        </svg>
      ),
    },
    //consultations
    {
      href: "/crm/consultations",
      name: "Consultations",
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
            d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125z"
          />
        </svg>
      ),
    },
    //actions
    {
      href: "/crm/actions",
      name: "Actions",
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
            d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5"
          />
        </svg>
      ),
    },
  ];

  const mattersMenu = [
    {
      href: "/matters/matter",
      name: "Matters",
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
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
          />
        </svg>
      ),
    },
    {
      href: "/matters/judges",
      name: "Judges",
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
            d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
          />
        </svg>
      ),
    },
    {
      href: "/matters/categories",
      name: "Categories",
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
            d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 6h.008v.008H6V6z"
          />
        </svg>
      ),
    },
    {
      href: "/matters/documents",
      name: "Documents",
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
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
          />
        </svg>
      ),
    },
  ];

  const navigation: ISidebarItem[] = [
    //dashboard
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

    //front-office
    {
      href: "/front-office/visits",
      name: "Front Office",
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
            d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"
          />
        </svg>
      ),
      isMenu: true,
      menuItems: frontOfficeMenu,
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
      <div className="lg:block hidden w-1/5 h-screen bg-primary">
        <div className=" h-full text-black">
          <div className="flex flex-col h-full">
            <div className="h-20 flex items-center px-8 ">Front-office</div>
            <div className="flex-1 flex flex-col h-full overflow-auto">
              <ul className="px-4 text-sm font-medium flex-1">
                {navigation.map((item, idx) => {
                  if (item.isMenu) {
                    return (
                      <li key={idx} className="mb-3">
                        <Menu items={item.menuItems}>
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
                          className={`flex items-center gap-x-2 font-medium hover:text-[#bad6f9] text-black p-2 rounded-lg hover:bg-[#2f2f2f] ${
                            location.pathname.includes(item.href)
                              ? "bg-gray-50 text-[#f59331]"
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
                        className="flex items-center gap-x-2 text-black p-2 rounded-lg  hover:bg-[#2f2f2f] hover:text-orange-500 active:bg-gray-100 duration-150"
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-12 h-12"
              style={{ color: "#f59331" }}
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
        <div className="bg-primary text-black w-6/12 lg:w-3/5 fixed h-full left-0 top-0 z-10">
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
            <div className="h-20 flex items-center px-8">Front-office</div>
            <div className="flex-1 flex flex-col h-full overflow-auto">
              <ul className="px-4 text-sm font-medium flex-1">
                {navigation.map((item, idx) => {
                  if (item.isMenu) {
                    return (
                      <li key={idx} className="mb-3">
                        <Menu items={item.menuItems}>
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
                          className={`flex items-center gap-x-2 font-medium hover:text-[#bad6f9] text-black p-2 rounded-lg hover:bg-[#2f2f2f] ${
                            location.pathname.includes(item.href)
                              ? "bg-gray-50 text-[#f59331]"
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
                        className="flex items-center gap-x-2 text-black p-2 rounded-lg  hover:bg-[#2f2f2f] hover:text-orange-500 active:bg-gray-100 duration-150"
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
