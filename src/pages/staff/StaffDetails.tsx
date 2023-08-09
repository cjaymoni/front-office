import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IStaff, getStaffByIdRequest } from "./staffApiRequests";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { TabView, TabPanel } from "primereact/tabview";

export const StaffDetails = () => {
  const navigate = useNavigate();
  const urlParams = useParams();
  const [staffDetails, setStaffDetails] = useState<IStaff>();

  useEffect(() => {
    if (urlParams.staffId) {
      const staffId = urlParams.staffId;
      getStaffByIdRequest(staffId).then((response) => {
        setStaffDetails(response);
      });
    }
  }, [urlParams.staffId]);

  // Loop through each detail object

  const updatedStaffDetails: any = {};
  for (const key in staffDetails) {
    if (!staffDetails[key]) {
      updatedStaffDetails[key] = "N/A";
    } else {
      updatedStaffDetails[key] = staffDetails[key];
    }
  }
  return (
    <div className="w-full p-4">
      <div className="flex flex-1  items-center p-2">
        <h1 className="my-4 ml-4 text-4xl text-gray-500 font-semibold">
          Staff Details
        </h1>
      </div>

      <div className="flex justify-between mb-6">
        <div className="flex flex-row">
          <Avatar
            label="P"
            size="xlarge"
            shape="circle"
            className="mr-3 rounded-full"
          />
          <div className="flex flex-col text-left font-medium">
            <span className="text-black capitalize">
              {updatedStaffDetails?.first_name} {updatedStaffDetails?.last_name}
            </span>
            <span className="text-[#808080]">
              {updatedStaffDetails?.designation?.title}
            </span>
            <span className="text-[#808080]">Staff Id</span>
          </div>
        </div>

        <div className="flex">
          <Button
            label="Edit"
            icon="pi pi-pencil"
            className="h-12"
            onClick={() => navigate(`/staff/${staffDetails?.id}/edit-staff`)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 mb-6 text-[#808080]">
        <div className="flex flex-row border p-3">
          <i className="fa-solid fa-address-book mr-2 mt-1"></i>{" "}
          <span>{updatedStaffDetails?.cellphone_1}</span>
        </div>
        <div className="flex flex-row border p-3">
          <i className="fa-solid fa-envelope mr-2 mt-1"></i>{" "}
          <span>{updatedStaffDetails?.personal_email}</span>
        </div>
        <div className="flex flex-row border p-3">
          <i className="fa-solid fa-location-dot mr-2 mt-1"></i>{" "}
          <span>{updatedStaffDetails?.location}</span>
        </div>
        <div className="flex flex-row border p-3">
          <i className="fa-solid fa-clock mr-2 mt-1"></i>{" "}
          <span>Active, 2days</span>
        </div>
      </div>

      <div>
        <TabView>
          <TabPanel header="Personal" leftIcon="pi pi-user mr-2">
            <div className="w-full font-medium">
              <h2 className="text-left mb-4 text-black text-xl">
                General information
              </h2>
              <div className="grid grid-cols-2 gap-4 text-left mb-6">
                <div className="flex flex-col mb-2">
                  <span className="text-[#808080]">Date of Birth</span>
                  <span className="text-black">
                    {updatedStaffDetails?.date_of_birth}
                  </span>
                </div>

                <div className="flex flex-col mb-2">
                  <span className="text-[#808080]">Gender</span>
                  <span className="text-black">
                    {updatedStaffDetails?.gender}
                  </span>
                </div>

                <div className="flex flex-col mb-2">
                  <span className="text-[#808080]">Phone 2</span>
                  <span className="text-black">
                    {updatedStaffDetails?.cellphone_2}
                  </span>
                </div>
                <div className="flex flex-col mb-2">
                  <span className="text-[#808080]">National ID</span>
                  <span className="text-black">
                    {updatedStaffDetails?.national_id}
                  </span>
                </div>
                <div className="flex flex-col mb-2">
                  <span className="text-[#808080]">NHIS</span>
                  <span className="text-black">
                    {updatedStaffDetails?.nhis}
                  </span>
                </div>
                <div className="flex flex-col mb-2">
                  <span className="text-[#808080]">TIN Number</span>
                  <span className="text-black">{updatedStaffDetails?.tin}</span>
                </div>
                <div className="flex flex-col mb-2">
                  <span className="text-[#808080]">Social Security No.</span>
                  <span className="text-black">{updatedStaffDetails?.ssn}</span>
                </div>
                <div className="flex flex-col mb-2">
                  <span className="text-[#808080]">LinkedIn URL </span>
                  <span className="text-black">
                    {updatedStaffDetails?.linkedin}
                  </span>
                </div>
                <div className="flex flex-col mb-2">
                  <span className="text-[#808080]">Department</span>
                  <span className="text-black">
                    {updatedStaffDetails?.department?.name}
                  </span>
                </div>
                <div className="flex flex-col mb-2">
                  <span className="text-[#808080]">Access role</span>
                  <span className="text-black">
                    {updatedStaffDetails?.designation?.title}
                  </span>
                </div>
                <div className="flex flex-col mb-2">
                  <span className="text-[#808080]">Official email</span>
                  <span className="text-black">
                    {updatedStaffDetails?.official_email}
                  </span>
                </div>
              </div>
              <hr className="mb-4"></hr>
            </div>
          </TabPanel>
          <TabPanel header="Contract Info" leftIcon="pi pi-book mr-2">
            <div className="w-full font-medium">
              <h2 className="text-left mb-4 text-black text-xl">
                Contract information
              </h2>
              <div className="grid grid-cols-2 gap-4 text-left">
                <div className="flex flex-col mb-2">
                  <span className="text-[#808080]">Joining Date</span>
                  <span className="text-black">
                    {updatedStaffDetails?.hire_date}
                  </span>
                </div>

                <div className="flex flex-col mb-2">
                  <span className="text-[#808080]">Contract type</span>
                  <span className="text-black">Fixed term</span>
                </div>

                <div className="flex flex-col mb-2">
                  <span className="text-[#808080]">Period </span>
                  <span className="text-black">2 years</span>
                </div>
                <div className="flex flex-col mb-2">
                  <span className="text-[#808080]">Date called to bar</span>
                  <span className="text-black">
                    {updatedStaffDetails?.year_called_to_bar}
                  </span>
                </div>
                <div className="flex flex-col mb-2">
                  <span className="text-[#808080]">End date</span>
                  <span className="text-black">
                    {updatedStaffDetails?.end_date}
                  </span>
                </div>

                <div className="flex flex-col mb-2">
                  <span className="text-[#808080]">Practice Areas</span>
                  <span className="text-black">
                    {updatedStaffDetails?.practice_areas?.map(
                      (item) => item.title
                    )}
                  </span>
                </div>

                <div className="flex flex-col mb-2">
                  <span className="text-[#808080]">Sectors</span>
                  <span className="text-black">
                    {updatedStaffDetails?.sectors?.map((item) => item.title)}
                  </span>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel header="Salary" leftIcon="pi pi-money-bill mr-2">
            <div className="w-full font-medium">
              <h2 className="text-left mb-4 text-black text-xl">
                Salary information
              </h2>

              <div className="grid grid-cols-2 gap-4 text-left mb-6">
                <div className="flex flex-col mb-2">
                  <span className="text-[#808080]">Salary</span>
                  <div className="flex flex-row">
                    <span className="text-[#808080] mr-2">USD</span>
                    <span className="text-black">
                      {updatedStaffDetails?.salary}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col mb-2">
                  <span className="text-[#808080]">Rate per matter</span>
                  <div className="flex flex-row">
                    <span className="text-[#808080] mr-2">USD</span>
                    <span className="text-black">
                      {updatedStaffDetails?.rate_per_matter}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col mb-2">
                  <span className="text-[#808080]">Commission per matter</span>
                  <div className="flex flex-row">
                    <span className="text-[#808080] mr-2">USD</span>
                    <span className="text-black">
                      {updatedStaffDetails?.commission_per_matter}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel header="Leaves" leftIcon="pi pi-directions mr-2">
            <div className="w-full font-medium">
              <h2 className="text-left mb-4 text-black text-xl">
                Leave information
              </h2>

              <div className="grid grid-cols-2 gap-4 text-left mb-6">
                <div className="flex flex-col mb-2">
                  <span className="text-[#808080]">No. of Leave Days</span>

                  <span className="text-black">
                    {updatedStaffDetails?.leave_days}
                  </span>
                </div>

                <div className="flex flex-col mb-2">
                  <span className="text-[#808080]">No. of Sick Days</span>
                  <span className="text-black">
                    {updatedStaffDetails?.sick_days}
                  </span>
                </div>
                {/* 
                <div className="flex flex-col mb-2">
                  <span className="text-[#808080]">Overtime Allowed</span>
                  <span className="text-black capitalize">
                    {updatedStaffDetails?.overtime_allowed.toString()}
                  </span>
                </div> */}
              </div>
            </div>
          </TabPanel>
        </TabView>
      </div>
    </div>
  );
};
