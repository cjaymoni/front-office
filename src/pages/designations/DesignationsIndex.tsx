import { Link, useNavigate } from "react-router-dom";
import { ListTable } from "../../components/table/ListTable";
import { Button } from "primereact/button";
import React, { useEffect, useRef, useState } from "react";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import {
  IDesignation,
  deleteDesignationsRequest,
  fetchDesignationsRequest,
} from "./designationsApiRequests";

export const DesignationsIndex = () => {
  const navigate = useNavigate();
  const menu = useRef<Menu>(null);
  const [designationList, setDesignationList] = useState([]);
  const [visible, setVisible] = useState<boolean>(false);
  const buttonEl = useRef(null);
  const [selectedDesignation, setSelectedDesignation] =
    useState<IDesignation>();

  useEffect(() => {
    fetchDesignationsRequest().then((response) => {
      response.length > 0
        ? setDesignationList(response)
        : setDesignationList([]);
    });
  }, []);

  const actionBodyTemplate = (rowData: any) => {
    const goToEditPage = () => {
      navigate(`/designations/${selectedDesignation.id}/edit-designation`);
    };
    const goToViewPage = () => {
      navigate(`/designations/${selectedDesignation.id}`);
    };

    const deleteDesignation = () => {
      deleteDesignationsRequest(selectedDesignation.id);
    };

    const accept = () => {
      deleteDesignation();
    };
    const showMenu = (event: React.MouseEvent) => {
      setSelectedDesignation(rowData);
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
    { field: "title", header: "Designation Title" },
    { field: "min_salary", header: "Minimum Salary" },
    { field: "maximum_salary", header: "Maximum Salary" },
    { field: "rate_per_case", header: "Rate Per Case" },

    { header: "Actions", body: actionBodyTemplate },
  ];

  return (
    <div>
      <div className="flex justify-between p-8">
        <span className="text-4xl text-gray-500 font-semibold">
          Designations
        </span>
        <Link to="/designations/add-designation">
          <Button label="Add Designation" icon="pi pi-plus" outlined />
        </Link>
      </div>
      <ListTable
        columns={columns}
        data={designationList}
        globalFilterFields={["title", "description"]}
      />
    </div>
  );
};
