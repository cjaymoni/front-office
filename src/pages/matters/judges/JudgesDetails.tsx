import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "primereact/button";
import { IJudge, getJudgesByIdRequest } from "./judgesApiRequests";

export const JudgeDetails = () => {
  const navigate = useNavigate();
  const urlParams = useParams();
  const [judgeDetails, setJudgeDetails] = useState<IJudge>();

  useEffect(() => {
    if (urlParams.judgeId) {
      const judgeId = urlParams.judgeId;
      getJudgesByIdRequest(judgeId).then((response) => {
        setJudgeDetails(response);
      });
    }
  }, [urlParams.judgeId]);

  return (
    <div className="w-full p-4">
      <div className="flex flex-1  items-center p-2">
        <h1 className="my-4 ml-4 text-2xl text-black">Judge Details</h1>
      </div>
      <div className="flex justify-between mb-6">
        <div className="flex flex-row p-4">
          <div className="flex flex-col text-left font-medium">
            <div>
              <span className="text-black">First name</span>
              <br />
              <span className="text-[#808080]">{judgeDetails?.first_name}</span>
            </div>
            <div>
              <span className="text-black">Last name</span>
              <br />
              <span className="text-[#808080]">{judgeDetails?.last_name}</span>
            </div>
          </div>
        </div>

        <div className="flex">
          <Button
            label="Edit"
            icon="pi pi-pencil"
            className="h-12"
            onClick={() => navigate(`/matters/judges/${judgeDetails?.id}/edit`)}
          />
        </div>
      </div>
    </div>
  );
};
