import { Link, useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import React, { useEffect, useRef, useState } from "react";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";

import { ListTable } from "../../../components/table/ListTable";
import {
  IExpectedVisitors,
  deleteExpectedVisitorsRequest,
  fetchExpectedVisitorsRequest,
} from "./expectedVisitorsApiRequest";

export const ExpectedVisitorsIndex = () => {
  const navigate = useNavigate();
  const menu = useRef<Menu>(null);
  const [expectedVisitorsList, setExpectedVisitorsList] = useState([]);
  const [visible, setVisible] = useState<boolean>(false);
  const buttonEl = useRef(null);
  const [selectedExpectedVisitors, setSelectedExpectedVisitors] =
    useState<IExpectedVisitors>();

  useEffect(() => {
    fetchExpectedVisitorsRequest().then((response) => {
      response.length > 0
        ? setExpectedVisitorsList(response)
        : setExpectedVisitorsList([]);
    });
  }, []);

  const actionBodyTemplate = (rowData: any) => {
    const goToEditPage = () => {
      navigate(
        `/front-office/expected-visitors/${selectedExpectedVisitors.id}/edit`
      );
    };
    const goToViewPage = () => {
      navigate(
        `/front-office/expected-visitors/${selectedExpectedVisitors.id}`
      );
    };

    const deleteExpectedVisitors = () => {
      deleteExpectedVisitorsRequest(selectedExpectedVisitors.id);
    };

    const accept = () => {
      deleteExpectedVisitors();
    };
    const showMenu = (event: React.MouseEvent) => {
      setSelectedExpectedVisitors(rowData);
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
    { field: "visitor_name", header: "Visitor name" },
    { field: "visitor_email", header: "Visitor email" },
    { field: "visitor_phone", header: "Visitor phone" },
    { field: "visit_date", header: "Date" },
    { field: "visit_purpose", header: "Purpose" },

    { header: "Actions", body: actionBodyTemplate },
  ];

  return (
    <div>
      <div className="flex justify-between p-8">
        <span className="text-4xl text-gray-500 font-semibold">
          Expected Visitors
        </span>
        <Link to="/front-office/expected-visitors/add">
          <Button label="Add Expected Visitor" icon="pi pi-plus" outlined />
        </Link>
      </div>
      <ListTable
        columns={columns}
        data={expectedVisitorsList}
        globalFilterFields={[
          "visitor_name",
          "visitor_email",
          "visitor_phone",
          "visit_date",
          "visit_purpose",
        ]}
      />
    </div>
  );
};
