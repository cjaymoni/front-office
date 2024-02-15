import { Link, useNavigate } from "react-router-dom";
import { ListTable } from "../../../components/table/ListTable";
import { Button } from "primereact/button";
import React, { useEffect, useRef, useState } from "react";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { deleteBriefExpenseRequest } from "./BriefExpenseApiRequest";

export const BriefsExpenseIndex = () => {
  const navigate = useNavigate();
  const menu = useRef<Menu>(null);
  const [leadsList, setBriefList] = useState([]);
  const [visible, setVisible] = useState<boolean>(false);
  const buttonEl = useRef(null);
  const [selectedBrief, setSelectedBrief] = useState<any>();

  const briefList = [
    {
      title: "Legal Fees",
      description: "Payment for legal services",
      brief_id: "b123",
      phase_code_id: "phase456",
      expense_code_id: "exp789",
      amount: "2500",
      currency: "USD",
      date: "2023-03-15",
      phase_code: "Discovery",
      brief: "Legal Case 1",
    },
    {
      title: "Court Filing",
      description: "Expense for filing court documents",
      brief_id: "b456",
      phase_code_id: "phase101",
      expense_code_id: "exp222",
      amount: "500",
      currency: "USD",
      date: "2023-04-20",
      phase_code: "Pre-trial",
      brief: "Legal Case 2",
    },
    {
      title: "Expert Witness",
      description: "Payment to expert witness",
      brief_id: "b789",
      phase_code_id: "phase333",
      expense_code_id: "exp444",
      amount: "3500",
      currency: "USD",
      date: "2023-05-10",
      phase_code: "Trial",
      brief: "Legal Case 3",
    },
  ];
  useEffect(() => {
    // fetchBriefsRequest().then((response) => {
    //   response.length > 0 ? setBriefList(response) : setBriefList([]);
    // });
    setBriefList(briefList);
  }, []);

  const actionBodyTemplate = (rowData: any) => {
    const goToEditPage = () => {
      navigate(`/briefs/expense/${selectedBrief.id}/edit`);
    };
    const goToViewPage = () => {
      navigate(`/briefs/expense/${selectedBrief.id}`);
    };

    const deleteBrief = () => {
      deleteBriefExpenseRequest(selectedBrief.id);
    };

    const accept = () => {
      deleteBrief();
    };
    const showMenu = (event: React.MouseEvent) => {
      setSelectedBrief(rowData);
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
    { field: "title", header: "Reference No." },
    { field: "amount", header: "Fee" },
    { field: "brief_id", header: "Client Id" },
    { field: "date", header: "Date" },
    { field: "description", header: "Status" },

    { header: "Actions", body: actionBodyTemplate },
  ];

  return (
    <div>
      <div className="flex justify-between p-8">
        <span className="text-4xl text-gray-500 font-semibold">
          Briefs Expenses
        </span>
        <Link to="/briefs/expense/add">
          <Button label="Add Brief Expense" icon="pi pi-plus" outlined />
        </Link>
      </div>
      <ListTable
        columns={columns}
        data={leadsList}
        globalFilterFields={[
          "reference_number",
          "fee",
          "client_id",
          "date_of_engagement",
          "status",
        ]}
        exportedFileName="briefs"
      />
    </div>
  );
};
