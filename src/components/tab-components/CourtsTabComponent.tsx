import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { CourtCard } from "../cards/court-card/CourtCard";

export const CourtsTabComponent = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-gray-100 border-none p-4">
      <div className="flex justify-end mb-4">
        <Button
          icon="pi pi-plus"
          label="New"
          outlined
          onClick={() => {
            navigate("/courts/add");
          }}
        />
      </div>
      <CourtCard />
      <br />
      <CourtCard />
    </div>
  );
};
