import { Link, useNavigate } from "react-router-dom";
import { ListTable } from "../../../components/table/ListTable";
import { Button } from "primereact/button";
import React, { useEffect, useRef, useState } from "react";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { ConfirmPopup } from "primereact/confirmpopup";
import {
  IMattersDocuments,
  deleteMatterDocumentsRequest,
  fetchMatterDocumentsRequest,
} from "./mattersDocumentsApiRequest";

export const MattersDocumentIndex = () => {
  const navigate = useNavigate();
  const menu = useRef<Menu>(null);
  const [mattersDocumentList, setMattersDocumentList] = useState([]);
  const [visible, setVisible] = useState<boolean>(false);
  const buttonEl = useRef(null);
  const [selectedMattersDocument, setSelectedMattersDocument] =
    useState<IMattersDocuments>();

  useEffect(() => {
    fetchMatterDocumentsRequest().then((response) => {
      response.length > 0
        ? setMattersDocumentList(response)
        : setMattersDocumentList([]);
    });
  }, []);

  const actionBodyTemplate = (rowData: any) => {
    const goToEditPage = () => {
      navigate(`/matters/documents/${selectedMattersDocument.id}/edit`);
    };
    const goToViewPage = () => {
      navigate(`/matters/documents/${selectedMattersDocument.id}`);
    };

    const deleteMattersDocument = () => {
      deleteMatterDocumentsRequest(selectedMattersDocument.id);
    };

    const accept = () => {
      deleteMattersDocument();
    };
    const showMenu = (event: React.MouseEvent) => {
      setSelectedMattersDocument(rowData);
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
    { field: "title", header: "Name " },
    { field: "description", header: " Description" },
    { field: "folder_name", header: "Folder Naem" },
    { header: "Actions", body: actionBodyTemplate },
  ];

  return (
    <div>
      <div className="flex justify-between p-8">
        <span className="text-4xl text-gray-500 font-semibold">
          Matters Document
        </span>
        <Link to="/matters/documents/add">
          <Button label="Add Matters Document" icon="pi pi-plus" outlined />
        </Link>
      </div>
      <ListTable
        columns={columns}
        data={mattersDocumentList}
        globalFilterFields={["title", "description"]}
      />
    </div>
  );
};
