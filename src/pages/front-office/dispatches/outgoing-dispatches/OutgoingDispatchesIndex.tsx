import { Link, useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import React, { useEffect, useRef, useState } from "react";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";

import { ListTable } from "../../../../components/table/ListTable";
import {
  IOutgoingDispatch,
  deleteOutgoingDispatchRequest,
  fetchOutgoingDispatchRequest,
} from "./outgoingDispatchesApiRequests";

export const OutgoingDispatchesIndex = () => {
  const navigate = useNavigate();
  const menu = useRef<Menu>(null);
  const [outgoingDispatchList, setOutgoingDispatchList] = useState([]);
  const [visible, setVisible] = useState<boolean>(false);
  const buttonEl = useRef(null);
  const [selectedOutgoingDispatch, setSelectedOutgoingDispatch] =
    useState<IOutgoingDispatch>();

  useEffect(() => {
    fetchOutgoingDispatchRequest().then((response) => {
      response.length > 0
        ? setOutgoingDispatchList(response)
        : setOutgoingDispatchList([]);
    });
  }, []);

  const actionBodyTemplate = (rowData: any) => {
    const goToEditPage = () => {
      navigate(`/outgoing-dispatch/${selectedOutgoingDispatch.id}/edit`);
    };
    const goToViewPage = () => {
      navigate(`/outgoing-dispatch/${selectedOutgoingDispatch.id}`);
    };

    const deleteOutgoingDispatch = () => {
      deleteOutgoingDispatchRequest(selectedOutgoingDispatch.id);
    };

    const accept = () => {
      deleteOutgoingDispatch();
    };
    const showMenu = (event: React.MouseEvent) => {
      setSelectedOutgoingDispatch(rowData);
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
  const dummyList = [
    {
      id: 1,
      serial_no: "UQWr2341",
      document_title: "Document 1",
      reference_number: "RF9541",
      date: "2021-09-30",
      created_at: "2021-09-30T13:13:09.000000Z",
      updated_at: "2021-09-30T13:13:09.000000Z",
    },
    {
      id: 2,
      serial_no: "SN9r2341",
      document_title: "Document 2",
      reference_number: "RF989541",
      date: "2021-09-30",
      created_at: "2021-09-30T13:13:09.000000Z",
      updated_at: "2021-09-30T13:13:09.000000Z",
    },
  ];
  const columns = [
    { field: "serial_no", header: "Serial number" },

    { field: "document_title", header: "Document Title" },
    { field: "reference_number", header: "Reference number" },

    { field: "date", header: "Date" },

    { header: "Actions", body: actionBodyTemplate },
  ];

  return (
    <div>
      <div className="flex justify-between p-8">
        <span className="text-4xl text-gray-500 font-semibold">
          Outgoing Dispatch
        </span>
        <Link to="/outgoing-dispatch/add">
          <Button label="Add Outgoing Dispatch" icon="pi pi-plus" outlined />
        </Link>
      </div>
      <ListTable
        columns={columns}
        data={dummyList}
        globalFilterFields={[
          "document_title",
          "serial_no",
          "reference_number",
          "date",
        ]}
        exportedFileName="outgoing-dispatches"
      />
    </div>
  );
};
