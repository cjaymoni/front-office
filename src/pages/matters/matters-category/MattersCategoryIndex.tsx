import { Link, useNavigate } from "react-router-dom";
import { ListTable } from "../../../components/table/ListTable";
import { Button } from "primereact/button";
import React, { useEffect, useRef, useState } from "react";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { ConfirmPopup } from "primereact/confirmpopup";
import {
  IMattersCategory,
  deleteMatterCategoryRequest,
  fetchMatterCategoryRequest,
} from "./mattersCategoryApiRequests";

export const MattersCategoryIndex = () => {
  const navigate = useNavigate();
  const menu = useRef<Menu>(null);
  const [mattersCategoryList, setMattersCategoryList] = useState([]);
  const [visible, setVisible] = useState<boolean>(false);
  const buttonEl = useRef(null);
  const [selectedMattersCategory, setSelectedMattersCategory] =
    useState<IMattersCategory>();

  useEffect(() => {
    fetchMatterCategoryRequest().then((response) => {
      response.length > 0
        ? setMattersCategoryList(response)
        : setMattersCategoryList([]);
    });
  }, []);

  const actionBodyTemplate = (rowData: any) => {
    const goToEditPage = () => {
      navigate(`/matters/categories/${selectedMattersCategory.id}/edit`);
    };
    const goToViewPage = () => {
      navigate(`/matters/categories/${selectedMattersCategory.id}`);
    };

    const deleteMattersCategory = () => {
      deleteMatterCategoryRequest(selectedMattersCategory.id);
    };

    const accept = () => {
      deleteMattersCategory();
    };
    const showMenu = (event: React.MouseEvent) => {
      setSelectedMattersCategory(rowData);
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
    { field: "name", header: "Name " },
    { field: "description", header: " Description" },
    { header: "Actions", body: actionBodyTemplate },
  ];

  return (
    <div>
      <div className="flex justify-between p-8">
        <span className="text-4xl text-gray-500 font-semibold">
          Matters Category
        </span>
        <Link to="/matters/categories/add">
          <Button label="Add Matters Category" icon="pi pi-plus" outlined />
        </Link>
      </div>
      <ListTable
        columns={columns}
        data={mattersCategoryList}
        globalFilterFields={["name", "description"]}
      />
    </div>
  );
};
