import { Link, useNavigate } from "react-router-dom";
import { ListTable } from "../../components/table/ListTable";
import { Button } from "primereact/button";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { style } from "typestyle";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import {
  IDepartment,
  deleteDepartmentsRequest,
  fetchDepartmentsRequest,
} from "./departmentsApiRequests";

export const DepartmentsIndex = () => {
  const navigate = useNavigate();
  const menu = useRef<Menu>(null);
  const [departmentList, setDepartmentList] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState<IDepartment>();
  const [visible, setVisible] = useState<boolean>(false);
  const buttonEl = useRef(null);

  useEffect(() => {
    fetchDepartmentsRequest().then((response) => {
      response.length > 0 ? setDepartmentList(response) : setDepartmentList([]);
    });
  }, []);

  // const actionBodyTemplate = (rowData: any) => {
  //   const goToEditPage = () => {
  //     navigate(`/departments/${rowData.id}/edit-department`);
  //   };
  //   const goToViewPage = () => {
  //     console.log(rowData);
  //     // navigate(`/departments/${rowData.id}`);
  //   };

  //   const deleteDepartment = () => {
  //     deleteDepartmentsRequest(rowData.id);
  //   };

  //   const accept = () => {
  //     deleteDepartment();
  //   };
  //   const items: MenuItem[] = [
  //     {
  //       label: "View",
  //       icon: "pi pi-eye",
  //       command: () => {
  //         goToViewPage();
  //       },
  //     },
  //     {
  //       label: "Edit",
  //       icon: "pi pi-pencil",
  //       command: () => {
  //         goToEditPage();
  //       },
  //     },

  //     {
  //       label: "Delete",
  //       icon: "pi pi-times",
  //       command: (e) => {
  //         setVisible(true);
  //       },
  //     },
  //   ];

  //   return (
  //     <React.Fragment>
  //       <Menu model={items} popup ref={menu} />
  //       <i
  //         className="pi pi-ellipsis-h cursor-pointer"
  //         onClick={(e) => (menu.current as any).toggle(e)}
  //       ></i>
  //       <ConfirmPopup
  //         target={(buttonEl as any).current}
  //         visible={visible}
  //         onHide={() => setVisible(false)}
  //         accept={accept}
  //         message="Are you sure you want to proceed?"
  //         icon="pi pi-exclamation-triangle"
  //         acceptClassName="p-button-danger"
  //       />
  //     </React.Fragment>
  //   );
  // };
  const menuRef = useCallback((node) => {
    if (node !== null) {
      menu.current = node;
    }
  }, []);
  const actionBodyTemplate = (rowData: any) => {
    const goToEditPage = () => {
      navigate(`/departments/${selectedDepartment.id}/edit-department`);
    };

    const goToViewPage = () => {
      navigate(`/departments/${selectedDepartment.id}`);
    };

    const deleteDepartment = () => {
      deleteDepartmentsRequest(selectedDepartment.id);
    };

    const accept = () => {
      deleteDepartment();
    };

    const showMenu = (event: React.MouseEvent) => {
      setSelectedDepartment(rowData);
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
    { field: "name", header: "Department Name" },
    { field: "location", header: "Location" },
    { header: "Actions", body: actionBodyTemplate },
  ];

  return (
    <div>
      <div className="flex justify-between p-8">
        <span className="text-4xl text-gray-500 font-semibold">Department</span>
        <Link to="/departments/add-department">
          <Button label="Add Department" icon="pi pi-plus" outlined />
        </Link>
      </div>
      <ListTable
        columns={columns}
        data={departmentList}
        globalFilterFields={["name", "location"]}
      />
    </div>
  );
};
