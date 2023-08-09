import { Link, useNavigate } from "react-router-dom";
import { ListTable } from "../../../components/table/ListTable";
import { Button } from "primereact/button";
import React, { useEffect, useRef, useState } from "react";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import {
  ILeads,
  deleteLeadsRequest,
  fetchLeadsRequest,
} from "./leadsApiRequests";

export const LeadsIndex = () => {
  const navigate = useNavigate();
  const menu = useRef<Menu>(null);
  const [leadsList, setLeadList] = useState([]);
  const [visible, setVisible] = useState<boolean>(false);
  const buttonEl = useRef(null);
  const [selectedLead, setSelectedLead] = useState<ILeads>();

  useEffect(() => {
    fetchLeadsRequest().then((response) => {
      response.length > 0 ? setLeadList(response) : setLeadList([]);

      // setLeadList(response);
    });
  }, []);

  const actionBodyTemplate = (rowData: any) => {
    const goToEditPage = () => {
      navigate(`/crm/leads/${selectedLead.id}/edit`);
    };
    const goToViewPage = () => {
      navigate(`/crm/leads/${selectedLead.id}`);
    };

    const deleteLead = () => {
      deleteLeadsRequest(selectedLead.id);
    };

    const accept = () => {
      deleteLead();
    };
    const showMenu = (event: React.MouseEvent) => {
      setSelectedLead(rowData);
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
    { field: "salutation", header: "Title " },

    { field: "first_name", header: "First Name " },
    { field: "last_name", header: "Last Name" },
    { field: "primary_email", header: "Primary Email" },
    { field: "primary_cellphone", header: "Phone 1" },
    { field: "status", header: "Status" },

    { header: "Actions", body: actionBodyTemplate },
  ];

  return (
    <div>
      <div className="flex justify-between p-8">
        <span className="text-4xl text-gray-500 font-semibold">Leads</span>
        <Link to="/crm/leads/add">
          <Button label="Add Lead" icon="pi pi-plus" outlined />
        </Link>
      </div>
      <ListTable
        columns={columns}
        data={leadsList}
        globalFilterFields={[
          "title",
          "minimum_rating",
          "employee_remarks",
          "maximum_rating",
          "status",
        ]}
      />
    </div>
  );
};
