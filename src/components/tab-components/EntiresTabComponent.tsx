import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { EntryCard } from "../cards/entry-card/EntryCard";
import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Editor } from "primereact/editor";
import { Dialog } from "primereact/dialog";

export const EntriesTabComponent = () => {
  const [visitorName, setVisitorName] = useState("");
  const [visitorEmail, setVisitorEmail] = useState("");
  const [visitorPhone, setVisitorPhone] = useState("");
  const [personToSee, setPersonToSee] = useState("");
  const [visitDate, setVisitDate] = useState(null);
  const [visitPurpose, setVisitPurpose] = useState("");
  const [visible, setVisible] = useState(false);

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

      <EntryCard handleEditClick={() => setVisible(true)} />
      <br />
      <EntryCard handleEditClick={() => setVisible(true)} />

      <Dialog
        header={`Add Visit Entry `}
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
      >
        <div className="w-full p-4 grid grid-cols-2 gap-4">
          {/* visitor_name */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="visitor_name"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Visitor name
            </label>
            <div className="flex flex-col">
              <InputText
                type="text"
                name="assignee"
                placeholder="Enter visitor name"
                value={visitorName}
                onChange={(e) => setVisitorName(e.target.value)}
                className="w-full p-1 ml-3 text-gray-500 outline-none"
              />
            </div>
          </div>

          {/* visitor_email */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="visitor_email"
              className="font-medium text-left mb-3 text-gray-500 "
            >
              Visitor email address
            </label>
            <div className="flex flex-col">
              <InputText
                type="text"
                name="assignee"
                placeholder="Enter visitor email address"
                value={visitorEmail}
                onChange={(e) => setVisitorEmail(e.target.value)}
                className="w-full p-1 ml-3 text-gray-500 outline-none"
              />
            </div>
          </div>

          {/* visitor_phone */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="visitor_phone"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Visitor phone number
            </label>
            <div className="flex flex-col">
              <InputText
                type="text"
                name="assignee"
                placeholder="Enter visitor phone"
                value={visitorPhone}
                onChange={(e) => setVisitorPhone(e.target.value)}
                className="w-full p-1 ml-3 text-gray-500 outline-none"
              />
            </div>
          </div>

          {/* person_to_see */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="person_to_see"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Person to see
            </label>
            <div className="flex flex-col">
              <Dropdown
                value={personToSee}
                onChange={(e) => setPersonToSee(e.target.value)}
                options={[]}
                optionLabel="label"
                showClear
                placeholder="Select a task type"
                className="w-full  text-gray-500 outline-none"
              />
            </div>
          </div>

          {/* visit_date  */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="visit_date"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Visit Date
            </label>
            <div className="flex flex-col">
              <Calendar
                inputId="due_date"
                name="due_date"
                value={visitDate}
                onChange={(e) => setVisitDate(e.target.value)}
                showIcon
                placeholder="dd/mm/yyyy"
              />
            </div>
          </div>

          {/* visit_purpose */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="visitor_email"
              className="font-medium text-left mb-3 text-gray-500 "
            >
              Visit purpose
            </label>
            <Editor
              placeholder={"Enter Visit purpose .."}
              value={visitPurpose}
              onTextChange={(e) => setVisitPurpose(e.htmlValue)}
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
      </Dialog>
    </div>
  );
};
