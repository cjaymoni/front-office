import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "primereact/button";
import {
  IPracticeArea,
  getPracticeAreasByIdRequest,
} from "./practiceAreasApiRequest";

export const PracticeAreasDetails = () => {
  const navigate = useNavigate();
  const urlParams = useParams();
  const [practiceAreaDetails, setPracticeAreaDetails] =
    useState<IPracticeArea>();

  useEffect(() => {
    if (urlParams.practiceAreaId) {
      const practiceAreaId = urlParams.practiceAreaId;
      getPracticeAreasByIdRequest(practiceAreaId).then((response) => {
        setPracticeAreaDetails(response);
      });
    }
  }, [urlParams.practiceAreaId]);

  return (
    <div className="w-full p-4">
      <div className="w-full py-4 px-8 bg-white shadow-md rounded-lg my-8">
        <div>
          <h2 className=" text-gray-500  text-left text-4xl font-semibold mb-16">
            Practice Area Details
          </h2>
          <ul className="mt-5 text-gray-600 text-left">
            <li className="flex flex-row items-left py-3 px-2 flex-wrap bg-gray-300">
              <div className="flex text-[#808080] font-medium md:w-1/4 w-full">
                Practice Area Title
              </div>
              <div className="flex md:w-3/4 text-black font-medium">
                {practiceAreaDetails?.title}
              </div>
            </li>
            <li className="flex flex-row items-left py-3 px-2 flex-wrap ">
              <div className="flex md:w-1/4 w-full text-[#808080] font-medium">
                Description
              </div>
              <div className="flex md:w-3/4 text-black font-medium">
                {practiceAreaDetails?.description}
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
              `/practice-areas/${practiceAreaDetails?.id}/edit-practice-area`
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
