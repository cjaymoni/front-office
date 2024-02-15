import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "primereact/button";
import {
  IOutgoingDispatch,
  getOutgoingDispatchByIdRequest,
} from "./outgoingDispatchesApiRequests";
import { Divider } from "primereact/divider";
import { TabView, TabPanel } from "primereact/tabview";
import { ActionsCard } from "../../../../components/cards/actions-card/ActionsCard";
import { ActionsTabComponent } from "../../../../components/tab-components/ActionsTabComponent";
import { NotesTabComponent } from "../../../../components/tab-components/NotesTabComponent";
import { AttachmentsTabComponent } from "../../../../components/tab-components/AttachmentsTabComponent";
import { CommentsTabComponent } from "../../../../components/tab-components/CommentsTabComponent";

export const OutgoingDispatchDetails = () => {
  const navigate = useNavigate();
  const urlParams = useParams();
  const [outgoingDispatchDetails, setOutgoingDispatchDetails] =
    useState<IOutgoingDispatch>();

  useEffect(() => {
    if (urlParams.outgoingDispatchId) {
      const outgoingDispatchId = urlParams.outgoingDispatchId;
      getOutgoingDispatchByIdRequest(outgoingDispatchId).then((response) => {
        setOutgoingDispatchDetails(response);
      });
    }
  }, [urlParams.outgoingDispatchId]);

  return (
    <div className="w-full p-4">
      <div className="flex justify-between p-2">
        <h2 className=" text-gray-500  text-left text-4xl font-semibold mb-16">
          Outgoing Dispatch Details
        </h2>
        <div className="flex justify-end">
          <Button
            label="Edit"
            icon="pi pi-pencil"
            className="h-12 "
            style={{ marginRight: "1rem" }}
            onClick={() =>
              navigate(`/outgoing-dispatch/${outgoingDispatchDetails?.id}/edit`)
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
              Document Title
            </div>
            <div className="flex  text-black font-medium">
              {outgoingDispatchDetails?.document_title}
            </div>
          </li>
          <li className="flex flex-row items-left py-3 px-2 flex-wrap ">
            <div className="flex w-full text-[#808080] font-medium">
              Document name
            </div>
            <div className="flex  text-black font-medium">
              {outgoingDispatchDetails?.document_name}
            </div>
          </li>
          <li className="flex flex-row items-left py-3 px-2 flex-wrap ">
            <div className="flex w-full text-[#808080] font-medium">
              Serial number
            </div>
            <div className="flex  text-black font-medium">
              {outgoingDispatchDetails?.serial_no}
            </div>
          </li>
          <li className="flex flex-row items-left py-3 px-2 flex-wrap ">
            <div className="flex w-full text-[#808080] font-medium">
              Reference number
            </div>
            <div className="flex  text-black font-medium">
              {outgoingDispatchDetails?.reference_number}
            </div>
          </li>
          <li className="flex flex-row items-left py-3 px-2 flex-wrap ">
            <div className="flex w-full text-[#808080] font-medium">Date</div>
            <div className="flex  text-black font-medium">
              {outgoingDispatchDetails?.date}
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
        <TabView>
          <TabPanel header="Actions" leftIcon="pi pi-arrows-alt mr-2">
            <ActionsTabComponent />
          </TabPanel>
          <TabPanel header="Notes" leftIcon="pi pi-copy mr-2">
            <NotesTabComponent />
          </TabPanel>
          <TabPanel header="Attachments" leftIcon="pi pi-file mr-2">
            <AttachmentsTabComponent />
          </TabPanel>
          <TabPanel header="Comments" leftIcon="pi pi-comment mr-2">
            <CommentsTabComponent />
          </TabPanel>
        </TabView>
      </div>
    </div>
  );
};
