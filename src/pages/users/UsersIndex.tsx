import { Link, useNavigate } from "react-router-dom";
import { ListTable } from "../../components/table/ListTable";
import { Button } from "primereact/button";
import React, { useEffect, useRef, useState } from "react";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { style } from "typestyle";
import { ConfirmPopup } from "primereact/confirmpopup";
import { InputTextarea } from "primereact/inputtextarea";
import { Dialog } from "primereact/dialog";
import { UsersForm } from "./UsersForm";

export const UsersIndex = () => {
  const navigate = useNavigate();
  const menu = useRef<Menu>(null);
  const [sectorList, setSectorList] = useState([]);
  const [visible, setVisible] = useState<boolean>(false);
  const buttonEl = useRef(null);
  const [selectedTag, setSelectedTag] = useState();
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
      //   deleteSectorsRequest(selectedTag.id);
    };

    const accept = () => {
      deleteSector();
    };
    const showMenu = (event: React.MouseEvent) => {
      setSelectedTag(rowData);
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
    { field: "first_name", header: "First Name " },
    { field: "last_name", header: "Last Name" },
    { field: "email", header: "Email" },
    { field: "phone", header: "Phone" },
    { field: "role", header: "Role" },
    { field: "status", header: "Status" },

    { header: "Actions", body: actionBodyTemplate },
  ];

  const tempUsers = [
    {
      first_name: "John",
      last_name: "Doe",
      email: "johndoe@mail.com",
      phone: "1234567890",
      role: "Admin",
      status: "Active",
      date_added: "2021-08-09",
      date_modified: "2021-08-09",
    },
    {
      first_name: "Jane",
      last_name: "Doe",
      email: "janedoe@mail.com",
      phone: "1234567890",
      role: "User",
      status: "Active",
      date_added: "2021-08-09",
      date_modified: "2021-08-09",
    },
    {
      first_name: "worla",
      last_name: "Doe",
      email: "worladoe@mail.com",
      phone: "1234567890",
      role: "Editor",
      status: "Active",
      date_added: "2021-08-09",
      date_modified: "2021-08-09",
    },
  ];
  return (
    <div>
      <div className="flex justify-between p-8">
        <span className="text-4xl text-gray-500 font-semibold">Users</span>
        <Button
          onClick={() => setDialogVisible(true)}
          label="Add User"
          icon="pi pi-plus"
          outlined
        />{" "}
      </div>
      <ListTable
        columns={columns}
        data={tempUsers}
        globalFilterFields={["first_name", "last_name", "email"]}
        exportedFileName="users"
      />

      <Dialog
        header="Add New User"
        visible={dialogVisible}
        style={{ width: "50vw" }}
        onHide={() => setDialogVisible(false)}
      >
        <UsersForm />
      </Dialog>
    </div>
  );
};
