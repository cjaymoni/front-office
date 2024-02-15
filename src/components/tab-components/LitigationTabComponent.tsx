import { Button } from "primereact/button";
import { LitigationCard } from "../cards/litigation-card/LitigationCard";

import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import { Dropdown } from "primereact/dropdown";

export const LitigationTabComponent = () => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [briefId, setBriefId] = useState("");
  const [suiteNumber, setSuiteNumber] = useState("");
  const [client, setClient] = useState("");
  const [lawyerId, setLawyerId] = useState("");
  const [litigationCategory, setLitigationCategory] = useState("");

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

      <LitigationCard handleEditClick={() => setVisible(true)} />
      <br />
      <LitigationCard handleEditClick={() => setVisible(true)} />

      <Dialog
        header={`Add Litigation `}
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
      >
        <div className="w-full flex flex-col space-y-2">
          <div className="w-full p-4 grid grid-cols-2 gap-6">
            {/* title */}
            <div className="flex flex-col mb-4">
              <label
                htmlFor="title"
                className="font-medium text-left mb-3 text-gray-500 required-field"
              >
                Title
              </label>
              <div className="flex flex-col">
                <InputText
                  type="text"
                  name="title"
                  placeholder="Enter title"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  className="w-full p-1 ml-3 text-gray-500 outline-none"
                />
              </div>
            </div>
            {/* brief_id */}
            <div className="flex flex-col mb-4">
              <label
                htmlFor="brief_id"
                className="font-medium text-left mb-3 text-gray-500 required-field"
              >
                Select Brief
              </label>
              <div className="flex flex-col">
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
            </div>
            {/* suite_number */}
            <div className="flex flex-col mb-4">
              <label
                htmlFor="suite_number"
                className="font-medium text-left mb-3 text-gray-500 required-field"
              >
                Suite number
              </label>
              <div className="flex flex-col">
                <InputText
                  type="email"
                  name="suite_number"
                  placeholder="Enter  suite number "
                  value={suiteNumber}
                  onChange={(e) => {
                    setSuiteNumber(e.target.value);
                  }}
                  className="w-full p-1 ml-3 text-gray-500 outline-none"
                />
              </div>
            </div>

            {/* client */}
            <div className="flex flex-col mb-4">
              <label
                htmlFor="client"
                className="font-medium text-left mb-3 text-gray-500 required-field"
              >
                Client
              </label>
              <div className="flex flex-col">
                <Dropdown
                  optionLabel="label"
                  optionValue="value"
                  value={client}
                  onChange={(e) => {
                    setClient(e.target.value);
                  }}
                  placeholder="Select a client"
                  className="w-full  text-gray-500 outline-none"
                  options={[]}
                />
              </div>
            </div>

            {/* lawyer_id */}
            <div className="flex flex-col mb-4">
              <label
                htmlFor="lawyer_id"
                className="font-medium text-left mb-3 text-gray-500"
              >
                Lawyer
              </label>
              <div className="flex flex-col">
                <Dropdown
                  value={lawyerId}
                  onChange={(e) => {
                    setLawyerId(e.target.value);
                  }}
                  options={[]}
                  placeholder="Select supervising partner"
                  className="w-full  text-gray-500 outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col mb-4">
              <label
                htmlFor="types"
                className="font-medium text-left mb-3 text-gray-500"
              >
                Litigation category
              </label>
              <div className="flex flex-col">
                <Dropdown
                  optionLabel="label"
                  optionValue="value"
                  value={litigationCategory}
                  onChange={(e) => {
                    setLitigationCategory(e.target.value);
                  }}
                  placeholder="Select a brief type"
                  className="w-full  text-gray-500 outline-none"
                  options={[]}
                />
              </div>
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
