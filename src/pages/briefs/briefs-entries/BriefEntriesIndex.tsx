import { Link, useNavigate } from "react-router-dom";
import { ListTable } from "../../../components/table/ListTable";
import { Button } from "primereact/button";
import React, { useEffect, useRef, useState } from "react";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { deleteBriefEntriesRequest } from "./briefsEntriesApiRequests";

export const BriefEntriesIndex = () => {
  const navigate = useNavigate();
  const menu = useRef<Menu>(null);
  const [leadsList, setBriefList] = useState([]);
  const [visible, setVisible] = useState<boolean>(false);
  const buttonEl = useRef(null);
  const [selectedBrief, setSelectedBrief] = useState<any>();

  const briefList = [
    {
      id: "entry123",
      brief_id: "b456",
      title: "Client Meeting",
      description: "Meeting with the client to discuss case updates.",
      activity_code_id: "act789",
      start_time: "2023-12-15T09:00:00",
      end_time: "2023-12-15T10:30:00",
      brief: {
        brief_id: "b456",
        title: "Legal Case 2",
        description: "Description of the legal case 2",
      },
      activity: {
        activity_code_id: "act789",
        activity_name: "Meeting",
      },
      brief_phase_id: "phase456",
      date: "2023-12-15",
      phase: "Discovery",
    },
    {
      id: "entry456",
      brief_id: "b789",
      title: "Evidence Collection",
      description: "Collecting evidence from the crime scene.",
      activity_code_id: "act101",
      start_time: "2023-11-20T11:00:00",
      end_time: "2023-11-20T13:00:00",
      brief: {
        brief_id: "b789",
        title: "Legal Case 3",
        description: "Description of the legal case 3",
      },
      activity: {
        activity_code_id: "act101",
        activity_name: "Evidence Collection",
      },
      brief_phase_id: "phase101",
      date: "2023-11-20",
      phase: "Pre-trial",
    },
    {
      id: "entry789",
      brief_id: "b101",
      title: "Court Hearing",
      description: "Attending court hearing for legal proceedings.",
      activity_code_id: "act456",
      start_time: "2023-10-05T09:30:00",
      end_time: "2023-10-05T12:00:00",
      brief: {
        brief_id: "b101",
        title: "Legal Case 1",
        description: "Description of the legal case 1",
      },
      activity: {
        activity_code_id: "act456",
        activity_name: "Court Hearing",
      },
      brief_phase_id: "phase789",
      date: "2023-10-05",
      phase: "Trial",
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
      navigate(`/briefs/entries/${selectedBrief.id}/edit`);
    };
    const goToViewPage = () => {
      navigate(`/briefs/entries/${selectedBrief.id}`);
    };

    const deleteBrief = () => {
      deleteBriefEntriesRequest(selectedBrief.id);
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
    { field: "description", header: "Description" },
    { field: "activity.activity_name", header: "Activity" },
    { field: "date", header: "Date" },
    { field: "start_time", header: "Start Time" },
    { field: "end_time", header: "End Time" },
    { field: "brief.title", header: "Brief Title" },
    { field: "phase", header: "Phase" }, // Additional columns can be added according to the interface structure
    { header: "Actions", body: actionBodyTemplate },
  ];
  return (
    <div>
      <div className="flex justify-between p-8">
        <span className="text-4xl text-gray-500 font-semibold">
          Brief Entries
        </span>
        <Link to="/briefs/entries/add">
          <Button label="Add Brief Entry" icon="pi pi-plus" outlined />
        </Link>
      </div>
      <ListTable
        columns={columns}
        data={leadsList}
        globalFilterFields={[
          "reference_number",
          "fee",
          "client_id",
          "date_of_engagement",
          "status",
        ]}
        exportedFileName="briefs"
      />
    </div>
  );
};
