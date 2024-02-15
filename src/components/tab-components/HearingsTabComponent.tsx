import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { HearingsCard } from "../cards/hearings-card/HearingsCard";
import { useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Editor } from "primereact/editor";
export const HearingsTabComponent = () => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [litigationId, setLitigationId] = useState("");
  const [description, setDescription] = useState("");

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

      <HearingsCard handleEditClick={() => setVisible(true)} />
      <br />
      <HearingsCard handleEditClick={() => setVisible(true)} />

      <Dialog
        header={`Add Hearing `}
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
      >
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
          <div className="flex flex-col">
            <label className="text-gray-500 font-medium">Description</label>
            <Editor
              placeholder={"Enter description ..."}
              className="bg-gray-100"
              value={description}
              onTextChange={(e) => setDescription(e.htmlValue)}
              style={{ height: "320px" }}
              modules={{
                toolbar: [
                  [{ header: "1" }, { header: "2" }, { font: [] }],
                  [{ size: [] }],
                  ["bold", "italic", "underline", "strike", "blockquote"],
                  [
                    { list: "ordered" },
                    { list: "bullet" },
                    { indent: "-1" },
                    { indent: "+1" },
                  ],
                  ["link", "image", "video"],
                  ["clean"],
                ],
                clipboard: {
                  // toggle to add extra line breaks when pasting HTML:
                  matchVisual: false,
                },
              }}
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
