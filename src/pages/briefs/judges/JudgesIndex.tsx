import { Link, useNavigate } from "react-router-dom";
import { ListTable } from "../../../components/table/ListTable";
import { Button } from "primereact/button";
import React, { useEffect, useRef, useState } from "react";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { ConfirmPopup } from "primereact/confirmpopup";
import {
  deleteJudgesRequest,
  fetchJudgesRequest,
  IJudge,
} from "./judgesApiRequests";

export const JudgesIndex = () => {
  const navigate = useNavigate();
  const menu = useRef<Menu>(null);
  const [judgesList, setJudgeList] = useState([]);
  const [visible, setVisible] = useState<boolean>(false);
  const buttonEl = useRef(null);
  const [selectedJudge, setSelectedJudge] = useState<IJudge>();

  const judgeList = [
    {
      id: 1,
      first_name: "John",
      last_name: "Doe",
      email: "johndoe@mail.com",
    },
    {
      id: 2,
      first_name: "Jane",
      last_name: "Foster",
      email: "janefoster@mail.com",
    },
  ];

  useEffect(() => {
    setJudgeList(judgeList);
    // fetchJudgesRequest().then((response) => {
    //   response.length > 0 ? setJudgeList(response) : setJudgeList([]);
    // });
  }, []);

  const actionBodyTemplate = (rowData: any) => {
    const goToEditPage = () => {
      navigate(`/briefs/judges/${selectedJudge.id}/edit`);
    };
    const goToViewPage = () => {
      navigate(`/briefs/judges/${selectedJudge.id}`);
    };

    const deleteJudge = () => {
      deleteJudgesRequest(selectedJudge.id);
    };

    const accept = () => {
      deleteJudge();
    };
    const showMenu = (event: React.MouseEvent) => {
      setSelectedJudge(rowData);
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
    { field: "first_name", header: "First Name " },
    { field: "last_name", header: "Last Name" },
    { field: "email", header: "Primary Email" },
    { header: "Actions", body: actionBodyTemplate },
  ];

  return (
    <div>
      <div className="flex justify-between p-8">
        <span className="text-4xl text-gray-500 font-semibold">Judges</span>
        <Link to="/briefs/judges/add">
          <Button label="Add Judge" icon="pi pi-plus" outlined />
        </Link>
      </div>
      <ListTable
        columns={columns}
        data={judgesList}
        globalFilterFields={["first_name", "last_name", "email"]}
        exportedFileName="judges"
      />
    </div>
  );
};
