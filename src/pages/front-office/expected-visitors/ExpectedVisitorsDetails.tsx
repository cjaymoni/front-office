import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "primereact/button";
import {
  IExpectedVisitors,
  getExpectedVisitorsByIdRequest,
} from "./expectedVisitorsApiRequest";
import { Divider } from "primereact/divider";
import { TabView, TabPanel } from "primereact/tabview";
import { ActionsTabComponent } from "../../../components/tab-components/ActionsTabComponent";
import { NotesTabComponent } from "../../../components/tab-components/NotesTabComponent";
import { AttachmentsTabComponent } from "../../../components/tab-components/AttachmentsTabComponent";
import { CommentsTabComponent } from "../../../components/tab-components/CommentsTabComponent";

export const ExpectedVisitorsDetails = () => {
  const navigate = useNavigate();
  const urlParams = useParams();
  const [expectedVisitorsDetails, setExpectedVisitorsDetails] =
    useState<IExpectedVisitors>();

  useEffect(() => {
    if (urlParams.expectedVisitorId) {
      const expectedVisitorId = urlParams.expectedVisitorId;
      getExpectedVisitorsByIdRequest(expectedVisitorId).then((response) => {
        setExpectedVisitorsDetails(response);
      });
    }
  }, [urlParams.expectedVisitorId]);

  return (
    <div className="w-full p-4">
      <div className="flex justify-between p-2">
        <h2 className=" text-gray-500  text-left text-4xl font-semibold mb-16">
          Expected Visit Details
        </h2>
        <div className="flex justify-end">
          <Button
            label="Edit"
            icon="pi pi-pencil"
            className="h-12 "
            style={{ marginRight: "1rem" }}
            onClick={() =>
              navigate(`/visit-entry/${expectedVisitorsDetails?.id}/edit`)
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
              Visitor Name
            </div>
            <div className="flex  text-black font-medium">John Doe</div>
          </li>
          <li className="flex flex-row items-left py-3 px-2 flex-wrap ">
            <div className="flex w-full text-[#808080] font-medium">
              Visitor Phone
            </div>
            <div className="flex  text-black font-medium">0293439234</div>
          </li>

          <li className="flex flex-row items-left py-3 px-2 flex-wrap ">
            <div className="flex w-full text-[#808080] font-medium">
              Visitor email
            </div>
            <div className="flex  text-black font-medium">johndoe@mail.com</div>
          </li>
          <li className="flex flex-row items-left py-3 px-2 flex-wrap ">
            <div className="flex w-full text-[#808080] font-medium">
              Visit purpose
            </div>
            <div className="flex  text-black font-medium">Meeting </div>
          </li>
          <li className="flex flex-row items-left py-3 px-2 flex-wrap ">
            <div className="flex w-full text-[#808080] font-medium">
              Person to see
            </div>
            <div className="flex  text-black font-medium">Felicia Osei</div>
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
