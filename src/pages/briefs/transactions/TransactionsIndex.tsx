import { Button } from "primereact/button";
import { Link, useNavigate } from "react-router-dom";
import { ConfirmPopup } from "primereact/confirmpopup";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import React, { useRef, useState, useEffect } from "react";
import { ListTable } from "../../../components/table/ListTable";
import {
  ITransaction,
  deleteTransactionRequest,
} from "./transactionApiRequests";

export const TransactionsIndex = () => {
  const navigate = useNavigate();
  const menu = useRef<Menu>(null);
  const [transactionsList, setTransactionsList] = useState([]);
  const [visible, setVisible] = useState<boolean>(false);
  const buttonEl = useRef(null);
  const [selectedBrief, setSelectedBrief] = useState<ITransaction>();

  const transactionList = [
    {
      id: 1,
      name: "Transaction 1",
      user: "Kofi Amoah",
      start_date: "22-09-12",
      end_date: "22-09-14",
      status: "pending",
    },
    {
      id: 2,
      name: "Transaction 2",
      user: "Yaa Mansa",
      start_date: "22-09-12",
      end_date: "22-09-14",
      status: "pending",
    },
  ];
  useEffect(() => {
    // fetchBriefsRequest().then((response) => {
    //   response.length > 0 ? setBriefList(response) : setBriefList([]);
    // });
    setTransactionsList(transactionList);
  }, []);

  const actionBodyTemplate = (rowData: any) => {
    const goToEditPage = () => {
      navigate(`/briefs/transactions/${selectedBrief.id}/edit`);
    };
    const goToViewPage = () => {
      navigate(`/briefs/transactions/${selectedBrief.id}`);
    };

    const deleteBrief = () => {
      deleteTransactionRequest(selectedBrief.id);
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
    { field: "name", header: "Transaction Name" },
    { field: "user", header: "User" },
    { header: "Actions", body: actionBodyTemplate },
  ];

  return (
    <div>
      <div className="flex justify-between p-8">
        <span className="text-4xl text-gray-500 font-semibold">
          Transactions
        </span>
        <Link to="/briefs/transactions/add">
          <Button label="Add Transaction" icon="pi pi-plus" outlined />
        </Link>
      </div>

      <ListTable
        columns={columns}
        data={transactionList}
        globalFilterFields={["name", "user"]}
        exportedFileName="transactions"
      />
    </div>
  );
};
