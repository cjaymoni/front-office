import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { TabView, TabPanel } from "primereact/tabview";

import { Chip } from "primereact/chip";
import { AttachmentsTabComponent } from "../../components/tab-components/AttachmentsTabComponent";
import { NotesTabComponent } from "../../components/tab-components/NotesTabComponent";
import { ActionsTabComponent } from "../../components/tab-components/ActionsTabComponent";
import { BackgroundTabComponent } from "../../components/tab-components/BackgroundTabComponent";
import { ITasks } from "./taskApiRequest";
import { CommentsTabComponent } from "../../components/tab-components/CommentsTabComponent";

export const TaskDetails = () => {
  const navigate = useNavigate();
  const urlParams = useParams();
  const [briefDetails, setBriefDetails] = useState<ITasks>();

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
          Task Details
        </h2>
        <div className="flex justify-end">
          <Button
            label="Edit"
            icon="pi pi-pencil"
            className="h-12 "
            style={{ marginRight: "1rem" }}
            onClick={() => navigate(`/briefs/tasks/${briefDetails?.id}/edit`)}
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
              Task Id
            </div>
            <div className="flex  text-black font-medium">MT-1</div>
          </li>
          <li className="flex flex-col items-left py-3 px-2 flex-wrap ">
            <div className="flex text-[#808080] font-medium w-full">
              Task Name
            </div>
            <div className="flex  text-black font-medium">
              Assign Matter to counsel
            </div>
          </li>

          <li className="flex flex-row items-left py-3 px-2 flex-wrap ">
            <div className="flex w-full text-[#808080] font-medium">
              Assignee Name
            </div>
            <div className="flex  text-black font-medium">John Doe</div>
          </li>
          <li className="flex flex-col items-left py-3 px-2 flex-wrap ">
            <div className="flex text-[#808080] font-medium w-full">
              Due Date
            </div>
            <div className="flex  text-black font-medium">2023-03-21</div>
          </li>
          <li className="flex flex-col items-left py-3 px-2 flex-wrap ">
            <div className="flex text-[#808080] font-medium w-full">
              Priority
            </div>
            <div className="flex flex-wrap gap-2  text-black font-medium">
              <Chip label="High" className="bg-red-500" />
              {/* <Chip label="Mystery" /> */}
            </div>{" "}
          </li>

          <li className="flex flex-row items-left py-3 px-2 flex-wrap ">
            <div className="flex w-full text-[#808080] font-medium">Status</div>
            <div className="flex flex-wrap gap-2  text-black font-medium">
              <Chip label="In Progress" />
              {/* <Chip label="Mystery" /> */}
            </div>
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
          <TabPanel header="Comments" leftIcon="pi pi-comments mr-2">
            <CommentsTabComponent />
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
        </TabView>
      </div>
    </div>
  );
};
