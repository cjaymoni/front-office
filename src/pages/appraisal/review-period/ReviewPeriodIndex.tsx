import { Link, useNavigate } from "react-router-dom";
import { ListTable } from "../../../components/table/ListTable";
import { Button } from "primereact/button";
import React, { useEffect, useRef, useState } from "react";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import {
  IReviewPeriod,
  deleteReviewPeriodsRequest,
  fetchReviewPeriodsRequest,
} from "./reviewPeriodApiRequest";

export const ReviewPeriodIndex = () => {
  const navigate = useNavigate();
  const menu = useRef<Menu>(null);
  const [reviewPeriodsList, setReviewPeriodList] = useState([]);
  const [visible, setVisible] = useState<boolean>(false);
  const buttonEl = useRef(null);
  const [selectedReviewPeriod, setSelectedReviewPeriod] =
    useState<IReviewPeriod>();

  useEffect(() => {
    fetchReviewPeriodsRequest().then((response) => {
      response.length > 0
        ? setReviewPeriodList(response)
        : setReviewPeriodList([]);
    });
  }, []);

  const actionBodyTemplate = (rowData: any) => {
    const goToEditPage = () => {
      navigate(`/review-period/${selectedReviewPeriod.id}/edit`);
    };
    const goToViewPage = () => {
      navigate(`/review-period/${selectedReviewPeriod.id}`);
    };

    const deleteReviewPeriod = () => {
      deleteReviewPeriodsRequest(selectedReviewPeriod.id);
    };

    const accept = () => {
      deleteReviewPeriod();
    };
    const showMenu = (event: React.MouseEvent) => {
      setSelectedReviewPeriod(rowData);
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
    { field: "title", header: "Title " },
    { field: "description", header: "Description" },
    { field: "start_date", header: "Start date" },
    { field: "end_date", header: "End date" },
    { field: "year", header: "Year" },

    { header: "Actions", body: actionBodyTemplate },
  ];

  return (
    <div>
      <div className="flex justify-between p-8">
        <span className="text-4xl text-gray-500 font-semibold">
          Review Periods
        </span>
        <Link to="/review-period/add">
          <Button label="Add Review Period" icon="pi pi-plus" outlined />
        </Link>
      </div>
      <ListTable
        columns={columns}
        data={reviewPeriodsList}
        globalFilterFields={[
          "title",
          "description",
          "start_date",
          "end_date",
          "year",
        ]}
      />
    </div>
  );
};
