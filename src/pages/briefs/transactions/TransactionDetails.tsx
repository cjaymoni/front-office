import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { TabView, TabPanel } from "primereact/tabview";
import { ActionsCard } from "../../../components/cards/actions-card/ActionsCard";

import { Chip } from "primereact/chip";
import { HearingsTabComponent } from "../../../components/tab-components/HearingsTabComponent";
import { BriefTabComponent } from "../../../components/tab-components/BriefsTabComponent";
import { StaffTabComponent } from "../../../components/tab-components/StaffTabComponent";
import { TransactionsTabComponent } from "../../../components/tab-components/TransactionsTabComponent";
import { LeadsTabComponent } from "../../../components/tab-components/LeadsTabComponent";
import { ClientsTabComponent } from "../../../components/tab-components/ClientsTabComponent";
import { LitigationTabComponent } from "../../../components/tab-components/LitigationTabComponent";
import { ITransaction } from "./transactionApiRequests";
import { ConsultationTabComponent } from "../../../components/tab-components/ConsultationTabComponent";
import { CommentsTabComponent } from "../../../components/tab-components/CommentsTabComponent";
import { NotesTabComponent } from "../../../components/tab-components/NotesTabComponent";
import { ActivitiesTabComponent } from "../../../components/tab-components/ActivitiesTabComponent";
import { ActionsTabComponent } from "../../../components/tab-components/ActionsTabComponent";
import { AttachmentsTabComponent } from "../../../components/tab-components/AttachmentsTabComponent";
import { BackgroundTabComponent } from "../../../components/tab-components/BackgroundTabComponent";
import { EntriesTabComponent } from "../../../components/tab-components/EntiresTabComponent";
import { MeetingTabComponent } from "../../../components/tab-components/MeetingsTabComponent";
import { TeamsTabComponent } from "../../../components/tab-components/TeamsTabComponent";

export const TransactionDetails = () => {
  const navigate = useNavigate();
  const urlParams = useParams();
  const [briefDetails, setBriefDetails] = useState<ITransaction>();
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
          Transaction Details
        </h2>
        <div className="flex justify-end">
          <Button
            label="Edit"
            icon="pi pi-pencil"
            className="h-12 "
            style={{ marginRight: "1rem" }}
            onClick={() =>
              navigate(`/briefs/transactions/${briefDetails?.id}/edit`)
            }
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
              Transaction ID
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
        <TabView>
          <TabPanel header="Background" leftIcon="pi pi-align-justify mr-2">
            <BackgroundTabComponent />
          </TabPanel>
          <TabPanel header="Attachments" leftIcon="pi pi-file mr-2">
            <AttachmentsTabComponent />
          </TabPanel>
          <TabPanel header="Actions" leftIcon="fas fa-gavel mr-2">
            <ActionsTabComponent />
          </TabPanel>
          <TabPanel header="Team" leftIcon="fas fa-scale-balanced mr-2">
            <TeamsTabComponent />
          </TabPanel>
          <TabPanel header="Staff" leftIcon="fas fa-user mr-2">
            <StaffTabComponent />
          </TabPanel>
          <TabPanel header="Judges" leftIcon="fas fa-scale-balanced mr-2">
            <TeamsTabComponent />
          </TabPanel>
          <TabPanel header="Courts" leftIcon="fas fa-user mr-2">
            <StaffTabComponent />
          </TabPanel>
          <TabPanel header="Entries" leftIcon="pi pi-external-link mr-2">
            <EntriesTabComponent />
          </TabPanel>
          <TabPanel header="Activities" leftIcon="fas fa-chart-line mr-2">
            <ActivitiesTabComponent />
          </TabPanel>
          <TabPanel header="Notes" leftIcon="fas fa-chart-line mr-2">
            <NotesTabComponent />
          </TabPanel>
          <TabPanel header="Comments" leftIcon="pi pi-comment mr-2">
            <CommentsTabComponent />
          </TabPanel>
          <TabPanel header="Practice Areas" leftIcon="pi pi-copy mr-2">
            <NotesTabComponent />
          </TabPanel>
          <TabPanel header="Sectors" leftIcon="pi pi-copy mr-2">
            <NotesTabComponent />
          </TabPanel>
          <TabPanel header="Category" leftIcon="pi pi-copy mr-2">
            <NotesTabComponent />
          </TabPanel>
          <TabPanel header="Keywords" leftIcon="pi pi-file mr-2">
            <NotesTabComponent />
          </TabPanel>
          <TabPanel header="Tags" leftIcon="fas fa-tags mr-2">
            <MeetingTabComponent />
          </TabPanel>
        </TabView>
      </div>
    </div>
  );
};
