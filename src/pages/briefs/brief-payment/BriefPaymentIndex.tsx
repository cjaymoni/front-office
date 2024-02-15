import { Link, useNavigate } from "react-router-dom";
import { ListTable } from "../../../components/table/ListTable";
import { Button } from "primereact/button";
import React, { useEffect, useRef, useState } from "react";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import {
  IBriefPayment,
  deleteBriefPaymentRequest,
} from "./BriefPaymentApiREquest";

export const BriefsPaymentIndex = () => {
  const navigate = useNavigate();
  const menu = useRef<Menu>(null);
  const [leadsList, setBriefList] = useState([]);
  const [visible, setVisible] = useState<boolean>(false);
  const buttonEl = useRef(null);
  const [selectedBrief, setSelectedBrief] = useState<IBriefPayment>();

  const briefList = [
    {
      brief_id: "abc123",
      reference: "REF456",
      description: "Random payment description 1",
      invoice_reference: "INV789",
      amount: "100.00",
      currency: "USD",
      payment_date: "2023-12-05",
      mode: "Online",
      id: "xyz789",
      brief: {
        brief_id: "briefID123",
        title: "Sample Brief Title 1",
        // ... Other properties for IBriefs
      },
    },
    {
      brief_id: "def456",
      reference: "REF789",
      description: "Random payment description 2",
      invoice_reference: "INV101",
      amount: "75.50",
      currency: "EUR",
      payment_date: "2023-11-20",
      mode: "Offline",
      id: "uvw456",
      brief: {
        brief_id: "briefID456",
        title: "Sample Brief Title 2",
        // ... Other properties for IBriefs
      },
    },
    {
      brief_id: "ghi789",
      reference: "REF123",
      description: "Random payment description 3",
      invoice_reference: "INV202",
      amount: "150.75",
      currency: "GBP",
      payment_date: "2023-10-15",
      mode: "Online",
      id: "rst123",
      brief: {
        brief_id: "briefID789",
        title: "Sample Brief Title 3",
        // ... Other properties for IBriefs
      },
    },
    {
      brief_id: "jkl012",
      reference: "REF345",
      description: "Random payment description 4",
      invoice_reference: "INV505",
      amount: "200.25",
      currency: "JPY",
      payment_date: "2023-09-28",
      mode: "Offline",
      id: "pqr789",
      brief: {
        brief_id: "briefID012",
        title: "Sample Brief Title 4",
        // ... Other properties for IBriefs
      },
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
      navigate(`/briefs/payment/${selectedBrief.id}/edit`);
    };
    const goToViewPage = () => {
      navigate(`/briefs/payment/${selectedBrief.id}`);
    };

    const deleteBrief = () => {
      deleteBriefPaymentRequest(selectedBrief.id);
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
    { field: "reference", header: "Reference No. " },
    { field: "amount", header: "Fee" },
    { field: "brief_id", header: "Client Id" },
    { field: "payment_date", header: "Date" },
    { field: "mode", header: "Status" },

    { header: "Actions", body: actionBodyTemplate },
  ];

  return (
    <div>
      <div className="flex justify-between p-8">
        <span className="text-4xl text-gray-500 font-semibold">
          Transactions
        </span>
        <Link to="/briefs/payment/add">
          <Button label="Add Transaction" icon="pi pi-plus" outlined />
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
