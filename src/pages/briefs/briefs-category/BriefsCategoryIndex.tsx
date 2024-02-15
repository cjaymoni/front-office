import { Link, useNavigate } from "react-router-dom";
import { ListTable } from "../../../components/table/ListTable";
import { Button } from "primereact/button";
import React, { useEffect, useRef, useState } from "react";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { ConfirmPopup } from "primereact/confirmpopup";
import {
  IBriefsCategory,
  deleteBriefCategoryRequest,
  fetchBriefCategoryRequest,
} from "./briefsCategoryApiRequests";

export const BriefsCategoryIndex = () => {
  const navigate = useNavigate();
  const menu = useRef<Menu>(null);
  const [briefsCategoryList, setBriefsCategoryList] = useState([]);
  const [visible, setVisible] = useState<boolean>(false);
  const buttonEl = useRef(null);
  const [selectedBriefsCategory, setSelectedBriefsCategory] =
    useState<IBriefsCategory>();
  const briefCats = [
    {
      id: 1,
      name: "Arson",
      description: "deliberate cause of fire",
    },
    {
      id: 2,
      name: "Assault",
      description: "deliberate cause of physical harm",
    },
  ];
  useEffect(() => {
    setBriefsCategoryList(briefCats);
    // fetchBriefCategoryRequest().then((response) => {
    //   response.length > 0
    //     ? setBriefsCategoryList(response)
    //     : setBriefsCategoryList([]);
    // });
  }, []);

  const actionBodyTemplate = (rowData: any) => {
    const goToEditPage = () => {
      navigate(`/briefs/categories/${selectedBriefsCategory.id}/edit`);
    };
    const goToViewPage = () => {
      navigate(`/briefs/categories/${selectedBriefsCategory.id}`);
    };

    const deleteBriefsCategory = () => {
      deleteBriefCategoryRequest(selectedBriefsCategory.id);
    };

    const accept = () => {
      deleteBriefsCategory();
    };
    const showMenu = (event: React.MouseEvent) => {
      setSelectedBriefsCategory(rowData);
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
          Briefs Category
        </span>
        <Link to="/briefs/categories/add">
          <Button label="Add Briefs Category" icon="pi pi-plus" outlined />
        </Link>
      </div>
      <ListTable
        columns={columns}
        data={briefsCategoryList}
        globalFilterFields={["name", "description"]}
        exportedFileName="briefs-category"
      />
    </div>
  );
};
