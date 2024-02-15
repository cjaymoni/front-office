import { Link } from "react-router-dom";

export const MediaCard = (props: IMediaCardProps) => {
  return (
    <Link to={props.route}>
      <div className="h-full w-full p-4  space-x-3 bg-white flex flex-row rounded-lg shadow-md">
        {/* icon */}
        <div className="flex w-2/5 h-full">
          <div className={`${props.bgColor} p-4 rounded-lg`}>
            <i
              className={`${props.icon} ${props.iconColor}`}
              style={{ fontSize: "3rem" }}
            ></i>
          </div>
        </div>
        {/* title and getPropertyValue */}
        <div className="flex w-2/3 h-full flex-wrap">
          <div className="flex flex-col">
            <h1 className="my-4  text-2xl text-slate-400">
              {props.headerText}
            </h1>
            <span className="text-xl text-gray-600 italic">
              {props.labelValue}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

interface IMediaCardProps {
  headerText: string;
  icon: string;
  iconColor: string;
  bgColor: string;
  iconBackgroundColor?: string;
  labelValue?: string;
  route: string;
}
