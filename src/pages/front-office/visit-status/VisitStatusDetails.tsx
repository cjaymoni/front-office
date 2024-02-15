import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "primereact/button";
import {
  IVisitStatus,
  getVisitStatusByIdRequest,
} from "./visitStatusApiRequest";
import { Divider } from "primereact/divider";
import { TabView, TabPanel } from "primereact/tabview";
import { CommentsTabComponent } from "../../../components/tab-components/CommentsTabComponent";

export const VisitStatusDetails = () => {
  const navigate = useNavigate();
  const urlParams = useParams();
  const [visitStatusDetails, setVisitStatusDetails] = useState<IVisitStatus>();

  useEffect(() => {
    if (urlParams.visitStatusId) {
      const visitStatusId = urlParams.visitStatusId;
      getVisitStatusByIdRequest(visitStatusId).then((response) => {
        setVisitStatusDetails(response);
      });
    }
  }, [urlParams.visitStatusId]);

  return (
    <div className="w-full p-4">
      <div className="flex justify-between p-2">
        <h2 className=" text-gray-500  text-left text-4xl font-semibold mb-16">
          Visit Status Details{" "}
        </h2>
        <div className="flex justify-end">
          <Button
            label="Edit"
            icon="pi pi-pencil"
            className="h-12 "
            style={{ marginRight: "1rem" }}
            onClick={() =>
              navigate(`/visit-status/${visitStatusDetails?.id}/edit`)
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
              Visit Status Name
            </div>
            <div className="flex  text-black font-medium">
              {" "}
              {visitStatusDetails?.status}
            </div>
          </li>
          <li className="flex flex-col items-left py-3 px-2 flex-wrap ">
            <div className="flex text-[#808080] font-medium w-full">
              Description
            </div>
            <div className="flex  text-black font-medium">
              {visitStatusDetails?.description}
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
