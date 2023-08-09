import { Link, useNavigate } from "react-router-dom";
import { ListTable } from "../../../components/table/ListTable";
import { Button } from "primereact/button";
import React, { useEffect, useRef, useState } from "react";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import {
  IStaffAppraisal,
  deleteStaffAppraisalRequest,
  fetchStaffAppraisalRequest,
} from "./staffAppraisalApiRequests";

export const StaffAppraisalsIndex = () => {
  const navigate = useNavigate();
  const menu = useRef<Menu>(null);
  const [staffAppraisalsList, setStaffAppraisalList] = useState([]);
  const [visible, setVisible] = useState<boolean>(false);
  const buttonEl = useRef(null);
  const [selectedStaffAppraisal, setSelectedStaffAppraisal] =
    useState<IStaffAppraisal>();

  useEffect(() => {
    fetchStaffAppraisalRequest().then((response) => {
      response.length > 0
        ? setStaffAppraisalList(response)
        : setStaffAppraisalList([]);
    });
  }, []);

  const actionBodyTemplate = (rowData: any) => {
    const goToEditPage = () => {
      navigate(`/staff-appraisals/${selectedStaffAppraisal.id}/edit`);
    };
    const goToViewPage = () => {
      navigate(`/staff-appraisals/${selectedStaffAppraisal.id}`);
    };

    const deleteStaffAppraisal = () => {
      deleteStaffAppraisalRequest(selectedStaffAppraisal.id);
    };

    const accept = () => {
      deleteStaffAppraisal();
    };
    const showMenu = (event: React.MouseEvent) => {
      setSelectedStaffAppraisal(rowData);
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
    { field: "evaluator.first_name", header: "Evaluator" },
    { field: "evaluator_remarks", header: "Evaluator Remarks" },
    { field: "status", header: "Status" },

    { header: "Actions", body: actionBodyTemplate },
  ];

  return (
    <div>
      <div className="flex justify-between p-8">
        <span className="text-4xl text-gray-500 font-semibold">
          Staff Appraisals
        </span>
        <Link to="/staff-appraisals/add">
          <Button label="Add Staff Appraisal" icon="pi pi-plus" outlined />
        </Link>
      </div>
      <ListTable
        columns={columns}
        data={staffAppraisalsList}
        globalFilterFields={[
          "evaluator.first_name",
          "evaluator_remarks",
          "status",
        ]}
      />
    </div>
  );
};
