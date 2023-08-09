import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "primereact/button";
import { IMatters, getMattersByIdRequest } from "./matterApiRequest";

export const MatterDetails = () => {
  const navigate = useNavigate();
  const urlParams = useParams();
  const [matterDetails, setMatterDetails] = useState<IMatters>();

  useEffect(() => {
    if (urlParams.matterId) {
      const matterId = urlParams.matterId;
      getMattersByIdRequest(matterId).then((response) => {
        setMatterDetails(response);
      });
    }
  }, [urlParams.matterId]);

  return (
    <div className="w-full p-4">
      <div className="flex flex-1  items-center p-2">
        <h1 className="my-4 ml-4 text-2xl text-black">Matter Details</h1>
      </div>
      <div className="flex justify-between mb-6">
        <div className="flex flex-row p-4">
          <div className="flex flex-col text-left font-medium">
            <div>
              <span className="text-black">Reference Number</span>
              <br />
              <span className="text-[#808080]">
                {matterDetails?.reference_number}
              </span>
            </div>
            <div>
              <span className="text-black">Brief</span>
              <br />
              <span className="text-[#808080]">{matterDetails?.brief}</span>
            </div>
          </div>
        </div>

        <div className="flex">
          <Button
            label="Edit"
            icon="pi pi-pencil"
            className="h-12"
            onClick={() =>
              navigate(`/matters/matter/${matterDetails?.id}/edit`)
            }
          />
        </div>
      </div>
    </div>
  );
};
