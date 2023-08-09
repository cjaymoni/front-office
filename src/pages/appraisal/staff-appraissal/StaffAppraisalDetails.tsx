import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "primereact/button";
import {
  IStaffAppraisal,
  getStaffAppraisalByIdRequest,
} from "./staffAppraisalApiRequests";
import { Divider } from "primereact/divider";
import { TabView, TabPanel } from "primereact/tabview";
import { ActionsCard } from "../../../components/actions-card/ActionsCard";
import { AttachmentCard } from "../../../components/attachment-card/AttachmentCard";
import { NotesCard } from "../../../components/notes-card/NotesCard";

export const StaffAppraisalDetails = () => {
  const navigate = useNavigate();
  const urlParams = useParams();
  const [staffAppraisalDetails, setStaffAppraisalDetails] =
    useState<IStaffAppraisal>();

  useEffect(() => {
    if (urlParams.staffAppraisalId) {
      const staffAppraisalId = urlParams.staffAppraisalId;
      getStaffAppraisalByIdRequest(staffAppraisalId).then((response) => {
        setStaffAppraisalDetails(response);
      });
    }
  }, [urlParams.staffAppraisalId]);

  return (
    <div className="w-full p-4">
      <div className="flex justify-between p-2">
        <h2 className=" text-gray-500  text-left text-4xl font-semibold mb-16">
          Staff Appraisal Details
        </h2>
        <div className="flex justify-end">
          <Button
            label="Edit"
            icon="pi pi-pencil"
            className="h-12 "
            style={{ marginRight: "1rem" }}
            onClick={() =>
              navigate(`/staff-appraisals/${staffAppraisalDetails?.id}/edit`)
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
              Evaluator name
            </div>
            <div className="flex  text-black font-medium">
              {staffAppraisalDetails?.evaluator?.first_name}
            </div>
          </li>
          <li className="flex flex-row items-left py-3 px-2 flex-wrap ">
            <div className="flex w-full text-[#808080] font-medium">
              Evaluator remarks
            </div>
            <div className="flex  text-black font-medium">
              {staffAppraisalDetails?.evaluator_remarks}
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
