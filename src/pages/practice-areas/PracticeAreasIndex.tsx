import { Link, useNavigate } from "react-router-dom";
import { ListTable } from "../../components/table/ListTable";
import { Button } from "primereact/button";
import React, { useEffect, useRef, useState } from "react";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import {
  IPracticeArea,
  deletePracticeAreasRequest,
  fetchPracticeAreasRequest,
} from "./practiceAreasApiRequest";

export const PracticeAreasIndex = () => {
  const navigate = useNavigate();
  const menu = useRef<Menu>(null);
  const [practiceAreaList, setPracticeAreaList] = useState([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedPracticeArea, setSelectedPracticeArea] =
    useState<IPracticeArea>();
  const buttonEl = useRef(null);

  useEffect(() => {
    fetchPracticeAreasRequest().then((response) => {
      response.length > 0
        ? setPracticeAreaList(response)
        : setPracticeAreaList([]);
    });
  }, []);

  const actionBodyTemplate = (rowData: any) => {
    const goToEditPage = () => {
      navigate(`/practice-areas/${selectedPracticeArea.id}/edit-practice-area`);
    };
    const goToViewPage = () => {
      navigate(`/practice-areas/${selectedPracticeArea.id}`);
    };

    const deletePracticeArea = () => {
      deletePracticeAreasRequest(selectedPracticeArea.id);
    };

    const accept = () => {
      deletePracticeArea();
    };

    const showMenu = (event: React.MouseEvent) => {
      setSelectedPracticeArea(rowData);
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
        <i
          className="pi pi-ellipsis-h cursor-pointer"
          onClick={showMenu} // Attach the event handler to the icon directly
        ></i>
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
    { field: "title", header: "Practice Area Title" },
    { field: "description", header: "Description" },
    { header: "Actions", body: actionBodyTemplate },
  ];

  return (
    <div>
      <div className="flex justify-between p-8">
        <span className="text-4xl text-gray-500 font-semibold">
          Practice Areas
        </span>
        <Link to="/practice-areas/add-practice-area">
          <Button label="Add Practice Area" icon="pi pi-plus" outlined />
        </Link>
      </div>
      <ListTable
        columns={columns}
        data={practiceAreaList}
        globalFilterFields={["title", "description"]}
      />
    </div>
  );
};
