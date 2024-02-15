import { Link, useNavigate } from "react-router-dom";
import { ListTable } from "../../../components/table/ListTable";
import { Button } from "primereact/button";
import React, { useEffect, useRef, useState } from "react";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import {
  IBriefs,
  deleteBriefsRequest,
  fetchBriefsRequest,
} from "./briefApiRequest";
import { TabPanel, TabView } from "primereact/tabview";
import { MediaCard } from "../../../components/cards/media-card/MediaCard";
import { BriefLitigationIndex } from "../briefs-litigation/BriefsLitigationIndex";
import { NonLitigationIndex } from "../non-litigation/NonLitigationIndex";

export const BriefsIndex = () => {
  const navigate = useNavigate();
  const menu = useRef<Menu>(null);
  const [leadsList, setBriefList] = useState([]);
  const [visible, setVisible] = useState<boolean>(false);
  const buttonEl = useRef(null);
  const [selectedBrief, setSelectedBrief] = useState<IBriefs>();

  const briefList = [
    {
      id: 1,
      reference_number: "RF034842",
      brief: "1",
      fee: 82384,
      client_id: "CLI3249234",
      date_of_engagement: "2023-04-21",
      status: "pending",
    },
    {
      id: 2,
      reference_number: "RF0344242",
      brief: "1",
      fee: 2382384,
      client_id: "CLI32492908",
      date_of_engagement: "2023-06-21",
      status: "pending",
    },
  ];
  useEffect(() => {
    // fetchBriefsRequest().then((response) => {
    //   response.length > 0 ? setBriefList(response) : setBriefList([]);
    // });
    setBriefList(briefList);
  }, []);

  const actionBodyTemplate = (rowData: any) => {
    const goToEditPage = () => {
      navigate(`/briefs/${selectedBrief.id}/edit`);
    };
    const goToViewPage = () => {
      navigate(`/briefs/${selectedBrief.id}`);
    };

    const deleteBrief = () => {
      deleteBriefsRequest(selectedBrief.id);
    };

    const accept = () => {
      deleteBrief();
    };
    const showMenu = (event: React.MouseEvent) => {
      setSelectedBrief(rowData);
      event.stopPropagation(); // Prevent event bubbling

      if (menu.current) {
        menu.current.toggle(event);
      }
    };
    const items: MenuItem[] = [
      {
        label: "View",
        icon: "pi pi-eye",
        command: () => {
          goToViewPage();
        },
      },
      {
        label: "Edit",
        icon: "pi pi-pencil",
        command: () => {
          goToEditPage();
        },
      },

      {
        label: "Delete",
        icon: "pi pi-times",
        command: (e) => {
          setVisible(true);
        },
      },
    ];

    return (
      <React.Fragment>
        <Menu model={items} popup ref={menu} />
        <i className="pi pi-ellipsis-h cursor-pointer" onClick={showMenu}></i>
        <ConfirmPopup
          target={(buttonEl as any).current}
          visible={visible}
          onHide={() => setVisible(false)}
          accept={accept}
          message="Are you sure you want to proceed?"
          icon="pi pi-exclamation-triangle"
          acceptClassName="p-button-danger"
        />
      </React.Fragment>
    );
  };
  const columns = [
    { field: "reference_number", header: "Reference No. " },

    { field: "fee", header: "Fee" },
    { field: "client_id", header: "Client Id" },
    { field: "date_of_engagement", header: "Date" },
    { field: "status", header: "Status" },

    { header: "Actions", body: actionBodyTemplate },
  ];

  return (
    <div>
      <div className="flex justify-between p-8">
        <span className="text-4xl text-gray-500 font-semibold">Briefs</span>
      </div>
      <div className="grid md:grid-cols-4  p-4 gap-4 mb-4">
        <MediaCard
          headerText="Litigation"
          icon="pi pi-briefcase"
          labelValue="12"
          bgColor="bg-pink-100"
          iconColor="text-pink-400"
          route="/briefs/litigations"
        />{" "}
        <MediaCard
          headerText="Non Litigation"
          icon="pi pi-briefcase"
          labelValue="12"
          bgColor="bg-green-100"
          iconColor="text-green-400"
          route="/briefs/nonlitigations"
        />
      </div>
      <div className="w-full">
        <TabView className="w-full">
          <TabPanel header="Litigation" leftIcon="pi pi-briefcase mr-2">
            {/* <div className="flex justify-end ">
              <Link to="/briefs/add">
                <Button label="Add Brief" icon="pi pi-plus" outlined />
              </Link>
            </div> */}
            <BriefLitigationIndex showHeader={false} />
          </TabPanel>

          <TabPanel header="Non Litigation" leftIcon="pi pi-briefcase mr-2">
            <NonLitigationIndex showHeader={false} />
          </TabPanel>
        </TabView>
      </div>
    </div>
  );
};
