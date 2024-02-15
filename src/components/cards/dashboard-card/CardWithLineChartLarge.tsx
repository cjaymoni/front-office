import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { TabPanel, TabView } from "primereact/tabview";
import { Calendar } from "primereact/calendar";
import { style } from "typestyle";
import { SelectButton } from "primereact/selectbutton";

export const CardWithBarChartLarge = () => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [dates, setDates] = useState(null);
  const [selectValue, setSelectValue] = useState(null);
  const justifyOptions = [
    { name: "All day", value: "all day" },
    { name: "All Week", value: "all week" },
    { name: "All Month", value: "all month" },
    { name: "All Year", value: "all year" },
  ];

  const justifyTemplate = (option) => {
    return (
      <div>
        <span>{option.name}</span>
      </div>
    );
  };

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue(
      "--text-color-secondary"
    );
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");
    const data = {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: "My First dataset",
          backgroundColor: documentStyle.getPropertyValue("--primary-color"),
          borderColor: documentStyle.getPropertyValue("--primary-color"),
          data: [65, 59, 80, 81, 56, 55, 40, 32, 56, 12, 45, 23],
        },
      ],
    };
    const options = {
      maintainAspectRatio: false,
      aspectRatio: 1,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          barPercentage: 0.1,
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500,
            },
          },
          grid: {
            display: false,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, []);
  return (
    <div className="h-full p-4 bg-white rounded-md ">
      <div className="flex justify-between">
        <div className="flex w-1/2">
          <TabView className="dashboard-tab">
            <TabPanel header="Sales">
              <Chart
                type="bar"
                data={chartData}
                options={chartOptions}
                className="w-full"
              />
            </TabPanel>
            <TabPanel header="Visits">
              <Chart
                type="bar"
                data={chartData}
                options={chartOptions}
                className="w-full"
              />
            </TabPanel>
          </TabView>
        </div>
        <div className="flex w-1/2">
          <div className="w-full flex flex-col">
            <div className="flex justify-between">
              <div className="text-sm flex justify-evenly w-1/2 items-center">
                {justifyOptions.map((item, index) => (
                  <a
                    className="flex cursor-pointer text-black hover:text-blue-600"
                    key={index}
                  >
                    {item.name}
                  </a>
                ))}
              </div>

              <Calendar
                value={dates}
                onChange={(e) => setDates(e.value)}
                selectionMode="range"
                readOnlyInput
                showIcon
                className="h-10 w-1/2"
              />
            </div>
            <hr
              className={style({
                border: "1px solid #dee2e6",
                marginTop: "30px",
              })}
            />

            <div className="p-4 text-black">
              <h4 className="text-left">
                <span>Visits Ranking</span>
              </h4>
              <ul className="flex flex-col p-4">
                <li className="flex justify-between mt-4">
                  <div>
                    <span className="mr-3">1</span>
                    <span
                      className="antd-pro-pages-dashboard-analysis-rankingItemTitle"
                      title="Gongzhuan No.0 shop"
                    >
                      Gongzhuan No.0 shop
                    </span>
                  </div>

                  <span>323,234</span>
                </li>
                <li className="flex justify-between mt-4">
                  <div>
                    <span className="mr-3">2</span>
                    <span
                      className="antd-pro-pages-dashboard-analysis-rankingItemTitle"
                      title="Gongzhuan No.1 shop"
                    >
                      Gongzhuan No.1 shop
                    </span>
                  </div>

                  <span>323,234</span>
                </li>
                <li className="flex justify-between mt-4">
                  <div>
                    <span className="mr-3"> 3</span>
                    <span
                      className="antd-pro-pages-dashboard-analysis-rankingItemTitle"
                      title="Gongzhuan No.2 shop"
                    >
                      Gongzhuan No.2 shop
                    </span>
                  </div>

                  <span>323,234</span>
                </li>
                <li className="flex justify-between mt-4">
                  <div>
                    {" "}
                    <span className="mr-3"> 4</span>
                    <span
                      className="antd-pro-pages-dashboard-analysis-rankingItemTitle"
                      title="Gongzhuan No.3 shop"
                    >
                      Gongzhuan No.3 shop
                    </span>
                  </div>

                  <span>323,234</span>
                </li>
                <li className="flex justify-between mt-4">
                  <div>
                    <span className="mr-3"> 5</span>
                    <span
                      className="antd-pro-pages-dashboard-analysis-rankingItemTitle"
                      title="Gongzhuan No.4 shop"
                    >
                      Gongzhuan No.4 shop
                    </span>
                  </div>

                  <span>323,234</span>
                </li>
                <li className="flex justify-between mt-4">
                  <div>
                    <span className="mr-3"> 6</span>
                    <span
                      className="antd-pro-pages-dashboard-analysis-rankingItemTitle"
                      title="Gongzhuan No.5 shop"
                    >
                      Gongzhuan No.5 shop
                    </span>
                  </div>

                  <span>323,234</span>
                </li>
                <li className="flex justify-between mt-4">
                  <div>
                    <span className="mr-3"> 7</span>
                    <span
                      className="antd-pro-pages-dashboard-analysis-rankingItemTitle"
                      title="Gongzhuan No.6 shop"
                    >
                      Gongzhuan No.6 shop
                    </span>
                  </div>

                  <span>323,234</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
