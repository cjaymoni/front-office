import { Link, useNavigate } from "react-router-dom";
import { ListTable } from "../../../components/table/ListTable";
import { Button } from "primereact/button";
import React, { useEffect, useRef, useState } from "react";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { deleteLegalOpinionRequest } from "./legalOpinionApiRequest";

export const LegalOpinionsIndex = () => {
  const navigate = useNavigate();
  const menu = useRef<Menu>(null);
  const [leadsList, setBriefList] = useState([]);
  const [visible, setVisible] = useState<boolean>(false);
  const buttonEl = useRef(null);
  const [selectedBrief, setSelectedBrief] = useState<any>();

  const briefList = [
    {
      title: "Contract Analysis",
      description: "Analysis of contract terms and conditions.",
      brief_id: "b123",
      brief: {
        brief_id: "b123",
        title: "Legal Case 1",
        description: "Description of the legal case 1",
      },
    },
    {
      title: "Regulatory Compliance",
      description: "Evaluation of regulatory compliance issues.",
      brief_id: "b456",
      brief: {
        brief_id: "b456",
        title: "Legal Case 2",
        description: "Description of the legal case 2",
      },
    },
    {
      title: "Intellectual Property Review",
      description: "Review of intellectual property rights.",
      brief_id: "b789",
      brief: {
        brief_id: "b789",
        title: "Legal Case 3",
        description: "Description of the legal case 3",
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
      navigate(`/briefs/legal-opinions/${selectedBrief.id}/edit`);
    };
    const goToViewPage = () => {
      navigate(`/briefs/legal-opinions/${selectedBrief.id}`);
    };

    const deleteBrief = () => {
      deleteLegalOpinionRequest(selectedBrief.id);
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
    { field: "title", header: "Title" },
    { field: "description", header: "Description" },
    { field: "brief.title", header: "Brief Title" },
    // Additional columns can be added according to the interface structure
    { header: "Actions", body: actionBodyTemplate },
  ];
  return (
    <div>
      <div className="flex justify-between p-8">
        <span className="text-4xl text-gray-500 font-semibold">
          Legal Opinions
        </span>
        <Link to="/briefs/legal-opinions/add">
          <Button label="Add Legal Opinion" icon="pi pi-plus" outlined />
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
