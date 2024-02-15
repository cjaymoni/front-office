import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { TaskCard } from "../cards/task-card/TaskCard";
import { useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { createOptionsFromEnum } from "../../utils/utils";
import { ITaskPriority } from "../../pages/tasks/taskApiRequest";
import { Calendar } from "primereact/calendar";
import { Editor } from "primereact/editor";

export const TasksTabComponent = () => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [taskName, setTaskName] = useState("");
  const [taskId, setTaskId] = useState("");
  const [priority, setPriority] = useState("");
  const [assignee, setAssignee] = useState("");
  const [taskType, setTaskType] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [comments, setComments] = useState("");

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
      <TaskCard handleEditClick={() => setVisible(true)} />
      <br />
      <TaskCard handleEditClick={() => setVisible(true)} />

      <Dialog
        header={`Add Task `}
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
      >
        <div className="w-full p-4 grid grid-cols-2 gap-6">
          {/* task_name */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="task_name"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Task Name
            </label>
            <div className="flex flex-col">
              <InputText
                type="text"
                name="task_name"
                placeholder="Enter task name"
                value={taskName}
                onChange={(e) => {
                  setTaskName(e.target.value);
                }}
                className="w-full p-1 ml-3 text-gray-500 outline-none"
              />
            </div>
          </div>
          {/* task_id */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="task_id"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Task ID
            </label>
            <div className="flex flex-col">
              <InputText
                type="text"
                name="task_id"
                placeholder="Enter task id"
                value={taskId}
                onChange={(e) => {
                  setTaskId(e.target.value);
                }}
                className="w-full p-1 ml-3 text-gray-500 outline-none"
              />
            </div>
          </div>
          {/* priority*/}
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
                onChange={(e) => setPriority(e.target.value)}
                options={createOptionsFromEnum(ITaskPriority)}
                optionLabel="label"
                showClear
                placeholder="Select a priority"
                className="w-full  text-gray-500 outline-none"
              />
            </div>
          </div>

          {/* assignee */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="assignee"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Assignee
            </label>
            <div className="flex flex-col">
              <InputText
                type="text"
                name="assignee"
                placeholder="Enter assignee"
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                className="w-full p-1 ml-3 text-gray-500 outline-none"
              />
            </div>
          </div>

          {/* task_type */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="task_type"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Task Type
            </label>
            <div className="flex flex-col">
              <Dropdown
                value={taskType}
                onChange={(e) => setTaskType(e.target.value)}
                options={createOptionsFromEnum(ITaskPriority)}
                optionLabel="label"
                showClear
                placeholder="Select a task type"
                className="w-full  text-gray-500 outline-none"
              />
            </div>
          </div>
          {/* due_Date*/}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="due_date"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Due Date
            </label>
            <div className="flex flex-col">
              <Calendar
                inputId="due_date"
                name="due_date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                showIcon
                placeholder="dd/mm/yyyy"
              />
            </div>
          </div>
          {/* comments */}
          <div className="flex flex-col col-span-3 mb-4 w-full">
            <label
              htmlFor="comments"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Comments
            </label>
            <div className="flex flex-col">
              <Editor
                placeholder={"Enter comments .."}
                value={comments}
                onTextChange={(e) => setComments(e.textValue)}
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
        </div>
        <div className="flex justify-end space-x-2">
          <Button label="Save" className="h-12 w-24" />
          <Button label="Close" severity="danger" className="h-12 w-24" />
        </div>
      </Dialog>
    </div>
  );
};
