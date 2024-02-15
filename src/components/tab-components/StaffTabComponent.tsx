import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { StaffCard } from "../cards/staff-card/StaffCard";

export const StaffTabComponent = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-gray-100 border-none p-4">
      <div className="flex justify-end mb-4">
        <Button
          icon="pi pi-plus"
          label="New"
          outlined
          onClick={() => {
            navigate("/staff/add-staff");
          }}
        />
      </div>
      <StaffCard />
      <br />
      <StaffCard />
    </div>
  );
};
