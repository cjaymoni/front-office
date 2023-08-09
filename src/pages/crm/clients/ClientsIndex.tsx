import { Link, useNavigate } from "react-router-dom";
import { ListTable } from "../../../components/table/ListTable";
import { Button } from "primereact/button";
import React, { useEffect, useRef, useState } from "react";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import {
  IClient,
  deleteClientsRequest,
  fetchClientsRequest,
} from "./clientsApiRequests";

export const ClientsIndex = () => {
  const navigate = useNavigate();
  const menu = useRef<Menu>(null);
  const [clientsList, setClientList] = useState([]);
  const [visible, setVisible] = useState<boolean>(false);
  const buttonEl = useRef(null);
  const [selectedClient, setSelectedClient] = useState<IClient>();

  useEffect(() => {
    fetchClientsRequest().then((response) => {
      response.length > 0 ? setClientList(response) : setClientList([]);

      // setClientList(response ? response : []);
    });
  }, []);

  console.log(clientsList);

  const actionBodyTemplate = (rowData: any) => {
    const goToEditPage = () => {
      navigate(`/crm/clients/${selectedClient.id}/edit`);
    };
    const goToViewPage = () => {
      navigate(`/crm/clients/${selectedClient.id}`);
    };

    const deleteClient = () => {
      deleteClientsRequest(selectedClient.id);
    };

    const accept = () => {
      deleteClient();
    };
    const showMenu = (event: React.MouseEvent) => {
      setSelectedClient(rowData);
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
    { field: "client_registration_number", header: "Registration N0. " },

    { field: "client_type", header: "Client Type " },
    { field: "client_name", header: "Client Name" },
    { field: "mailing_address", header: "Mailing Address" },
    { field: "cellphone_number", header: "Cellphone " },

    { header: "Actions", body: actionBodyTemplate },
  ];

  return (
    <div>
      <div className="flex justify-between p-8">
        <span className="text-4xl text-gray-500 font-semibold">Clients</span>
        <Link to="/crm/clients/add">
          <Button label="Add Client" icon="pi pi-plus" outlined />
        </Link>
      </div>
      <ListTable
        columns={columns}
        data={clientsList}
        globalFilterFields={[
          "client_registration_number",
          "client_type",
          "client_name",
          "mailing_address",
          "cellphone_number",
        ]}
      />
    </div>
  );
};
