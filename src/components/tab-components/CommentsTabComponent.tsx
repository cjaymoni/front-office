import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { CommentsCard } from "../cards/comments-card/CommentsCard";
import { Editor } from "primereact/editor";
import { useState } from "react";
import { Dialog } from "primereact/dialog";

export const CommentsTabComponent = () => {
  const [visible, setVisible] = useState(false);
  const [comment, setComment] = useState("");

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

      <CommentsCard />
      <br />
      <CommentsCard />

      <Dialog
        header={`Add Comment`}
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
      >
        <div className="w-full flex flex-col space-y-2">
          <div className="flex flex-col">
            <label className="text-gray-500 font-medium">Description</label>
            <Editor
              placeholder={"Enter comment ..."}
              className="bg-gray-100"
              value={comment}
              onTextChange={(e) => setComment(e.htmlValue)}
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
