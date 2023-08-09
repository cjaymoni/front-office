import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  IDepartment,
  getDepartmentsByIdRequest,
} from "./departmentsApiRequests";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";

export const DepartmentDetails = () => {
  const navigate = useNavigate();
  const urlParams = useParams();
  const [departmentDetails, setDepartmentDetails] = useState<IDepartment>();

  useEffect(() => {
    if (urlParams.departmentId) {
      const departmentId = urlParams.departmentId;
      getDepartmentsByIdRequest(departmentId).then((response) => {
        setDepartmentDetails(response);
      });
    }
  }, [urlParams.departmentId]);

  return (
    <div className="w-full p-4">
      {/* //new  */}

      <div className="w-full py-4 px-8 bg-white shadow-md rounded-lg my-8">
        <div>
          <h2 className=" text-gray-500  text-left text-4xl font-semibold mb-16">
            Department Details
          </h2>
          <ul className="mt-5 text-gray-600 text-left">
            <li className="flex flex-row items-left py-3 px-2 flex-wrap bg-gray-300">
              <div className="flex text-[#808080] font-medium md:w-1/4 w-full">
                Department Name
              </div>
              <div className="flex md:w-3/4 text-black font-medium">
                {departmentDetails?.name}
              </div>
            </li>
            <li className="flex flex-row items-left py-3 px-2 flex-wrap ">
              <div className="flex md:w-1/4 w-full text-[#808080] font-medium">
                Department Location
              </div>
              <div className="flex md:w-3/4 text-black font-medium">
                {departmentDetails?.location}
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
              navigate(`/departments/${departmentDetails?.id}/edit-department`)
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
