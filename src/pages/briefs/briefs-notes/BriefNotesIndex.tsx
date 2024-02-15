import { Link, useNavigate } from "react-router-dom";
import { ListTable } from "../../../components/table/ListTable";
import { Button } from "primereact/button";
import React, { useEffect, useRef, useState } from "react";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { deleteBriefNotesRequest } from "./briefsNotesApiRequests";

export const BriefNotesIndex = () => {
  const navigate = useNavigate();
  const menu = useRef<Menu>(null);
  const [leadsList, setBriefList] = useState([]);
  const [visible, setVisible] = useState<boolean>(false);
  const buttonEl = useRef(null);
  const [selectedBrief, setSelectedBrief] = useState<any>();

  const briefList = [
    {
      id: "note123",
      brief_id: "b456",
      staff_id: "staff789",
      title: "Meeting Summary",
      body: "Discussed case strategy in the meeting.",
      date: "2023-12-15",
      staff: "John Doe",
      brief: {
        brief_id: "b456",
        title: "Legal Case 2",
        description: "Description of the legal case 2",
      },
    },
    {
      id: "note456",
      brief_id: "b789",
      staff_id: "staff101",
      title: "Witness Testimony",
      body: "Recorded witness testimony for the case.",
      date: "2023-11-20",
      staff: "Alice Johnson",
      brief: {
        brief_id: "b789",
        title: "Legal Case 3",
        description: "Description of the legal case 3",
      },
    },
    {
      id: "note789",
      brief_id: "b101",
      staff_id: "staff456",
      title: "Evidence Collection",
      body: "Collected evidence from the crime scene.",
      date: "2023-10-05",
      staff: "David Smith",
      brief: {
        brief_id: "b101",
        title: "Legal Case 1",
        description: "Description of the legal case 1",
      },
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
      navigate(`/briefs/notes/${selectedBrief.id}/edit`);
    };
    const goToViewPage = () => {
      navigate(`/briefs/notes/${selectedBrief.id}`);
    };

    const deleteBrief = () => {
      deleteBriefNotesRequest(selectedBrief.id);
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
    { field: "body", header: "Body" },
    { field: "date", header: "Date" },
    { field: "staff", header: "Staff" },
    // Additional columns can be added according to the interface structure
    { header: "Actions", body: actionBodyTemplate },
  ];
  return (
    <div>
      <div className="flex justify-between p-8">
        <span className="text-4xl text-gray-500 font-semibold">
          Brief Notes
        </span>
        <Link to="/briefs/notes/add">
          <Button label="Add Brief Note" icon="pi pi-plus" outlined />
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
