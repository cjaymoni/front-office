import { Link, useNavigate } from "react-router-dom";
import { ListTable } from "../../../components/table/ListTable";
import { Button } from "primereact/button";
import React, { useEffect, useRef, useState } from "react";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import {
  IMatters,
  deleteMattersRequest,
  fetchMattersRequest,
} from "./matterApiRequest";

export const MattersIndex = () => {
  const navigate = useNavigate();
  const menu = useRef<Menu>(null);
  const [leadsList, setMatterList] = useState([]);
  const [visible, setVisible] = useState<boolean>(false);
  const buttonEl = useRef(null);
  const [selectedMatter, setSelectedMatter] = useState<IMatters>();

  useEffect(() => {
    fetchMattersRequest().then((response) => {
      response.length > 0 ? setMatterList(response) : setMatterList([]);
    });
  }, []);

  const actionBodyTemplate = (rowData: any) => {
    const goToEditPage = () => {
      navigate(`/matters/matter/${selectedMatter.id}/edit`);
    };
    const goToViewPage = () => {
      navigate(`/matters/matter/${selectedMatter.id}`);
    };

    const deleteMatter = () => {
      deleteMattersRequest(selectedMatter.id);
    };

    const accept = () => {
      deleteMatter();
    };
    const showMenu = (event: React.MouseEvent) => {
      setSelectedMatter(rowData);
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
    { field: "reference_number", header: "Reference No. " },

    { field: "brief", header: "Brief " },
    { field: "fee", header: "Fee" },
    { field: "client_id", header: "Client Id" },
    { field: "date_of_engagement", header: "Date" },
    { field: "status", header: "Status" },

    { header: "Actions", body: actionBodyTemplate },
  ];

  return (
    <div>
      <div className="flex justify-between p-8">
        <span className="text-4xl text-gray-500 font-semibold">Matters</span>
        <Link to="/matters/matter/add">
          <Button label="Add Matter" icon="pi pi-plus" outlined />
        </Link>
      </div>
      <ListTable
        columns={columns}
        data={leadsList}
        globalFilterFields={[
          "reference_number",
          "brief",
          "fee",
          "client_id",
          "date_of_engagement",
          "status",
        ]}
      />
    </div>
  );
};
