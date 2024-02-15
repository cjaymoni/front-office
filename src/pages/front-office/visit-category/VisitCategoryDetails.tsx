import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "primereact/button";
import {
  IVisitCategory,
  getVisitCategoryByIdRequest,
} from "./vistCategoryApiRequest";
import { Divider } from "primereact/divider";
import { TabView, TabPanel } from "primereact/tabview";
import { CommentsTabComponent } from "../../../components/tab-components/CommentsTabComponent";

export const VisitCategoryDetails = () => {
  const navigate = useNavigate();
  const urlParams = useParams();
  const [visitCategoryDetails, setVisitCategoryDetails] =
    useState<IVisitCategory>();

  useEffect(() => {
    if (urlParams.visitCategoryId) {
      const visitCategoryId = urlParams.visitCategoryId;
      getVisitCategoryByIdRequest(visitCategoryId).then((response) => {
        setVisitCategoryDetails(response);
      });
    }
  }, [urlParams.visitCategoryId]);

  return (
    <div className="w-full p-4">
      <div className="flex justify-between p-2">
        <h2 className=" text-gray-500  text-left text-4xl font-semibold mb-16">
          Visit Category Details
        </h2>
        <div className="flex justify-end">
          <Button
            label="Edit"
            icon="pi pi-pencil"
            className="h-12 "
            style={{ marginRight: "1rem" }}
            onClick={() =>
              navigate(`/visit-category/${visitCategoryDetails?.id}/edit`)
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
              Visit Category Name
            </div>
            <div className="flex  text-black font-medium">
              {" "}
              {visitCategoryDetails?.category}
            </div>
          </li>
          <li className="flex flex-col items-left py-3 px-2 flex-wrap ">
            <div className="flex text-[#808080] font-medium w-full">
              Description
            </div>
            <div className="flex  text-black font-medium">
              {visitCategoryDetails?.description}
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
          <TabPanel header="Comments" leftIcon="pi pi-comment mr-2">
            <CommentsTabComponent />
          </TabPanel>
        </TabView>
      </div>
    </div>
  );
};
