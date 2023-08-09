import { Link, useNavigate } from "react-router-dom";
import { ListTable } from "../../../components/table/ListTable";
import { Button } from "primereact/button";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { style } from "typestyle";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import {
  IOfficeAreas,
  deleteOfficeAreasRequest,
  fetchOfficeAreasRequest,
} from "./officeAreasApiRequest";

export const OfficeAreasIndex = () => {
  const navigate = useNavigate();
  const menu = useRef<Menu>(null);
  const [officeAreaList, setOfficeAreaList] = useState([]);
  const [selectedOfficeArea, setSelectedOfficeArea] = useState<IOfficeAreas>();
  const [visible, setVisible] = useState<boolean>(false);
  const buttonEl = useRef(null);

  useEffect(() => {
    fetchOfficeAreasRequest().then((response) => {
      response.length > 0 ? setOfficeAreaList(response) : setOfficeAreaList([]);
    });
  }, []);

  const menuRef = useCallback((node) => {
    if (node !== null) {
      menu.current = node;
    }
  }, []);
  const actionBodyTemplate = (rowData: any) => {
    const goToEditPage = () => {
      navigate(`/front-office/office-areas/${selectedOfficeArea.id}/edit`);
    };

    const goToViewPage = () => {
      navigate(`/front-office/office-areas/${selectedOfficeArea.id}`);
    };

    const deleteOfficeArea = () => {
      deleteOfficeAreasRequest(selectedOfficeArea.id);
    };

    const accept = () => {
      deleteOfficeArea();
    };

    const showMenu = (event: React.MouseEvent) => {
      setSelectedOfficeArea(rowData);
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
        <i
          className="pi pi-ellipsis-h cursor-pointer"
          onClick={showMenu} // Attach the event handler to the icon directly
        ></i>
        <Menu model={items} popup ref={menuRef} />
        <ConfirmPopup
          // target={menu.current} // Use the menuRef as the target for the ConfirmPopup
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
    { field: "name", header: "Office Area Name" },
    { field: "description", header: "Description" },
    { header: "Actions", body: actionBodyTemplate },
  ];

  return (
    <div>
      <div className="flex justify-between p-8">
        <span className="text-4xl text-gray-500 font-semibold">
          Office Area
        </span>
        <Link to="/front-office/office-areas/add">
          <Button label="Add Office Area" icon="pi pi-plus" outlined />
        </Link>
      </div>
      <ListTable
        columns={columns}
        data={officeAreaList}
        globalFilterFields={["name", "description"]}
      />
    </div>
  );
};
