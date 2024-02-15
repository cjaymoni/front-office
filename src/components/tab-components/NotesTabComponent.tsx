import { Button } from "primereact/button";
import { NotesCard } from "../cards/notes-card/NotesCard";
import { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Editor } from "primereact/editor";
import { InputText } from "primereact/inputtext";

export const NotesTabComponent = () => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

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

      <NotesCard handleEditClick={() => setVisible(true)} />
      <br />
      <NotesCard handleEditClick={() => setVisible(true)} />
      <Dialog
        header={`Add Note `}
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
            <label className="text-gray-500 font-medium">Body</label>
            <Editor
              placeholder={"Enter note body ..."}
              className="bg-gray-100"
              value={body}
              onTextChange={(e) => setBody(e.htmlValue)}
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
