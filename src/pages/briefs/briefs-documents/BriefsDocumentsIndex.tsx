import { Link, useNavigate } from "react-router-dom";
import { ListTable } from "../../../components/table/ListTable";
import { Button } from "primereact/button";
import React, { useEffect, useRef, useState } from "react";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { ConfirmPopup } from "primereact/confirmpopup";
import {
  IBriefsDocuments,
  deleteBriefDocumentsRequest,
  fetchBriefDocumentsRequest,
} from "./briefsDocumentsApiRequest";

export const BriefsDocumentIndex = () => {
  const navigate = useNavigate();
  const menu = useRef<Menu>(null);
  const [briefsDocumentList, setBriefsDocumentList] = useState([]);
  const [visible, setVisible] = useState<boolean>(false);
  const buttonEl = useRef(null);
  const [selectedBriefsDocument, setSelectedBriefsDocument] =
    useState<IBriefsDocuments>();

  const briefsDocs = [
    {
      id: 1,
      title: "Briefs of Assault",
      description: "an introspect into assault",
      folder_name: "Physical Offences",
    },
  ];

  useEffect(() => {
    setBriefsDocumentList(briefsDocs);
    // fetchBriefDocumentsRequest().then((response) => {
    //   response.length > 0
    //     ? setBriefsDocumentList(response)
    //     : setBriefsDocumentList([]);
    // });
  }, []);

  const actionBodyTemplate = (rowData: any) => {
    const goToEditPage = () => {
      navigate(`/briefs/documents/${selectedBriefsDocument.id}/edit`);
    };
    const goToViewPage = () => {
      navigate(`/briefs/documents/${selectedBriefsDocument.id}`);
    };

    const deleteBriefsDocument = () => {
      deleteBriefDocumentsRequest(selectedBriefsDocument.id);
    };

    const accept = () => {
      deleteBriefsDocument();
    };
    const showMenu = (event: React.MouseEvent) => {
      setSelectedBriefsDocument(rowData);
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
        label: "Download",
        icon: "pi pi-file",
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
    { field: "folder_name", header: "Folder Name" },
    { header: "Actions", body: actionBodyTemplate },
  ];

  return (
    <div>
      <div className="flex justify-between p-8">
        <span className="text-4xl text-gray-500 font-semibold">
          Briefs Document
        </span>
        <Link to="/briefs/documents/add">
          <Button label="Add Briefs Document" icon="pi pi-plus" outlined />
        </Link>
      </div>
      <ListTable
        columns={columns}
        data={briefsDocumentList}
        globalFilterFields={["title", "description"]}
        exportedFileName="briefs-documents"
      />
    </div>
  );
};
