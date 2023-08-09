import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "primereact/button";
import {
  IMattersCategory,
  getMatterCategoryByIdRequest,
} from "./mattersCategoryApiRequests";

export const MattersCategoryDetails = () => {
  const navigate = useNavigate();
  const urlParams = useParams();
  const [mattersCategoryDetails, setMattersCategoryDetails] =
    useState<IMattersCategory>();

  useEffect(() => {
    if (urlParams.mattersCategoryId) {
      const mattersCategoryId = urlParams.mattersCategoryId;
      getMatterCategoryByIdRequest(mattersCategoryId).then((response) => {
        setMattersCategoryDetails(response);
      });
    }
  }, [urlParams.mattersCategoryId]);

  return (
    <div className="w-full p-4">
      <div className="flex flex-1  items-center p-2">
        <h1 className="my-4 ml-4 text-2xl text-black">
          Matters Category Details
        </h1>
      </div>
      <div className="flex justify-between mb-6">
        <div className="flex flex-row p-4">
          <div className="flex flex-col text-left font-medium">
            <div>
              <span className="text-black">Name</span>
              <br />
              <span className="text-[#808080]">
                {mattersCategoryDetails?.name}
              </span>
            </div>
            <div>
              <span className="text-black">Description</span>
              <br />
              <span className="text-[#808080]">
                {mattersCategoryDetails?.description}
              </span>
            </div>
          </div>
        </div>

        <div className="flex">
          <Button
            label="Edit"
            icon="pi pi-pencil"
            className="h-12"
            onClick={() =>
              navigate(`/matters/categories/${mattersCategoryDetails?.id}/edit`)
            }
          />
        </div>
      </div>
    </div>
  );
};
