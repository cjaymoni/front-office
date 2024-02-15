import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { ClientCard } from "../cards/client-card/ClientCard";

export const AssignedTabComponent = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-gray-100 border-none p-4">
      <div className="flex justify-end mb-4">
        <Button
          icon="pi pi-plus"
          label="New"
          outlined
          onClick={() => {
            navigate("/clients/add");
          }}
        />
      </div>

      {/* <ClientCard />
      <br />
      <ClientCard /> */}
    </div>
  );
};
