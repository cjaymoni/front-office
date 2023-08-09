import { Link, useNavigate } from "react-router-dom";
import { ListTable } from "../../components/table/ListTable";
import { Button } from "primereact/button";
import React, { useEffect, useRef, useState } from "react";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { style } from "typestyle";
import {
  IStaff,
  deleteStaffRequest,
  fetchStaffRequest,
} from "./staffApiRequests";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";

export const StaffIndex = () => {
  const navigate = useNavigate();
  const menu = useRef<Menu>(null);
  const [staffList, setStaffList] = useState([]);
  const [visible, setVisible] = useState<boolean>(false);
  const buttonEl = useRef(null);
  const [selectedStaff, setSelectedStaff] = useState<IStaff>();

  useEffect(() => {
    fetchStaffRequest().then((response) => {
      response.length > 0 ? setStaffList(response) : setStaffList([]);
    });
  }, []);

  const actionBodyTemplate = (rowData: any) => {
    const goToEditPage = () => {
      navigate(`/staff/${selectedStaff.id}/edit-staff`);
    };
    const goToViewPage = () => {
      navigate(`/staff/${selectedStaff.id}`);
    };

    const deleteStaff = () => {
      deleteStaffRequest(selectedStaff.id);
    };

    const accept = () => {
      deleteStaff();
    };
    const showMenu = (event: React.MouseEvent) => {
      setSelectedStaff(rowData);
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
    { field: "first_name", header: "First Name" },
    { field: "last_name", header: "Last Name" },
    { field: "date_of_birth", header: "DOB" },
    { field: "cellphone_1", header: "Phone 1" },
    { header: "Actions", body: actionBodyTemplate },
  ];

  return (
    <div>
      <div className="flex justify-between p-8">
        <span className="text-4xl text-gray-500 font-semibold">Staff</span>
        <Link to="/staff/add-staff">
          <Button label="Add Staff" icon="pi pi-plus" outlined />
        </Link>
      </div>
      <ListTable
        columns={columns}
        data={staffList}
        globalFilterFields={[
          "first_name",
          "last_name",
          "date_of_birth",
          "cellphone_1",
        ]}
      />
    </div>
  );
};
