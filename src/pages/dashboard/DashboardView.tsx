import { ProgressBar } from "primereact/progressbar";
import { BottomCardWithLineChat } from "../../components/dashboard-card/BottomCardWithLineChart";
import { CardWithBarChartSmall } from "../../components/dashboard-card/CardWithBarChartSmall";
import { LineDemo } from "../../components/dashboard-card/CardWithLineChart";
import { CardWithBarChartLarge } from "../../components/dashboard-card/CardWithLineChartLarge";
import { CardWithOnlineSearch } from "../../components/dashboard-card/CardWithOnlineSearch";
import { CardWithPieChart } from "../../components/dashboard-card/CardWithPieChart";
import { CardWithProgressBar } from "../../components/dashboard-card/CardWithProgressBar";
import { DashboardCard } from "../../components/dashboard-card/DashBoardCard";
import { DashboardCardv2 } from "../../components/dashboard-card/DashboardCardv2";
import { UpcomingEventCard } from "../../components/dashboard-card/UpcomingEventsCard";

export const DashboardView = () => {
  return (
    <div className="py-4 w-full h-full bg-gray-100 ">
      <div className="flex flex-1 items-center">
        <h1 className="my-4 ml-4 text-2xl text-black">Dashboard</h1>{" "}
      </div>
      <div className="grid md:grid-cols-4 bg-gray-100 p-4 gap-4 ">
        <div>
          <DashboardCardv2 />
        </div>
        <div>
          {" "}
          <LineDemo />
        </div>
        <div>
          <CardWithBarChartSmall />
        </div>
        <div>
          <CardWithProgressBar />
        </div>
      </div>

      <div className="w-full mb-4 p-4">
        <CardWithBarChartLarge />
      </div>

      {/* <div className="w-full mb-4 p-4 grid grid-cols-2 gap-4">
        <CardWithOnlineSearch />
        <CardWithPieChart />
      </div> */}
      <div className="w-full mb-4 p-4">
        <BottomCardWithLineChat />
      </div>
    </div>
  );
};
