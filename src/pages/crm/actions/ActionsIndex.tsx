import { Link, useNavigate } from "react-router-dom";
import { ListTable } from "../../../components/table/ListTable";
import { Button } from "primereact/button";
import React, { useEffect, useRef, useState } from "react";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import {
  IActions,
  deleteActionsRequest,
  fetchActionsRequest,
} from "./actionsApiRequests";

export const ActionsIndex = () => {
  const navigate = useNavigate();
  const menu = useRef<Menu>(null);
  const [actionsList, setActionList] = useState([]);
  const [visible, setVisible] = useState<boolean>(false);
  const buttonEl = useRef(null);
  const [selectedAction, setSelectedAction] = useState<IActions>();

  useEffect(() => {
    fetchActionsRequest().then((response) => {
      response.length > 0 ? setActionList(response) : setActionList([]);
    });
  }, []);

  console.log(actionsList);

  const actionBodyTemplate = (rowData: any) => {
    const goToEditPage = () => {
      navigate(`/crm/actions/${selectedAction.id}/edit`);
    };
    const goToViewPage = () => {
      navigate(`/crm/actions/${selectedAction.id}`);
    };

    const deleteAction = () => {
      deleteActionsRequest(selectedAction.id);
    };

    const accept = () => {
      deleteAction();
    };
    const showMenu = (event: React.MouseEvent) => {
      setSelectedAction(rowData);
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
    { field: "name", header: "Name" },

    { field: "description", header: "Description" },
    { field: "priority", header: "Priority" },
    { field: "start_date_time", header: "Start Date" },
    { field: "close_date_time", header: "End Date " },

    { header: "Actions", body: actionBodyTemplate },
  ];

  return (
    <div>
      <div className="flex justify-between p-8">
        <span className="text-4xl text-gray-500 font-semibold">Actions</span>
        <Link to="/crm/actions/add">
          <Button label="Add Action" icon="pi pi-plus" outlined />
        </Link>
      </div>
      <ListTable
        columns={columns}
        data={actionsList}
        globalFilterFields={[
          "name",
          "description",
          "priority",
          "start_date_time",
          "close_date_time",
        ]}
      />
    </div>
  );
};
