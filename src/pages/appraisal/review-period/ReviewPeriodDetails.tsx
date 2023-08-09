import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "primereact/button";
import {
  IReviewPeriod,
  getReviewPeriodsByIdRequest,
} from "./reviewPeriodApiRequest";
import { Divider } from "primereact/divider";
import { TabView, TabPanel } from "primereact/tabview";
import { ActionsCard } from "../../../components/actions-card/ActionsCard";
import { AttachmentCard } from "../../../components/attachment-card/AttachmentCard";
import { NotesCard } from "../../../components/notes-card/NotesCard";

export const ReviewPeriodDetails = () => {
  const navigate = useNavigate();
  const urlParams = useParams();
  const [reviewPeriodDetails, setReviewPeriodDetails] =
    useState<IReviewPeriod>();

  useEffect(() => {
    if (urlParams.reviewPeriodId) {
      const reviewPeriodId = urlParams.reviewPeriodId;
      getReviewPeriodsByIdRequest(reviewPeriodId).then((response) => {
        setReviewPeriodDetails(response);
      });
    }
  }, [urlParams.reviewPeriodId]);

  return (
    <div className="w-full p-4">
      <div className="flex justify-between p-2">
        <h2 className=" text-gray-500  text-left text-4xl font-semibold mb-16">
          Review Period Details
        </h2>
        <div className="flex justify-end">
          <Button
            label="Edit"
            icon="pi pi-pencil"
            className="h-12 "
            style={{ marginRight: "1rem" }}
            onClick={() =>
              navigate(`/review-period/${reviewPeriodDetails?.id}/edit`)
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
              Review Period Title
            </div>
            <div className="flex  text-black font-medium">
              {reviewPeriodDetails?.title}
            </div>
          </li>
          <li className="flex flex-row items-left py-3 px-2 flex-wrap ">
            <div className="flex w-full text-[#808080] font-medium">
              Description
            </div>
            <div className="flex  text-black font-medium">
              {reviewPeriodDetails?.description}
            </div>
          </li>
          <li className="flex flex-row items-left py-3 px-2 flex-wrap ">
            <div className="flex w-full text-[#808080] font-medium">
              Start Date
            </div>
            <div className="flex  text-black font-medium">
              {reviewPeriodDetails?.start_date}
            </div>
          </li>
          <li className="flex flex-row items-left py-3 px-2 flex-wrap ">
            <div className="flex w-full text-[#808080] font-medium">
              End Date
            </div>
            <div className="flex  text-black font-medium">
              {reviewPeriodDetails?.end_date}
            </div>
          </li>
          <li className="flex flex-row items-left py-3 px-2 flex-wrap ">
            <div className="flex w-full text-[#808080] font-medium">Year</div>
            <div className="flex  text-black font-medium">
              {reviewPeriodDetails?.year}
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
