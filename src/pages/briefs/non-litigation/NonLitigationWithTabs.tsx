import { Link, useNavigate } from "react-router-dom";
import { ListTable } from "../../../components/table/ListTable";
import { Button } from "primereact/button";
import React, { useEffect, useRef, useState } from "react";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { IBriefs, deleteBriefsRequest } from "../brief/briefApiRequest";
import { TabPanel, TabView } from "primereact/tabview";
import { TransactionsIndex } from "../transactions/TransactionsIndex";
import { LegalOpinionsIndex } from "../legal-opinion/LegalOpinionIndex";
import { MediaCard } from "../../../components/cards/media-card/MediaCard";

export const NonLitigationWithTabsIndex = () => {
  const navigate = useNavigate();
  const menu = useRef<Menu>(null);
  const [leadsList, setBriefList] = useState([]);
  const [visible, setVisible] = useState<boolean>(false);
  const buttonEl = useRef(null);
  const [selectedBrief, setSelectedBrief] = useState<IBriefs>();

  const briefList = [
    {
      id: 1,
      title: "Petty Theft",
      client: "Kofi Amoah",
      start_date: "22-09-12",
      end_date: "22-09-14",
      status: "pending",
    },
    {
      id: 2,
      title: "Arson",
      client: "Yaa Mansa",
      start_date: "22-09-12",
      end_date: "22-09-14",
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
      navigate(`/briefs/nonlitigations/${selectedBrief.id}/edit`);
    };
    const goToViewPage = () => {
      navigate(`/briefs/nonlitigations/${selectedBrief.id}`);
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
    { field: "title", header: "Title" },

    { field: "client", header: "Client Name" },
    { field: "start_date", header: "Start Date" },
    { field: "end_date", header: "End Date" },

    { field: "status", header: "Status" },

    { header: "Actions", body: actionBodyTemplate },
  ];

  return (
    <div>
      <div className="flex justify-between p-8">
        <span className="text-4xl text-gray-500 font-semibold">
          Non Litigation
        </span>
        {/* <Link to="/briefs/nonlitigations/add">
          <Button label="Add Non Litigation" icon="pi pi-plus" outlined />
        </Link> */}
      </div>

      <div className="grid md:grid-cols-4  p-4 gap-4 mb-4">
        <MediaCard
          headerText="Transactions"
          icon="pi pi-briefcase"
          labelValue="12"
          bgColor="bg-pink-100"
          iconColor="text-pink-400"
          route="/briefs/transactions"
        />{" "}
        <MediaCard
          headerText="Legal Opinions"
          icon="pi pi-briefcase"
          labelValue="12"
          bgColor="bg-green-100"
          iconColor="text-green-400"
          route="/briefs/legal-opinions"
        />
      </div>

      <div className="w-full">
        <TabView className="w-full">
          <TabPanel header="Transactions" leftIcon="pi pi-briefcase mr-2">
            <TransactionsIndex />
          </TabPanel>
          <TabPanel header="Legal Opinions" leftIcon="pi pi-briefcase mr-2">
            <LegalOpinionsIndex />
          </TabPanel>
        </TabView>
      </div>
    </div>
  );
};
