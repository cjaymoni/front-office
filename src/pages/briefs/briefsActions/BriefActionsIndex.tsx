import { Link, useNavigate } from "react-router-dom";
import { ListTable } from "../../../components/table/ListTable";
import { Button } from "primereact/button";
import React, { useEffect, useRef, useState } from "react";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { deleteBriefActionsRequest } from "./mattersActionsApiRequest";

export const BriefActionsIndex = () => {
  const navigate = useNavigate();
  const menu = useRef<Menu>(null);
  const [leadsList, setBriefList] = useState([]);
  const [visible, setVisible] = useState<boolean>(false);
  const buttonEl = useRef(null);
  const [selectedBrief, setSelectedBrief] = useState<any>();

  const briefList = [
    {
      title: "Meeting",
      description: "Discuss case strategy",
      action_type: "Meeting",
      date: "2023-12-10",
      notes: "Important meeting regarding the case.",
      status: "Scheduled",
      assigned_by_id: "staff123",
      assigned_to_id: "staff456",
      assigned_by: {
        staff_id: "staff123",
        name: "John Doe",
        department: "Legal",
      },
      assigned_to: {
        staff_id: "staff456",
        name: "Alice Johnson",
        department: "Legal",
      },
      briefs: [
        {
          brief_id: "b789",
          title: "Legal Case 1",
          description: "Description of the legal case 1",
        },
      ],
      location: "Office",
      cancelled: "No",
      reason_for_cancellation: "",
      creator_id: "creator789",
      created_by: "Admin",
      staffs_assigned: ["staff123", "staff456"],
      participants: ["staff123", "staff789", "staff101"],
      brief: {
        brief_id: "b789",
        title: "Legal Case 1",
        description: "Description of the legal case 1",
      },
    },
    {
      title: "Court Hearing",
      description: "Prepare for upcoming court hearing",
      action_type: "Hearing Preparation",
      date: "2023-11-20",
      notes: "Review case files and prepare arguments.",
      status: "In Progress",
      assigned_by_id: "staff789",
      assigned_to_id: "staff101",
      assigned_by: {
        staff_id: "staff789",
        name: "Emma Smith",
        department: "Legal",
      },
      assigned_to: {
        staff_id: "staff101",
        name: "David Johnson",
        department: "Legal",
      },
      briefs: [
        {
          brief_id: "b456",
          title: "Legal Case 2",
          description: "Description of the legal case 2",
        },
      ],
      location: "Courtroom 2",
      cancelled: "No",
      reason_for_cancellation: "",
      creator_id: "creator456",
      created_by: "Manager",
      staffs_assigned: ["staff789", "staff101"],
      participants: ["staff789", "staff456"],
      brief: {
        brief_id: "b456",
        title: "Legal Case 2",
        description: "Description of the legal case 2",
      },
    },
    {
      title: "Deposition",
      description: "Conduct deposition with witnesses",
      action_type: "Deposition",
      date: "2023-10-05",
      notes: "Prepare questions and gather evidence.",
      status: "Completed",
      assigned_by_id: "staff567",
      assigned_to_id: "staff890",
      assigned_by: {
        staff_id: "staff567",
        name: "Robert Johnson",
        department: "Legal",
      },
      assigned_to: {
        staff_id: "staff890",
        name: "Sarah Adams",
        department: "Legal",
      },
      briefs: [
        {
          brief_id: "b101",
          title: "Legal Case 3",
          description: "Description of the legal case 3",
        },
      ],
      location: "Law Office",
      cancelled: "No",
      reason_for_cancellation: "",
      creator_id: "creator101",
      created_by: "Supervisor",
      staffs_assigned: ["staff567", "staff890"],
      participants: ["staff567", "staff101", "staff456"],
      brief: {
        brief_id: "b101",
        title: "Legal Case 3",
        description: "Description of the legal case 3",
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
      navigate(`/briefs/actions/${selectedBrief.id}/edit`);
    };
    const goToViewPage = () => {
      navigate(`/briefs/actions/${selectedBrief.id}`);
    };

    const deleteBrief = () => {
      deleteBriefActionsRequest(selectedBrief.id);
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
    { field: "action_type", header: "Action Type" },
    { field: "date", header: "Date" },
    { field: "notes", header: "Notes" },
    { field: "status", header: "Status" },
    { field: "assigned_by.name", header: "Assigned By" },
    { field: "assigned_to.name", header: "Assigned To" },
    // Additional columns can be added according to the interface structure
    { header: "Actions", body: actionBodyTemplate },
  ];
  return (
    <div>
      <div className="flex justify-between p-8">
        <span className="text-4xl text-gray-500 font-semibold">
          Brief Actions
        </span>
        <Link to="/briefs/actions/add">
          <Button label="Add Brief Action" icon="pi pi-plus" outlined />
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
