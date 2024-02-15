import { Link, useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import React, { useEffect, useRef, useState } from "react";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { ITaskPriority, ITaskStatus, ITasks } from "./taskApiRequest";
import { ListTable } from "../../components/table/ListTable";
import classNames from "classnames";

export const TasksIndex = () => {
  const navigate = useNavigate();
  const menu = useRef<Menu>(null);
  const [leadsList, setBriefList] = useState([]);
  const [visible, setVisible] = useState<boolean>(false);
  const buttonEl = useRef(null);
  const [selectedBrief, setSelectedBrief] = useState<ITasks>();

  const tasksList = [
    {
      id: 1,
      task_name: "Assign Matter to counsel",
      task_id: "MT-1",
      assignee: "Kofi Oki",
      status: ITaskStatus.IN_PROGRESS,
      due_date: "2021-21-21",
      priority: ITaskPriority.HIGH,
      task_type: "Legal Advice",
      comments: "some comments",
      created_by: "JOhn Doe",
      date_created: "2021-09-21",
    },
    {
      id: 2,
      task_name: "Assign Matter to counsel",
      task_id: "MT-1",
      assignee: "Kofi Oki",
      status: ITaskStatus.COMPLETED,
      due_date: "2021-21-21",
      priority: ITaskPriority.MEDIUM,
      task_type: "Legal Advice",
      comments: "some comments",
      created_by: "JOhn Doe",
      date_created: "2021-09-21",
    },
    {
      id: 3,
      task_name: "Assign Matter to counsel",
      task_id: "MT-1",
      assignee: "Kofi Oki",
      status: ITaskStatus.PENDING,
      due_date: "2021-21-21",
      priority: ITaskPriority.LOW,
      task_type: "Legal Advice",
      comments: "some comments",
      created_by: "JOhn Doe",
      date_created: "2021-09-21",
    },
    {
      id: 3,
      task_name: "Assign Matter to counsel",
      task_id: "MT-1",
      assignee: "Kofi Oki",
      status: ITaskStatus.OVERDUE,
      due_date: "2021-21-21",
      priority: ITaskPriority.LOW,
      task_type: "Legal Advice",
      comments: "some comments",
      created_by: "JOhn Doe",
      date_created: "2021-09-21",
    },
  ];
  useEffect(() => {
    // fetchBriefsRequest().then((response) => {
    //   response.length > 0 ? setBriefList(response) : setBriefList([]);
    // });
    setBriefList(tasksList);
  }, []);

  const actionBodyTemplate = (rowData: any) => {
    const goToEditPage = () => {
      navigate(`/briefs/tasks/${selectedBrief.id}/edit`);
    };
    const goToViewPage = () => {
      navigate(`/briefs/tasks/${selectedBrief.id}`);
    };

    const deleteBrief = () => {
      // deleteBriefsRequest(selectedBrief.id);
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
    { field: "task_id", header: "Task ID " },
    { field: "task_name", header: "Task Name" },
    { field: "status", header: "Status", body: statusBodyTemplate },
    { field: "due_date", header: "Due Date" },
    { field: "assignee", header: "Assignee" },
    { field: "priority", header: "Priority", body: priorityBodyTemplate },
    { header: "Actions", body: actionBodyTemplate },
  ];

  return (
    <div>
      <div className="flex justify-between p-8">
        <span className="text-4xl text-gray-500 font-semibold">Tasks</span>
        <Link to="/briefs/tasks/add">
          <Button label="Add Task" icon="pi pi-plus" outlined />
        </Link>
      </div>
      <ListTable
        columns={columns}
        data={tasksList}
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

const priorityBodyTemplate = (data) => {
  return (
    <React.Fragment>
      <span
        className={classNames("priority-badge", "priority-" + data.priority)}
      >
        {data.priority}
      </span>
    </React.Fragment>
  );
};
export const statusBodyTemplate = (rowData) => {
  return (
    <React.Fragment>
      <span className={classNames("status-badge", "status-" + rowData.status)}>
        {rowData.status}
      </span>
    </React.Fragment>
  );
};
