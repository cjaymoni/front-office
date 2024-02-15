import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { MeetingCard } from "../cards/meeting-card/MeetingCard";
import { LitigationCard } from "../cards/litigation-card/LitigationCard";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useState } from "react";

export const MeetingTabComponent = () => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");

  return (
    <div className="w-full bg-gray-100 border-none p-4">
      <div className="flex justify-end mb-4">
        <Button
          icon="pi pi-plus"
          label="New"
          outlined
          onClick={() => setVisible(true)}
        />
      </div>

      <MeetingCard handleEditClick={() => setVisible(true)} />
      <br />
      <MeetingCard handleEditClick={() => setVisible(true)} />

      <Dialog
        header={`Add Meeting `}
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
      >
        {" "}
        <div className="w-full flex flex-col space-y-2">
          <div className="flex flex-col">
            <label className="text-gray-500 font-medium">Title</label>
            <InputText
              type="text"
              className="w-full border-none bg-gray-100"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button label="Save" className="h-12 w-24" />
            <Button label="Close" severity="danger" className="h-12 w-24" />
          </div>
        </div>
      </Dialog>
    </div>
  );
};
