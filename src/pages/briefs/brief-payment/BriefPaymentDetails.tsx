import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { TabView, TabPanel } from "primereact/tabview";
import { Chip } from "primereact/chip";
import { ActionsTabComponent } from "../../../components/tab-components/ActionsTabComponent";
import { AttachmentsTabComponent } from "../../../components/tab-components/AttachmentsTabComponent";
import { BackgroundTabComponent } from "../../../components/tab-components/BackgroundTabComponent";
import { CommentsTabComponent } from "../../../components/tab-components/CommentsTabComponent";
import { CourtsTabComponent } from "../../../components/tab-components/CourtsTabComponent";
import { EntriesTabComponent } from "../../../components/tab-components/EntiresTabComponent";
import { LegalOpinionTabComponent } from "../../../components/tab-components/LegalOpinionTab";
import { LitigationTabComponent } from "../../../components/tab-components/LitigationTabComponent";
import { NotesTabComponent } from "../../../components/tab-components/NotesTabComponent";
import { StaffTabComponent } from "../../../components/tab-components/StaffTabComponent";
import { TasksTabComponent } from "../../../components/tab-components/TasksTabComponent";
import { TeamsTabComponent } from "../../../components/tab-components/TeamsTabComponent";
import { TransactionsTabComponent } from "../../../components/tab-components/TransactionsTabComponent";

export const BriefPaymentDetails = () => {
  const navigate = useNavigate();
  const urlParams = useParams();
  const [StaffRecordDetails, setStaffRecordDetails] = useState<any>({
    brief_id: "abc123",
    reference: "REF456",
    description: "Random payment description 1",
    invoice_reference: "INV789",
    amount: "100.00",
    currency: "USD",
    payment_date: "2023-12-05",
    mode: "Online",
    id: "xyz789",
  });

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
            onClick={() => navigate("")}
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
          {Object.entries(StaffRecordDetails).map(([key, value]) => (
            <li
              key={key}
              className="flex flex-col items-left py-3 px-2 flex-wrap"
            >
              <div className="flex text-[#808080] font-medium w-full">
                {key
                  .split("_")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </div>
              <div className="flex text-black font-medium">
                {value.toString()}
              </div>
            </li>
          ))}
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
          <TabPanel header="Actions" leftIcon="fas fa-gavel mr-2">
            <ActionsTabComponent />
          </TabPanel>
          <TabPanel header="Notes" leftIcon="pi pi-copy mr-2">
            <NotesTabComponent />
          </TabPanel>
          <TabPanel header="Attachments" leftIcon="pi pi-file mr-2">
            <AttachmentsTabComponent />
          </TabPanel>
          <TabPanel header="Entries" leftIcon="pi pi-external-link mr-2">
            <EntriesTabComponent />
          </TabPanel>
          <TabPanel header="Tasks" leftIcon="pi pi-ticket mr-2">
            <TasksTabComponent />
          </TabPanel>{" "}
          <TabPanel header="Litigation" leftIcon="fas fa-suitcase mr-2">
            <LitigationTabComponent />
          </TabPanel>
          <TabPanel header="Courts" leftIcon="pi pi-building mr-2">
            <CourtsTabComponent />
          </TabPanel>
          <TabPanel
            header="Transactions"
            leftIcon="fas fa-money-bill-transfer mr-2"
          >
            <TransactionsTabComponent />
          </TabPanel>
          <TabPanel
            header="Legal opinions"
            leftIcon="fas fa-scale-balanced mr-2"
          >
            <LegalOpinionTabComponent />
          </TabPanel>
          <TabPanel header="Team" leftIcon="fas fa-scale-balanced mr-2">
            <TeamsTabComponent />
          </TabPanel>
          <TabPanel header="Staff" leftIcon="fas fa-user mr-2">
            <StaffTabComponent />
          </TabPanel>
          <TabPanel header="Comments" leftIcon="pi pi-comment mr-2">
            <CommentsTabComponent />
          </TabPanel>
        </TabView>
      </div>
    </div>
  );
};
