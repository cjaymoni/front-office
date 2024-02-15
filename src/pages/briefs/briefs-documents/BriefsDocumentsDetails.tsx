import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "primereact/button";
import {
  IBriefsDocuments,
  getBriefDocumentsByIdRequest,
} from "./briefsDocumentsApiRequest";
import { Chip } from "primereact/chip";
import { Divider } from "primereact/divider";

export const BriefsDocumentsDetails = () => {
  const navigate = useNavigate();
  const urlParams = useParams();
  const [briefsDocumentDetails, setBriefsDocumentDetails] =
    useState<IBriefsDocuments>();

  useEffect(() => {
    if (urlParams.briefsDocumentId) {
      const briefsDocumentId = urlParams.briefsDocumentId;
      getBriefDocumentsByIdRequest(briefsDocumentId).then((response) => {
        setBriefsDocumentDetails(response);
      });
    }
  }, [urlParams.briefsDocumentId]);

  return (
    <div className="w-full p-4">
      <div className="flex justify-between p-2">
        <h2 className=" text-gray-500  text-left text-4xl font-semibold mb-16">
          Brief Document Details
        </h2>
        <div className="flex justify-end">
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
              Document Name
            </div>
            <div className="flex  text-black font-medium">
              Briefs of Assault
            </div>
          </li>
          <li className="flex flex-col items-left py-3 px-2 flex-wrap ">
            <div className="flex text-[#808080] font-medium w-full">
              Folder Name
            </div>
            <div className="flex  text-black font-medium">
              <Chip label="Physical Offences" />
            </div>
          </li>
          <li className="flex flex-col items-left py-3 px-2 flex-wrap ">
            <div className="flex text-[#808080] font-medium w-full">
              Description
            </div>
            <div className="flex  text-black font-medium">
              an introspect into assault
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

      <div className="h-[64vh]">
        <iframe
          id="frame"
          className="w-full h-full"
          src="https://www.diva-portal.org/smash/get/diva2:1215717/FULLTEXT01.pdf%20"
          onLoad={() => console.log("loaded")}
          onLoadStart={() => <>loading</>}
        ></iframe>
      </div>
    </div>
  );
};
