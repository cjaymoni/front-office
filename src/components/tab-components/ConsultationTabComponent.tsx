import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { ConsultationCard } from "../cards/consultation-card/ConsultationCard";
import { useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Editor } from "primereact/editor";

export const ConsultationTabComponent = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [salutation, setSalutation] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [natureOfService, setNatureOfService] = useState("");
  const [description, setDescription] = useState("");
  const serviceNature = [
    { label: "Dispute", value: "dispute" },
    { label: "Non dispute", value: "non-dispute" },
  ];
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
      <ConsultationCard handleEditClick={() => setVisible(true)} />
      <br />
      <ConsultationCard handleEditClick={() => setVisible(true)} />

      <Dialog
        header={`Add Consultation `}
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
      >
        <div className="w-full flex flex-col space-y-2">
          <div className="flex flex-col">
            <label className="text-gray-500 font-medium">Salutation</label>
            <InputText
              type="text"
              className="w-full border-none bg-gray-100"
              name="salutation"
              placeholder="Enter salutation"
              value={salutation}
              onChange={(e) => setSalutation(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-500 font-medium">First Name</label>
            <InputText
              type="text"
              className="w-full border-none bg-gray-100"
              name="salutation"
              placeholder="Enter first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-500 font-medium">Last Name</label>
            <InputText
              type="text"
              className="w-full border-none bg-gray-100"
              name="salutation"
              placeholder="Enter last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="flex flex-col mb-4">
            <label
              htmlFor="service_requested"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Nature of service
            </label>
            <div className="flex flex-col">
              <Dropdown
                value={natureOfService}
                onChange={(e) => {
                  setNatureOfService(e.value);
                }}
                options={serviceNature}
                optionLabel="label"
                showClear
                placeholder="Select a nature of service"
                className="w-full  text-gray-500 outline-none"
              />
            </div>
          </div>
          <div className="flex flex-col mb-4">
            <label
              htmlFor="service_requested"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Description
            </label>
            <div className="flex flex-col">
              <Editor
                placeholder={"Enter description .."}
                value={description}
                onTextChange={(e) => setDescription(e.textValue)}
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
