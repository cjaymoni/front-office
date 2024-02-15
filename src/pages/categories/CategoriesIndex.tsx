import { Link, useNavigate } from "react-router-dom";
import { ListTable } from "../../components/table/ListTable";
import { Button } from "primereact/button";
import React, { useEffect, useRef, useState } from "react";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { style } from "typestyle";
import { ConfirmPopup } from "primereact/confirmpopup";
import { Dialog } from "primereact/dialog";
import { CategoryForm } from "./CategoryForm";

export const CategoriesIndex = () => {
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
    { field: "category_name", header: "Category Name " },
    { field: "description", header: "Description" },

    { field: "date_added", header: "Date Added" },
    { field: "date_modified", header: "Date Modified" },

    { header: "Actions", body: actionBodyTemplate },
  ];
  const tempCategory = [
    {
      category_name: "Science",
      id: 1,
      description:
        "science is the study of the physical world and its interactions with other objects.",
      date_added: "2022-02-03",
      date_modified: "2022-02-03",
    },
    {
      category_name: "History",
      id: 2,
      description:
        "History is the study of the past. Events occurring before the invention of writing systems are considered prehistory.",
      date_added: "2022-05-04",
      date_modified: "2022-05-04",
    },
    {
      category_name: "Architecture",
      id: 3,
      description:
        "Architecture is the art and science of designing buildings and structures.",
      date_added: "2022-05-04",
      date_modified: "2022-05-04",
    },
  ];
  return (
    <div>
      <div className="flex justify-between p-8">
        <span className="text-4xl text-gray-500 font-semibold">Categories</span>
        <Button
          onClick={() => setDialogVisible(true)}
          label="Add Category"
          icon="pi pi-plus"
          outlined
        />
      </div>
      <ListTable
        columns={columns}
        data={tempCategory}
        globalFilterFields={["category_name", "description"]}
        exportedFileName="sectors"
      />

      <Dialog
        header="Add New Category"
        visible={dialogVisible}
        style={{ width: "50vw" }}
        onHide={() => setDialogVisible(false)}
      >
        <CategoryForm categoryName="" />
      </Dialog>
    </div>
  );
};
