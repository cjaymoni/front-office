import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "primereact/button";
import {
  IOfficeAreas,
  getOfficeAreasByIdRequest,
} from "./officeAreasApiRequest";

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
      <div className="w-full py-4 px-8 bg-white shadow-md rounded-lg my-8">
        <div>
          <h2 className=" text-gray-500  text-left text-4xl font-semibold mb-16">
            Office Area Details
          </h2>
          <ul className="mt-5 text-gray-600 text-left">
            <li className="flex flex-row items-left py-3 px-2 flex-wrap bg-gray-300">
              <div className="flex text-[#808080] font-medium md:w-1/4 w-full">
                Office Area Name
              </div>
              <div className="flex md:w-3/4 text-black font-medium">
                {officeAreaDetails?.name}
              </div>
            </li>
            <li className="flex flex-row items-left py-3 px-2 flex-wrap ">
              <div className="flex md:w-1/4 w-full text-[#808080] font-medium">
                Office Area description
              </div>
              <div className="flex md:w-3/4 text-black font-medium">
                {officeAreaDetails?.description}
              </div>
            </li>
          </ul>
        </div>
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
    </div>
  );
};
