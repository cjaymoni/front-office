import { Link, useNavigate } from "react-router-dom";
import { ListTable } from "../../components/table/ListTable";
import { Button } from "primereact/button";
import React, { useEffect, useRef, useState } from "react";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { style } from "typestyle";
import { ConfirmPopup } from "primereact/confirmpopup";
import { Dialog } from "primereact/dialog";
import { KeywordsForm } from "./KeywordsForm";

export const KeywordsIndex = () => {
  const navigate = useNavigate();
  const menu = useRef<Menu>(null);
  const [sectorList, setSectorList] = useState([]);
  const [visible, setVisible] = useState<boolean>(false);
  const buttonEl = useRef(null);
  const [selectedSector, setSelectedSector] = useState();
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);

  //   useEffect(() => {
  //     fetchSectorsRequest().then((response) => {
  //       response.length > 0 ? setSectorList(response) : setSectorList([]);
  //     });
  //   }, []);

  const actionBodyTemplate = (rowData: any) => {
    const goToEditPage = () => {
      setDialogVisible(true);
    };
    const goToViewPage = () => {};

    const deleteSector = () => {
      //   deleteSectorsRequest(selectedSector.id);
    };

    const accept = () => {
      deleteSector();
    };
    const showMenu = (event: React.MouseEvent) => {
      setSelectedSector(rowData);
      event.stopPropagation(); // Prevent event bubbling

      if (menu.current) {
        menu.current.toggle(event);
      }
    };
    const items: MenuItem[] = [
      //   {
      //     label: "View",
      //     icon: "pi pi-eye",
      //     command: () => {
      //       goToViewPage();
      //     },
      //   },
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
    { field: "title", header: "Title " },
    { field: "description", header: "Description" },

    { field: "date_added", header: "Date Added" },
    { field: "date_modified", header: "Date Modified" },

    { header: "Actions", body: actionBodyTemplate },
  ];
  const tempKeyword = [
    {
      title: "Keyword 1",
      description: "This is keyword 1",
      date_added: "2022-09-09",
      date_modified: "2022-09-09",
    },
    {
      title: "Keyword 2",
      description: "This is keyword 2",
      date_added: "2022-09-09",
      date_modified: "2022-09-09",
    },
    {
      title: "Keyword 3",
      description: "This is keyword 3",
      date_added: "2022-09-09",
      date_modified: "2022-09-09",
    },
    {
      title: "Keyword 4",
      description: "This is keyword 4",
      date_added: "2022-09-09",
      date_modified: "2022-09-09",
    },
    {
      title: "Keyword 5",
      description: "This is keyword 5",
      date_added: "2022-09-09",
      date_modified: "2022-09-09",
    },
    {
      title: "Keyword 6",
      description: "This is keyword 6",
      date_added: "2022-09-09",
      date_modified: "2022-09-09",
    },
    {
      title: "Keyword 7",
      description: "This is keyword 7",
      date_added: "2022-09-09",
      date_modified: "2022-09-09",
    },
    {
      title: "Keyword 8",
      description: "This is keyword 8",
      date_added: "2022-09-09",
      date_modified: "2022-09-09",
    },
    {
      title: "Keyword 9",
      description: "This is keyword 9",
      date_added: "2022-09-09",
      date_modified: "2022-09-09",
    },
    {
      title: "Keyword 10",
      description: "This is keyword 10",
      date_added: "2022-09-09",
      date_modified: "2022-09-09",
    },
  ];
  return (
    <div>
      <div className="flex justify-between p-8">
        <span className="text-4xl text-gray-500 font-semibold">Keywords</span>
        <Button
          onClick={() => setDialogVisible(true)}
          label="Add Keyword"
          icon="pi pi-plus"
          outlined
        />
      </div>
      <ListTable
        columns={columns}
        data={tempKeyword}
        globalFilterFields={["title", "description"]}
        exportedFileName="sectors"
      />

      <Dialog
        header="Add New Keyword"
        visible={dialogVisible}
        style={{ width: "50vw" }}
        onHide={() => setDialogVisible(false)}
      >
        <KeywordsForm categoryName="" />
      </Dialog>
    </div>
  );
};
