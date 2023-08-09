import { Link, useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import React, { useEffect, useRef, useState } from "react";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import {
  IIncomingDispatch,
  deleteIncomingDispatchRequest,
  fetchIncomingDispatchRequest,
} from "./incomingDispatchesApiRequests";
import { ListTable } from "../../../../components/table/ListTable";

export const IncomingDispatchesIndex = () => {
  const navigate = useNavigate();
  const menu = useRef<Menu>(null);
  const [incomingDispatchList, setIncomingDispatchList] = useState([]);
  const [visible, setVisible] = useState<boolean>(false);
  const buttonEl = useRef(null);
  const [selectedIncomingDispatch, setSelectedIncomingDispatch] =
    useState<IIncomingDispatch>();

  useEffect(() => {
    fetchIncomingDispatchRequest().then((response) => {
      response.length > 0
        ? setIncomingDispatchList(response)
        : setIncomingDispatchList([]);
    });
  }, []);

  const actionBodyTemplate = (rowData: any) => {
    const goToEditPage = () => {
      navigate(
        `/front-office/incoming-dispatch/${selectedIncomingDispatch.id}/edit`
      );
    };
    const goToViewPage = () => {
      navigate(
        `/front-office/incoming-dispatch/${selectedIncomingDispatch.id}`
      );
    };

    const deleteIncomingDispatch = () => {
      deleteIncomingDispatchRequest(selectedIncomingDispatch.id);
    };

    const accept = () => {
      deleteIncomingDispatch();
    };
    const showMenu = (event: React.MouseEvent) => {
      setSelectedIncomingDispatch(rowData);
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
    { field: "document_title", header: "Document Title" },
    { field: "client", header: "Client" },
    { field: "sender_name", header: "Sender" },
    { field: "receipt_acknowledged", header: "Received" },

    { header: "Actions", body: actionBodyTemplate },
  ];

  return (
    <div>
      <div className="flex justify-between p-8">
        <span className="text-4xl text-gray-500 font-semibold">
          Incoming Dispatch
        </span>
        <Link to="/front-office/incoming-dispatch/add">
          <Button label="Add Incoming Dispatch" icon="pi pi-plus" outlined />
        </Link>
      </div>
      <ListTable
        columns={columns}
        data={incomingDispatchList}
        globalFilterFields={[
          "document_title",
          "client",
          "sender_name",
          "receipt_acknowledged",
          "description",
        ]}
      />
    </div>
  );
};
