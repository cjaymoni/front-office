import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "primereact/button";
import {
  IIncomingDispatch,
  getIncomingDispatchByIdRequest,
} from "./incomingDispatchesApiRequests";
import { Divider } from "primereact/divider";
import { TabView, TabPanel } from "primereact/tabview";
import { ActionsCard } from "../../../../components/actions-card/ActionsCard";
import { AttachmentCard } from "../../../../components/attachment-card/AttachmentCard";
import { NotesCard } from "../../../../components/notes-card/NotesCard";

export const IncomingDispatchDetails = () => {
  const navigate = useNavigate();
  const urlParams = useParams();
  const [incomingDispatchDetails, setIncomingDispatchDetails] =
    useState<IIncomingDispatch>();

  useEffect(() => {
    if (urlParams.incomingDispatchId) {
      const incomingDispatchId = urlParams.incomingDispatchId;
      getIncomingDispatchByIdRequest(incomingDispatchId).then((response) => {
        setIncomingDispatchDetails(response);
      });
    }
  }, [urlParams.incomingDispatchId]);

  return (
    <div className="w-full p-4">
      <div className="flex justify-between p-2">
        <h2 className=" text-gray-500  text-left text-4xl font-semibold mb-16">
          Incoming Dispatch Details
        </h2>
        <div className="flex justify-end">
          <Button
            label="Edit"
            icon="pi pi-pencil"
            className="h-12 "
            style={{ marginRight: "1rem" }}
            onClick={() =>
              navigate(
                `/front-office/incoming-dispatch/${incomingDispatchDetails?.id}/edit`
              )
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
              {incomingDispatchDetails?.document_title}
            </div>
          </li>
          <li className="flex flex-row items-left py-3 px-2 flex-wrap ">
            <div className="flex w-full text-[#808080] font-medium">
              Description
            </div>
            <div className="flex  text-black font-medium">
              {incomingDispatchDetails?.description}
            </div>
          </li>
          <li className="flex flex-row items-left py-3 px-2 flex-wrap ">
            <div className="flex w-full text-[#808080] font-medium">Client</div>
            <div className="flex  text-black font-medium">
              {incomingDispatchDetails?.client}
            </div>
          </li>
          <li className="flex flex-row items-left py-3 px-2 flex-wrap ">
            <div className="flex w-full text-[#808080] font-medium">
              Sender name
            </div>
            <div className="flex  text-black font-medium">
              {incomingDispatchDetails?.sender_name}
            </div>
          </li>
          <li className="flex flex-row items-left py-3 px-2 flex-wrap ">
            <div className="flex w-full text-[#808080] font-medium">
              Courier name
            </div>
            <div className="flex  text-black font-medium">
              {incomingDispatchDetails?.courier_name}
            </div>
          </li>
          <li className="flex flex-row items-left py-3 px-2 flex-wrap ">
            <div className="flex w-full text-[#808080] font-medium">
              Courier phone
            </div>
            <div className="flex  text-black font-medium">
              {incomingDispatchDetails?.courier_phone}
            </div>
          </li>
          <li className="flex flex-row items-left py-3 px-2 flex-wrap ">
            <div className="flex w-full text-[#808080] font-medium">
              Receipt acknowledged
            </div>
            <div className="flex  text-black font-medium">
              {incomingDispatchDetails?.receipt_acknowledged}
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
            {" "}
            <div className="w-full  bg-gray-100 border-none p-4">
              <div className="flex justify-end mb-4">
                <Button icon="pi pi-plus" label="New" outlined />
              </div>
              <ActionsCard />
            </div>
          </TabPanel>
          <TabPanel header="Notes" leftIcon="pi pi-copy mr-2">
            <div className="w-full  bg-gray-100 border-none p-4">
              <div className="flex justify-end mb-4">
                <Button icon="pi pi-plus" label="New" outlined />
              </div>
              <NotesCard />
            </div>
          </TabPanel>
          <TabPanel header="Attachments" leftIcon="pi pi-file mr-2">
            <div className="w-full  bg-gray-100 border-none p-4">
              <div className="flex justify-end mb-4">
                <Button icon="pi pi-plus" label="New" outlined />
              </div>
              <AttachmentCard />
            </div>
          </TabPanel>
        </TabView>
      </div>
    </div>
  );
};
