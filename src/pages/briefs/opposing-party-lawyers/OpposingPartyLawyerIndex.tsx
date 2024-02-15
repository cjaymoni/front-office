import { Link, useNavigate } from "react-router-dom";
import { ListTable } from "../../../components/table/ListTable";
import { Button } from "primereact/button";
import React, { useEffect, useRef, useState } from "react";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { deleteOpposingPartyLawyersRequest } from "./opposingPartyLawyerApiRequests";

export const OpposingPartyLawyerIndex = () => {
  const navigate = useNavigate();
  const menu = useRef<Menu>(null);
  const [leadsList, setBriefList] = useState([]);
  const [visible, setVisible] = useState<boolean>(false);
  const buttonEl = useRef(null);
  const [selectedBrief, setSelectedBrief] = useState<any>();

  const briefList = [
    {
      id: "lawyer1",
      brief_id: "b123",
      name: "Jane Smith",
      opposing_party_id: "opp123",
      description: "Representing client in legal case",
      email: "jane.smith@example.com",
      phone: "+1-555-1111",
      brief: [
        {
          brief_id: "b123",
          title: "Legal Case 1",
          description: "Description of the legal case 1",
          date_filed: "2023-01-15",
        },
        {
          brief_id: "b456",
          title: "Legal Case 2",
          description: "Description of the legal case 2",
          date_filed: "2023-02-20",
        },
      ],
      opposing_party: [
        {
          id: "opp123",
          brief_id: "b123",
          first_name: "John",
          last_name: "Doe",
          address: "123 Main St, Cityville",
          email: "john.doe@example.com",
          phone: "+1-555-1234",
          brief: [
            {
              brief_id: "b123",
              title: "Legal Case 1",
              description: "Description of the legal case 1",
              date_filed: "2023-01-15",
            },
            {
              brief_id: "b456",
              title: "Legal Case 2",
              description: "Description of the legal case 2",
              date_filed: "2023-02-20",
            },
          ],
          litigation_id: "lit456",
          litigation: {
            litigation_id: "lit456",
            case_type: "Civil",
            court_name: "Cityville Circuit Court",
            judge_name: "Judge Smith",
            status: "Ongoing",
          },
        },
        // Add more opposing party data here if needed
      ],
    },

    {
      id: "lawyer2",
      brief_id: "b789",
      name: "David Johnson",
      opposing_party_id: "opp456",
      description: "Handling legal matters for the client",
      email: "david.johnson@example.com",
      phone: "+1-555-2222",
      brief: [
        {
          brief_id: "b789",
          title: "Legal Case 3",
          description: "Description of the legal case 3",
          date_filed: "2023-04-10",
        },
        {
          brief_id: "b101",
          title: "Legal Case 4",
          description: "Description of the legal case 4",
          date_filed: "2023-06-25",
        },
      ],
      opposing_party: [
        // Opposing Party Data for Lawyer 2
        {
          id: "opp456",
          brief_id: "b789",
          first_name: "Alice",
          last_name: "Johnson",
          address: "456 Oak Avenue, Townsville",
          email: "alice.johnson@example.com",
          phone: "+1-555-5678",
          brief: [
            {
              brief_id: "b789",
              title: "Legal Case 3",
              description: "Description of the legal case 3",
              date_filed: "2023-04-10",
            },
            {
              brief_id: "b101",
              title: "Legal Case 4",
              description: "Description of the legal case 4",
              date_filed: "2023-06-25",
            },
          ],
          litigation_id: "lit789",
          litigation: {
            litigation_id: "lit789",
            case_type: "Criminal",
            court_name: "Townsville District Court",
            judge_name: "Judge Rodriguez",
            status: "Pending",
          },
        },
      ],
    },
    // Add more lawyer data here if needed
  ];
  useEffect(() => {
    // fetchBriefsRequest().then((response) => {
    //   response.length > 0 ? setBriefList(response) : setBriefList([]);
    // });
    setBriefList(briefList);
  }, []);

  const actionBodyTemplate = (rowData: any) => {
    const goToEditPage = () => {
      navigate(`/briefs/opposing/party/lawyer/${selectedBrief.id}/edit`);
    };
    const goToViewPage = () => {
      navigate(`/briefs/opposing/party/lawyer/${selectedBrief.id}`);
    };

    const deleteBrief = () => {
      deleteOpposingPartyLawyersRequest(selectedBrief.id);
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
    { field: "name", header: " Name" },
    { field: "address", header: "Address" },
    { field: "email", header: "Email" },
    { field: "phone", header: "Phone" },
    // Additional columns can be added according to the interface structure
    { header: "Actions", body: actionBodyTemplate },
  ];

  return (
    <div>
      <div className="flex justify-between p-8">
        <span className="text-4xl text-gray-500 font-semibold">
          Opposing Parties Lawyers
        </span>
        <Link to="/briefs/opposing/party/lawyer/add">
          <Button
            label="Add Opposing Party Lawyer"
            icon="pi pi-plus"
            outlined
          />
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
