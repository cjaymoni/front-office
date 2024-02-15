import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { TabView, TabPanel } from "primereact/tabview";
import { ActionsCard } from "../../../components/cards/actions-card/ActionsCard";

import { Chip } from "primereact/chip";
import { ITeam } from "./teamsApiRequests";
import { HearingsTabComponent } from "../../../components/tab-components/HearingsTabComponent";
import { BriefTabComponent } from "../../../components/tab-components/BriefsTabComponent";
import { StaffTabComponent } from "../../../components/tab-components/StaffTabComponent";
import { TransactionsTabComponent } from "../../../components/tab-components/TransactionsTabComponent";
import { LeadsTabComponent } from "../../../components/tab-components/LeadsTabComponent";
import { ClientsTabComponent } from "../../../components/tab-components/ClientsTabComponent";
import { LitigationTabComponent } from "../../../components/tab-components/LitigationTabComponent";
import { CommentsTabComponent } from "../../../components/tab-components/CommentsTabComponent";
import { ActionsTabComponent } from "../../../components/tab-components/ActionsTabComponent";

export const TeamDetails = () => {
  const navigate = useNavigate();
  const urlParams = useParams();
  const [briefDetails, setBriefDetails] = useState<ITeam>();
  const [text, setText] = useState("Background of brief");

  const fileUploadRef = useRef(null);

  const [visible, setVisible] = useState(false);

  // useEffect(() => {
  //   if (urlParams.briefId) {
  //     const briefId = urlParams.briefId;
  //     getBriefsByIdRequest(briefId).then((response) => {
  //       setBriefDetails(response);
  //     });
  //   }
  // }, [urlParams.briefId]);

  return (
    <div className="w-full p-4">
      <div className="flex justify-between p-2">
        <h2 className=" text-gray-500  text-left text-4xl font-semibold mb-16">
          Team Details
        </h2>
        <div className="flex justify-end">
          <Button
            label="Edit"
            icon="pi pi-pencil"
            className="h-12 "
            style={{ marginRight: "1rem" }}
            onClick={() => navigate(`/briefs/teams/${briefDetails?.id}/edit`)}
          />
          <Button
            label="Go Back"
            icon="pi pi-arrow-left"
            className="h-12"
            onClick={() => navigate(-1)}
          />
        </div>
      </div>
      <div className="w-full">
        <ul className="grid grid-cols-3 text-lg">
          <li className="flex flex-col items-left py-3 px-2 flex-wrap ">
            <div className="flex text-[#808080] font-medium w-full">
              Team Name
            </div>
            <div className="flex  text-black font-medium">RF019343</div>
          </li>
          <li className="flex flex-col items-left py-3 px-2 flex-wrap ">
            <div className="flex text-[#808080] font-medium w-full">
              Litigation ID
            </div>
            <div className="flex  text-black font-medium">CL093284</div>
          </li>
        </ul>
      </div>
      <Divider
        style={{
          height: "0.1rem",
          marginBottom: 0,
          backgroundColor: "#808080",
          opacity: 0.2,
        }}
      />

      <div>
        <TabView scrollable>
          <TabPanel header="Leads" leftIcon="pi pi-external-link mr-2">
            <LeadsTabComponent />
          </TabPanel>
          <TabPanel header="Consultations" leftIcon="pi pi-align-justify mr-2">
            {" "}
            <div className="w-full  bg-gray-100 border-none p-4">
              <ActionsTabComponent />{" "}
            </div>
          </TabPanel>
          <TabPanel header="Briefs" leftIcon="fas fa-gavel mr-2">
            <BriefTabComponent />
          </TabPanel>
          <TabPanel header="Litigation" leftIcon="fas fa-suitcase mr-2">
            <LitigationTabComponent />
          </TabPanel>
          <TabPanel
            header="Transactions"
            leftIcon="fas fa-money-bill-transfer mr-2"
          >
            <TransactionsTabComponent />
          </TabPanel>
          <TabPanel header="Clients" leftIcon="pi pi-ticket mr-2">
            <ClientsTabComponent />
          </TabPanel>{" "}
        </TabView>
      </div>
    </div>
  );
};
