import { Link, useNavigate } from "react-router-dom";
import { ListTable } from "../../../components/table/ListTable";
import { Button } from "primereact/button";
import React, { useEffect, useRef, useState } from "react";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { deletePartnerRequest } from "./partnerApiRequest";

export const PartnersIndex = () => {
  const navigate = useNavigate();
  const menu = useRef<Menu>(null);
  const [leadsList, setBriefList] = useState([]);
  const [visible, setVisible] = useState<boolean>(false);
  const buttonEl = useRef(null);
  const [selectedBrief, setSelectedBrief] = useState<any>();

  const briefList = [
    {
      name: "John Doe",
      partner_initials: "JD",
      authors_initials: "AD",
      phone_number: "123-456-7890",
    },
    {
      name: "Alice Johnson",
      partner_initials: "AJ",
      authors_initials: "AA",
      phone_number: "987-654-3210",
    },
    {
      name: "David Smith",
      partner_initials: "DS",
      authors_initials: "DS",
      phone_number: "567-890-1234",
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
      navigate(`/briefs/partners/${selectedBrief.id}/edit`);
    };
    const goToViewPage = () => {
      navigate(`/briefs/partners/${selectedBrief.id}`);
    };

    const deleteBrief = () => {
      deletePartnerRequest(selectedBrief.id);
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
    { field: "name", header: "Name" },
    { field: "partner_initials", header: "Partner Initials" },
    { field: "authors_initials", header: "Authors Initials" },
    { field: "phone_number", header: "Phone Number" },
    // Additional columns can be added according to the interface structure
    { header: "Actions", body: actionBodyTemplate },
  ];
  return (
    <div>
      <div className="flex justify-between p-8">
        <span className="text-4xl text-gray-500 font-semibold">Partners</span>
        <Link to="/briefs/partners/add">
          <Button label="Add Partner" icon="pi pi-plus" outlined />
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
