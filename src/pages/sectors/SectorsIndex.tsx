import { Link, useNavigate } from "react-router-dom";
import { ListTable } from "../../components/table/ListTable";
import { Button } from "primereact/button";
import React, { useEffect, useRef, useState } from "react";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { style } from "typestyle";
import { ConfirmPopup } from "primereact/confirmpopup";
import {
  ISector,
  deleteSectorsRequest,
  fetchSectorsRequest,
} from "./sectorApiRequest";

export const SectorsIndex = () => {
  const navigate = useNavigate();
  const menu = useRef<Menu>(null);
  const [sectorList, setSectorList] = useState([]);
  const [visible, setVisible] = useState<boolean>(false);
  const buttonEl = useRef(null);
  const [selectedSector, setSelectedSector] = useState<ISector>();

  useEffect(() => {
    fetchSectorsRequest().then((response) => {
      response.length > 0 ? setSectorList(response) : setSectorList([]);
    });
  }, []);

  const actionBodyTemplate = (rowData: any) => {
    const goToEditPage = () => {
      navigate(`/sectors/${selectedSector.id}/edit-sector`);
    };
    const goToViewPage = () => {
      navigate(`/sectors/${selectedSector.id}`);
    };

    const deleteSector = () => {
      deleteSectorsRequest(selectedSector.id);
    };

    const accept = () => {
      deleteSector();
    };
    const showMenu = (event: React.MouseEvent) => {
      setSelectedSector(rowData);
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
    { field: "title", header: "Sector Name" },
    { field: "description", header: "Description" },
    { header: "Actions", body: actionBodyTemplate },
  ];

  return (
    <div>
      <div className="flex justify-between p-8">
        <span className="text-4xl text-gray-500 font-semibold">Sectors</span>
        <Link to="/sectors/add-sector">
          <Button label="Add Sector" icon="pi pi-plus" outlined />
        </Link>
      </div>
      <ListTable
        columns={columns}
        data={sectorList}
        globalFilterFields={["title", "description"]}
      />
    </div>
  );
};
