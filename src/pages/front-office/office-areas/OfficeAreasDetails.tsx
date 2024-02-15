import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "primereact/button";
import {
  IOfficeAreas,
  getOfficeAreasByIdRequest,
} from "./officeAreasApiRequest";
import { Divider } from "primereact/divider";
import { TabView, TabPanel } from "primereact/tabview";
import { CommentsTabComponent } from "../../../components/tab-components/CommentsTabComponent";

export const OfficeAreasDetails = () => {
  const navigate = useNavigate();
  const urlParams = useParams();
  const [officeAreaDetails, setOfficeAreasDetails] = useState<IOfficeAreas>();

  useEffect(() => {
    if (urlParams.officeAreaId) {
      const officeAreaId = urlParams.officeAreaId;
      getOfficeAreasByIdRequest(officeAreaId).then((response) => {
        setOfficeAreasDetails(response);
      });
    }
  }, [urlParams.officeAreaId]);

  return (
    <div className="w-full p-4">
      <div className="flex justify-between p-2">
        <h2 className=" text-gray-500  text-left text-4xl font-semibold mb-16">
          Office Area Details
        </h2>
        <div className="flex justify-end">
          <Button
            label="Edit"
            icon="pi pi-pencil"
            className="h-12 "
            style={{ marginRight: "1rem" }}
            onClick={() =>
              navigate(
                `/office-areas/${officeAreaDetails?.id}/edit-office-area`
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
              Office Area Name
            </div>
            <div className="flex  text-black font-medium">
              {" "}
              {officeAreaDetails?.name}
            </div>
          </li>
          <li className="flex flex-col items-left py-3 px-2 flex-wrap ">
            <div className="flex text-[#808080] font-medium w-full">
              Office Area description
            </div>
            <div className="flex  text-black font-medium">
              {officeAreaDetails?.description}
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
