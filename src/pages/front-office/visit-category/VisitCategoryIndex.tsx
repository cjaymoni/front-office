import { Link, useNavigate } from "react-router-dom";
import { ListTable } from "../../../components/table/ListTable";
import { Button } from "primereact/button";
import React, { useEffect, useRef, useState } from "react";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import {
  IVisitCategory,
  deleteVisitCategoryRequest,
  fetchVisitCategoryRequest,
} from "./vistCategoryApiRequest";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";

export const VisitCategoryIndex = () => {
  const navigate = useNavigate();
  const menu = useRef<Menu>(null);
  const [visitCategoryList, setVisitCategoryList] = useState([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedVisitCategory, setSelectedVisitCategory] =
    useState<IVisitCategory>();
  const buttonEl = useRef(null);

  useEffect(() => {
    fetchVisitCategoryRequest().then((response) => {
      response.length > 0
        ? setVisitCategoryList(response)
        : setVisitCategoryList([]);
    });
  }, []);

  const actionBodyTemplate = (rowData: any) => {
    const goToEditPage = () => {
      navigate(`/visit-category/${selectedVisitCategory.id}/edit`);
    };
    const goToViewPage = () => {
      navigate(`/visit-category/${selectedVisitCategory.id}`);
    };

    const deleteVisitCategory = () => {
      deleteVisitCategoryRequest(selectedVisitCategory.id);
    };

    const accept = () => {
      deleteVisitCategory();
    };

    const showMenu = (event: React.MouseEvent) => {
      setSelectedVisitCategory(rowData);
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
        <i
          className="pi pi-ellipsis-h cursor-pointer"
          onClick={showMenu} // Attach the event handler to the icon directly
        ></i>
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
    { field: "category", header: "Category name" },
    { field: "description", header: "Description" },
    { header: "Actions", body: actionBodyTemplate },
  ];

  return (
    <div>
      <div className="flex justify-between p-8">
        <span className="text-4xl text-gray-500 font-semibold">
          Visit Categories
        </span>
        <Link to="/front-office/visit-category/add">
          <Button label="Add Visit Category" icon="pi pi-plus" outlined />
        </Link>
      </div>
      <ListTable
        columns={columns}
        data={visitCategoryList}
        globalFilterFields={["category", "description"]}
      />
    </div>
  );
};
