import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { TeamCard } from "../cards/teams-card/TeamCard";
import { Dropdown } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import { InputText } from "primereact/inputtext";

export const TeamsTabComponent = () => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [briefId, setBriefId] = useState("");
  const [litigationId, setLitigationId] = useState("");

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
      <TeamCard handleEditClick={() => setVisible(true)} />
      <br />
      <TeamCard handleEditClick={() => setVisible(true)} />

      <Dialog
        header={`Add Team `}
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
      >
        <div className="w-full grid grid-cols-2 gap-2 space-y-2">
          <div className="flex flex-col">
            <label className="text-gray-500 font-medium">Team Name</label>
            <InputText
              type="text"
              className="w-full border-none bg-gray-100"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-500 font-medium">Staff</label>
            <Dropdown
              optionLabel="label"
              optionValue="value"
              value={briefId}
              onChange={(e) => {
                setBriefId(e.target.value);
              }}
              placeholder="Select a brief"
              className="w-full  text-gray-500 outline-none"
              options={[]}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-500 font-medium">Litigation</label>

            <Dropdown
              optionLabel="label"
              optionValue="value"
              value={litigationId}
              onChange={(e) => {
                setLitigationId(e.target.value);
              }}
              placeholder="Select a brief"
              className="w-full  text-gray-500 outline-none"
              options={[]}
            />
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button label="Save" className="h-12 w-24" />
          <Button label="Close" severity="danger" className="h-12 w-24" />
        </div>
      </Dialog>
    </div>
  );
};
