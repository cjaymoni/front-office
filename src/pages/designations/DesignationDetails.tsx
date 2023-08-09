import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "primereact/button";
import {
  IDesignation,
  getDesignationsByIdRequest,
} from "./designationsApiRequests";

export const DesignationDetails = () => {
  const navigate = useNavigate();
  const urlParams = useParams();
  const [designationDetails, setDesignationDetails] = useState<IDesignation>();

  useEffect(() => {
    if (urlParams.designationId) {
      const designationId = urlParams.designationId;
      getDesignationsByIdRequest(designationId).then((response) => {
        setDesignationDetails(response);
      });
    }
  }, [urlParams.designationId]);

  return (
    <div className="w-full p-4">
      <div className="w-full py-4 px-8 bg-white shadow-md rounded-lg my-8">
        <div>
          <h2 className=" text-gray-500  text-left text-4xl font-semibold mb-16">
            Designation Details
          </h2>
          <ul className="mt-5 text-gray-600 text-left">
            <li className="flex flex-row items-left py-3 px-2 flex-wrap bg-gray-300">
              <div className="flex text-[#808080] font-medium md:w-1/4 w-full">
                Designation Title
              </div>
              <div className="flex md:w-3/4 text-black font-medium">
                {designationDetails?.title}
              </div>
            </li>
            <li className="flex flex-row items-left py-3 px-2 flex-wrap ">
              <div className="flex md:w-1/4 w-full text-[#808080] font-medium">
                Minimum Salary
              </div>
              <div className="flex md:w-3/4 text-black font-medium">
                {designationDetails?.min_salary}
              </div>
            </li>
            <li className="flex flex-row items-left py-3 px-2 flex-wrap bg-gray-300">
              <div className="flex text-[#808080] font-medium md:w-1/4 w-full">
                Maximum Salary
              </div>
              <div className="flex md:w-3/4 text-black font-medium">
                {designationDetails?.maximum_salary}
              </div>
            </li>
            <li className="flex flex-row items-left py-3 px-2 flex-wrap ">
              <div className="flex md:w-1/4 w-full text-[#808080] font-medium">
                Rate per case
              </div>
              <div className="flex md:w-3/4 text-black font-medium">
                {designationDetails?.rate_per_case}
              </div>
            </li>
            <li className="flex flex-row items-left py-3 px-2 flex-wrap bg-gray-300">
              <div className="flex md:w-1/4 w-full text-[#808080] font-medium ">
                Rate per hour
              </div>
              <div className="flex md:w-3/4 text-black font-medium">
                {designationDetails?.rate_per_hour}
              </div>
            </li>
            <li className="flex flex-row items-left py-3 px-2 flex-wrap ">
              <div className="flex md:w-1/4 w-full text-[#808080] font-medium">
                Commission per case
              </div>
              <div className="flex md:w-3/4 text-black font-medium">
                {designationDetails?.commission_per_case}
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
                `/designations/${designationDetails?.id}/edit-designation`
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
