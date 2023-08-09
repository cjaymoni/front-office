import { Link, useNavigate } from "react-router-dom";
import { ListTable } from "../../../components/table/ListTable";
import { Button } from "primereact/button";
import React, { useEffect, useRef, useState } from "react";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import {
  IFirmTarget,
  deleteFirmTargetsRequest,
  fetchFirmTargetsRequest,
} from "./firmTargetApiRequest";

export const FirmTargetsIndex = () => {
  const navigate = useNavigate();
  const menu = useRef<Menu>(null);
  const [firmTargetsList, setFirmTargetList] = useState([]);
  const [visible, setVisible] = useState<boolean>(false);
  const buttonEl = useRef(null);
  const [selectedFirmTarget, setSelectedFirmTarget] = useState<IFirmTarget>();

  useEffect(() => {
    fetchFirmTargetsRequest().then((response) => {
      response.length > 0 ? setFirmTargetList(response) : setFirmTargetList([]);
    });
  }, []);

  const actionBodyTemplate = (rowData: any) => {
    const goToEditPage = () => {
      navigate(`/firm-targets/${selectedFirmTarget.id}/edit`);
    };
    const goToViewPage = () => {
      navigate(`/firm-targets/${selectedFirmTarget.id}`);
    };

    const deleteFirmTarget = () => {
      deleteFirmTargetsRequest(selectedFirmTarget.id);
    };

    const accept = () => {
      deleteFirmTarget();
    };
    const showMenu = (event: React.MouseEvent) => {
      setSelectedFirmTarget(rowData);
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
    { field: "title", header: "Title " },
    { field: "minimum_rating", header: "Minimum rating " },
    { field: "maximum_rating", header: "Maximum rating" },
    { field: "employee_remarks", header: "Employee remarks" },
    { field: "status", header: "Status" },

    { header: "Actions", body: actionBodyTemplate },
  ];

  return (
    <div>
      <div className="flex justify-between p-8">
        <span className="text-4xl text-gray-500 font-semibold">
          Firm Targets
        </span>
        <Link to="/firm-targets/add">
          <Button label="Add Firm Target" icon="pi pi-plus" outlined />
        </Link>
      </div>
      <ListTable
        columns={columns}
        data={firmTargetsList}
        globalFilterFields={[
          "title",
          "minimum_rating",
          "employee_remarks",
          "maximum_rating",
          "status",
        ]}
      />
    </div>
  );
};
