import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "primereact/button";
import { IActions, getActionsByIdRequest } from "./actionsApiRequests";

export const ActionDetails = () => {
  const navigate = useNavigate();
  const urlParams = useParams();
  const [actionDetails, setClientDetails] = useState<IActions>();

  useEffect(() => {
    if (urlParams.actionId) {
      const actionId = urlParams.actionId;
      getActionsByIdRequest(actionId).then((response) => {
        setClientDetails(response);
      });
    }
  }, [urlParams.actionId]);

  return (
    <div className="w-full p-4">
      <div className="flex flex-1  items-center p-2">
        <h1 className="my-4 ml-4 text-2xl text-black">Action Details</h1>
      </div>
      <div className="flex justify-between mb-6">
        <div className="flex flex-row p-4">
          <div className="flex flex-col text-left font-medium">
            <div>
              <span className="text-black">ACtion name</span>
              <br />
              <span className="text-[#808080]">{actionDetails?.name}</span>
            </div>
            <div>
              <span className="text-black">Description </span>
              <br />
              <span className="text-[#808080]">
                {actionDetails?.description}
              </span>
            </div>
          </div>
        </div>

        <div className="flex">
          <Button
            label="Edit"
            icon="pi pi-pencil"
            className="h-12"
            onClick={() => navigate(`/crm/actions/${actionDetails?.id}/edit`)}
          />
        </div>
      </div>
    </div>
  );
};
