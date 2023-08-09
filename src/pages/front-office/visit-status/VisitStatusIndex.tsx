import { Link, useNavigate } from "react-router-dom";
import { ListTable } from "../../../components/table/ListTable";
import { Button } from "primereact/button";
import React, { useEffect, useRef, useState } from "react";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";

import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import {
  IVisitStatus,
  fetchVisitStatusRequest,
  deleteVisitStatusRequest,
} from "./visitStatusApiRequest";

export const VisitStatusIndex = () => {
  const navigate = useNavigate();
  const menu = useRef<Menu>(null);
  const [visitStatusList, setVisitStatusList] = useState([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedVisitStatus, setSelectedVisitStatus] =
    useState<IVisitStatus>();
  const buttonEl = useRef(null);

  useEffect(() => {
    fetchVisitStatusRequest().then((response) => {
      response.length > 0
        ? setVisitStatusList(response)
        : setVisitStatusList([]);
    });
  }, []);

  const actionBodyTemplate = (rowData: any) => {
    const goToEditPage = () => {
      navigate(`/front-office/visit-status/${selectedVisitStatus.id}/edit`);
    };
    const goToViewPage = () => {
      navigate(`/front-office/visit-status/${selectedVisitStatus.id}`);
    };

    const deleteVisitStatus = () => {
      deleteVisitStatusRequest(selectedVisitStatus.id);
    };

    const accept = () => {
      deleteVisitStatus();
    };

    const showMenu = (event: React.MouseEvent) => {
      setSelectedVisitStatus(rowData);
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
    { field: "status", header: "Status " },
    { field: "description", header: "Description" },
    { header: "Actions", body: actionBodyTemplate },
  ];

  return (
    <div>
      <div className="flex justify-between p-8">
        <span className="text-4xl text-gray-500 font-semibold">
          Visit Statuses
        </span>
        <Link to="/front-office/visit-status/add">
          <Button label="Add Visit Status" icon="pi pi-plus" outlined />
        </Link>
      </div>
      <ListTable
        columns={columns}
        data={visitStatusList}
        globalFilterFields={["status", "description"]}
      />
    </div>
  );
};
