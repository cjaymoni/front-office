import { Link, useNavigate } from "react-router-dom";
import { ListTable } from "../../components/table/ListTable";
import { Button } from "primereact/button";
import React, { useRef } from "react";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { style } from "typestyle";

export const LeavesIndex = () => {
  const navigate = useNavigate();
  const menu = useRef<Menu>(null);

  const actionBodyTemplate = (rowData: any) => {
    const goToEditPage = () => {
      navigate(`/leaves/${rowData.id}/edit-leave`);
    };
    const goToViewPage = () => {
      navigate(`/leaves/${rowData.id}`);
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
      },
    ];

    return (
      <React.Fragment>
        <Menu model={items} popup ref={menu} />
        <i
          className="pi pi-ellipsis-h cursor-pointer"
          onClick={(e) => menu.current.toggle(e)}
        ></i>
      </React.Fragment>
    );
  };
  const columns = [
    { field: "code", header: "Code" },
    { field: "name", header: "Name" },
    { field: "category", header: "Category" },
    { field: "quantity", header: "Quantity" },
    { header: "Actions", body: actionBodyTemplate },
  ];
  const tableData = [
    {
      id: "123",
      code: "sdfsghd",
      name: "apple",
      category: "mier",
      quantity: 2,
    },
    {
      id: "456",
      code: "sdfsghd",
      name: "mango",
      category: "mier",
      quantity: 2,
    },
    { id: "789", code: "sdfsghd", name: "pear", category: "mier", quantity: 2 },
    { id: "321", code: "sdfsghd", name: "snsf", category: "mier", quantity: 2 },
  ];
  return (
    <div>
      <div className="flex justify-between p-8">
        <span className="text-4xl text-gray-500 font-semibold">Leaves</span>
        <Link to="/leaves/add-leave">
          <Button label="Add Leave" icon="pi pi-plus" outlined />
        </Link>
      </div>
      <ListTable
        columns={columns}
        data={tableData}
        globalFilterFields={["name"]}
      />
    </div>
  );
};
