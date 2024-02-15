import { useNavigate } from "react-router-dom";
import { ActionsCard } from "../cards/actions-card/ActionsCard";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { createOptionsFromEnum } from "../../utils/utils";
import { ITaskPriority } from "../../pages/tasks/taskApiRequest";
import { Calendar } from "primereact/calendar";
import { InputNumber } from "primereact/inputnumber";
import { Editor } from "primereact/editor";

export const ActionsTabComponent = () => {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [priority, setPriority] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [duration, setDuration] = useState(0);
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

      <ActionsCard handleEditClick={() => setVisible(true)} />
      <br />
      <ActionsCard handleEditClick={() => setVisible(true)} />

      <Dialog
        header={`Add Action `}
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
      >
        <div className="w-full p-4 grid grid-cols-3 gap-6">
          {/* name */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="name"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Action Name
            </label>
            <div className="flex flex-col">
              <InputText
                type="text"
                name="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className="w-full p-1 ml-3 text-gray-500 outline-none"
              />
            </div>
          </div>

          {/* priority */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="priority"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Priority
            </label>
            <div className="flex flex-col">
              <Dropdown
                value={priority}
                onChange={(e) => {
                  setPriority(e.target.value);
                }}
                options={createOptionsFromEnum(ITaskPriority)}
                optionLabel="label"
                showClear
                placeholder="Select a priority"
                className="w-full  text-gray-500 outline-none"
              />
            </div>
          </div>

          {/* start_date_time */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="start_date_time"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Start Date
            </label>
            <div className="flex flex-col">
              <Calendar
                inputId="start_date_time"
                name="start_date_time"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                }}
                showIcon
                placeholder="dd/mm/yyyy"
              />
            </div>
          </div>

          {/* end_date_time */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="end_date_time"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              End Date
            </label>
            <div className="flex flex-col">
              <Calendar
                inputId="end_date_time"
                name="end_date_time"
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                }}
                showIcon
                placeholder="dd/mm/yyyy"
              />
            </div>
          </div>

          <div className="flex flex-col mb-4">
            <label
              htmlFor="duration"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Duration
            </label>
            <div className="flex flex-col">
              <InputNumber
                inputId="duration"
                name="duration"
                value={duration}
                onValueChange={(e) => setDuration(e.value)}
                mode="decimal"
                showButtons
                min={0}
                max={100}
                className="w-full  text-gray-500 outline-none"
              />
            </div>
          </div>

          {/* description */}
          <div className="flex flex-col col-span-3 mb-4">
            <label
              htmlFor="name"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Description
            </label>
            <Editor
              placeholder={"Enter Description .."}
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
        </div>
        <div className="flex justify-end space-x-2">
          <Button label="Save" className="h-12 w-24" />
          <Button label="Close" severity="danger" className="h-12 w-24" />
        </div>
      </Dialog>
    </div>
  );
};
