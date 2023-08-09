import { Link, useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import React, { useEffect, useRef, useState } from "react";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";

import { ListTable } from "../../../components/table/ListTable";
import {
  IVisitEntry,
  deleteVisitEntryRequest,
  fetchVisitEntryRequest,
} from "./visitEntryApiRequests";

export const VisitEntryIndex = () => {
  const navigate = useNavigate();
  const menu = useRef<Menu>(null);
  const [visitEntryList, setVisitEntryList] = useState([]);
  const [visible, setVisible] = useState<boolean>(false);
  const buttonEl = useRef(null);
  const [selectedVisitEntry, setSelectedVisitEntry] = useState<IVisitEntry>();

  useEffect(() => {
    fetchVisitEntryRequest().then((response) => {
      response.length > 0 ? setVisitEntryList(response) : setVisitEntryList([]);
    });
  }, []);

  const actionBodyTemplate = (rowData: any) => {
    const goToEditPage = () => {
      navigate(`/front-office/visit-entry/${selectedVisitEntry.id}/edit`);
    };
    const goToViewPage = () => {
      navigate(`/front-office/visit-entry/${selectedVisitEntry.id}`);
    };

    const deleteVisitEntry = () => {
      deleteVisitEntryRequest(selectedVisitEntry.id);
    };

    const accept = () => {
      deleteVisitEntry();
    };
    const showMenu = (event: React.MouseEvent) => {
      setSelectedVisitEntry(rowData);
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
    { field: "visitor_name", header: "Visitor name" },
    { field: "visitor_email", header: "Visitor email" },
    { field: "visitor_phone", header: "Visitor phone" },
    { field: "visit_date", header: "Date" },
    { field: "visit_purpose", header: "Purpose" },

    { header: "Actions", body: actionBodyTemplate },
  ];

  return (
    <div>
      <div className="flex justify-between p-8">
        <span className="text-4xl text-gray-500 font-semibold">
          Visit Entries
        </span>
        <Link to="/front-office/visit-entry/add">
          <Button label="Add Visit Entry" icon="pi pi-plus" outlined />
        </Link>
      </div>
      <ListTable
        columns={columns}
        data={visitEntryList}
        globalFilterFields={[
          "visitor_name",
          "visitor_email",
          "visitor_phone",
          "visit_date",
          "visit_purpose",
        ]}
      />
    </div>
  );
};
